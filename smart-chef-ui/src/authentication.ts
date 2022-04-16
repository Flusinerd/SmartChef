import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { AuthApi, Configuration, TokenPair } from "./generated/openapi";
import jwt_decode from "jwt-decode";
import createAuthRefreshInterceptor from "axios-auth-refresh";

export class AuthService {
  private static instance: AuthService;
  private readonly REFRESH_TOKEN_LS_KEY = "sc_refresh_token";

  private apiUrl = "http://localhost:8000";
  private isLoggedIn = false;
  private accessToken?: string;
  private refreshToken?: string;
  private clientId = "91746da8-079f-44e0-bdae-bbf4b62c0adf";
  private axiosInstance = axios.create();
  private interceptorAdded = false;

  private refreshInProgress: Promise<void> | undefined;
  private loginInProgress: Promise<void> | undefined;
  private loadInProgress: Promise<void> | undefined;

  private apiConfig = new Configuration({
    basePath: this.apiUrl,
  });
  private api = new AuthApi(this.apiConfig, undefined, this.axiosInstance);

  private constructor() {
    createAuthRefreshInterceptor(axios, this.refreshAuthToken);
    this.addInterceptor();
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

  private async refreshAuthToken(failedRequest: any) {
    if (this.refreshToken) {
      const refreshToken = this.refreshToken;
      this.refreshToken = undefined;
      const res = await this.api.apiAuthRefreshCreate({
        refresh_token: refreshToken,
      });
      this.setTokens(res);
      failedRequest.response.config.headers[
        "Authorization"
      ] = `Bearer ${this.accessToken}`;
    }
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
  }

  async authRequestInterceptor(config: AxiosRequestConfig<unknown>) {
    // If we have an access token, add it to the headers
    if (!config.headers) {
      config.headers = {};
    }
    if (this.accessToken) {
      config.headers["Authorization"] = `Bearer ${this.accessToken}`;
    }
    return config;
  }

  private saveRefreshToken() {
    if (this.refreshToken) {
      localStorage.setItem(this.REFRESH_TOKEN_LS_KEY, this.refreshToken);
    }
  }

  public async loadTokens() {
    if (this.loadInProgress) {
      return this.loadInProgress;
    }
    const prom = new Promise<void>(async (resolve) => {
      console.debug("Loading tokens");
      const refreshToken =
        localStorage.getItem(this.REFRESH_TOKEN_LS_KEY) ?? undefined;
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
          localStorage.removeItem(this.REFRESH_TOKEN_LS_KEY);
        }
      } else {
        // No refresh token, remove any access token
        this.accessToken = undefined;
        console.debug("No refresh token");
      }
      this.loadInProgress = undefined;
      resolve();
    });
    this.loadInProgress = prom;
  }

  logout() {
    console.debug("Logging out");
    this.accessToken = undefined;
    this.refreshToken = undefined;
    this.isLoggedIn = false;
    localStorage.removeItem(this.REFRESH_TOKEN_LS_KEY);
  }
}

// eslint-disable-next-line unused-imports/no-unused-vars
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
