import { registerRootComponent } from 'expo';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import React from 'react';
import App from './App';
import { ActivityIndicatorComponent } from 'react-native';

const initialState = {
	msg: [],
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'Update':
			return {
				...state,
				msg: [
					...state.msg,
					{
						name: action.name,
						message: action.message,
						createAt: action.date,
					},
				],
			};
		default:
			return {
				...state,
			};
	}
};

const store = createStore(reducer);

function AppContainer() {
	return (
		<Provider store={store}>
			<App />
		</Provider>
	);
}

export default registerRootComponent(AppContainer);
