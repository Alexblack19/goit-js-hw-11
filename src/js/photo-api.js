import axios from 'axios';

// axios.defaults.headers.common['key'] = '38572739-8ecec7d616fae8b4ce60f4b21';

export const searchPhoto = async () => {
  const response = await axios.get(
    'https://pixabay.com/api/?key=38572739-8ecec7d616fae8b4ce60f4b21&q=cat&image_type=photo&orientation =horizontal&safesearch =true&per_page=40'
  );
  console.log(response);
  return response.data;
};
