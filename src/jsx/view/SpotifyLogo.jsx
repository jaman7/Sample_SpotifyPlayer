/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

const SpotifyLogo = inject('SpotifyStore')(
	observer((props) => {
		const { SpotifyStore } = props;

		const imgSrc =
			SpotifyStore.user.length > 0 && SpotifyStore.user.images.length > 0
				? SpotifyStore.user.images.url
				: 'img/spotify.png';

		return (
			<>
				<img alt="user" className="img-fluid user-image" src={imgSrc} />
			</>
		);
	})
);

// SpotifyLogo.wrappedComponent.propTypes = {
// 	SpotifyStore: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired
// };

export default SpotifyLogo;
