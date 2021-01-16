/* eslint-disable no-unused-vars */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

import SideMenu from './components/SideMenu';
import UserPlaylists from './components/UserPlaylists';
import ArtWork from './components/ArtWork';
import Header from './components/Header';
import MainHeader from './components/MainHeader';
import MainView from './components/MainView';
import Footer from './components/Footer';

import Button from './components/Layout/Button';

const { SPOTIFY_ID } = process.env;
const { SPOTIFY_URL } = process.env;
const { REDIRECT_URL } = process.env;

@inject('SpotifyStore')
@observer
class App extends Component {
	static audio;

	async componentDidMount() {
		const { SpotifyStore } = this.props;
		const hashParams = SpotifyStore.getHashParams();

		if (!hashParams.access_token) {
			window.location.href = `${SPOTIFY_URL}?client_id=${SPOTIFY_ID}&scope=playlist-read-private%20playlist-read-collaborative%20playlist-modify-public%20user-read-recently-played%20playlist-modify-private%20ugc-image-upload%20user-follow-modify%20user-follow-read%20user-library-read%20user-library-modify%20user-read-private%20user-read-email%20user-top-read%20user-read-playback-state&response_type=token&redirect_uri=${REDIRECT_URL}`;
		} else {
			SpotifyStore.setToken(hashParams.access_token);
			SpotifyStore.fetchUser(SpotifyStore.token);
			SpotifyStore.updateViewType('Songs');
			SpotifyStore.updateHeaderTitle('Songs');
		}
	}

	async componentDidUpdate() {
		const { SpotifyStore } = this.props;
		const { type, getUserId } = SpotifyStore;
		if (getUserId !== null && type === 'FETCH_USER_SUCCESS') {
			SpotifyStore.fetchSongs(SpotifyStore.token);
			SpotifyStore.fetchPlaylistsMenu(SpotifyStore.token, SpotifyStore.user.id);
		}

		if (this.audio !== undefined) {
			this.audio.volume = SpotifyStore.volume / 100;
		}
	}

	render() {
		const { SpotifyStore } = this.props;
		const { sidebarStatus, type } = SpotifyStore;

		return (
			<>
				<div className="d-flex app">
					<div className={`sidebar ${sidebarStatus ? 'toggled' : ' '}`}>
						<div className="custom-menu">
							<Button
								type="button"
								className={`btn btn-menu ${sidebarStatus ? 'active' : ''}`}
								onClick={(e) => SpotifyStore.openLibraryHandler(sidebarStatus, e)}
							>
								<i className="fa fa-bars" />
							</Button>
						</div>

						<SideMenu />
						<UserPlaylists />
						<ArtWork />
					</div>
					<div className="page-wrapper">
						<div className="container-fluid">
							<div className="row">
								<Header />
							</div>
							<div className="row">
								<MainHeader />
							</div>
							<div className="row">
								<MainView />
							</div>
						</div>

						<Footer />
					</div>
				</div>
			</>
		);
	}
}

App.wrappedComponent.propTypes = {
	SpotifyStore: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired
};

export default App;
