import Expo from "expo";
import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";
class Main extends Component {
  state = { name: "" };
  render() {
    return (
      <View>
        // 2. Add the title
        <Text style={styles.title}>Enter your name:</Text>
        <TextInput
          style={styles.nameInput}
          placeHolder="John Cena"
          onChangeText={(value) => this.setState({ name: value })}
          value={this.state.name}
        />
        // 3. Add a button
        <TouchableOpacity
          onPress={this.props.navigation.navigate("Chat", {
            name: this.state.name,
          })}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const offset = 24;
const styles = StyleSheet.create({
  nameInput: {
    // 3. <- Add a style for the input
    height: offset * 2,
    margin: offset,
    paddingHorizontal: offset,
    borderColor: "#111111",
    borderWidth: 1,
  },
});
export default Main;
