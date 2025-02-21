import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const CreateCommentDialog = ({ postId, isOpen, onClose, onCreate }) => {
  const [content, setContent] = useState(""); 
  const [error, setError] = useState(null); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim()) {
      setError("Le contenu du commentaire ne peut pas être vide.");
      return;
    }

    const newComment = { comment: content, post_id: postId }; 

    try {
      console.log("Envoi du commentaire au backend...", newComment);
      const response = await fetch(`http://localhost:8080/api/v1/comment/${postId}/addcomment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(newComment),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Échec de la création du commentaire");
      }

      const createdComment = await response.json();
      console.log("Commentaire créé :", createdComment);

      if (createdComment && createdComment.comment) {
        onCreate(createdComment);
        setContent("");
        onClose();
      } else {
        setError("Le commentaire créé est invalide.");
      }
    } catch (error) {
      setError(error.message || "Une erreur s'est produite lors de la création du commentaire.");
    }
  };

  return (
    <Modal show={isOpen} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Créer un Commentaire</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Control
              as="textarea"
              placeholder="Écrivez votre commentaire..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={5}
            />
          </Form.Group>
          {error && <div className="alert alert-danger">{error}</div>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Annuler
          </Button>
          <Button variant="primary" type="submit">
            Publier
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default CreateCommentDialog;
