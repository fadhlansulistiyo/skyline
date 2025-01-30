import React, { useState } from "react";
import PropTypes from "prop-types";

const ThreadInput = ({ addThread }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;
    addThread({ title, body, category });
    setTitle("");
    setBody("");
    setCategory("");
  };

  return (
    <form className="thread-input" onSubmit={handleSubmit}>
      <input
        type="text"
        className="thread-input__title"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="thread-input__body"
        placeholder="What’s on your mind?"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <input
        type="text"
        className="thread-input__category"
        placeholder="Category (optional)"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <button type="submit" className="thread-input__submit">
        Post
      </button>
    </form>
  );
};

ThreadInput.propTypes = {
  addThread: PropTypes.func.isRequired,
};

export default ThreadInput;
