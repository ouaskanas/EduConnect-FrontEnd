import React from "react";
import { Modal, Button } from "react-bootstrap";

const UserProfileDialog = ({ user, isOpen, onClose }) => {
  if (!user) return null; // Empêche les erreurs si user est null ou undefined

  return (
    <Modal show={isOpen} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Profil de {user.firstname} {user.lastname}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="text-center">
          <div
            className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center"
            style={{ width: "80px", height: "80px", fontSize: "30px", fontWeight: "bold", margin: "auto" }}
          >
            {user.firstname?.[0]}{user.lastname?.[0]}
          </div>
          <h4 className="mt-3">{user.firstname} {user.lastname}</h4>
          <p className="text-muted">{user.email}</p>
          <p><strong>Classe :</strong> {user.classroom || "Non spécifié"}</p>
          <p><strong>Rôle :</strong> {user.role}</p>
          <p><strong>Nombre de posts :</strong> {user.post?.length || 0}</p>
          <p><strong>Nombre d'amis :</strong> {user.friendships?.length || 0}</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Fermer</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserProfileDialog;
