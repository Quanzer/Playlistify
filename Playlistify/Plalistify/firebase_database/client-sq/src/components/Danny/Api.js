import axios from 'axios';

// this for post data the the database
// all the post and get need to be write in this file
const BASE_URL = 'https://playlistify-ba03c-default-rtdb.firebaseio.com/';

export const createRoom = async (formData) => {
    return axios.post(`${BASE_URL}rooms.json`, formData);
};