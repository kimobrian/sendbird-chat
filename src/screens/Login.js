import React, {Component} from "react";
import {View} from "react-native";
import {Input, Button, Text} from "react-native-elements";
import SendBird from "sendbird";
import {connect} from "react-redux";
import {sendbirdLogin} from "../actions";

class Login extends Component {
  static navigationOptions = {
    title: "LOGIN"
  };

  constructor(props) {
    super(props);
    this.state = {
      userId: "kimobrian254",
      nickname: "kimo",
      error: ""
    };
  }

  componentWillReceiveProps(props) {
    const {user, error} = props;
    if (user) {
      this.setState({userId: "", nickname: ""}, () => {
        this.props.navigation.navigate("Menu");
      });
    }
  }

  _userIdChanged = userId => {
    this.setState({userId});
  };

  _nicknameChanged = nickname => {
    this.setState({nickname});
  };
  _onButtonPress = () => {
    const {userId, nickname} = this.state;
    this.props.sendbirdLogin({userId, nickname});
  };

  render() {
    return (
      <View style={{backgroundColor: "#fff", flex: 1}}>
        <View style={styles.containerStyle}>
          <Input
            label="User ID"
            containerStyle={{width: 250}}
            errorStyle={{color: "red"}}
            errorMessage={null}
            value={this.state.userId}
          />
        </View>
        <View style={styles.containerStyle}>
          <Input
            label="Nickname"
            containerStyle={{width: 250}}
            errorStyle={{color: "red"}}
            errorMessage={null}
            value={this.state.nickname}
          />
        </View>
        <View style={styles.containerStyle}>
          <Button
            title="Connect"
            type="outline"
            onPress={this._onButtonPress}
            containerStyle={{width: 250}}
          />
        </View>
        <View style={styles.containerStyle}>
          <Text h1>{this.state.error}</Text>
        </View>
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    marginTop: 10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
};

function mapStateToProps({login}) {
  const {error, user} = login;
  return {error, user};
}

export default connect(mapStateToProps, {sendbirdLogin})(Login);
