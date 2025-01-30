import PropTypes from 'prop-types';
import useInput from '../../hooks/useInput';

const LoginInput = ({ login }) => {
  const [email, onImageChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  return (
    <form className="auth-input">
      <input
        type="text"
        value={email}
        onChange={onImageChange}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={onPasswordChange}
        placeholder="Password"
      />
      <button type="button" onClick={() => login({ email, password })}>
        Login
      </button>
    </form>
  );
};

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginInput;
