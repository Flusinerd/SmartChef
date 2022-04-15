import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { AuthApi, Configuration, TokenPair } from "./generated/openapi";
import jwt_decode from "jwt-decode";

export class AuthService {
  private static instance: AuthService;

  private apiUrl = "http://localhost:8000";
  private isLoggedIn = false;
  private accessToken?: string;
  private refreshToken?: string;
  private clientId = "91746da8-079f-44e0-bdae-bbf4b62c0adf";
  private axiosInstance = axios.create();
  private interceptorAdded = false;

  private refreshInProgress: Promise<void> | undefined;
  private loginInProgress: Promise<void> | undefined;

  private apiConfig = new Configuration({
    basePath: this.apiUrl,
  });
  private api = new AuthApi(this.apiConfig, undefined, this.axiosInstance);

  private constructor() {
    this.loadTokens().then(() => {
      if (!this.interceptorAdded) {
        this.addInterceptor();
        this.interceptorAdded = true;
      }
    });
  }

  static getInstance() {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  public login(email: string, password: string) {
    if (this.loginInProgress) {
      return this.loginInProgress;
    }
    const promise = new Promise<void>(async (resolve) => {
      const response = await this.api.apiAuthLoginCreate({
        email,
        password,
        applicationId: this.clientId,
      });

      this.setTokens(response);
      if (!this.interceptorAdded) {
        this.addInterceptor();
      }
      this.loginInProgress = undefined;
      resolve();
    });
    this.loginInProgress = promise;
  }

  private setTokens(response: AxiosResponse<TokenPair, any>) {
    this.accessToken = response.data.accessToken;
    this.refreshToken = response.data.refreshToken;
    this.isLoggedIn = true;
    this.saveRefreshToken();
  }

  private refreshAccessToken() {
    if (this.refreshInProgress) {
      return this.refreshInProgress;
    }
    if (this.loginInProgress) {
      return;
    }
    const promise = new Promise<void>(async (resolve) => {
      if (!this.refreshToken) {
        throw new Error("No refresh token");
      }
      console.debug("Refreshing access token");
      try {
        const response = await this.api.apiAuthRefreshCreate({
          refresh_token: this.refreshToken,
        });
        if (response.status === 201) {
          this.accessToken = response.data.accessToken;
          this.refreshToken = response.data.refreshToken;
          this.isLoggedIn = true;
          this.saveRefreshToken();
        } else {
          this.logout();
        }
      } catch (error) {
        console.log("Error refreshing access token", error);
        this.logout();
      }
      this.refreshInProgress = undefined;
      resolve();
    });
    this.refreshInProgress = promise;
  }

  addInterceptor() {
    axios.interceptors.request.use(this.authRequestInterceptor);
    axios.interceptors.response.use(this.authResponseInterceptor);
  }

  async authRequestInterceptor(config: AxiosRequestConfig<unknown>) {
    // If we have an access token, add it to the headers
    if (!config.headers) {
      config.headers = {};
    }
    if (!this.accessToken) {
      if (this.refreshToken) {
        await this.refreshAccessToken();
      } else {
        throw new Error("No refresh token");
      }
    }
    config.headers.Authorization = `Bearer ${this.accessToken}`;
    return config;
  }

  /**
   * Refreshes a access token if we get a 401 error and the response contains { "detail": "Invalid token header. Token has expired." }
   * @param response Response we got
   */
  async authResponseInterceptor(response: AxiosResponse<any, any>) {
    if (
      response.status === 401 &&
      response.data.detail === "Invalid token header. Token has expired."
    ) {
      if (this.refreshToken) {
        await this.refreshAccessToken();
      } else {
        this.logout();
      }
    }
    return response;
  }

  private saveRefreshToken() {
    if (this.refreshToken) {
      localStorage.setItem("sc_refresh_token", this.refreshToken);
    }
  }

  private async loadTokens() {
    const refreshToken = localStorage.getItem("sc_refresh_token") ?? undefined;
    if (refreshToken) {
      const decodedToken = jwt_decode<RefreshTokenPayload>(refreshToken);
      const expiry = new Date(decodedToken.exp * 1000);
      if (expiry > new Date()) {
        // Token not expired, request a new access token
        this.refreshToken = refreshToken;
        if (!this.loginInProgress) {
          await this.refreshAccessToken();
        }
      } else {
        // Token expired, remove it
        localStorage.removeItem("sc_refresh_token");
      }
    }
  }

  logout() {
    console.debug("Logging out");
    this.accessToken = undefined;
    this.refreshToken = undefined;
    this.isLoggedIn = false;
    localStorage.removeItem("sc_refresh_token");
  }
}

interface AccessTokenPayload extends TokenPayload {
  householdIds: string[];
}

interface RefreshTokenPayload extends TokenPayload {
  client_id: string;
}

interface TokenPayload {
  sub: string;
  exp: number;
}
