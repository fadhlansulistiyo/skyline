import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { asyncReceiveDetailThread } from "../states/detailThread/action";
import { postedAt } from "../utils";
import { MessageCircle, ThumbsUp, ThumbsDown } from "lucide-react";

const DetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const detailThread = useSelector((state) => state.detailThread);

  useEffect(() => {
    dispatch(asyncReceiveDetailThread(id));
  }, [dispatch, id]);

  if (!detailThread) {
    return <p>Loading thread details...</p>;
  }

  const {
    title,
    body,
    category,
    createdAt,
    owner,
    upVotesBy,
    downVotesBy,
    comments,
  } = detailThread;

  return (
    <div className="detail-page">
      <h1 className="detail-title">{title}</h1>
      <span className="detail-category">{category}</span>
      <p className="detail-body">{body}</p>

      <div className="detail-header">
        <img
          src={owner.avatar}
          alt={owner.name}
          className="detail-owner-avatar"
        />
        <div>
          <p className="detail-owner-name">{owner.name}</p>
          <p className="detail-date">{postedAt(createdAt)}</p>
        </div>
      </div>

      <div className="detail-votes">
        <ThumbsUp className="vote-icon" size={20} />
        <span>{upVotesBy.length}</span>
        <ThumbsDown className="vote-icon" size={20} />
        <span>{downVotesBy.length}</span>
      </div>

      <h2 className="comments-title">
        <MessageCircle size={22} /> {comments.length} Comments
      </h2>
      <div className="comments-list">
        {comments.map((comment) => (
          <div key={comment.id} className="comment-item">
            <img
              src={comment.owner.avatar}
              alt={comment.owner.name}
              className="comment-avatar"
            />
            <div className="comment-content">
              <p className="comment-author">{comment.owner.name}</p>
              <p className="comment-text">{comment.content}</p>
              <p className="comment-date">{postedAt(comment.createdAt)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

DetailPage.propTypes = {
  detailThread: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    body: PropTypes.string,
    category: PropTypes.string,
    createdAt: PropTypes.string,
    owner: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      avatar: PropTypes.string,
    }),
    upVotesBy: PropTypes.array,
    downVotesBy: PropTypes.array,
    comments: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        content: PropTypes.string,
        createdAt: PropTypes.string,
        owner: PropTypes.shape({
          id: PropTypes.string,
          name: PropTypes.string,
          avatar: PropTypes.string,
        }),
      })
    ),
  }),
};

export default DetailPage;
