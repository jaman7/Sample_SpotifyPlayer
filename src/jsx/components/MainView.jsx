/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

import AlbumList from './AlbumList';
import ArtistList from './ArtistList';
import BrowseView from './BrowseView';
import SongList from './SongList';

const MainView = inject('SpotifyStore')(
	observer((props) => {
		const { SpotifyStore } = props;

		const { title } = SpotifyStore;

		return (
			<>
				{title === 'Albums' ? (
					<AlbumList />
				) : title === 'Artists' ? (
					<ArtistList />
				) : title === 'Browse' ? (
					<BrowseView />
				) : (
					<SongList />
				)}
			</>
		);
	})
);

MainView.wrappedComponent.propTypes = {
	SpotifyStore: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired
};

export default MainView;
