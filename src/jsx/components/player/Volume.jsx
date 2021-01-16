/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

const Volume = inject('SpotifyStore')(
	observer((props) => {
		const { audioRef, setSongInfo, songInfo } = props;

		const changeVolume = (e) => {
			const { value } = e.target;
			audioRef.current.volume = value;
			setSongInfo({ ...songInfo, volume: value });
		};

		return (
			<>
				<div className="volume-container">
					<i className="fa fa-volume-up" aria-hidden="true" />
					<input
						onChange={changeVolume}
						value={songInfo.volume}
						max="1"
						min="0"
						step="0.01"
						type="range"
					/>
				</div>
			</>
		);
	})
);

Volume.wrappedComponent.propTypes = {
	// SpotifyStore: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
	// setSongInfo: PropTypes.func,
	// songInfo: PropTypes.objectOf(PropTypes.object())
};

export default Volume;
