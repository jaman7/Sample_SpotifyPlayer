import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';
import SimpleBar from 'simplebar-react';

import BrowseViewItem from './BrowseViewItem';

const BrowseView = inject('SpotifyStore')(
	observer((props) => {
		const { SpotifyStore } = props;

		const {
			viewType,
			token,
			categories,
			newReleases,
			featured,
			categoriesPlaylists
		} = SpotifyStore;

		const getCategoriesPlaylist = (item, accesstoken) => {
			SpotifyStore.fetchCategoriesPlaylist(accesstoken, item.id);
			SpotifyStore.updateHeaderTitle('Browse');
			SpotifyStore.updateViewType('GenresPlaylists');
		};

		const getPlaylistSongs = (item, accesstoken) => {
			SpotifyStore.fetchPlaylistSongs(accesstoken, item.owner.id, item.id);
			SpotifyStore.setcurrentPlaylist(item);
			SpotifyStore.updateHeaderTitle(item.name);
			SpotifyStore.updateViewType('playlist');
		};

		const artistSongsAction = (item) => {
			const album = {
				albumName: item.name,
				artistName: item.artists[0].name,
				img: item.images[0].url
			};
			SpotifyStore.fetchAlbumsSongs(token, item.id);
			SpotifyStore.updateHeaderTitle(item.name);
			SpotifyStore.updateViewType('Album');
			SpotifyStore.setCurrentAlbum(album);
		};

		console.log(toJS(categoriesPlaylists));

		return (
			<>
				<SimpleBar className="scroll-2">
					<ul className="browse-view">
						{viewType === 'Genres' &&
							categories.map((item) => (
								<BrowseViewItem
									key={item.id}
									item={item}
									getlist={() => getCategoriesPlaylist(item, token)}
									set
								/>
							))}

						{viewType === 'GenresPlaylists' &&
							categoriesPlaylists.map((item) => (
								<BrowseViewItem
									key={item.id}
									item={item}
									getlist={() => getPlaylistSongs(item, token)}
									set={false}
								/>
							))}

						{viewType === 'NewReleases' &&
							newReleases.map((item) => (
								<BrowseViewItem
									key={item.id}
									item={item}
									getlist={() => artistSongsAction(item, token)}
									set={false}
								/>
							))}

						{viewType === 'Featured' &&
							featured.map((item) => (
								<BrowseViewItem
									key={item.id}
									item={item}
									getlist={() => getPlaylistSongs(item, token)}
									set={false}
								/>
							))}
					</ul>
				</SimpleBar>
			</>
		);
	})
);

BrowseView.wrappedComponent.propTypes = {
	SpotifyStore: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired
};

export default BrowseView;
