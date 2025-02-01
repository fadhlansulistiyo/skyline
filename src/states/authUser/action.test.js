/**
 * Test scenario for authUser actions
 *
 * - asyncSetAuthUser thunk
 *   - should dispatch the correct actions when login succeeds
 *   - should dispatch the correct actions and show an alert when login fails
 *
 * - asyncUnsetAuthUser thunk
 *   - should dispatch the correct actions when logout is performed
 */

import { describe, beforeEach, afterEach, it, vi, expect } from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import NetworkSource from '../../utils/network-source';
import {
  asyncSetAuthUser,
  asyncUnsetAuthUser,
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
} from './action';

const fakeAuthUser = {
  id: 'Fadhlan',
  name: 'Fadhlan Sulistiyo',
  avatar:
    'https://ui-avatars.com/api/?name=Fadhlan+Sulistiyo&background=random',
};

const fakeToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRpbWFzMiIsIm5hbWUiOiJEaW1hcyBTYXB1dHJhIiwiaXNzIjoiYXBwIiwiaWF0IjoxNjYzODQwNzY0fQ._HrzpinFYX_m9WfvM-lGCdVrnhnaGHhzt1e6eATE1Iw';

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('asyncSetAuthUser thunk', () => {
  beforeEach(() => {
    NetworkSource._login = NetworkSource.login;
    NetworkSource._getOwnProfile = NetworkSource.getOwnProfile;
  });

  afterEach(() => {
    NetworkSource.login = NetworkSource._login;
    NetworkSource.getOwnProfile = NetworkSource._getOwnProfile;

    delete NetworkSource._login;
    delete NetworkSource._getOwnProfile;
  });

  it('should dispatch action correctly when login success', async () => {
    // arrange
    NetworkSource.login = () => Promise.resolve(fakeToken);
    NetworkSource.getOwnProfile = () => Promise.resolve(fakeAuthUser);
    const dispatch = vi.fn();

    // action
    await asyncSetAuthUser({ email: 'test@example.com', password: 'password' })(
      dispatch
    );

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      setAuthUserActionCreator(fakeAuthUser)
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when login failed', async () => {
    // arrange
    NetworkSource.login = () => Promise.reject(fakeErrorResponse);
    const dispatch = vi.fn();
    window.alert = vi.fn();

    // action
    await asyncSetAuthUser({ email: 'test@example.com', password: 'password' })(
      dispatch
    );

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});

describe('asyncUnsetAuthUser thunk', () => {
  it('should dispatch action correctly when logout', async () => {
    // arrange
    const dispatch = vi.fn();

    // action
    await asyncUnsetAuthUser()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(unsetAuthUserActionCreator());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
