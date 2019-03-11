import React, {Component} from "react";
import {createStackNavigator, createAppContainer} from "react-navigation";

import Login from "./src/screens/Login";
import Menu from "./src/screens/Menu";

import {Provider} from "react-redux";
import store from "./src/store";

const MainNavigator = createAppContainer(
  createStackNavigator(
    {
      Login: {screen: Login, navigationOptions: () => ({header: null})},
      Menu: {
        screen: Menu,
        navigationOptions: ({navigation}) => ({
          title: "MENU"
        })
      }
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
