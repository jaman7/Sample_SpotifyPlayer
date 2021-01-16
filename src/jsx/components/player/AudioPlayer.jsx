import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

import Song from './Song';
import Player from './Player';
import Volume from './Volume';

const AudioPlayer = inject('SpotifyStore')(
	observer((props) => {
		const { SpotifyStore } = props;

		const {
			isLoading,
			isPlaying,
			audioRef,
			songs,
			currentSong,
			setCurrentSong,
			playAudio
		} = SpotifyStore;

		useEffect(() => {
			if (!isLoading && songs.length > 0 && songs[0].preview_url.length) {
				setCurrentSong([...SpotifyStore.songs].shift());
			}
		}, [!isLoading]);

		const setSrc = currentSong?.preview_url ? currentSong?.preview_url : '';

		const [songInfo, setSongInfo] = useState({
			currentTime: 0,
			duration: 0,
			animationPercentage: 0,
			volume: 0.75
		});

		const timeUpdateHandler = (e) => {
			const current = e.target.currentTime;
			const { duration } = e.target;

			const roundedCurrent = Math.round(current);
			const roundedDuration = Math.round(duration);
			const percentage = Math.round((roundedCurrent / roundedDuration) * 100);
			setSongInfo({
				...songInfo,
				currentTime: current,
				duration,
				animationPercentage: percentage
			});
		};
		const songEndHandler = async () => {
			const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
			await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
			playAudio(isPlaying, audioRef);
		};

		return (
			<>
				<div className="now-playing">
					<Song currentSong={currentSong} />
					<Player songInfo={songInfo} setSongInfo={setSongInfo} />
					<Volume audioRef={audioRef} setSongInfo={setSongInfo} songInfo={songInfo} />
					<audio
						onLoadedMetadata={timeUpdateHandler}
						onTimeUpdate={timeUpdateHandler}
						ref={audioRef}
						src={setSrc}
						onEnded={songEndHandler}
					/>
				</div>
			</>
		);
	})
);

AudioPlayer.wrappedComponent.propTypes = {
	SpotifyStore: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired
};

export default AudioPlayer;
