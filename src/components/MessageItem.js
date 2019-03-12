import React from "react";
import { View, Text } from "react-native";

export const TextItem = ({ isUser, message }) => (
  <View style={{}}>
    <Text style={{ fontSize: 12, color: isUser ? "#fff" : "#000" }}>
      {message}
    </Text>
  </View>
);
