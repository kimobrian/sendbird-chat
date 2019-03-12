import {
  OPEN_CHANNEL_LIST_SUCCESS,
  OPEN_CHANNEL_LIST_FAIL,
  GET_OPEN_CHANNEL_SUCCESS,
  GET_OPEN_CHANNEL_FAIL,
  CLEAR_SELETED_OPEN_CHANNEL
} from "../actions/types";

const INITAL_STATE = {
  isLoading: false,
  list: [],
  channel: null,
  createdChannel: null
};

export default (state = INITAL_STATE, action) => {
  switch (action.type) {
  case OPEN_CHANNEL_LIST_SUCCESS:
    return { ...state, list: action.list };
  case OPEN_CHANNEL_LIST_FAIL:
    return state;
  case GET_OPEN_CHANNEL_SUCCESS:
    return { ...state, channel: action.channel };
  case GET_OPEN_CHANNEL_FAIL:
    return { ...state, channel: null };
  case CLEAR_SELETED_OPEN_CHANNEL:
    return { ...state, channel: null };
  default:
    return state;
  }
};
