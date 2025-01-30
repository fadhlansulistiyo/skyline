import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';

const Navigation = ({ authUser, signOut }) => {
  const { id, avatar, name } = authUser;

  return (
    <header className="navigation">
      <div className="navigation__profile">
        <img
          className="navigation__photo"
          src={avatar || '/user.png'}
          alt={id}
          title={name}
        />
        <span className="navigation__name">{name}</span>
      </div>
      <nav className="navigation__menu">
        <Link to="/" className="navigation__link">
          Home
        </Link>
      </nav>
      <button type="button" className="navigation__logout" onClick={signOut}>
        <FaSignOutAlt style={{ marginRight: '8px' }} /> Sign out
      </button>
    </header>
  );
};

Navigation.propTypes = {
  authUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    name: PropTypes.string.isRequired,
  }).isRequired,
  signOut: PropTypes.func.isRequired,
};

export default Navigation;
