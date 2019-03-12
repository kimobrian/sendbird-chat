import SendBird from "sendbird";
import {
  INIT_CHAT_SCREEN,
  CREATE_CHAT_HANDLER_SUCCESS,
  CREATE_CHAT_HANDLER_FAIL,
  MESSAGE_LIST_SUCCESS,
  MESSAGE_LIST_FAIL,
  SEND_MESSAGE_TEMPORARY,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_FAIL,
  CHANNEL_EXIT_SUCCESS,
  CHANNEL_EXIT_FAIL,
  MESSAGE_RECEIVED,
  MESSAGE_UPDATED,
  MESSAGE_DELETED,
  CHANNEL_TITLE_CHANGED,
  CHANNEL_TITLE_CHANGED_FAIL
} from "./types";
import {
  sbGetOpenChannel,
  sbOpenChannelEnter,
  sbGetMessageList,
  sbSendTextMessage,
  sbOpenChannelExit,
  sbGetChannelTitle
} from "../sendbirdActions";

export const initChatScreen = () => {
  const sb = SendBird.getInstance();
  sb.removeAllChannelHandlers();
  return { type: INIT_CHAT_SCREEN };
};

export const getChannelTitle = (channelUrl, isOpenChannel) => (dispatch) => {
  if (isOpenChannel) {
    sbGetOpenChannel(channelUrl)
      .then((channel) => {
        dispatch({
          type: CHANNEL_TITLE_CHANGED,
          title: sbGetChannelTitle(channel),
          memberCount: channel.participantCount
        });
      })
      .catch((error) => {
        dispatch({ type: CHANNEL_TITLE_CHANGED_FAIL });
      });
  } else {
    // sbGetGroupChannel(channelUrl)
    //   .then((channel) => {
    //     dispatch({
    //       type: CHANNEL_TITLE_CHANGED,
    //       title: sbGetChannelTitle(channel),
    //       memberCount: channel.memberCount
    //     });
    //   })
    //   .catch((error) => {
    //     dispatch({ type: CHANNEL_TITLE_CHANGED_FAIL });
    //   });
  }
};

export const createChatHandler = channelUrl => (dispatch) => {
  sbGetOpenChannel(channelUrl)
    .then((channel) => {
      sbOpenChannelEnter(channel)
        .then((channel) => {
          registerHandler(channelUrl, dispatch);
          dispatch({ type: CREATE_CHAT_HANDLER_SUCCESS });
        })
        .catch(error => dispatch({ type: CREATE_CHAT_HANDLER_FAIL }));
    })
    .catch(error => dispatch({ type: CREATE_CHAT_HANDLER_FAIL }));
};

const registerHandler = (channelUrl, dispatch) => {
  const sb = SendBird.getInstance();
  const channelHandler = new sb.ChannelHandler();

  channelHandler.onMessageReceived = (channel, message) => {
    if (channel.url === channelUrl) {
      dispatch({
        type: MESSAGE_RECEIVED,
        payload: message
      });
    }
  };
  channelHandler.onMessageUpdated = (channel, message) => {
    if (channel.url === channelUrl) {
      dispatch({
        type: MESSAGE_UPDATED,
        payload: message
      });
    }
  };
  channelHandler.onMessageDeleted = (channel, messageId) => {
    if (channel.url === channelUrl) {
      dispatch({
        type: MESSAGE_DELETED,
        payload: messageId
      });
    }
  };

  sb.addChannelHandler(channelUrl, channelHandler);
};

export const getPrevMessageList = previousMessageListQuery => (dispatch) => {
  if (previousMessageListQuery.hasMore) {
    sbGetMessageList(previousMessageListQuery)
      .then((messages) => {
        dispatch({
          type: MESSAGE_LIST_SUCCESS,
          list: messages
        });
      })
      .catch(error => dispatch({ type: MESSAGE_LIST_FAIL }));
  } else {
    dispatch({ type: MESSAGE_LIST_FAIL });
  }
};

export const onSendButtonPress = (channelUrl, textMessage) => (dispatch) => {
  sbGetOpenChannel(channelUrl)
    .then((channel) => {
      const messageTemp = sbSendTextMessage(
        channel,
        textMessage,
        (message, error) => {
          if (error) {
            dispatch({ type: SEND_MESSAGE_FAIL });
          } else {
            dispatch({
              type: SEND_MESSAGE_SUCCESS,
              message
            });
          }
        }
      );
      dispatch({
        type: SEND_MESSAGE_TEMPORARY,
        message: messageTemp
      });
    })
    .catch(error => dispatch({ type: SEND_MESSAGE_FAIL }));
};

// export const channelExit = channelUrl => (dispatch) => {
//   sbGetOpenChannel(channelUrl)
//     .then((channel) => {
//       sbOpenChannelExit(channel)
//         .then(response => dispatch({ type: CHANNEL_EXIT_SUCCESS }))
//         .catch(error => dispatch({ type: CHANNEL_EXIT_FAIL }));
//     })
//     .catch(error => dispatch({ type: CHANNEL_EXIT_FAIL }));
// };

export const channelExit = (channelUrl, isOpenChannel) => (dispatch) => {
  if (isOpenChannel) {
    sbGetOpenChannel(channelUrl)
      .then((channel) => {
        sbOpenChannelExit(channel)
          .then(response => dispatch({ type: CHANNEL_EXIT_SUCCESS }))
          .catch(error => dispatch({ type: CHANNEL_EXIT_FAIL }));
      })
      .catch(error => dispatch({ type: CHANNEL_EXIT_FAIL }));
  } else {
    const sb = SendBird.getInstance();
    sb.removeChannelHandler(channelUrl);
    dispatch({ type: CHANNEL_EXIT_SUCCESS });
  }
};
