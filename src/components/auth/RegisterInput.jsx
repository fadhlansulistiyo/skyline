import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

const RegisterInput = ({ register: registerUser }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    registerUser(data);
  };

  return (
    <form className="auth-input" onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        {...register('name', { required: 'Name is required' })}
        placeholder="Name"
      />
      {errors.name && <p className="error-message">{errors.name.message}</p>}

      <input
        type="text"
        {...register('email', { required: 'Email is required' })}
        placeholder="Email"
      />
      {errors.email && <p className="error-message">{errors.email.message}</p>}

      <input
        type="password"
        {...register('password', { required: 'Password is required' })}
        placeholder="Password"
      />
      {errors.password && (
        <p className="error-message">{errors.password.message}</p>
      )}

      <button type="submit">Register</button>
    </form>
  );
};

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterInput;
