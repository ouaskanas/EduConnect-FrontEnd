import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const CreatePostDialog = ({ isOpen, onClose, onCreate }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState(null); 

  useEffect(() => {
    const fetchUserData = async () => {
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

        const userData = await response.json();
        setUserId(userData.user_id); 
      } catch (error) {
        console.error("Erreur lors de la récupération de l'utilisateur :", error);
      }
    };

    fetchUserData();
  }, []); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content || !userId) return; 

    const newPost = {
      title,
      content,
      shared: false,
      author_id: userId 
    };

    try {
      const response = await fetch("http://localhost:8080/api/v1/post/createpost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(newPost)
      });

      if (!response.ok) throw new Error("Échec de la création du post");

      const createdPost = await response.json();
      onCreate(createdPost); 
      setTitle("");
      setContent("");
      onClose();
    } catch (error) {
      console.error("Erreur lors de la création du post :", error);
    }
  };

  return (
    <Modal show={isOpen} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Créer un Post</Modal.Title>
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
          <Button variant="primary" type="submit">Publier</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default CreatePostDialog;
