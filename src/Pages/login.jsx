import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function Login() {
  const navigate = useNavigate();
  const [username, setusername] = useState('')
  const [password, setpassword] = useState('')
  const [error, setError] = useState(null)

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
  
    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erreur de connexion");
      }
      const data = await response.json();
      console.log("Login réussi:", data);
      navigate("/");
    } catch (err) {
      console.error("Erreur lors de la connexion :", err);
      setError(err.message);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card p-4 shadow-sm" style={{ width: "400px" }}>
        <h2 className="text-center mb-4">Connexion</h2>
        <form onSubmit={handleLogin}>
        {error && <div className="alert alert-danger">{error}</div>}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Adresse Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Entrez votre email"
              onChange={(e) => setusername(e.target.value)}
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
              onChange={(e) => setpassword(e.target.value)}
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
