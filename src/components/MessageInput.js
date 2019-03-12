import React from "react";
import { View, Dimensions } from "react-native";
import { Icon, Input } from "react-native-elements";

const { width } = Dimensions.get("window");

const MessageInput = ({
  textMessage, onChangeText, onRightPress, onFocus
}) => (
  <View style={{ flexDirection: "row" }}>
    <Input
      containerStyle={{ marginLeft: 20, marginRight: 8, flex: 3 }}
      inputStyle={{
        color: "#212529",
        minHeight: 36
      }}
      placeholder="Your message"
      autoCapitalize="none"
      autoCorrect={false}
      selectionColor="#212529"
      value={textMessage}
      onChangeText={onChangeText}
      onFocus={onFocus}
    />
    <Icon
      containerStyle={{ marginLeft: 0, flex: 1 }}
      iconStyle={{ margin: 0, padding: 0 }}
      name="envelope"
      type="font-awesome"
      color={textMessage.length > 0 ? "#7d62d9" : "#494e57"}
      size={15}
      onPress={onRightPress}
    />
  </View>
);

export { MessageInput };
