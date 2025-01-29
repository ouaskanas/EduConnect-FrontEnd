import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaHeart, FaComment, FaRetweet, FaEye } from "react-icons/fa";

function PostCard() {
  return (
    <div className="card shadow-sm p-3 mb-3 bg-white rounded">
      <div className="card-body">
        <div className="d-flex align-items-center mb-2">
          <div
            className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-2"
            style={{ width: "40px", height: "40px", fontSize: "18px", fontWeight: "bold" }}
          >
          </div>
          <div>
            <h6 className="mb-0">Nom Prénom</h6>
            <small className="text-muted">@username · il y a X min</small>
          </div>
        </div>

        <p className="card-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit...
        </p>
        <div className="d-flex justify-content-between text-muted">
          <span className="d-flex align-items-center">
            <FaComment className="me-1" /> 0
          </span>
          <span className="d-flex align-items-center">
            <FaRetweet className="me-1" /> 0
          </span>
          <span className="d-flex align-items-center">
            <FaHeart className="me-1" /> 0
          </span>
          <span className="d-flex align-items-center">
            <FaEye className="me-1" /> 0
          </span>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
