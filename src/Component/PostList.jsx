import React, { useState, useEffect, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import PostCard from "./PostCard";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const pageRef = useRef(0);
  const fetchingRef = useRef(false); // Empêche les requêtes multiples simultanées

  const fetchPosts = async () => {
    if (!hasMore || fetchingRef.current) return;

    fetchingRef.current = true;
    try {
      const response = await fetch(
       `http://localhost:8080/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Échec de la récupération des posts");
      }

      const data = await response.json();

      if (data.length === 0) {
        setHasMore(false); // Plus de posts à charger
      } else {
        setPosts((prevPosts) => {
          const uniquePosts = new Map(prevPosts.map((p) => [p.id, p]));
          data.forEach((post) => uniquePosts.set(post.id, post)); // Ajoute sans doublons
          return Array.from(uniquePosts.values());
        });

        pageRef.current += 1; // Passe à la page suivante
      }
    } catch (err) {
      console.error("Erreur lors de la récupération des posts :", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
      fetchingRef.current = false; // Terminer le fetch
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (error) {
    return <div className="alert alert-danger">Erreur : {error}</div>;
  }

  return (
    <InfiniteScroll
      dataLength={posts.length}
      next={fetchPosts}
      hasMore={hasMore}
      loader={<h4 className="text-center">Chargement...</h4>}
      endMessage={
        <p className="text-center">
          <b>Vous avez tout vu !</b>
        </p>
      }
    >
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </InfiniteScroll>
  );
};

export default PostList;
