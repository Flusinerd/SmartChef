import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SCLandingPage } from "./pages/landing/landing.page";
import { AuthService } from "./authentication";
import SCLoginPage from "./pages/login/Login.page";
import React, { ReactNode } from "react";
import SCLoading from "./components/loading/Loading";

const globalState = {
  loading: false,
};

export const globalStateContext = React.createContext(globalState);
const dispatchStateContext = React.createContext<any>(() => {});

const GlobalStateProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = React.useReducer(
    (state: typeof globalState, newValue: typeof globalState) => ({
      ...state,
      ...newValue,
    }),
    globalState
  );
  return (
    <globalStateContext.Provider value={state}>
      <dispatchStateContext.Provider value={dispatch}>
        {children}
      </dispatchStateContext.Provider>
    </globalStateContext.Provider>
  );
};

export const useGlobalState = () => [
  React.useContext(globalStateContext),
  React.useContext(dispatchStateContext),
];

function App() {
  const authService = AuthService.getInstance();
  // Load token from local storage
  authService.loadTokens();

  return (
    <GlobalStateProvider>
      <Router>
        <Routes>
          <Route path="/" element={<SCLandingPage />} />
          <Route path="/login" element={<SCLoginPage />} />
        </Routes>
      </Router>
      <SCLoading />
    </GlobalStateProvider>
  );
}

export default App;
