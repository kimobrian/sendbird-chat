import React, { Component } from "react";
import { View, FlatList } from "react-native";
import { connect } from "react-redux";
import { ListItem } from "react-native-elements";
import TouchableScale from "react-native-touchable-scale";
import LinearGradient from "react-native-linear-gradient";
import { getOpenChannelList } from "../actions";
import { sbCreateOpenChannelListQuery } from "../sendbirdActions";

class OpenChannel extends Component {
  static navigationOptions = {
    title: "OPEN CHANNELS"
  };

  constructor(props) {
    super(props);
    this.state = {
      refresh: false,
      openChannelListQuery: null,
      list: [],
      openChannelList: []
    };
  }

  componentDidMount() {
    this._initOpenChannelList();
  }

  componentWillReceiveProps(props) {
    const { list } = props;

    if (list !== this.props.list) {
      if (list.length === 0) {
        this.setState({ list: [], openChannelList: []});
      } else {
        const newList = [...this.state.list, ...list];
        this.setState({
          list: newList,
          openChannelList: newList
        });
      }
    }
  }

  _initOpenChannelList = () => {
    this._getOpenChannelList(true);
  };

  _getOpenChannelList = (init) => {
    if (init) {
      const openChannelListQuery = sbCreateOpenChannelListQuery();
      this.setState({ openChannelListQuery }, () => {
        this.props.getOpenChannelList(this.state.openChannelListQuery);
      });
    } else {
      this.props.getOpenChannelList(this.state.openChannelListQuery);
    }
  };

  _onListItemPress = (channelUrl) => {
    // TODO: enter channel
  };

  _handleScroll = (e) => {
    if (e.nativeEvent.contentOffset.y < -100 && !this.state.refresh) {
      this.setState({ list: [], openChannelList: [], refresh: true }, () => {
        this._initOpenChannelList();
      });
    }
  };

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
          data={this.state.openChannelList}
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
              keyExtractor={() => item.url}
              linearGradientProps={{
                colors: ["#FF9800", "#F44336"],
                start: { x: 1, y: 0 },
                end: { x: 0.2, y: 0 }
              }}
            />
          )}
        />
      </View>
    );
  }
}

function mapStateToProps({ openChannel }) {
  const { list } = openChannel;
  return { list };
}

export default connect(mapStateToProps, { getOpenChannelList })(OpenChannel);
