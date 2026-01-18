import { Routes, Route } from "react-router-dom";
import LandingPage from "../page/Public/LandingPage";
import Login from "../page/Public/Login";
import Register from "../page/Public/Register";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default PublicRoutes;
