import React, { useState, useEffect } from "react";
import PostCard from "./PostCard";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/post/allposts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Échec de la récupération des posts");
      }

      const data = await response.json();

      // Trie les posts par date de création (en supposant que chaque post ait une propriété `createdAt` ou une date similaire)
      data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)); 

      setPosts(data); // Stocke les posts triés
    } catch (err) {
      console.error("Erreur lors de la récupération des posts :", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(); // Récupère les posts lorsque le composant est monté
  }, []);

  if (isLoading) {
    return <div className="text-center">Chargement des posts...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">Erreur : {error}</div>;
  }

  return (
    <div>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
