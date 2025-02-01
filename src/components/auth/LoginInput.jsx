import PropTypes from "prop-types";
import { useForm } from "react-hook-form";

const LoginInput = ({ login }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    login(data);
  };

  return (
    <form className="auth-input" onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        {...register("email", { required: "Email is required" })}
        placeholder="Email"
      />
      {errors.email && <p className="error-message">{errors.email.message}</p>}

      <input
        type="password"
        {...register("password", { required: "Password is required" })}
        placeholder="Password"
      />
      {errors.password && (
        <p className="error-message">{errors.password.message}</p>
      )}

      <button type="submit">Login</button>
    </form>
  );
};

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginInput;
