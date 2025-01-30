import { hideLoading, showLoading } from "react-redux-loading-bar";
import NetworkSource from "../../utils/network-source";

const ActionType = {
  RECEIVE_THREADS: "RECEIVE_THREADS",
  ADD_THREAD: "ADD_THREAD",
};

function receiveThreadsActionCreator(threads) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: {
      threads,
    },
  };
}

function addThreadActionCreator(thread) {
  return {
    type: ActionType.ADD_THREAD,
    payload: {
      thread,
    },
  };
}

function asyncAddThread({ title, body, category = "" }) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const thread = await NetworkSource.createThread({
        title,
        body,
        category,
      });

      dispatch(addThreadActionCreator(thread));
    } catch (error) {
      showError(error);
    } finally {
      dispatch(hideLoading());
    }
  };
}

function showError(error) {
  alert(error.message || "Something went wrong. Please try again.");
}

export {
  ActionType,
  receiveThreadsActionCreator,
  addThreadActionCreator,
  asyncAddThread,
};
