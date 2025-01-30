import { hideLoading, showLoading } from "react-redux-loading-bar";
import NetworkSource from "../../utils/network-source";

const ActionType = {
  RECEIVE_DETAIL_THREAD: "RECEIVE_DETAIL_THREAD",
  CLEAR_DETAIL_THREAD: "CLEAR_DETAIL_THREAD",
};

function receiveDetailThreadActionCreator(detailThread) {
  return {
    type: ActionType.RECEIVE_DETAIL_THREAD,
    payload: {
      detailThread,
    },
  };
}

function clearDetailThreadActionCreator() {
  return {
    type: ActionType.CLEAR_DETAIL_THREAD,
  };
}

function asyncReceiveDetailThread(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());

    dispatch(clearDetailThreadActionCreator());
    try {
      const detailThread = await NetworkSource.getDetailThread(threadId);
      dispatch(receiveDetailThreadActionCreator(detailThread));
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

export {
  ActionType,
  receiveDetailThreadActionCreator,
  clearDetailThreadActionCreator,
  asyncReceiveDetailThread,
};
