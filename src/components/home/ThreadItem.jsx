import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { postedAt } from "../../utils";
import { MessageCircle } from "lucide-react";

const ThreadItem = ({
  id,
  title,
  body,
  category,
  user,
  createdAt,
  totalComments,
}) => {
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
          src={user.avatar || "default-avatar.png"}
          alt={user.name}
          className="thread-item__avatar"
        />
        <div className="thread-item__info">
          <span className="thread-item__name">{user.name}</span>
          <span className="thread-item__date">{postedAt(createdAt)}</span>
        </div>
      </div>

      {category && <span className="thread-item__category">{category}</span>}

      <h3 className="thread-item__title">{title}</h3>
      <p className="thread-item__body">{body}</p>

      <div className="thread-item__footer">
        <MessageCircle className="thread-item__icon" size={16} />
        <span className="thread-item__comments">{totalComments} Comments</span>
      </div>
    </div>
  );
};

ThreadItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
  createdAt: PropTypes.string.isRequired,
  totalComments: PropTypes.number.isRequired,
};

export default ThreadItem;
