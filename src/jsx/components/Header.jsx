/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

import TrackSearch from './TrackSearch';
import UserDetails from './UserDetails';
// import Button from './Layout/Button';

const Header = inject('SpotifyStore')(
	observer((props) => {
		const { SpotifyStore } = props;

		// const { sidebarStatus } = SpotifyStore;

		return (
			<>
				<nav className="header">
					{/* <Button
						type="button"
						className={sidebarStatus ? 'active' : ''}
						onClick={(e) => SpotifyStore.openLibraryHandler(sidebarStatus, e)}
					>
						Library
						<i role="presentation" className="fas fa-music" />
					</Button> */}
					<TrackSearch />
					<UserDetails />
				</nav>
			</>
		);
	})
);

Header.wrappedComponent.propTypes = {
	SpotifyStore: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired
};

export default Header;
