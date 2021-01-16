import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

const UserPlaylists = inject('SpotifyStore')(
	observer((props) => {
		const { SpotifyStore } = props;
		const { token, title, playlistMenu } = SpotifyStore;

		const getPlaylistSongs = (playlist) => {
			SpotifyStore.fetchPlaylistSongs(token, playlist.owner.id, playlist.id);
			SpotifyStore.updateHeaderTitle(playlist.name);
			SpotifyStore.updateViewType('playlist');
			SpotifyStore.setcurrentPlaylist(playlist);
		};

		return (
			<>
				<div className="user-playlist-container">
					<h3 className="user-playlist-header">Playlists</h3>
					<ul className="user-playlist-list">
						{playlistMenu &&
							playlistMenu.map((playlist) => (
								<li
									role="presentation"
									onClick={() => getPlaylistSongs(playlist)}
									className={
										title === playlist.name
											? 'active side-menu-item'
											: 'side-menu-item'
									}
									key={playlist.id}
								>
									{playlist.name}
								</li>
							))}
					</ul>
				</div>
			</>
		);
	})
);

UserPlaylists.wrappedComponent.propTypes = {
	SpotifyStore: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired
};

export default UserPlaylists;
