/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

import Playbutton from './Playbutton';

const MainHeader = inject('SpotifyStore')(
	observer((props) => {
		const { SpotifyStore } = props;

		const {
			categories,
			newReleases,
			featured,
			fetchCategories,
			fetchNewReleases,
			fetchFeatured,
			updateHeaderTitle,
			updateViewType,
			viewType,
			title,
			currentPlaylist,
			token,
			currentAlbum,
			currentArtist
		} = SpotifyStore;

		const browseReducer = (set) => {
			SpotifyStore.setBrowseView(set);
		};

		const browseSection = [
			{
				name: 'Genres',
				viewType: 'Genres',
				reducer: categories,
				actionFetch: fetchCategories
			},
			{
				name: 'New Releases',
				viewType: 'NewReleases',
				reducer: newReleases,
				actionFetch: fetchNewReleases
			},
			{
				name: 'Featured',
				viewType: 'Featured',
				reducer: featured,
				actionFetch: fetchFeatured
			}
		];

		return (
			<>
				{viewType === 'playlist' && (
					<div className="col-12 main-header mb-3">
						<div className="d-flex align-items-end">
							<img
								alt="playlist"
								className="img-fluid"
								src={
									currentPlaylist.images[0] ? currentPlaylist.images[0].url : null
								}
							/>
							<div className="info">
								<p className="info-text">PLAYLIST</p>
								<h3 className="info-title">{title}</h3>
								<p className="info-createdby">
									Created By:
									<span className="info-createdby__lighter-text">
										{currentPlaylist.owner.display_name}
									</span>
									- {currentPlaylist.tracks.total} songs
								</p>
								<Playbutton />
							</div>
						</div>
					</div>
				)}

				{viewType === 'Album' && (
					<div className="col-12 main-header mb-3">
						<div className="d-flex align-items-end">
							<img alt="playlist" className="img-fluid" src={currentAlbum.img} />
							<div className="info">
								<p className="info-title">
									{currentAlbum.artistName ? currentAlbum.artistName : ''}
								</p>
								<h3 className="info-album">{currentAlbum.albumName}</h3>
								<Playbutton />
							</div>
						</div>
					</div>
				)}

				{viewType === 'Artist' && currentArtist && (
					<div className="col-12 main-header mb-3">
						<div className="d-flex align-items-end">
							<img
								alt="current-artist"
								className="img-fluid"
								src={currentArtist.images[0].url}
							/>
							<div className="info">
								<h3 className="info-title">{currentArtist.name}</h3>
								<Playbutton />
							</div>
						</div>
					</div>
				)}

				{(title === 'Songs' ||
					title === 'Recently Played' ||
					title === 'Albums' ||
					title === 'Artists') && (
					<div className="col-12 main-header mb-3">
						<h3 className="main-header__title">{title}</h3>
						{title !== 'Artists' && <Playbutton />}
					</div>
				)}
				{title === 'Browse' && (
					<div className="col-12 main-header mb-3">
						<h3 className="main-header__title">{title}</h3>
						<div className="browse-headers">
							{browseSection &&
								browseSection.map((item, i) => (
									<p
										role="presentation"
										key={item.name}
										className={
											viewType === item.viewType
												? 'active'
												: '' || (viewType === 'GenresPlaylists' && i === 0)
												? 'active'
												: ''
										}
										onClick={() => {
											item.actionFetch(token);
											updateViewType(item.viewType);
											updateHeaderTitle('Browse');
											browseReducer(item.reducer);
										}}
									>
										{item.name}
									</p>
								))}
						</div>
					</div>
				)}
			</>
		);
	})
);

MainHeader.wrappedComponent.propTypes = {
	SpotifyStore: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired
};

export default MainHeader;
