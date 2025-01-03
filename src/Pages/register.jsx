import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Register() {
  const Navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
  
    if (formData.password !== formData.confirmPassword) {
      alert("Les mots de passe ne correspondent pas !");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
        }),
      });
  
      const textResponse = await response.text();
      console.log("Réponse brute :", textResponse);
  
      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status} - ${textResponse}`);
      }
  
      let data;
      try {
        data = JSON.parse(textResponse); 
      } catch {
        data = { message: textResponse };
      }
  
      setSuccess(data.message || "Inscription réussie !");
      console.log("Succès :", data);
      navigate("/login"); 
      
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      console.error("Erreur lors de l'inscription :", err);
      setError(err.message);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card p-4 shadow-sm" style={{ width: "400px" }}>
        <h2 className="text-center mb-4">Créer un compte</h2>
        <form onSubmit={handleSubmit}>
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">
              Prénom
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Prénom"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">
              Nom
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Nom"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Adresse Email
            </label>
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
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
              placeholder="Mot de Passe"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              Confirmer le Mot de Passe
            </label>
            <input
              type="password"
              className="form-control"
              placeholder="Confirmer Mot de Passe"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              S'inscrire
            </button>
          </div>
        </form>
        <div className="mt-3 text-center">
          <p>
            Déjà un compte ?{" "}
            <Link to="/login" className="text-primary">
              Connectez-vous
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
