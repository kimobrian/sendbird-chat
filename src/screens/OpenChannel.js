import React, { Component } from "react";
import { View, FlatList } from "react-native";
import { connect } from "react-redux";
import TouchableScale from "react-native-touchable-scale";
import LinearGradient from "react-native-linear-gradient";
import {
  getOpenChannelList,
  onOpenChannelPress,
  clearSeletedOpenChannel
} from "../actions";
import { sbCreateOpenChannelListQuery } from "../sendbirdActions";
import { ListItem, Button } from "../components";

class OpenChannel extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      title: "Open Channel",
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
          onPress={() => navigation.goBack()}
        />
      ),
      headerRight: (
        <Button
          containerViewStyle={{ marginLeft: 0, marginRight: 0 }}
          buttonStyle={{ paddingRight: 14 }}
          icon={{
            name: "plus",
            type: "font-awesome",
            color: "#7d62d9",
            size: 18
          }}
          iconRight
          type="outline"
          onPress={() => {
            navigation.navigate("OpenChannelCreate");
          }}
        />
      )
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      enterChannel: false,
      openChannelListQuery: null,
      list: props.list
    };
  }

  componentDidMount() {
    this._initOpenChannelList();
  }

  componentWillReceiveProps(props) {
    const { list, channel, createdChannel } = props;
    console.log("Channle:::", channel);
    if (createdChannel) {
      const newList = [...[createdChannel], ...list];
      this.setState({ list: newList }, () => {
        this.props.clearCreatedOpenChannel();
      });
    }
    if (channel) {
      this.props.clearSeletedOpenChannel();
      this.props.navigation.navigate("Chat", {
        channelUrl: channel.url,
        title: channel.name,
        memberCount: channel.participantCount,
        isOpenChannel: channel.isOpenChannel(),
        _initListState: this._initEnterState
      });
    }
  }

  _initEnterState = () => {
    this.setState({ enterChannel: false });
  };

  _initOpenChannelList = () => {
    this._getOpenChannelList(true);
  };

  _getOpenChannelList = (init) => {
    if (init) {
      const openChannelListQuery = sbCreateOpenChannelListQuery();
      this.setState({ openChannelListQuery }, async () => {
        await this.props.getOpenChannelList(this.state.openChannelListQuery);
        this.setState({ list: this.props.list });
      });
    } else {
      this.props.getOpenChannelList(this.state.openChannelListQuery);
    }
  };

  _onListItemPress = (channelUrl) => {
    if (!this.state.enterChannel) {
      this.setState({ enterChannel: true }, () => {
        this.props.onOpenChannelPress(channelUrl);
      });
    }
  };

  // _handleScroll = (e) => {
  //   if (e.nativeEvent.contentOffset.y < -100 && !this.state.refresh) {
  //     this.setState({ list: [], openChannelList: [], refresh: true }, () => {
  //       this._initOpenChannelList();
  //     });
  //   }
  // };

  // _renderList = rowData => (
  //   <ListItem
  //     Component={TouchableHighlight}
  //     containerStyle={{ backgroundColor: "#fff" }}
  //     key={rowData.url}
  //     avatar={<Avatar source={{ uri: rowData.coverUrl }} />}
  //     title={
  //       rowData.name.length > 30
  //         ? `${rowData.name.substring(0, 26)}...`
  //         : rowData.name
  //     }
  //     titleStyle={{ fontWeight: "500", fontSize: 16 }}
  //     onPress={() => this._onListItemPress(rowData.url)}
  //   />
  // );

  render() {
    return (
      <View>
        <FlatList
          data={this.props.list}
          renderItem={({ item }) => (
            <ListItem
              Component={TouchableScale}
              friction={90}
              tension={100}
              activeScale={0.95}
              leftAvatar={{ source: { uri: item.coverUrl } }}
              title={
                item.name.length > 30
                  ? `${item.name.substring(0, 26)}...`
                  : item.name
              }
              ViewComponent={LinearGradient}
              chevronColor="blue"
              chevron
              bottomDivider
              topDivider
              onPress={() => this._onListItemPress(item.url)}
              keyExtractor={() => item.url}
              linearGradientProps={{
                colors: ["#FF9800", "#F44336"],
                start: { x: 1, y: 0 },
                end: { x: 0.2, y: 0 }
              }}
            />
          )}
          keyExtractor={(item, index) => item.url}
        />
      </View>
    );
  }
}

function mapStateToProps({ openChannel }) {
  const {
    isLoading, list, createdChannel, channel
  } = openChannel;
  return {
    isLoading,
    list,
    createdChannel,
    channel
  };
}

export default connect(mapStateToProps, {
  getOpenChannelList,
  onOpenChannelPress,
  clearSeletedOpenChannel
})(OpenChannel);
