import React from "react";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card p-4 shadow-sm" style={{ width: "400px" }}>
        <h2 className="text-center mb-4">Connexion</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Adresse Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Entrez votre email"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Mot de Passe
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Entrez votre mot de passe"
              required
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Se connecter
            </button>
          </div>
        </form>

        <div className="mt-3 text-center">
          <p>
            Pas encore de compte ?{" "}
            <Link to="/register" className="text-primary">Inscrivez-vous</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
