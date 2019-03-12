import {
  OPEN_CHANNEL_LIST_SUCCESS,
  OPEN_CHANNEL_LIST_FAIL,
  GET_OPEN_CHANNEL_SUCCESS,
  GET_OPEN_CHANNEL_FAIL,
  CLEAR_SELETED_OPEN_CHANNEL
} from "./types";
import {
  sbGetOpenChannelList,
  sbGetOpenChannel
  // sbOpenChannelExit
} from "../sendbirdActions";

export const getOpenChannelList = openChannelListQuery => (dispatch) => {
  if (openChannelListQuery.hasNext) {
    sbGetOpenChannelList(openChannelListQuery)
      .then(channels => dispatch({
        type: OPEN_CHANNEL_LIST_SUCCESS,
        list: channels
      }))
      .catch(error => dispatch({ type: OPEN_CHANNEL_LIST_FAIL }));
  } else {
    dispatch({ type: OPEN_CHANNEL_LIST_FAIL });
  }
};

export const onOpenChannelPress = channelUrl => (dispatch) => {
  sbGetOpenChannel(channelUrl)
    .then(channel => dispatch({
      type: GET_OPEN_CHANNEL_SUCCESS,
      channel
    }))
    .catch(error => dispatch({ type: GET_OPEN_CHANNEL_FAIL }));
};

export const clearSeletedOpenChannel = () => ({
  type: CLEAR_SELETED_OPEN_CHANNEL
});
