import axios from 'axios';

// axios.defaults.headers.common['key'] = '38572739-8ecec7d616fae8b4ce60f4b21';
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '38572739-8ecec7d616fae8b4ce60f4b21';

export const searchPhoto = async (photoName) => {
  const response = await axios.get(
    `${BASE_URL}`,
    {
      params: {
        key: `${API_KEY}`,
        q: `${photoName}`,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 40,
      },
    }    
  );
  console.log(response);
  return response.data;
};