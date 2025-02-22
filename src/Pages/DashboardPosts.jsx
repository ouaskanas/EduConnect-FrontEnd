import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Component/Header";
import Sidebar from "../Component/Sidebar";

const DashboardPosts = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/post/allposts")
      .then((response) => response.json())
      .then((data) => {
        console.log("Données reçues:", data);
        setPosts(data);
      })
      .catch((error) => console.error("Erreur lors de la récupération des posts:", error));
  }, []);

  const handleDelete = (postId) => {
    fetch(`http://localhost:8080/api/v1/post/delete/${postId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setPosts(posts.filter((post) => post.post_id !== postId));
        } else {
          console.error("Erreur lors de la suppression du post");
        }
      })
      .catch((error) => console.error("Erreur serveur:", error));
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <Header />
        </div>
      </div>
      <div className="row">
        <div className="col-2 bg-light p-3">
          <Sidebar />
        </div>
        <div className="col-10 p-4" style={{paddingTop: 100, marginLeft : 300 , marginRight :500}}>
          <h2>Gestion des Posts</h2>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Titre</th>
                <th>Contenu</th>
                <th>Auteur</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.post_id}>
                  <td>{post.post_id}</td>
                  <td>{post.title}</td>
                  <td>{post.content}</td>
                  <td>{post.author ? `${post.author.firstname} ${post.author.lastname}` : "Inconnu"}</td>
                  <td>
                    <button className="btn btn-danger" onClick={() => handleDelete(post.post_id)}>
                      Supprimer
                    </button>
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

export default DashboardPosts;