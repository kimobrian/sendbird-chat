import React from "react";
import { View } from "react-native";
import { MessageBubble } from "./MessageBubble";

const MessageContainer = ({
  isUser, isShow, nickname, message, time
}) => (
  <View style={{ flexDirection: isUser ? "row-reverse" : "row" }}>
    <MessageBubble
      isShow={isShow}
      isUser={isUser}
      nickname={nickname}
      message={message}
      time={time}
    />
  </View>
);

export { MessageContainer };
