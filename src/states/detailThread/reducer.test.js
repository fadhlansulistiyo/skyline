/**
 * test scenario for detailThreadsReducer
 *
 * - detailThreadsReducer function
 *  - should return the initial state when given by unknown action
 *  - should return the threads when given by RECEIVE_DETAIL_THREAD action
 *  - should return null when given by CLEAR_DETAIL_THREAD action
 */

import { describe, it, expect } from "vitest";
import detailThreadReducer from "./reducer";
import { ActionType } from "./action";

describe("detailThreadReducer function", () => {
  it("should return the initial state when given an unknown action", () => {
    // arrange
    const initialState = null;
    const action = { type: "UNKNOWN" };

    // action
    const nextState = detailThreadReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it("should return the detailThread when given by RECEIVE_DETAIL_THREAD action", () => {
    // arrange
    const initialState = null;
    const action = {
      type: ActionType.RECEIVE_DETAIL_THREAD,
      payload: {
        detailThread: {
          id: "thread-1",
          title: "Thread Pertama",
          body: "Ini adalah thread pertama",
          category: "General",
          createdAt: "2021-06-21T07:00:00.000Z",
          owner: {
            id: "users-1",
            name: "John Doe",
            avatar: "https://generated-image-url.jpg",
          },
          upVotesBy: [],
          downVotesBy: [],
          comments: [
            {
              id: "comment-1",
              content: "Ini adalah komentar pertama",
              createdAt: "2021-06-21T07:00:00.000Z",
              owner: {
                id: "users-1",
                name: "John Doe",
                avatar: "https://generated-image-url.jpg",
              },
              upVotesBy: [],
              downVotesBy: [],
            },
          ],
        },
      },
    };

    // action
    const nextState = detailThreadReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.detailThread);
  });

  it("should return null when given by CLEAR_DETAIL_THREAD action", () => {
    // arrange
    const initialState = {
      id: "thread-1",
      title: "Thread Pertama",
      body: "Ini adalah thread pertama",
      category: "General",
      createdAt: "2021-06-21T07:00:00.000Z",
      owner: {
        id: "users-1",
        name: "John Doe",
        avatar: "https://generated-image-url.jpg",
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [
        {
          id: "comment-1",
          content: "Ini adalah komentar pertama",
          createdAt: "2021-06-21T07:00:00.000Z",
          owner: {
            id: "users-1",
            name: "John Doe",
            avatar: "https://generated-image-url.jpg",
          },
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    };
    const action = {
      type: ActionType.CLEAR_DETAIL_THREAD,
    };

    // action
    const nextState = detailThreadReducer(initialState, action);

    // assert
    expect(nextState).toBeNull();
  });
});
