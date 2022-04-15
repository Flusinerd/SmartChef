import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SCLandingPage } from "./pages/landing/landing.page";

function App() {
  // Login the user

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
