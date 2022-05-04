import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SCLandingPage } from "./pages/landing/landing.page";
import { AuthService } from "./authentication";
import React, { ReactNode } from "react";
import SCLoading from "./components/loading/Loading";
import SCLoginPage from "./pages/login/Login.page";
import SCRegisterPage from "./pages/register/Register";
import SCScanPage from "./pages/scan/Scan.page";
import SC404Page from "./pages/404/404.page";
import SCHouseholdPage from "./pages/household/Household.page";
import SCRecipePage from "./pages/recipe/Recipe.page";
import SCRecipesPage from "./pages/recipes/Recipes.page";
import SCSettingsPage from "./pages/settings/Settings.page";
import SCShoppingListPage from "./pages/shoppingList/ShoppingList.page";
import SCStockPage from "./pages/stock/Stock.page";

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
          <Route path="/register" element={<SCRegisterPage />} />
          <Route path="/scan" element={<SCScanPage />} />
          <Route path="/404" element={<SC404Page />} />
          <Route path="/household" element={<SCHouseholdPage />} />
          <Route path="/recipe" element={<SCRecipePage />} />
          <Route path="/recipes" element={<SCRecipesPage />} />
          <Route path="/settings" element={<SCSettingsPage />} />
          <Route path="/shopping-list" element={<SCShoppingListPage />} />
          <Route path="/stock" element={<SCStockPage />} />
        </Routes>
      </Router>
      <SCLoading />
    </GlobalStateProvider>
  );
}

export default App;
