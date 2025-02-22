import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const EditPostDialog = ({ isOpen, onClose, post, onUpdate }) => {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
    }
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) return;

    try {
      const response = await fetch(`http://localhost:8080/api/v1/post/alterpost/${post.post_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ title, content })
      });

      if (!response.ok) throw new Error("Échec de la modification du post");

      const updatedPost = await response.json();

      if (onUpdate) {
        onUpdate(updatedPost); // ✅ Met à jour le post après la modification
      }

      onClose(); // ✅ Ferme le modal après la mise à jour
    } catch (error) {
      console.error("Erreur lors de la modification du post :", error);
    }
  };

  return (
    <Modal show={isOpen} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Modifier le Post</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Titre"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              as="textarea"
              placeholder="Écrivez votre contenu..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={5}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>Annuler</Button>
          <Button variant="primary" type="submit">Enregistrer</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default EditPostDialog;
