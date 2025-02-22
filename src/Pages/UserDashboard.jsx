import React, { useEffect, useState } from "react";
import Header from "../Component/Header";
import Sidebar from "../Component/Sidebar";

const UsersDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8080/api/v1/users/suggestions", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Erreur lors du chargement des utilisateurs");

      const data = await response.json();
      setUsers(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const deleteUser = async (userId) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:8080/api/v1/users/delete/${userId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Erreur lors de la suppression");

      setUsers(users.filter(user => user.user_id !== userId));
      alert("Utilisateur supprimé avec succès");
    } catch (err) {
      alert("Impossible de supprimer cet utilisateur");
    }
  };

  const grantTeacherRole = async (userId) => {
    if (!window.confirm("Confirmez-vous l'upgrade en TEACHER ?")) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:8080/api/v1/users/grantrole/${userId}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Erreur lors de la mise à jour du rôle");

      setUsers(users.map(user => 
        user.user_id === userId ? { ...user, role: "TEACHER" } : user
      ));
      alert("Utilisateur promu en TEACHER");
    } catch (err) {
      alert("Impossible de promouvoir cet utilisateur");
    }
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p className="text-danger">Erreur : {error}</p>;

  return (
    <div className="dashboard-container">
      <Header />
      <div className="dashboard-content">
        <Sidebar />
        <div className="container mt-4" style={{paddingTop: 100, marginLeft : 300 , marginRight :500}}>
          <h2 className="mb-4">Gestion des Utilisateurs</h2>
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Prénom</th>
                <th>Nom</th>
                <th>Email</th>
                <th>Rôle</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.user_id}>
                  <td>{user.user_id}</td>
                  <td>{user.firstname}</td>
                  <td>{user.lastname}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className={`badge ${user.role === "TEACHER" ? "bg-success" : "bg-secondary"}`}>
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-danger btn-sm me-2" onClick={() => deleteUser(user.user_id)}>
                      Supprimer
                    </button>
                    {user.role !== "TEACHER" && (
                      <button className="btn btn-primary btn-sm" onClick={() => grantTeacherRole(user.user_id)}>
                        Promouvoir
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UsersDashboard;
