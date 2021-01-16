import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';

import App from './App';
import SpotifyStore from './SpotifyStore';

const rootID = document.querySelector('main');

const Root = (
	<Provider SpotifyStore={SpotifyStore}>
		<App />
	</Provider>
);

if (typeof rootID !== 'undefined' && rootID != null) {
	ReactDOM.render(Root, rootID);
}
