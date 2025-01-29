import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../Auth/AuthProvider";

function Header() {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img src="./mainlogo.png" alt="Logo" width="90" height="70" className="d-inline-block align-text-top" />
        </a>
        <form className="d-flex mx-auto" style={{ width: "70%" }}>
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search posts, topics, or users..."
            aria-label="Search"
          />
          <button className="btn btn-outline-secondary d-flex align-items-center" type="submit">
            <FaSearch />
          </button>
        </form>
        <div>
          {isAuthenticated ? (
            <button className="btn btn-outline-danger" onClick={logout}>
              Déconnexion
            </button>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline-primary me-2">
                Connexion
              </Link>
              <Link to="/register" className="btn btn-outline-secondary">
                Inscription
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
