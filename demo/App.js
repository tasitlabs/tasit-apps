import React from "react";
import { AppLoading, Asset, Font } from "expo";
import HomeScreen from "./src/HomeScreen";

export default class App extends React.Component {
	state = {
		isLoadingComplete: false,
	};

	render() {
		if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
			return (
				<AppLoading
					startAsync={this._loadResourcesAsync}
					onError={this._handleLoadingError}
					onFinish={this._handleFinishLoading}
				/>
			);
		} else {
			return <HomeScreen />;
		}
	}

	_loadResourcesAsync = async () => {
		return Promise.all([Asset.loadAsync([]), Font.loadAsync({})]);
	};

	_handleLoadingError = error => {
		// In this case, you might want to report the error to your error
		// reporting service, for example Sentry
		console.warn(error);
	};

	_handleFinishLoading = () => {
		this.setState({ isLoadingComplete: true });
	};
}
