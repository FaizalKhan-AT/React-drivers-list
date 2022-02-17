import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Auth } from "../../store/Contexts";

function Navbar() {
  const { token, setToken } = useContext(Auth);
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Driver's List
        </Link>
        <ul className="navbar-nav ms-auto d-flex flex-row">
          <li className="nav-item mx-2">
            {token ? (
              <button
                className="btn btn-dark"
                onClick={() => {
                  setToken(localStorage.removeItem("token"));
                }}
              >
                Logout
              </button>
            ) : (
              <Link className="btn btn-dark" to="/login">
                Login
              </Link>
            )}
          </li>
          <li className="nav-item">
            <Link className="btn btn-success" to="/add">
              Add
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
