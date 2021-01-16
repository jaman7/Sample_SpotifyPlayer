import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

import Button from '../Layout/Button';
import Playicon from '../Layout/Playicon';
import Pauseicon from '../Layout/Pauseicon';
import Nexticon from '../Layout/Nexticon';
import Previcon from '../Layout/Previcon';

const Player = inject('SpotifyStore')(
	observer((props) => {
		const { SpotifyStore, songInfo, setSongInfo } = props;

		const {
			audioRef,
			isPlaying,
			songs,
			currentSong,
			setCurrentSong,
			playAudio,
			playSongHandler
		} = SpotifyStore;

		const color = ['#b3b3b3', '#2ab3bf'];

		const trackAnim = {
			transform: `translateX(${songInfo.animationPercentage}%)`
		};

		// Event Handlers
		const getTime = (time) =>
			`${Math.floor(time / 60)}:${`0${Math.floor(time % 60)}`.slice(-2)}`;

		const dragHandler = (e) => {
			audioRef.current.currentTime = e.target.value;
			setSongInfo({ ...songInfo, currentTime: e.target.value });
		};

		const skipTrackHandler = async (direction) => {
			const currentIndex = songs.findIndex((song) => song.id === currentSong.id);

			// Forward BAck
			if (direction === 'skip-forward') {
				await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
			}
			if (direction === 'skip-back') {
				if ((currentIndex - 1) % songs.length === -1) {
					await setCurrentSong(songs[songs.length - 1]);
					playAudio(isPlaying, audioRef);
					return;
				}
				await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
			}
			if (isPlaying) audioRef.current.play();
		};

		return (
			<div className="player">
				<div className="play-control">
					<Button
						type="button"
						className="reverse"
						title="Reverse"
						aria-label="Reverse"
						onClick={() => skipTrackHandler('skip-back')}
					>
						<Previcon />
					</Button>

					<Button
						type="button"
						className="play"
						title="Play"
						aria-label="Play"
						onClick={() => playSongHandler(isPlaying, audioRef)}
					>
						{isPlaying ? <Pauseicon /> : <Playicon />}
					</Button>

					<Button
						type="button"
						className="next"
						title="Next"
						aria-label="Next"
						onClick={() => skipTrackHandler('skip-forward')}
					>
						<Nexticon />
					</Button>
				</div>
				<div className="playback-bar">
					<p className="playback-bar__progress-time">{getTime(songInfo.currentTime)}</p>
					<div
						style={{
							background: `linear-gradient(to right, ${color[0]},${color[1]})`
						}}
						className="track"
					>
						<input
							value={songInfo.currentTime}
							type="range"
							max={songInfo.duration || 0}
							min={0}
							onChange={dragHandler}
						/>
						<div style={trackAnim} className="animate-track" />
					</div>
					<p className="playback-bar__progress-time">
						{songInfo.duration ? getTime(songInfo.duration) : '0:00'}
					</p>
				</div>
			</div>
		);
	})
);

Player.wrappedComponent.propTypes = {
	SpotifyStore: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired
};

export default Player;
