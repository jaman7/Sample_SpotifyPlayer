/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

const Song = inject('SpotifyStore')(
	observer((props) => {
		const { SpotifyStore } = props;

		const { currentSong } = props;

		return (
			<div className="song-info">
				<p>{currentSong?.name ? currentSong?.name : ''}</p>
				<p>{currentSong?.artists ? currentSong?.artists[0].name : ''}</p>
			</div>
		);
	})
);

Song.wrappedComponent.propTypes = {
	SpotifyStore: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired
};

export default Song;
