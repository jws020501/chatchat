import Expo from "expo";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from "react-native";
const io = require("socket.io-client");

// Replace this URL with your own, if you want to run the backend locally!
const SocketEndpoint = "https://server0501.herokuapp.com/";

export default class App extends React.Component {
  state = {
    isConnected: false,
    data: null,
  };
  componentDidMount() {
    const socket = io(SocketEndpoint, {
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      this.setState({ isConnected: true });
    });
    socket.on("connection", () => {
      this.setState({ isConnected: true });
    });
    var name = "김만덕";
    socket.emit("asd", name);
  }

  render() {
    return <View style={styles.container}></View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    width: 170,
    borderColor: "gray",
  },
  sendbtn: {
    height: 40,
    width: 45,
    backgroundColor: "blue",
  },
  textbar: {
    height: 45,
  },
});
