import React, { Component } from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";

import { Provider } from "react-redux";
import Login from "./src/screens/Login";
import Menu from "./src/screens/Menu";
import Profile from "./src/screens/Profile";
import OpenChannel from "./src/screens/OpenChannel";

import store from "./src/store";

const MainNavigator = createAppContainer(
  createStackNavigator(
    {
      Login: { screen: Login, navigationOptions: () => ({ header: null }) },
      Menu: {
        screen: Menu,
        navigationOptions: () => ({
          title: "MENU"
        })
      },
      Profile,
      OpenChannel
    },
    {
      defaultNavigationOptions: {
        headerBackTitle: null
      }
    }
  )
);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MainNavigator />
      </Provider>
    );
  }
}

export default App;
