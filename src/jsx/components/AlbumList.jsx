import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import SimpleBar from 'simplebar-react';

const AlbumList = inject('SpotifyStore')(
	observer((props) => {
		const { SpotifyStore } = props;

		const { token, songs, uniqBy } = SpotifyStore;

		const albumSongs = songs ? uniqBy(songs, (item) => item.album.name) : '';

		const artistSongsAction = (item) => {
			const album = {
				albumName: item.album.name,
				artistName: item.album.artists[0].name,
				img: item.album.images[0].url
			};
			SpotifyStore.fetchAlbumsSongs(token, item.album.id);
			SpotifyStore.updateHeaderTitle(item.name);
			SpotifyStore.updateViewType('Album');
			SpotifyStore.setCurrentAlbum(album);
		};

		const renderAlbums = () =>
			albumSongs.map((item) => (
				<li
					role="presentation"
					onClick={() => artistSongsAction(item)}
					className="album-item"
					key={item.id}
				>
					<div className="album-image">
						<img
							className="img-fluid"
							alt={item.album.name}
							src={item.album.images[0].url}
						/>
					</div>

					<div className="album-details">
						<p className="album-details__album-name">{item.album.name}</p>
						<p className="album-details__artist-name">{item.album.artists[0].name}</p>
					</div>
				</li>
			));

		return (
			<>
				<div className="col-12">
					<SimpleBar className="scroll" forceVisible="y">
						<ul className="album-view">{renderAlbums()}</ul>
					</SimpleBar>
				</div>
			</>
		);
	})
);

AlbumList.wrappedComponent.propTypes = {
	SpotifyStore: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired
};

export default AlbumList;
