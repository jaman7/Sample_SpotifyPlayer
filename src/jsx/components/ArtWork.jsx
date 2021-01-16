import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

const ArtWork = inject('SpotifyStore')(
	observer((props) => {
		const { SpotifyStore } = props;

		const { currentSong } = SpotifyStore;
		const albumImage = currentSong.album ? currentSong.album.images[0].url : '';

		return (
			<>
				<div className="album-artwork-container">
					{albumImage ? (
						<img alt="artwork" className="img-fluid album-artwork" src={albumImage} />
					) : (
						<></>
					)}
				</div>
			</>
		);
	})
);

ArtWork.wrappedComponent.propTypes = {
	SpotifyStore: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired
};

export default ArtWork;
