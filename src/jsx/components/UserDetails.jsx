import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

import SpotifyLogo from '../view/SpotifyLogo';
import Span from './Layout/Span';

const UserDetails = inject('SpotifyStore')(
	observer((props) => {
		const { SpotifyStore } = props;

		const displayName = SpotifyStore.user ? SpotifyStore.user.display_name : '';

		return (
			<>
				<div className="user-details">
					<SpotifyLogo />
					<Span className="user-name">{displayName}</Span>
				</div>
			</>
		);
	})
);

UserDetails.wrappedComponent.propTypes = {
	SpotifyStore: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
	userImage: PropTypes.string,
	displayName: PropTypes.string
};

export default UserDetails;
