import React, { useState, useEffect } from "react";

const SuggestionsSidebar = () => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:8080/api/v1/users/suggestions", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) throw new Error("Échec de la récupération des suggestions");

        const data = await response.json();
        setSuggestions(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des suggestions :", error);
      }
    };

    fetchSuggestions();
  }, []);

  const getInitials = (firstname, lastname) => {
    if (!firstname || !lastname) return "G";
    return `${firstname[0]}${lastname[0]}`.toUpperCase();
  };

  return (
    <div
      className="d-flex flex-column bg-light shadow"
      style={{
        width: "300px",
        height: "calc(100vh - 100px)",
        position: "fixed",
        top: "110px",
        right: 0,
        borderRadius: 30,
        padding: "15px",
      }}
    >
      <h5 className="text-center mb-3">Suggestions</h5>
      <div className="d-flex flex-column">
        {suggestions.length > 0 ? (
          suggestions.map((user) => (
            <div key={user.id} className="d-flex align-items-center mb-3">
              <div
                className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-2"
                style={{
                  width: "40px",
                  height: "40px",
                  fontSize: "18px",
                  fontWeight: "bold",
                }}
              >
                {getInitials(user.firstname, user.lastname)}
              </div>
              <strong>{user.firstname} {user.lastname}</strong>
            </div>
          ))
        ) : (
          <p className="text-center text-muted">Aucune suggestion disponible.</p>
        )}
      </div>
    </div>
  );
};

export default SuggestionsSidebar;
