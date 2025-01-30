import { hideLoading, showLoading } from 'react-redux-loading-bar';
import NetworkSource from '../../utils/network-source';

const ActionType = {
  SET_AUTH_USER: 'SET_AUTH_USER',
  UNSET_AUTH_USER: 'UNSET_AUTH_USER',
};

function setAuthUserActionCreator(authUser) {
  return {
    type: ActionType.SET_AUTH_USER,
    payload: {
      authUser,
    },
  };
}

function unsetAuthUserActionCreator() {
  return {
    type: ActionType.UNSET_AUTH_USER,
    payload: {
      authUser: null,
    },
  };
}

function asyncSetAuthUser({ email, password }) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const token = await NetworkSource.login({ email, password });
      NetworkSource.putAccessToken(token);

      const authUser = await NetworkSource.getOwnProfile();

      dispatch(setAuthUserActionCreator(authUser));
    } catch (error) {
      showError(error);
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncUnsetAuthUser() {
  return (dispatch) => {
    dispatch(showLoading());

    try {
      NetworkSource.putAccessToken('');
      dispatch(unsetAuthUserActionCreator());
    } catch (error) {
      showError(error);
    } finally {
      dispatch(hideLoading());
    }
  };
}

function showError(error) {
  alert(error.message || 'Something went wrong. Please try again.');
}

export {
  ActionType,
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
  asyncSetAuthUser,
  asyncUnsetAuthUser,
};
