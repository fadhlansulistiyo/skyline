import PropTypes from "prop-types";
import { useForm } from "react-hook-form";

const ThreadInput = ({ addThread }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // submit thread input & test push & check pull request.
  const onSubmit = (data) => {
    addThread(data);
    reset();
  };

  return (
    <form className="thread-input" onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        className="thread-input__title"
        placeholder="Title"
        {...register("title", { required: "Title is required" })}
      />
      {errors.title && <p className="error-message">{errors.title.message}</p>}

      <textarea
        className="thread-input__body"
        placeholder="What’s on your mind?"
        {...register("body", { required: "Body is required" })}
      />
      {errors.body && <p className="error-message">{errors.body.message}</p>}

      <input
        type="text"
        className="thread-input__category"
        placeholder="Category (optional)"
        {...register("category")}
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
