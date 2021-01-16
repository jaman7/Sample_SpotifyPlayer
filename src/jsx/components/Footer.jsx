/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

import AudioPlayer from './player/AudioPlayer';

const Footer = inject('SpotifyStore')(
	observer((props) => {
		const { SpotifyStore } = props;

		return (
			<>
				<div className="footer">
					<AudioPlayer />
				</div>
			</>
		);
	})
);

Footer.wrappedComponent.propTypes = {
	SpotifyStore: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired
};

export default Footer;
