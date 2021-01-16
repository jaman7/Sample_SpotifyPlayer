/* eslint-disable no-unused-vars */
import React from 'react';
import { toJS, runInAction, configure, observable, computed, action } from 'mobx';

import userInstance from './api/userInstance';

configure({
	enforceActions: 'observed'
});

class SpotifyStore {
	@observable State = {
		songPlaying: false,
		songPaused: true
	};

	@observable audioRef = React.createRef(null);

	@observable isLoading = true;

	@observable sidebarStatus = true;

	@observable token = '';

	@observable user = {};

	@observable songs = [];

	@observable currentSong = {};

	@observable albums = [];

	@observable currentAlbum = {};

	@observable playlistMenu = [];

	@observable playlist = [];

	@observable currentPlaylist = [];

	@observable artists = [];

	@observable currentArtist = [];

	@observable categories = [];

	@observable categoriesPlaylists = [];

	@observable newReleases = [];

	@observable featured = [];

	@observable browseView = [];

	@observable title = '';

	@observable viewType = '';

	@observable type = 'start';

	@observable setHeader = {};

	@observable artistids = '';

	@observable isPlaying = false;

	// open hide sidebar
	@action
	openLibraryHandler = (state, e) => {
		e.preventDefault();
		this.sidebarStatus = !state;
	};

	// get hash
	@action getHashParams = () => {
		const hashParams = {};
		let e;
		const r = /([^&;=]+)=?([^&;]*)/g;
		const q = window.location.hash.substring(1);
		e = r.exec(q);
		while (e) {
			hashParams[e[1]] = decodeURIComponent(e[2]);
			e = r.exec(q);
		}
		return hashParams;
	};

	// token set
	@action
	setToken = (token) => {
		runInAction(() => {
			this.token = token;
		});
	};

	@action
	setHeaders = (token) => ({
		headers: {
			Authorization: `Bearer ${token}`
		}
	});

	@action
	setOauth = (token) => ({
		headers: {
			Authorization: `Bearer ${token}`
		}
	});

	// updateHeaderTitle
	@action
	updateHeaderTitle = (title) => {
		runInAction(() => {
			this.title = title;
		});
	};

	// updateViewType
	@action
	updateViewType = (view) => {
		runInAction(() => {
			this.viewType = view;
		});
	};

	// setArtistIds
	@action
	updateArtistIds = (view) => {
		runInAction(() => {
			this.artistids = view;
		});
	};

	// setVolume
	@action
	setVolume = (set) => {
		runInAction(() => {
			this.volume = set;
		});
	};

	// setBrowseView
	@action
	setBrowseView = (view) => {
		runInAction(() => {
			this.browseView = view;
		});
	};

	@action
	setCurrentSong = (view) => {
		runInAction(() => {
			this.currentSong = view;
		});
	};

	@action
	setCurrentAlbum = (view) => {
		runInAction(() => {
			this.currentAlbum = view;
		});
	};

	@action
	setcurrentPlaylist = (view) => {
		runInAction(() => {
			this.currentPlaylist = view;
		});
	};

	@action
	setcurrentArtist = (view) => {
		runInAction(() => {
			this.currentArtist = view;
		});
	};

	@action uniqBy = (arr, predicate) => {
		if (!Array.isArray(arr)) {
			return [];
		}
		const cb = typeof predicate === 'function' ? predicate : (o) => o[predicate];
		const pickedObjects = arr
			.filter((item) => item)
			.reduce((map, item) => {
				const key = cb(item);
				if (!key) {
					return map;
				}
				return map.has(key) ? map : map.set(key, item);
			}, new Map())
			.values();
		return [...pickedObjects];
	};

	// user fetch
	@action async fetchUser(accessToken) {
		try {
			const responce = await userInstance.get('me', this.setOauth(accessToken));
			if (responce.statusText === 'Unauthorized') {
				window.location.href = './';
			} else {
				runInAction(() => {
					this.user = responce.data;
					this.type = 'FETCH_USER_SUCCESS';
				});
			}
		} catch (err) {
			console.log(err);
			runInAction(() => {
				this.type = 'FETCH_USER_type';
			});
		}
	}

	// addSongToLibrary
	@action async addSongToLibrary(accessToken, id) {
		try {
			const res = await userInstance.put(`me/tracks?ids=${id}`, this.setOauth(accessToken));
			if (res.ok) {
				runInAction(() => {
					this.songId = id;
					this.type = 'ADD_SONG_TO_LIBRARY_SUCCESS';
				});
			}
		} catch (err) {
			console.log(err);
		}
	}

	// fetchRecentlyPlayed
	@action async fetchRecentlyPlayed(accessToken) {
		try {
			this.isLoading = true;
			const response = await userInstance.get(
				'me/player/recently-played',
				this.setOauth(accessToken)
			);
			const items = response.data.items.map((item) => item.track);
			const tracks = this.uniqBy(items, (item) => item.id);
			const data = tracks.filter((item) => item.preview_url != null);
			runInAction(() => {
				this.songs = data;
				this.type = 'FETCH_RECENTLY_PLAYED_SUCCESS';
				this.isLoading = false;
			});
		} catch (err) {
			console.log(err);
			runInAction(() => {
				this.type = 'FETCH_RECENTLY_PLAYED_type';
			});
		}
	}

	// fetchSongs
	@action async fetchSongs(accessToken) {
		try {
			this.isLoading = true;
			const response = await userInstance.get(
				'me/tracks?limit=50',
				this.setOauth(accessToken)
			);
			const items = response.data.items.map((item) => item.track);
			const tracks = items.filter((item) => item.preview_url != null);
			const dataartistIds = this.uniqBy(
				response.data.items,
				(item) => item.track.artists[0].name
			)
				.map((item) => item.track.artists[0].id)
				.join(',');
			runInAction(() => {
				this.artistids = String(dataartistIds);
				this.songs = tracks;
				this.type = 'FETCH_SONGS_SUCCESS';
				this.isLoading = false;
			});
		} catch (err) {
			console.log(err);
			runInAction(() => {
				this.type = 'FETCH_SONGS_type';
			});
		}
	}

	// searchSongs
	@action async searchSongs(accessToken, searchTerm) {
		try {
			this.isLoading = true;
			const response = await userInstance.get(
				`search?q=${searchTerm}&type=track`,
				this.setOauth(accessToken)
			);
			const items = response.data.tracks.items.filter((item) => item.preview_url != null);
			const data = this.uniqBy(items, (item) => item.id);
			runInAction(() => {
				this.songs = data;
				this.type = 'SEARCH_SONGS_SUCCESS';
				this.isLoading = false;
			});
		} catch (err) {
			console.log(err);
			runInAction(() => {
				this.type = 'SEARCH_SONGS_type';
			});
		}
	}

	// fetchAlbums
	@action async fetchAlbums(accessToken) {
		try {
			this.isLoading = true;
			const response = await userInstance.get('me/albums', this.setOauth(accessToken));
			runInAction(() => {
				this.albums = response.data.items;
				this.type = 'FETCH_ALBUMS_SUCCESS';
				this.isLoading = false;
				this.getsong = false;
			});
		} catch (err) {
			console.log(err);
			runInAction(() => {
				this.type = 'FETCH_ALBUMS_type';
			});
		}
	}

	// fetchAlbumsSongs
	@action async fetchAlbumsSongs(accessToken, albumid) {
		try {
			this.isLoading = true;
			const response = await userInstance.get(
				`albums/${albumid}/tracks`,
				this.setOauth(accessToken)
			);
			const items = response.data.items.filter((item) => item.preview_url != null);
			// console.log(toJS(items));
			runInAction(() => {
				this.songs = items;
				this.type = 'FETCH_ALBUMS_SONGS_SUCCESS';
				this.isLoading = false;
			});
		} catch (err) {
			console.log(err);
			runInAction(() => {
				this.type = 'FETCH_ALBUMS_SONGS_ERROR';
			});
		}
	}

	// fetchArtists
	@action async fetchArtists(accessToken, artistIds) {
		try {
			this.isLoading = true;
			const response = await userInstance.get(
				`/artists?ids=${artistIds}`,
				this.setOauth(accessToken)
			);
			runInAction(() => {
				this.artists = response.data.artists;
				this.type = 'FETCH_ARTISTS_SUCCESS';
				this.isLoading = false;
			});
		} catch (err) {
			console.log(err);
			runInAction(() => {
				this.type = 'FETCH_ARTIST_ERROR';
			});
		}
	}

	// fetchArtistSongs
	@action async fetchArtistSongs(accessToken, artistId) {
		try {
			this.isLoading = true;
			const res = await userInstance.get(
				`/artists/${artistId}/top-tracks?country=US`,
				this.setOauth(accessToken)
			);
			runInAction(() => {
				this.songs = [];
				this.songs = res.data.tracks;
				this.type = 'FETCH_ARTIST_SONGS_SUCCESS';
				this.isLoading = false;
			});
		} catch (err) {
			console.log(err);
			runInAction(() => {
				this.type = 'FETCH_ARTIST_SONGS_ERROR';
			});
		}
	}

	// -------- browse genres newrelases futured ----------------
	@action async fetchCategories(accessToken) {
		try {
			this.isLoading = true;
			const response = await userInstance.get(`/browse/categories`, {
				headers: {
					Authorization: `Bearer ${accessToken}`
				}
			});
			runInAction(() => {
				this.categories = response.data.categories.items;
				this.type = 'FETCH_CATEGORIES_SUCCESS';
				this.isLoading = false;
			});
		} catch (err) {
			console.log(err);
			runInAction(() => {
				this.type = 'FETCH_CATEGORIES_type';
			});
		}
	}

	@action async fetchNewReleases(accessToken) {
		try {
			this.isLoading = true;
			const response = await userInstance.get(`/browse/new-releases`, {
				headers: {
					Authorization: `Bearer ${accessToken}`
				}
			});
			runInAction(() => {
				this.newReleases = response.data.albums.items;
				this.type = 'FETCH_NEW_RELEASES_SUCCESS';
				this.isLoading = false;
			});
		} catch (err) {
			console.log(err);
		}
	}

	@action async fetchFeatured(accessToken) {
		try {
			this.isLoading = true;
			const response = await userInstance.get(`/browse/featured-playlists`, {
				headers: {
					Authorization: `Bearer ${accessToken}`
				}
			});
			runInAction(() => {
				this.featured = response.data.playlists.items;
				this.type = 'FETCH_FEATURED_SUCCESS';
				this.isLoading = false;
			});
		} catch (err) {
			console.log(err);
			runInAction(() => {
				this.type = 'FETCH_FEATURED_type';
			});
		}
	}

	// fetchPlaylistsMenu
	@action async fetchPlaylistsMenu(accessToken, userId) {
		try {
			this.isLoading = true;
			const response = await userInstance.get(
				`/users/${userId}/playlists`,
				this.setOauth(accessToken)
			);
			runInAction(() => {
				this.playlistMenu = response.data.items;
				this.type = 'FETCH_PLAYLIST_MENU_SUCCESS';
				this.isLoading = false;
			});
		} catch (err) {
			console.log(err);
			runInAction(() => {
				this.type = 'FETCH_PLAYLIST_MENU_type';
			});
		}
	}

	// fetchPlaylistSongs
	@action async fetchPlaylistSongs(accessToken, userId, playlistId) {
		try {
			this.isLoading = true;
			const response = await userInstance.get(
				`/users/${userId}/playlists/${playlistId}/tracks`,
				this.setOauth(accessToken)
			);
			const items = response.data.items.map((item) => item.track);
			const tracks = items.filter((item) => item.preview_url != null);
			runInAction(() => {
				this.songs = tracks;
				this.type = 'FETCH_PLAYLIST_SONGS_SUCCESS';
				this.isLoading = false;
			});
		} catch (err) {
			console.log(err);
			runInAction(() => {
				this.type = 'FETCH_PLAYLIST_SONGS_type';
			});
		}
	}

	@action async fetchCategoriesPlaylist(accessToken, categoryId) {
		try {
			this.isLoading = true;
			const response = await userInstance.get(`/browse/categories/${categoryId}/playlists`, {
				headers: {
					Authorization: `Bearer ${accessToken}`
				}
			});

			runInAction(() => {
				this.categoriesPlaylists = response.data.playlists.items;
				this.type = 'FETCH_CATEGORIES_Playlist_SUCCESS';
				this.isLoading = false;
				console.log(toJS(this.categoriesPlaylists));
			});
		} catch (err) {
			console.log(err);
			runInAction(() => {
				this.type = 'FETCH_CATEGORIES_Playlist_ERROR';
			});
		}
	}

	@action setPlay = (set) => {
		runInAction(() => {
			this.isPlaying = set;
		});
	};

	@action playAudio = (isPlaying, audioRef) => {
		if (isPlaying) {
			const playPromise = audioRef.current.play();
			if (playPromise !== undefined) {
				playPromise
					.then((audio) => {
						audioRef.current.play();
					})
					.catch((error) => console.log(error));
			}
		}
	};

	@action playSongHandler = (isPlaying, audioRef) => {
		if (isPlaying) {
			audioRef.current.pause();
			this.setPlay(!isPlaying);
		} else {
			audioRef.current.play();
			this.setPlay(!isPlaying);
		}
	};

	// find index task return
	@action findindexSongs = (id) => this.songs.findIndex((item) => item.id === id);

	@computed get getUserId() {
		return 'id' in this.user ? this.user.id : null;
	}

	@computed get getSongs() {
		return this.songs.length ? this.songs : null;
	}
}

const store = new SpotifyStore();

export default store;
