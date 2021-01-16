import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

const Playbutton = inject('SpotifyStore')(
	observer((props) => {
		const { SpotifyStore } = props;

		const { songs, setCurrentSong, playSongHandler, isPlaying, audioRef } = SpotifyStore;

		return (
			<>
				<button
					type="button"
					onClick={() => {
						setCurrentSong(songs[0]);
						playSongHandler(isPlaying, audioRef);
					}}
					className="btn pause-play-btn"
				>
					{isPlaying ? 'PAUSE' : 'PLAY'}
				</button>
			</>
		);
	})
);

Playbutton.wrappedComponent.propTypes = {
	SpotifyStore: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired
};

export default Playbutton;
