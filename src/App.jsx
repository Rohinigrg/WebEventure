import { Routes, Route } from "react-router-dom";
import LandingPage from "./page/Public/LandingPage";
import Login from "./page/Public/Login";
import Register from "./page/Public/Register";
import PrivateRoutes from "./Routes/PrivateRoutes";

function App() {
  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* PRIVATE ROUTES */}
      <Route path="/*" element={<PrivateRoutes />} />
    </Routes>
  );
}

export default App;
