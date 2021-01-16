export const playSong = (song) => ({
	type: 'PLAY_SONG',
	song
});

export const stopSong = () => ({
	type: 'STOP_SONG'
});

export const pauseSong = () => ({
	type: 'PAUSE_SONG'
});

export const resumeSong = () => ({
	type: 'RESUME_SONG'
});

export const increaseSongTime = (time) => ({
	type: 'INCREASE_SONG_TIME',
	time
});
