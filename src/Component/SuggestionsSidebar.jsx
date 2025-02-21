import React, { useState, useEffect } from "react";
import UserProfileDialog from "./UserProfileDialog";

const SuggestionsSidebar = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setIsDialogOpen(true);
  };

  return (
    <div className="col-md-19 vh-100 bg-light p-3 border-start">
      <div className="card h-100 shadow-sm">
        <div className="card-body">
          <h4 className="card-title">Suggestions</h4>
          {suggestions.length > 0 ? (
            <ul className="list-group list-group-flush">
              {suggestions.map((user) => (
                <li
                  key={user.user_id}
                  className="list-group-item d-flex align-items-center"
                  onClick={() => handleUserClick(user)}
                  style={{ cursor: "pointer" }}
                >
                  <div
                    className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-2"
                    style={{ width: "40px", height: "40px", fontSize: "18px", fontWeight: "bold" }}
                  >
                    {user.firstname?.[0]}{user.lastname?.[0]}
                  </div>
                  <span>{user.firstname} {user.lastname}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted">Aucune suggestion disponible.</p>
          )}
        </div>
      </div>

      {/* Affichage du profil de l'utilisateur sélectionné */}
      <UserProfileDialog user={selectedUser} isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
    </div>
  );
};

export default SuggestionsSidebar;
