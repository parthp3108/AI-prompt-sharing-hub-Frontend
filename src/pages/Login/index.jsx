import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { CiLock } from "react-icons/ci";

import api from "../../services/api";

import { loginSuccess } from "../../redux/authSlice";

import "../../App.css";

const Login = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  
  const validateForm = () => {
    let newErrors = {};

  
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/\S+@\S+\.\S+/.test(formData.email)
    ) {
      newErrors.email = "Invalid email address";
    }


    if (!formData.password.trim()) {
      newErrors.password =
        "Password is required";
    } else if (
      formData.password.length < 6
    ) {
      newErrors.password =
        "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

const submitHandler = async (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  try {
    setLoading(true);

    const { data } = await api.post(
      "/auth/login",
      formData
    );

  
    localStorage.setItem(
      "token",
      data.token
    );


    localStorage.setItem(
      "user",
      JSON.stringify(data.user)
    );

    
    dispatch(
      loginSuccess({
        token: data.token,
        user: data.user,
      })
    );

    alert("Login Successful");

    navigate("/home");

  } catch (error) {

    console.log(error);

    alert(
      error.response?.data?.message ||
      "Something went wrong"
    );

  } finally {

    setLoading(false);

  }
};
  return (
    <div className="login-page">

   
      <div className="container flex-grow-1 d-flex justify-content-center align-items-center">

        <div className="row shadow-sm overflow-hidden login-card">

          <div className="col-md-5 login-left">

            <div className="login-icon-wrapper">

              <CiLock
                size={84}
                style={{ color: "#7C3AED" }}
              />

            </div>

            <h5 className="login-brand">
              PromptHub
            </h5>

            <p className="text-muted login-text">
              Enter the vault of precision-engineered
              AI intelligence.
            </p>

          </div>

          {/* Right Side */}
          <div className="col-md-7 p-5 d-flex flex-column justify-content-center">

            <h2 className="fw-bold mb-2">
              Welcome Back
            </h2>

            <p className="text-muted mb-4">
              Sign in to your account to continue.
            </p>

            {/* Form */}
            <form onSubmit={submitHandler}>

              {/* Email */}
              <div className="mb-3">

                <label className="form-label small fw-semibold">
                  EMAIL ADDRESS
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={changeHandler}
                  className="form-control custom-input"
                  placeholder="name@company.com"
                />

                {errors.email && (
                  <small className="text-danger">
                    {errors.email}
                  </small>
                )}

              </div>

              {/* Password */}
              <div className="mb-3">

                <div className="d-flex justify-content-between align-items-center mb-1">

                  <label className="form-label small fw-semibold m-0">
                    PASSWORD
                  </label>

                  <span className="forgot-password">
                    Forgot password?
                  </span>

                </div>

                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={changeHandler}
                  className="form-control custom-input"
                  placeholder="••••••••"
                />

                {errors.password && (
                  <small className="text-danger">
                    {errors.password}
                  </small>
                )}

              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="btn w-100 login-btn mt-4"
                disabled={loading}
              >
                {
                  loading
                    ? "Logging In..."
                    : "Login"
                }
              </button>

            </form>

            {/* Register Link */}
            <p className="text-center mt-5 text-muted">

              Don&apos;t have an account?{" "}

              <Link
                to="/register"
                className="signup-link"
              >
                Sign Up
              </Link>

            </p>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;