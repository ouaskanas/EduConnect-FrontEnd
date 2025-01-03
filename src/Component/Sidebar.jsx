import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaBell, FaPen, FaChalkboardTeacher, FaCommentDots } from "react-icons/fa";

function Sidebar({ user }) {
  return (
    <div
      className="d-flex flex-column bg-light shadow"
      style={{
        width: "300px",
        height: "calc(100vh - 100px)",
        position: "fixed",
        top: "110px",
        left: 0,
        borderRadius : 30
      }}
    >
    <nav className="nav flex-column p-3">
        <a href="/notifications" className="nav-link text-dark mb-3">
          <FaBell className="me-2" />
          Notifications
        </a>
        <a href="/posts" className="nav-link text-dark mb-3">
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
      </nav>
      <div className="mt-auto p-3 bg-secondary text-white text-center">
        <p className="mb-0">Connecté en tant que :</p>
        <strong>{user?.name || "Utilisateur"}</strong>
      </div>
    </div>
  );
}

export default Sidebar;
