import React, { useState, useEffect } from "react";
import { FaComment } from "react-icons/fa";
import CreateCommentDialog from "./CreateCommentDialog";

const PostCard = ({ post }) => {
  const [upvotes, setUpvotes] = useState(0);
  const [downvotes, setDownvotes] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [isCommentDialogOpen, setIsCommentDialogOpen] = useState(false);

  useEffect(() => {
    if (post && post.comments) {
      setComments(post.comments);
    }
  }, [post]);

  const handleUpvote = () => {
    setUpvotes(upvotes + 1);
  };

  const handleDownvote = () => {
    setDownvotes(downvotes + 1);
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const openCommentDialog = () => {
    setIsCommentDialogOpen(true);
  };

  const closeCommentDialog = () => {
    setIsCommentDialogOpen(false);
  };

  const handleNewComment = (newComment) => {
    setComments((prevComments) => [...prevComments, newComment]);
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
      </div>
    </div>
  );
};

export default PostCard;
