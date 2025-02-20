import React, { useState } from "react";

const PostCard = ({ post }) => {
  const [upvotes, setUpvotes] = useState(0);
  const [downvotes, setDownvotes] = useState(0);

  const handleUpvote = () => {
    setUpvotes(upvotes + 1);
  };

  const handleDownvote = () => {
    setDownvotes(downvotes + 1);
  };

  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body">
        <p className="card-text text-muted">
          Par <strong>{post.author.firstname} {post.author.lastname}</strong>
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
          <small className="text-muted">
            {post.comments.length} commentaires
          </small>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
