/**
 * skenario test
 *
 * - asyncPopulateUsersAndThreads thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 */

import { describe, beforeEach, afterEach, it, vi, expect } from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import NetworkSource from '../../utils/network-source';
import { asyncPopulateUsersAndThreads } from './action';
import { receiveThreadsActionCreator } from '../threads/action';
import { receiveUsersActionCreator } from '../users/action';

const fakeThreadsResponse = [
  {
    id: 'thread-1',
    title: 'Thread Pertama',
    body: 'Ini adalah thread pertama',
    category: 'General',
    createdAt: '2021-06-21T07:00:00.000Z',
    ownerId: 'users-1',
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0,
  },
];

const fakeUsersResponse = [
  {
    id: 'john_doe',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://generated-image-url.jpg',
  },
];

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('asyncPopulateUsersAndThreads thunk', () => {
  beforeEach(() => {
    NetworkSource._getAllUsers = NetworkSource.getAllUsers;
    NetworkSource._getAllThreads = NetworkSource.getAllThreads;
  });

  afterEach(() => {
    NetworkSource.getAllUsers = NetworkSource._getAllUsers;
    NetworkSource.getAllThreads = NetworkSource._getAllThreads;

    // delete backup data
    delete NetworkSource._getAllUsers;
    delete NetworkSource._getAllThreads;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    // stub implementation
    NetworkSource.getAllUsers = () => Promise.resolve(fakeUsersResponse);
    NetworkSource.getAllThreads = () => Promise.resolve(fakeThreadsResponse);

    // mock dispatch
    const dispatch = vi.fn();

    // action
    await asyncPopulateUsersAndThreads()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      receiveUsersActionCreator(fakeUsersResponse)
    );
    expect(dispatch).toHaveBeenCalledWith(
      receiveThreadsActionCreator(fakeThreadsResponse)
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    // arrange
    // stub implementation
    NetworkSource.getAllUsers = () => Promise.reject(fakeErrorResponse);
    NetworkSource.getAllThreads = () => Promise.reject(fakeErrorResponse);
    // mock dispatch
    const dispatch = vi.fn();

    // mock alert
    window.alert = vi.fn();

    // action
    await asyncPopulateUsersAndThreads()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});
