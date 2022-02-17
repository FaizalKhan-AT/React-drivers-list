import React, { useState, useContext } from "react";
import axios from "../../config.js";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Auth } from "../../store/Contexts.js";
import { validateEmail } from "../../Validation";

function Login({ signup }) {
  const [showPassword, setShowPassword] = useState(false);
  const history = useHistory();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { setToken } = useContext(Auth);
  const [loginDetails, setLoginDetails] = useState({
    email: "eve.holt@reqres.in",
    password: "cityslicka",
  });
  const handleLogin = () => {
    setError("");
    if (!validateEmail(loginDetails.email)) {
      setError("Email not valid");
      return;
    }
    axios
      .post(`/${signup ? "signup" : "login"}`, {
        ...loginDetails,
      })
      .then((res) => {
        setToken(res.data.token);
        if (signup) setSuccess("user created successfully");
        else setSuccess("user logged in successfully");
      })
      .then(() => history.push(`${signup ? "/login" : "/"}`))
      .catch((err) => {
        setError("something went wrong!");
      });
  };
  const handleChange = (e) => {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div
        style={{ height: "100vh" }}
        className="d-flex justify-content-center align-items-center"
      >
        <div className="card px-4 row">
          <div className="card-title h2 fw-bold gotham my-3 text-center">
            {signup ? "Sign up" : "Login"}
          </div>
          {error && <span className="my-2 text-danger">{error}</span>}
          {success && <span className="my-2 text-success">{success}</span>}
          <div className="col-md-12 my-3 mt-4">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              value={loginDetails.email}
              className="form-control"
              onChange={handleChange}
            />
          </div>
          <div className="col-md-12">
            <label className="form-label">Password</label>
            <div className="position-relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={loginDetails.password}
                className="form-control"
                onChange={handleChange}
              />
              <i
                style={{ left: "92%" }}
                className={`fas ${
                  showPassword ? "fa-eye-slash" : "fa-eye"
                } position-absolute cursor top-50 translate-middle`}
                onClick={() => setShowPassword(!showPassword)}
              ></i>
            </div>
          </div>
          <div className="col-md-12 mt-5 mb-4">
            <button
              className="btn btn-outline-primary w-100 fw-bold primary-bg"
              onClick={handleLogin}
            >
              {signup ? "Register" : "Login"}
            </button>
          </div>
          <div className="text-center my-2">
            <span>
              {signup ? "Already a member" : "Create an account"}{" "}
              <Link to={`/${signup ? "login" : "signup"}`}>
                {signup ? "login" : "signup"}
              </Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
