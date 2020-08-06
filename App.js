import Expo from "expo";
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from "react-native";
import MessageBubble from "./chatbuble";
const io = require("socket.io-client");

const SocketEndpoint = "https://server0501.herokuapp.com/";

const { height, width } = Dimensions.get("window");

const socket = io(SocketEndpoint, {
  transports: ["websocket"],
});

socket.on("update", function (data) {
  const Chat = new chat();
  const { name } = Chat.state;
  const {msg} = Chat.state;
  msg.push({
    msg: [
      ...Chat.state.msg,
      {
        name: data.name,
        text: data.text,
        date: data.date,
        mine: data.name == name ? true : false,
      },
    ],
  });
  alert(JSON.stringify(Chat.state.msg));
});

export default class chat extends React.Component {
  state = {
    isConnected: false,
    data: null,
    text: "",
    name: "익명",
    roomnum: "room1",
    msg: [],
  };
  constructor(props) {
    super(props);
    this.Scroll = React.createRef();
    this.input = React.createRef();
  }
  send = () => {
    const { text } = this.state;
    const { name } = this.state;
    if (text !== "") {
      socket.emit("send", {
        name: name,
        message: text,
        date: Date.now(),
      });
      this.setState({ text: "" });
      this.scrolldown();
    }
  };
  scrolldown = () => {
    setTimeout(() => {
      this.refs.scroll.scrollToEnd({ animated: true });
    }, 100);
  };

  componentWillMount() {
    var { roomnum } = this.state;
    var { name } = this.state;
    socket.on("connect", () => {
      socket.emit("Joinroom", {
        roomnum: roomnum,
        name: name,
      });
    });
  }
  componentDidMount() {
    this.refs.input.focus();
  }

  render() {
    const { text } = this.state;
    const { msg } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="default" barStyle="dark-content" />
        <KeyboardAvoidingView style={styles.Board} behavior="padding">
          <View style={styles.chat}>
            <ScrollView style={{ flex: 1 }} ref="scroll">
              {msg.map((msg) => {
                return msg.mine ? (
                  <MessageBubble mine text={msg.text} />
                ) : (
                  <MessageBubble text={msg.text} />
                );
              })}
            </ScrollView>
          </View>
          <View style={styles.Keyboard}>
            <TextInput
              ref="input"
              style={styles.input}
              onFocus={this.scrolldown}
              placeholder={"여기에 텍스트를 입력하세요."}
              onSubmitEditing={this.send}
              value={text}
              onChangeText={(value) => {
                this.setState({ text: value });
              }}
              returnKeyType={"done"}
            />
            <TouchableOpacity style={styles.sendbtn} onPress={this.send}>
              <Text style={{ color: "white" }}>전송</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1DDB16",
    alignItems: "center",
    justifyContent: "center",
    // marginTop: getStatusBarHeight(true) + 4,
  },

  Board: {
    width: width - 50,
    height: height - 100,
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },

  chat: {
    flex: 10,
    paddingTop: 20,
  },

  Keyboard: {
    flex: 1,
    flexDirection: "row",
    padding: 5,
  },

  input: {
    flex: 4,
    height: 40,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "gray",
    paddingLeft: 10,
  },

  sendbtn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    height: 40,
    borderWidth: 1,
    backgroundColor: "#59DA50",
  },

  send: {
    backgroundColor: "#FAED7D",
    flex: 1,
    alignSelf: "flex-start",
    padding: 10,
    paddingHorizontal: 30,
    marginLeft: 20,
    marginBottom: 10,
  },

  receive: {
    backgroundColor: "#4374D9",
    color: "white",
    alignSelf: "flex-end",
    padding: 10,
    paddingHorizontal: 30,
    marginRight: 20,
    marginBottom: 10,
  },
});
