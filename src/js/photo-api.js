// Підключення бібліотеки 
import axios from 'axios';
//========================

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '38572739-8ecec7d616fae8b4ce60f4b21';
export const numRequestedPhotos = 40;

export const fetchPhoto = async (photoTitle, page) => {
  const response = await axios.get(`${BASE_URL}`, {
    params: {
      key: `${API_KEY}`,
      q: `${photoTitle}`,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: page,
      per_page: `${numRequestedPhotos}`,
    },
  });  
  return response.data;
};
