import React from "react";
import { View } from "react-native";
import { Avatar } from "react-native-elements";

const _renderAvatar = (isShow, URL, onImagePress) => {
  let uri = URL;
  if (!isShow) {
    uri = "";
  }
  return uri ? (
    <Avatar size="small" rounded source={{ uri }} onPress={onImagePress} />
  ) : null;
};

const MessageAvatar = ({ isShow, uri, onPress }) => (
  <View style={styles.viewStyle}>{_renderAvatar(isShow, uri, onPress)}</View>
);

const styles = {
  viewStyle: {
    backgroundColor: "#fff",
    marginRight: 8,
    width: 34,
    height: 34
  }
};

export { MessageAvatar };
