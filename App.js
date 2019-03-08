/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from "react";
import {Platform, StyleSheet, View} from "react-native";

import {Text, Input, Button, ThemeProvider} from "react-native-elements";

export default class App extends Component {
  render() {
    return (
      <ThemeProvider>
        <View style={styles.containerStyle}>
          <View style={styles.containerStyle}>
            <Input label="User ID" containerStyle={{width: 250}}/>
          </View>
          <View style={styles.containerStyle}>
            <Input label="Nickname" containerStyle={{width: 250}}/>
          </View>
          <View style={styles.containerStyle}>
            <Button title="Connect" type="outline" containerStyle={{width: 250}}/>
          </View>
          <View style={styles.containerStyle}>
            {/* <FormValidationMessage>Error message</FormValidationMessage> */}
          </View>
        </View>
      </ThemeProvider>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: "#F5FCFF",
    justifyContent: "center",
    alignItems: "center"
  }
});
