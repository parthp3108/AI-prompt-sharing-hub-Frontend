import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";

import signup from "../../assets/signup.svg";

import api from "../../services/api";

import { loginSuccess } from "../../redux/authSlice";

import "../../App.css";

const Register = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: "",
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


    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

 
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
        "/auth/register",
        formData
      );

      dispatch(loginSuccess(data.token));

      alert("Registration Successful");

      navigate("/");
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
    <div className="register-page">

      {/* Main Content */}
      <div className="container flex-grow-1 d-flex justify-content-center align-items-center">

        <div className="row shadow-sm overflow-hidden register-card">

          {/* Left Side */}
          <div className="col-md-5 register-left">

            <img
              src={signup}
              alt="AI"
              className="register-image"
            />

            <h2 className="fw-bold mb-3">
              Join the Elite
            </h2>

            <p className="text-muted register-text">
              Access precision-engineered prompts
              and a community of high-performance
              AI creators.
            </p>
          </div>

    
          <div className="col-md-7 p-5">

            <h2 className="fw-bold mb-2">
              Create Account
            </h2>

            <p className="text-muted mb-4">
              Start your creative precision
              journey today.
            </p>

            {/* Form */}
            <form onSubmit={submitHandler}>

              {/* Name */}
              <div className="mb-3">

                <label className="form-label small fw-semibold">
                  FULL NAME
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={changeHandler}
                  className="form-control custom-input"
                  placeholder="John Doe"
                />

                {errors.name && (
                  <small className="text-danger">
                    {errors.name}
                  </small>
                )}

              </div>

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

                <label className="form-label small fw-semibold">
                  PASSWORD
                </label>

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

              {/* Terms */}
              <div className="form-check mb-4">

                <input
                  className="form-check-input"
                  type="checkbox"
                  id="terms"
                />

                <label
                  className="form-check-label small"
                  htmlFor="terms"
                >
                  I agree to the{" "}

                  <span className="terms-text">
                    Terms of Service
                  </span>

                </label>

              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn w-100 signup-btn"
                disabled={loading}
              >
                {
                  loading
                    ? "Creating Account..."
                    : "Sign Up"
                }
              </button>

            </form>

            {/* Login Link */}
            <p className="text-center mt-4 text-muted">

              Already have an account?{" "}

              <Link
                to="/login"
                className="login-link"
              >
                Login
              </Link>

            </p>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;