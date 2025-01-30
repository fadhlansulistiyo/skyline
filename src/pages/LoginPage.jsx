import { FaCloud } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginInput from '../components/auth/LoginInput';
import { asyncSetAuthUser } from '../states/authUser/action';

const LoginPage = () => {
  const dispatch = useDispatch();

  const onLogin = ({ email, password }) =>
    dispatch(asyncSetAuthUser({ email, password }));

  return (
    <section className="auth-page">
      <header className="auth-page__hero">
        <h1>
          <FaCloud />
        </h1>
      </header>
      <article className="auth-page__main">
        <h2>Welcome to Skyline.</h2>

        <LoginInput login={onLogin} />
        <p>
          Don&apos;t have an account? <Link to="/register">Register</Link>
        </p>
      </article>
    </section>
  );
};

export default LoginPage;
