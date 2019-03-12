import React, { Component } from "react";
import { View, ListView, BackHandler } from "react-native";
import { connect } from "react-redux";
import {
  initChatScreen,
  createChatHandler,
  onSendButtonPress,
  getPrevMessageList,
  channelExit,
  getChannelTitle
} from "../actions";
import {
  TextItem, MessageInput, Message, Button
} from "../components";

import {
  sbGetOpenChannel,
  sbCreatePreviousMessageListQuery,
  sbAdjustMessageList,
  sbMarkAsRead
} from "../sendbirdActions";

class Chat extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    const _renderInviteButton = () => (params.isOpenChannel ? null : (
      <Button
        containerViewStyle={{ marginLeft: 0, marginRight: 0 }}
        buttonStyle={{ paddingLeft: 0, paddingRight: 0 }}
        icon={{
          name: "user-plus",
          type: "font-awesome",
          color: "#7d62d9",
          size: 18
        }}
        iconRight
        type="outline"
        onPress={() => {
          navigation.navigate("GroupChannelInvite", {
            title: "Invite",
            channelUrl: params.channelUrl
          });
        }}
      />
    ));
    return {
      title: `${params.title}(${params.memberCount})`,
      headerLeft: (
        <Button
          containerViewStyle={{ marginLeft: 0, marginRight: 0 }}
          buttonStyle={{ paddingLeft: 14 }}
          icon={{
            name: "chevron-left",
            type: "font-awesome",
            color: "#7d62d9",
            size: 18
          }}
          type="outline"
          onPress={() => {
            params.handleHeaderLeft();
          }}
        />
      ),
      headerRight: (
        <View style={{ flexDirection: "row" }}>
          {_renderInviteButton()}
          <Button
            containerViewStyle={{ marginLeft: 0, marginRight: 0 }}
            buttonStyle={{ paddingLeft: 4, paddingRight: 4 }}
            icon={{
              name: "users",
              type: "font-awesome",
              color: "#7d62d9",
              size: 18
            }}
            iconRight
            type="outline"
            onPress={() => {
              navigation.navigate("Member", {
                isOpenChannel: params.isOpenChannel,
                channelUrl: params.channelUrl
              });
            }}
          />
          <Button
            containerViewStyle={{ marginLeft: 0, marginRight: 0 }}
            buttonStyle={{ paddingLeft: 0, paddingRight: 14 }}
            icon={{
              name: "user-times",
              type: "font-awesome",
              color: "#7d62d9",
              size: 18
            }}
            iconRight
            type="outline"
            onPress={() => {
              navigation.navigate("BlockUser");
            }}
          />
        </View>
      )
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      previousMessageListQuery: null,
      textMessage: ""
    };
  }

  // componentDidMount() {
  //   this.props.initChatScreen();
  //   this.props.navigation.setParams({
  //     handleHeaderLeft: this._onBackButtonPress
  //   });

  //   const { channelUrl } = this.props.navigation.state.params;
  //   sbGetOpenChannel(channelUrl).then((channel) => {
  //     this.props.navigation.setParams({ title: channel.name });
  //     this._componentInit();
  //   });
  // }

  componentDidMount() {
    this.props.initChatScreen();
    this.props.navigation.setParams({
      handleHeaderLeft: this._onBackButtonPress
    });
    const { channelUrl, isOpenChannel } = this.props.navigation.state.params;
    if (isOpenChannel) {
      sbGetOpenChannel(channelUrl).then(channel => this.setState({ channel }, () => this._componentInit()));
    } else {
      // sbGetGroupChannel(channelUrl).then(channel => this.setState({ channel }, () => this._componentInit()));
    }
    BackHandler.addEventListener("hardwareBackPress", this._onBackButtonPress);
  }

  componentWillReceiveProps(props) {
    const { exit } = props;
    if (exit) {
      this.props.navigation.goBack();
    }
  }

  _componentInit = () => {
    const { channelUrl, isOpenChannel } = this.props.navigation.state.params;
    this.props.getChannelTitle(channelUrl, isOpenChannel);
    this.props.createChatHandler(channelUrl);
    this._getMessageList(true);
    if (!isOpenChannel) {
      sbMarkAsRead({ channelUrl });
    }
  };

  _onBackButtonPress = () => {
    const {
      channelUrl,
      isOpenChannel,
      _initListState
    } = this.props.navigation.state.params;
    if (_initListState) _initListState();
    this.setState({ isLoading: true }, () => {
      this.props.channelExit(channelUrl, isOpenChannel);
    });
    return true;
  };

  _onTextMessageChanged = (textMessage) => {
    this.setState({ textMessage });
  };

  _getMessageList = (init) => {
    if (!this.state.previousMessageListQuery && !init) {
      return;
    }
    const { channelUrl } = this.props.navigation.state.params;
    if (init) {
      sbCreatePreviousMessageListQuery(channelUrl)
        .then((previousMessageListQuery) => {
          this.setState({ previousMessageListQuery }, () => {
            this.props.getPrevMessageList(this.state.previousMessageListQuery);
          });
        })
        .catch(error => this.props.navigation.goBack());
    } else {
      this.props.getPrevMessageList(this.state.previousMessageListQuery);
    }
  };

  _onSendButtonPress = () => {
    if (this.state.textMessage) {
      const { channelUrl } = this.props.navigation.state.params;
      const { textMessage } = this.state;
      this.setState({ textMessage: "" }, () => {
        this.props.onSendButtonPress(channelUrl, textMessage);
        this.chatSection.scrollTo({ y: 0 });
      });
    }
  };

  _renderList = (rowData) => {
    const { channel } = this.state;
    if (rowData.isUserMessage()) {
      return (
        <Message
          key={rowData.messageId ? rowData.messageId : rowData.reqId}
          isShow={rowData.sender.isShow}
          isUser={rowData.isUser}
          profileUrl={rowData.sender.profileUrl.replace("http://", "https://")}
          nickname={rowData.sender.nickname}
          time={rowData.time}
          message={
            <TextItem isUser={rowData.isUser} message={rowData.message} />
          }
        />
      );
    }
    // FileMessage/AdminMessage
    return <View />;
  };

  render() {
    return (
      <View style={styles.containerViewStyle}>
        <View style={styles.messageListViewStyle}>
          <ListView
            ref={(c) => {
              this.chatSection = c;
            }}
            enableEmptySections
            renderRow={this._renderList}
            dataSource={this.props.list}
            onEndReached={() => this._getMessageList(false)}
            onEndReachedThreshold={-100}
          />
        </View>
        <View style={styles.messageInputViewStyle}>
          <MessageInput
            onRightPress={this._onSendButtonPress}
            textMessage={this.state.textMessage}
            onChangeText={this._onTextMessageChanged}
          />
        </View>
      </View>
    );
  }
}

const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2
});

function mapStateToProps({ chat }) {
  const { exit } = chat;
  const list = ds.cloneWithRows(sbAdjustMessageList(chat.list));
  return { list, exit };
}

export default connect(mapStateToProps, {
  initChatScreen,
  createChatHandler,
  onSendButtonPress,
  getPrevMessageList,
  channelExit,
  getChannelTitle
})(Chat);

const styles = {
  renderTypingViewStyle: {
    flexDirection: "row",
    marginLeft: 14,
    marginRight: 14,
    marginTop: 4,
    marginBottom: 0,
    paddingBottom: 0,
    height: 14
  },
  containerViewStyle: {
    backgroundColor: "#fff",
    flex: 1
  },
  messageListViewStyle: {
    flex: 10,
    transform: [{ scaleY: -1 }]
  },
  messageInputViewStyle: {
    flex: 1,
    marginBottom: 8,
    flexDirection: "column",
    justifyContent: "center"
  }
};
