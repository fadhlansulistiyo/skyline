import { useForm } from "react-hook-form";
import PropTypes from "prop-types";

const CommentInput = ({ onAddComment }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = ({ comment }) => {
    if (comment.trim()) {
      onAddComment(comment);
      reset();
    }
  };

  return (
    <form className="comment-input" onSubmit={handleSubmit(onSubmit)}>
      <textarea
        className="comment-input__field"
        {...register("comment", { required: "Comment cannot be empty" })}
        placeholder="Write a comment..."
        rows="3"
      />
      {errors.comment && (
        <p className="error-message">{errors.comment.message}</p>
      )}
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
