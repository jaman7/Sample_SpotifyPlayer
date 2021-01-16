/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import SimpleBar from 'simplebar-react';

const ArtistList = inject('SpotifyStore')(
	observer((props) => {
		const { SpotifyStore } = props;

		const { token, artists } = SpotifyStore;

		const renderArtists = () =>
			artists.map((artist) => {
				const artistSongsAction = () => {
					SpotifyStore.fetchArtistSongs(token, artist.id);
					SpotifyStore.updateHeaderTitle(artist.name);
					SpotifyStore.updateViewType('Artist');
					SpotifyStore.setcurrentArtist(artist);
				};

				return (
					<li
						role="presentation"
						onClick={() => {
							artistSongsAction();
						}}
						className="artist-item"
						key={artist.id}
					>
						<a>
							<img
								className="img-fluid"
								alt={artist.name}
								src={artist.images[0] ? artist.images[0].url : ''}
							/>

							<div className="artist-details">
								<p>{artist.name}</p>
							</div>
						</a>
					</li>
				);
			});

		return (
			<>
				<div className="col-12">
					<SimpleBar className="scroll" forceVisible="y">
						<ul className="artist-view">{artists && renderArtists()}</ul>
					</SimpleBar>
				</div>
			</>
		);
	})
);

ArtistList.wrappedComponent.propTypes = {
	SpotifyStore: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired
};

export default ArtistList;
