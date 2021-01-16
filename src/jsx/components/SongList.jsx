/* eslint-disable no-unused-vars */
/* eslint-disable react/self-closing-comp */
import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import SimpleBar from 'simplebar-react';

// import Wrapper from './Layout/Wrapper';

const SongList = inject('SpotifyStore')(
	observer((props) => {
		const { SpotifyStore } = props;

		const {
			viewType,
			songs,
			currentSong,
			setCurrentSong,
			currentAlbum,
			audioRef,
			isPlaying,
			playAudio,
			playSongHandler
		} = SpotifyStore;

		const msToMinutesAndSeconds = (ms) => {
			const minutes = Math.floor(ms / 60000);
			const seconds = ((ms % 60000) / 1000).toFixed(0);
			return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
		};

		const buttonClass = (song) =>
			song.id === currentSong.id && isPlaying ? 'fa-pause-circle' : 'fa-play-circle';

		const albumname = (songalbum, album) => {
			let albumName = '';
			if ('album' in songalbum) {
				albumName = songalbum.album.name;
			} else {
				albumName = album.albumName;
			}
			return albumName;
		};

		return (
			<>
				<div className="col-12">
					<div className="table">
						<div className="table-row table-row--head">
							<div className="table-cell column-heading csn"></div>
							<div className="table-cell column-heading csn"></div>
							<div className="table-cell column-heading cln">
								<p>TITLE</p>
							</div>
							<div className="table-cell column-heading cln">
								<p>TITLE</p>
							</div>
							<div className="table-cell column-heading cln">
								<p>ALBUM</p>
							</div>
							<div className="table-cell column-heading cmn">
								<p>
									<i className="fa fa-clock" aria-hidden="true"></i>
								</p>
							</div>
						</div>

						<SimpleBar className="scroll" forceVisible="y">
							{songs &&
								songs.map((song, i) => (
									<div
										className={
											song.id === currentSong.id
												? 'active table-row item'
												: 'table-row item'
										}
										key={`${song.name}song.${song.id}`}
									>
										<div
											role="presentation"
											onClick={() => {
												setCurrentSong(song);
												playAudio(true, audioRef);
												playSongHandler(isPlaying, audioRef);
											}}
											className="table-cell csn play-song"
										>
											<i
												className={`fas ${buttonClass(song)} play-btn`}
												aria-hidden="true"
											/>
										</div>
										{viewType !== 'Songs' && (
											<div
												role="presentation"
												className="table-cell csn add-song"
												// onClick={() => {
												// 	addSongToLibrary(token, song.id);
												// }}
											>
												{currentSong.id === song.id ? (
													<i
														className="fas fa-check add-song"
														aria-hidden="true"
													/>
												) : (
													<i
														className="fas fa-plus add-song"
														aria-hidden="true"
													/>
												)}
											</div>
										)}
										{viewType === 'Songs' && (
											<div className="table-cell csn add-song">
												<i className="fas fa-check" aria-hidden="true" />
											</div>
										)}
										<div className="table-cell cln">
											<p>{song.name}</p>
										</div>
										<div className="table-cell cln">
											<p>{song.artists[0].name}</p>
										</div>
										<div className="table-cell cln">
											<p>{albumname(song, currentAlbum)}</p>
										</div>
										<div className="table-cell cmn">
											<p>{msToMinutesAndSeconds(song.duration_ms)}</p>
										</div>
									</div>
								))}
						</SimpleBar>
					</div>
				</div>
			</>
		);
	})
);

SongList.wrappedComponent.propTypes = {
	SpotifyStore: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired
};

export default SongList;
