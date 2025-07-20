import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [registerError, setRegisterError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }

    // Calculate password strength
    if (name === "password") {
      calculatePasswordStrength(value);
    }
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;

    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;

    setPasswordStrength(strength);
  };

  const getStrengthText = () => {
    if (passwordStrength === 0) return "";
    if (passwordStrength === 1) return "Weak";
    if (passwordStrength === 2) return "Fair";
    if (passwordStrength === 3) return "Good";
    if (passwordStrength === 4) return "Strong";
  };

  const getStrengthClass = () => {
    if (passwordStrength === 0) return "";
    if (passwordStrength === 1) return "weak";
    if (passwordStrength === 2) return "fair";
    if (passwordStrength === 3) return "good";
    if (passwordStrength === 4) return "strong";
  };

  const validateForm = () => {
    const newErrors = {};

    // First name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    // Last name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Terms agreement validation
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setRegisterError("");

    if (validateForm()) {
      setIsLoading(true);

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // For demo purposes - in a real app, this would be an API call
        console.log("Registration data:", formData);

        // Create user object to store in localStorage
        const userInfo = {
          id: "user-" + Date.now(),
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          profileImage: "https://randomuser.me/api/portraits/men/32.jpg", // Default image
        };

        // Store user info in localStorage
        localStorage.setItem("userInfo", JSON.stringify(userInfo));

        // Navigate to dashboard after successful registration
        navigate("/dashboard");
      } catch (error) {
        setRegisterError("Registration failed. Please try again later.");
        console.error("Registration error:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <h1>Create Account</h1>
          <p>Join our fitness community and start your journey</p>
        </div>

        {registerError && (
          <div className="error-message">
            <i className="fas fa-exclamation-circle"></i>
            {registerError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <div className="input-with-icon">
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={errors.firstName ? "error" : ""}
                />
              </div>
              {errors.firstName && (
                <div className="error-text">{errors.firstName}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <div className="input-with-icon">
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={errors.lastName ? "error" : ""}
                />
              </div>
              {errors.lastName && (
                <div className="error-text">{errors.lastName}</div>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-with-icon">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "error" : ""}
              />
            </div>
            {errors.email && <div className="error-text">{errors.email}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-with-icon password-field">
              <i className="fas fa-lock"></i>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? "error" : ""}
              />

              {/* <button
                type="button"
                className="toggle-password"
                onClick={togglePasswordVisibility}
                tabIndex="-1"
              >
                <i
                  className={showPassword ? "far fa-eye-slash" : "far fa-eye"}
                ></i>
              </button> */}
            </div>
            {errors.password && (
              <div className="error-text">{errors.password}</div>
            )}

            {formData.password && (
              <div className="password-strength">
                <div className="strength-meter">
                  <div
                    className={`strength-bar ${getStrengthClass()}`}
                    style={{ width: `${passwordStrength * 25}%` }}
                  ></div>
                </div>
                <span className={`strength-text ${getStrengthClass()}`}>
                  {getStrengthText()}
                </span>
              </div>
            )}

            {formData.password && (
              <div className="password-requirements">
                <p>Password must contain:</p>
                <ul>
                  <li className={formData.password.length >= 8 ? "met" : ""}>
                    <i
                      className={
                        formData.password.length >= 8
                          ? "fas fa-check"
                          : "fas fa-times"
                      }
                    ></i>
                    At least 8 characters
                  </li>
                  <li className={/[A-Z]/.test(formData.password) ? "met" : ""}>
                    <i
                      className={
                        /[A-Z]/.test(formData.password)
                          ? "fas fa-check"
                          : "fas fa-times"
                      }
                    ></i>
                    One uppercase letter
                  </li>
                  <li className={/[0-9]/.test(formData.password) ? "met" : ""}>
                    <i
                      className={
                        /[0-9]/.test(formData.password)
                          ? "fas fa-check"
                          : "fas fa-times"
                      }
                    ></i>
                    One number
                  </li>
                  <li
                    className={
                      /[^A-Za-z0-9]/.test(formData.password) ? "met" : ""
                    }
                  >
                    <i
                      className={
                        /[^A-Za-z0-9]/.test(formData.password)
                          ? "fas fa-check"
                          : "fas fa-times"
                      }
                    ></i>
                    One special character
                  </li>
                </ul>
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="input-with-icon">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? "error" : ""}
              />
            </div>
            {errors.confirmPassword && (
              <div className="error-text">{errors.confirmPassword}</div>
            )}
          </div>

          <div className="form-group terms-checkbox">
            <div className="checkbox-container">
              <input
                type="checkbox"
                id="agreeToTerms"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
              />
              <label htmlFor="agreeToTerms">
                I agree to the <a href="/terms">Terms of Service</a> and{" "}
                <a href="/privacy">Privacy Policy</a>
              </label>
            </div>
            {errors.agreeToTerms && (
              <div className="error-text">{errors.agreeToTerms}</div>
            )}
          </div>

          <button
            type="submit"
            className="register-button"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading-spinner"></span>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <div className="social-register">
          <p>Or sign up with</p>
          <div className="social-buttons">
            <button className="social-button google">
              <i className="fab fa-google"></i>
              Google
            </button>
            <button className="social-button facebook">
              <i className="fab fa-facebook-f"></i>
              Facebook
            </button>
          </div>
        </div>

        <div className="login-link">
          <p>
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </div>
      </div>

      <div className="register-image">
        <div className="image-overlay">
          <div className="overlay-content">
            <h2>Start Your Fitness Journey Today</h2>
            <p>
              Track workouts, set goals, and achieve results with our
              comprehensive fitness platform.
            </p>

            <div className="feature-list">
              <div className="feature-item">
                <i className="fas fa-dumbbell"></i>
                <span>Personalized workout plans</span>
              </div>
              <div className="feature-item">
                <i className="fas fa-chart-line"></i>
                <span>Progress tracking</span>
              </div>
              <div className="feature-item">
                <i className="fas fa-users"></i>
                <span>Community support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
