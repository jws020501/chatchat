import React, { useState, useEffect } from 'react';
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
	DatePickerAndroid,
} from 'react-native';
import MessageBubble from './chatbuble';
import { useDispatch, useSelector } from 'react-redux';
const io = require('socket.io-client');

const SocketEndpoint = 'https://server0501.herokuapp.com/';

const { height, width } = Dimensions.get('window');

const socket = io(SocketEndpoint, {
	transports: ['websocket'],
});

let LastDate = 1;

export default function chat() {
	const dispatch = useDispatch();
	const [text, setText] = useState('');
	const { msg } = useSelector((state) => ({
		msg: state.msg,
	}));
	socketUpdate();
	return (
		<View style={styles.container}>
			<StatusBar backgroundColor="default" barStyle="dark-content" />
			<KeyboardAvoidingView style={styles.Board} behavior="padding">
				<View style={styles.chat}>
					<ScrollView
						style={{ flex: 1 }}
						ref={(scroll) => {
							this.scroll = scroll;
						}}
					>
						{msg.map((message) => {
							return message.name == '익명' ? (
								<MessageBubble mine text={message.message} />
							) : (
								<MessageBubble text={message.message} />
							);
						})}
					</ScrollView>
				</View>
				<View style={styles.Keyboard}>
					<TextInput
						autoFocus={true}
						style={styles.input}
						onFocus={scrolldown}
						placeholder={'여기에 텍스트를 입력하세요.'}
						onSubmitEditing={() => send()}
						value={text}
						onChangeText={(value) => {
							setText(value);
						}}
						returnKeyType={'done'}
					/>
					<TouchableOpacity style={styles.sendbtn} onPress={() => send()}>
						<Text style={{ color: 'white' }}>전송</Text>
					</TouchableOpacity>
				</View>
			</KeyboardAvoidingView>
		</View>
	);
	function send() {
		if (text !== '') {
			socket.emit('send', {
				name: '상대',
				message: text,
				date: Date.now(),
			});
			dispatch({
				type: 'Update',
				name: '익명',
				message: text,
				date: Date.now(),
			});
			setText('');
			scrolldown();
		}
	}

	function scrolldown() {
		setTimeout(() => {
			scroll.scrollToEnd({ animated: true });
		}, 100);
	}

	function socketUpdate() {
		socket.on('update', (data) => {
			if (LastDate != data.date) {
				dispatch({
					type: 'Update',
					name: data.name,
					message: data.message,
					date: data.date,
				});
				LastDate = data.date;
			}
		});
		scrolldown();
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#1DDB16',
		alignItems: 'center',
		justifyContent: 'center',
		// marginTop: getStatusBarHeight(true) + 4,
	},

	Board: {
		width: width - 50,
		height: height - 100,
		backgroundColor: 'white',
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
	},

	chat: {
		flex: 10,
		paddingTop: 20,
	},

	Keyboard: {
		flex: 1,
		flexDirection: 'row',
		padding: 5,
	},

	input: {
		flex: 4,
		height: 40,
		borderWidth: 2,
		borderRadius: 5,
		borderColor: 'gray',
		paddingLeft: 10,
	},

	sendbtn: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
		height: 40,
		borderWidth: 1,
		backgroundColor: '#59DA50',
	},

	send: {
		backgroundColor: '#FAED7D',
		flex: 1,
		alignSelf: 'flex-start',
		padding: 10,
		paddingHorizontal: 30,
		marginLeft: 20,
		marginBottom: 10,
	},

	receive: {
		backgroundColor: '#4374D9',
		color: 'white',
		alignSelf: 'flex-end',
		padding: 10,
		paddingHorizontal: 30,
		marginRight: 20,
		marginBottom: 10,
	},
});
