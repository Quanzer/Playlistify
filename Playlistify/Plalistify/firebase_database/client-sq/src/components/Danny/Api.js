import axios from 'axios';

const BASE_URL = 'https://playlistify-ba03c-default-rtdb.firebaseio.com/';

export const createRoom = async (formData) => {
    return axios.post(`${BASE_URL}rooms.json`, formData);
};