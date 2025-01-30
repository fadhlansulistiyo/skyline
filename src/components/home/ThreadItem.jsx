import React from "react";
import { useNavigate } from "react-router-dom";

const ThreadItem = ({ id, title, body, category, user }) => {
  const navigate = useNavigate();

  const onThreadClick = () => {
    navigate(`/threads/${id}`);
  };

  const onThreadPress = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      navigate(`/threads/${id}`);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      className="thread-item"
      onClick={onThreadClick}
      onKeyDown={onThreadPress}
    >
      <div className="thread-item__header">
        <img
          src={user.avatar}
          alt={user.name}
          className="thread-item__avatar"
        />
        <span className="thread-item__name">{user.name}</span>
      </div>
      {category && <span className="thread-item__category">{category}</span>}
      <h3 className="thread-item__title">{title}</h3>
      <p className="thread-item__body">{body}</p>
    </div>
  );
};

export default ThreadItem;
