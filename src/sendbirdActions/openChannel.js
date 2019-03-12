import SendBird from "sendbird";

export const sbCreateOpenChannelListQuery = () => {
  const sb = SendBird.getInstance();
  return sb.OpenChannel.createOpenChannelListQuery();
};

export const sbGetOpenChannelList = openChannelListQuery => new Promise((resolve, reject) => {
  openChannelListQuery.next((channels, error) => {
    if (error) {
      reject(error);
    } else {
      resolve(channels);
    }
  });
});

export const sbGetOpenChannel = (channelURL) => {
  const sb = SendBird.getInstance();
  return new Promise((resolve, reject) => {
    sb.OpenChannel.getChannel(channelURL, (channel, error) => {
      if (error) {
        reject(error);
      }

      resolve(channel);
    });
  });
};

export const sbOpenChannelEnter = channel => new Promise((resolve, reject) => {
  channel.enter((response, error) => {
    if (error) {
      reject(error);
    } else {
      resolve(response);
    }
  });
});

export const sbOpenChannelExit = channel => new Promise((resolve, reject) => {
  channel.exit((response, error) => {
    if (error) {
      reject(error);
    } else {
      resolve(response);
    }
  });
});
