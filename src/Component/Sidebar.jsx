import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaBell, FaPen, FaChalkboardTeacher, FaCommentDots, FaUsers, FaClipboardList } from "react-icons/fa";
import { AuthContext } from "../Auth/AuthProvider";
import CreatePostDialog from "./CreatePostDialog";

function Sidebar() {
  const { isAuthenticated } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await fetch("http://localhost:8080/api/v1/users/currentuser", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        if (!response.ok) throw new Error("Échec de la récupération de l'utilisateur");

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Erreur lors de la récupération de l'utilisateur :", error);
      }
    };

    if (isAuthenticated) {
      fetchUser();
    }
  }, [isAuthenticated]);

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
        top: "100px",
        left: 0,
        borderRadius: 30
      }}
    >
      <nav className="nav flex-column p-3">
<<<<<<< HEAD
        {isAuthenticated && (
          <button 
            type="button" 
            className="btn btn-primary btn-lg btn-block" 
            style={{ padding: 10, marginBottom: 20 }}
            onClick={() => setIsDialogOpen(true)}
          >
            Nouveau Post
          </button>
        )}
=======
        {/* 🔥 Bouton qui ouvre le modal */}
        <button 
          type="button" 
          className="btn btn-primary btn-lg btn-block" 
          style={{ padding: 10, marginBottom: 20 }}
          onClick={() => setIsDialogOpen(true)}
        >
          Nouveau Post
        </button>

        {/* Liens de navigation */}
>>>>>>> 7e82a4927e16251bb5702cd11cfd85dde94cc8a5
        <a href="/" className="nav-link text-dark mb-3">
          <FaBell className="me-2" />
          Notifications
        </a>
        <a href="/mesposts" className="nav-link text-dark mb-3">
          <FaPen className="me-2" />
          Mes Posts
        </a>
        <a href="/classrooms" className="nav-link text-dark mb-3">
          <FaChalkboardTeacher className="me-2" />
          Classrooms
        </a>
        <a href="/messages" className="nav-link text-dark mb-3">
          <FaCommentDots className="me-2" />
          Messages
        </a>
        {user?.role === "ADMIN" && (
          <>
            <a href="/Dashboard/users" className="nav-link text-dark mb-3">
              <FaUsers className="me-2" />
              Gestion Utilisateurs
            </a>
            <a href="/Dashboard/posts" className="nav-link text-dark mb-3">
              <FaClipboardList className="me-2" />
              Gestion Posts
            </a>
          </>
        )}
      </nav>
      <div className="mt-auto p-3 bg-secondary text-white text-center d-flex align-items-center justify-content-center">
        <div
          className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-2"
          style={{
            width: "40px",
            height: "40px",
            fontSize: "18px",
            fontWeight: "bold"
          }}
        >
          {getInitials(user?.firstname, user?.lastname)}
        </div>
        <div>
          <strong>{user ? `${user.firstname} ${user.lastname}` : "Guest"}</strong>
        </div>
      </div>
      {isAuthenticated && (
        <CreatePostDialog 
          isOpen={isDialogOpen} 
          onClose={() => setIsDialogOpen(false)} 
          onCreate={(newPost) => console.log("Post créé:", newPost)} 
        />
      )}
    </div>
  );
}

export default Sidebar;
