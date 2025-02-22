import React, { useState, useEffect } from "react";
import { FaComment, FaEdit } from "react-icons/fa";
import CreateCommentDialog from "./CreateCommentDialog";
import EditPostDialog from "./EditPostDialog";

const PostCard = ({ post, onUpdate }) => {
  const [upvotes, setUpvotes] = useState(0);
  const [downvotes, setDownvotes] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [isCommentDialogOpen, setIsCommentDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    if (post && post.comments) {
      setComments(post.comments);
    }

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser && parsedUser.role) {
          setUserRole(parsedUser.role);
        } else {
          console.warn("Aucun rôle trouvé dans localStorage !");
        }
      } catch (error) {
        console.error("Erreur lors du parsing de l'utilisateur :", error);
      }
    }
  }, [post]);

  const handleUpvote = () => setUpvotes(upvotes + 1);
  const handleDownvote = () => setDownvotes(downvotes + 1);
  const toggleComments = () => setShowComments(!showComments);
  const openCommentDialog = () => setIsCommentDialogOpen(true);
  const closeCommentDialog = () => setIsCommentDialogOpen(false);
  const openEditDialog = () => setIsEditDialogOpen(true);
  const closeEditDialog = () => setIsEditDialogOpen(false);

  const handleNewComment = (newComment) => {
    setComments((prevComments) => [...prevComments, newComment]);
  };

  const handlePostUpdate = (updatedPost) => {
    console.log("Post mis à jour :", updatedPost);
    if (onUpdate) {
      onUpdate(updatedPost);
    }
    closeEditDialog();
  };

  const authorFirstName = post.author ? post.author.firstname : "Inconnu";
  const authorLastName = post.author ? post.author.lastname : "";

  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body">
        <p className="card-text text-muted">
          Par <strong>{authorFirstName} {authorLastName}</strong>
        </p>
        <h5 className="card-title">{post.title}</h5>
        <p className="card-text">{post.content}</p>
        <div className="d-flex justify-content-between align-items-center">
          <button className="btn btn-outline-primary btn-sm" onClick={handleUpvote}>
            👍 Upvote {upvotes}
          </button>
          <button className="btn btn-outline-danger btn-sm" onClick={handleDownvote}>
            👎 Downvote {downvotes}
          </button>
          <button className="btn btn-outline-info btn-sm" onClick={toggleComments}>
            <FaComment /> {comments.length} commentaires
          </button>
          {userRole && userRole.trim().toUpperCase() === "TEACHER" || "ADMIN" ? (
            <button className="btn btn-outline-secondary btn-sm" onClick={openEditDialog}>
              <FaEdit /> Modifier
            </button>
          ) : (
            <p className="text-muted">Vous ne pouvez pas modifier ce post</p>
          )}
        </div>
        
        {showComments && (
          <div className="mt-3">
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <div key={index} className="card mb-2">
                  <div className="card-body">
                    <p><strong>{comment.author.firstname} {comment.author.lastname}</strong></p>
                    <p>{comment.comment}</p>
                    <small className="text-muted">{new Date(comment.comment_date).toLocaleString()}</small>
                  </div>
                </div>
              ))
            ) : (
              <p>Aucun commentaire pour ce post.</p>
            )}
            <button className="btn btn-primary mt-2" onClick={openCommentDialog}>
              Ajouter un commentaire
            </button>
          </div>
        )}
        
        <CreateCommentDialog
          isOpen={isCommentDialogOpen}
          onClose={closeCommentDialog}
          postId={post.post_id}
          onCreate={handleNewComment}
        />
        <EditPostDialog
          isOpen={isEditDialogOpen}
          onClose={closeEditDialog}
          post={post}
          onUpdate={handlePostUpdate}
        />
      </div>
    </div>
  );
};

export default PostCard;
