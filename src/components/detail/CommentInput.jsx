import React, { useState } from "react";
import PropTypes from "prop-types";

const CommentInput = ({ onAddComment }) => {
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      onAddComment(comment);
      setComment("");
    }
  };

  return (
    <form className="comment-input" onSubmit={handleSubmit}>
      <textarea
        className="comment-input__field"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write a comment..."
        rows="3"
      />
      <button type="submit" className="comment-input__button">
        Post Comment
      </button>
    </form>
  );
};

CommentInput.propTypes = {
  onAddComment: PropTypes.func.isRequired,
};

export default CommentInput;
