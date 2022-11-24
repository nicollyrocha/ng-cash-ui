import "./App.css";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./components/landing-page";
import { LoginPage } from "./components/login-page/login";

function App() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />} />

          <>
            <Route path="/home" element={<LandingPage />} />
          </>
        </Routes>
      </div>
    </>
  );
}

export default App;
