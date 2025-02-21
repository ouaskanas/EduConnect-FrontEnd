import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PostCard from "../Component/PostCard";
import Sidebar from "../Component/Sidebar";
import SuggestionsSidebar from "../Component/SuggestionsSidebar";
import logo from "/mainlogo.png"; 

const UserPage = () => {
  const [userId, setUserId] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:8080/api/v1/users/currentuser", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) throw new Error("Erreur lors de la récupération de l'utilisateur");

        const userData = await response.json();
        setUserData(userData);
        setUserId(userData.user_id);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  useEffect(() => {
    const fetchUserPosts = async () => {
      if (!userId) return;

      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:8080/api/v1/post/getposts/${userId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) throw new Error("Erreur lors de la récupération des posts");

        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserPosts();
  }, [userId]);

  if (isLoading) return <div>Chargement des posts...</div>;
  if (error) return <div className="alert alert-danger">Erreur : {error}</div>;

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <div className="text-center mt-4">
            <img
              src={logo}
              alt="Logo"
              className="logo"
              onClick={() => navigate("/")}
              style={{ cursor: "pointer", width: "120px", marginBottom: "60px" }}
            />
          </div>
          <Sidebar />
        </div>

        <div className="col-md-6">
          <h2 className="text-center mt-4">Mes Posts</h2>
          <div className="row">
            {posts.length > 0 ? (
              posts.map((post) => <PostCard key={post.id} post={post} />)
            ) : (
              <p className="text-center">Aucun post trouvé.</p>
            )}
          </div>
        </div>

        <div className="col-md-3">
          <SuggestionsSidebar />
        </div>
      </div>
    </div>
  );
};

export default UserPage;
