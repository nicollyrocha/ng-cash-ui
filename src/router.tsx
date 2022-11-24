import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/landing-page";
import { LoginPage } from "./components/login-page/login";

const Main = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/home" element={<LandingPage />} />
    </Routes>
  );
};
export default Main;
