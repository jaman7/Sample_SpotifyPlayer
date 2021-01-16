import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

const SideMenu = inject('SpotifyStore')(
	observer((props) => {
		const { SpotifyStore } = props;

		const { title, token, artistids } = SpotifyStore;

		const handleClick = (name) => {
			SpotifyStore.updateHeaderTitle(name);
			SpotifyStore.updateViewType(name);
		};

		const handleBrowseClick = () => {
			SpotifyStore.updateHeaderTitle('Browse');
			SpotifyStore.updateViewType('Featured');
			SpotifyStore.fetchNewReleases(token);
			SpotifyStore.fetchCategories(token);
			SpotifyStore.fetchFeatured(token);
		};

		const handleClickfetchRecentlyPlayed = () => {
			SpotifyStore.fetchRecentlyPlayed(token);
		};

		const handleClickfetchSongs = () => {
			SpotifyStore.fetchSongs(token);
		};

		const handleClickfetchAlbums = () => {
			SpotifyStore.fetchAlbums(token);
		};

		const handleClickfetchArtists = () => {
			SpotifyStore.fetchArtists(token, artistids);
		};

		const renderSideMenu = () => {
			const menu = [
				{
					name: 'Recently Played',
					action: handleClickfetchRecentlyPlayed
				},
				{
					name: 'Songs',
					action: handleClickfetchSongs
				},
				{
					name: 'Albums',
					action: handleClickfetchAlbums
				},
				{
					name: 'Artists',
					action: handleClickfetchArtists
				}
			];

			return menu.map((item) => (
				<li
					role="presentation"
					key={item.name}
					className={title === item.name ? 'active item' : 'item'}
					onClick={() => {
						item.action();
						handleClick(item.name);
					}}
				>
					{item.name}
				</li>
			));
		};

		return (
			<>
				<ul className="menu">
					<li
						role="presentation"
						onClick={handleBrowseClick}
						className={title === 'Browse' ? 'active item' : 'item'}
					>
						Browse
					</li>

					<h3 className="menu-header">Your Library</h3>
					{renderSideMenu()}
				</ul>
			</>
		);
	})
);

SideMenu.wrappedComponent.propTypes = {
	SpotifyStore: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired
};

export default SideMenu;
