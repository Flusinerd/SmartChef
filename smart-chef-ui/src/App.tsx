import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SCLandingPage } from "./pages/landing/landing.page";
import { AuthService } from "./authentication";

function App() {
  const authService = AuthService.getInstance();
  // Load token from local storage
  authService.loadTokens();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SCLandingPage />} />
        <Route path="/login" element={<h1> Login </h1>} />
      </Routes>
    </Router>
  );
}

export default App;
