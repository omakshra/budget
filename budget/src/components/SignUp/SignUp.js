import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faArrowRight,
  faEye,
  faEyeSlash,
  faUser,
  faBuilding,
  faPhone,
  faHotel,
} from "@fortawesome/free-solid-svg-icons";
import "./SignUp.css";
function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});

  const validateForm = () => {
    let formIsValid = true;
    let errors = {};

    if (!name) errors.name = "Name is required";
    if (!company) errors.company = "Company name is required";
    if (!phone) errors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(phone)) errors.phone = "Invalid phone number";

    if (!email) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = "Email is invalid";

    if (!password) errors.password = "Password is required";
    else if (password.length < 6)
      errors.password = "Password must be at least 6 characters";

    if (!repassword) errors.repassword = "Re-enter password";
    else if (password !== repassword)
      errors.repassword = "Passwords do not match";

    setError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (validateForm()) {
      console.log("Form is valid");
      setTimeout(() => {
        setLoading(false);
        navigate("/");
      }, 2000);
    } else {
      console.log("Form has errors");
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="signup">
      <div className="signup-container">
        <div>
          <p>
            <div className="large-text">Sign Up</div>
            <span className="small-text">Profit Plate</span>
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group row">
            <div className="col-md-6 input-icon-container">
              <FontAwesomeIcon icon={faUser} className="input-icon1" />
              <input
                type="text"
                className={`form-control ${error.name ? "is-invalid" : ""}`}
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              {error.name && (
                <div className="invalid-feedback">{error.name}</div>
              )}
            </div>

            <div className="col-md-6 input-icon-container">
              <FontAwesomeIcon icon={faHotel} className="input-icon2" />
              <input
                type="text"
                className={`form-control ${error.company ? "is-invalid" : ""}`}
                placeholder="Company Name"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                required
              />
              {error.company && (
                <div className="invalid-feedback">{error.company}</div>
              )}
            </div>
          </div>

          <div className="form-group input-icon-container">
            <FontAwesomeIcon icon={faPhone} className="input-icon" />
            <input
              type="tel"
              className={`form-control ${error.phone ? "is-invalid" : ""}`}
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            {error.phone && (
              <div className="invalid-feedback">{error.phone}</div>
            )}
          </div>

          <div className="form-group input-icon-container">
            <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
            <input
              type="email"
              className={`form-control ${error.email ? "is-invalid" : ""}`}
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {error.email && (
              <div className="invalid-feedback">{error.email}</div>
            )}
          </div>

          <div className="form-group input-icon-container">
            <FontAwesomeIcon icon={faLock} className="input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              className={`form-control ${error.password ? "is-invalid" : ""}`}
              placeholder="Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              className="toggle-password"
              onClick={togglePasswordVisibility}
            />
            {error.password && (
              <div className="invalid-feedback">{error.password}</div>
            )}
          </div>

          <div className="form-group">
            <button type="submit" className="btn-login" disabled={loading}>
              Sign Up <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
          {loading && <div>Loading...</div>}
        </form>

        <div className="text-center">
          <p>
            Already have an account?{" "}
            <Link to="/" className="dark-link">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
