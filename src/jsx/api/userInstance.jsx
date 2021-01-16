import axios from 'axios';

const userInstance = axios.create({
	baseURL: 'https://api.spotify.com/v1/',
	responseType: 'json'
});

export default userInstance;
