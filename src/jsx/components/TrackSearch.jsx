import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

const TrackSearch = inject('SpotifyStore')(
	observer((props) => {
		const { SpotifyStore } = props;

		const [searchTerm, setSearchTerm] = useState('');

		const handleUpdateSearchTerm = (e) => {
			setSearchTerm(e.target.value);
		};

		return (
			<>
				<div className="track-search-container">
					<form
						onSubmit={() => {
							SpotifyStore.searchSongs(SpotifyStore.token, searchTerm);
						}}
					>
						<input
							onChange={(e) => handleUpdateSearchTerm(e)}
							type="text"
							placeholder="Search..."
							aria-label="Search..."
						/>
						<button
							type="submit"
							onClick={(e) => {
								e.preventDefault();
								SpotifyStore.searchSongs(SpotifyStore.token, searchTerm);
							}}
						>
							<i className="fa fa-search search" aria-hidden="true" />
						</button>
					</form>
				</div>
			</>
		);
	})
);

TrackSearch.wrappedComponent.propTypes = {
	SpotifyStore: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
	searchSongs: PropTypes.func
};

export default TrackSearch;
