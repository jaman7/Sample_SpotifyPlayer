import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

const BrowseViewItem = inject('SpotifyStore')(
	observer((props) => {
		const { SpotifyStore, getlist, item, set } = props;

		const { token } = SpotifyStore;

		return (
			<>
				<li
					role="presentation"
					onClick={() => getlist(item, token)}
					className="category-item"
					key={item.id}
				>
					<div className="category-image">
						<img
							className="img-fluid"
							alt={item.name}
							src={item.icons ? item.icons[0].url : item.images[0].url}
						/>
						{set ? <p className="category-name">{item.name}</p> : <></>}
					</div>
				</li>
			</>
		);
	})
);

BrowseViewItem.wrappedComponent.propTypes = {
	SpotifyStore: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired
};

export default BrowseViewItem;
