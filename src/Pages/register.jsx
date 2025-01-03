import React, { useState } from "react";
import { Link } from "react-router-dom";


function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation de base
    if (formData.password !== formData.confirmPassword) {
      alert("Les mots de passe ne correspondent pas !");
      return;
    }
    // Envoyer les données au backend
    console.log("Formulaire envoyé : ", formData);
    // Vous pouvez ajouter un appel API ici
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card p-4 shadow-sm" style={{ width: "400px" }}>
        <h2 className="text-center mb-4">Créer un compte</h2>
        <form onSubmit={handleSubmit}>
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
            Déjà un compte ? {" "}
            <Link to="/login" className="text-primary">Connectez-vous</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
