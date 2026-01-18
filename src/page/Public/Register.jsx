import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiRequest } from "../../utils/api.js";
import { useNavigate, Link } from "react-router-dom";
import Logoo from "../../assets/Logoo.png";
import '../../css/Register.css';
import { registerSchema } from "./schema/registerschema.js";
import viewIcon from "../../assets/view.png";
import hideIcon from "../../assets/hide.png";

export default function Register() {
  const navigate = useNavigate();
  const [backendError, setBackendError] = useState("");
  const [loading, setLoading] = useState(false);

  // Eye states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

 const onSubmit = async (data) => {
  try {
    setBackendError("");
    setLoading(true);

    const payload = {
      fullname: data.fullname,
      username: data.username,
      email: data.email,
      password: data.password,
    };

    await apiRequest("POST", "/auth/register", { data: payload });
    navigate("/login"); // redirect after successful registration
  } catch (err) {
    setBackendError(err.message || "Registration failed");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="register-page">
      <div className="register-card">

        {/* Left Section */}
        <div className="register-left">
          <img src={Logoo} alt="Logoo" className="register-logo" />
          <h2>Eventure</h2>
          <p>Where event meets excellence.</p>
        </div>

        {/* Right Section */}
        <div className="register-right">
          <h2>Let's Get Started</h2>
          <p className="subtitle">Sign up your account</p>

          <form onSubmit={handleSubmit(onSubmit)}>

            {/* Full Name */}
            <label className="input-label">Full Name</label>
            <input {...register("fullname")} />
            <p className="error">{errors.fullname?.message}</p>

            {/* Username */}
            <label className="input-label">Username</label>
            <input {...register("username")} />
            <p className="error">{errors.username?.message}</p>

            {/* Email */}
            <label className="input-label">Email</label>
            <input {...register("email")} />
            <p className="error">{errors.email?.message}</p>

            {/* Password */}
            <label className="input-label">Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password")}
              />
              <span
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                <img src={showPassword ? viewIcon : hideIcon} alt="toggle" />
              </span>
            </div>
            <p className="error">{errors.password?.message}</p>

            {/* Confirm Password */}
            <label className="input-label">Confirm Password</label>
            <div className="password-wrapper">
              <input
                type={showConfirmPassword ? "text" : "password"}
                {...register("retype")}
              />
              <span
                className="eye-icon"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
              >
                <img
                  src={showConfirmPassword ? viewIcon : hideIcon}
                  alt="toggle"
                />
              </span>
            </div>
            <p className="error">{errors.retype?.message}</p>

            {backendError && <p className="error">{backendError}</p>}

            <button type="submit" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </button>

            <p className="login-text">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>

      </div>
    </div>
  );
}
