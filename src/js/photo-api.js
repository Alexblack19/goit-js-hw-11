import axios from 'axios';

// const BASE_URL = 'https://pixabay.com/api';

// axios.defaults.headers.common['key'] = '38572739-8ecec7d616fae8b4ce60f4b21';

const searchPhoto = () =>
  axios
    .get(
      `https://pixabay.com/api/?key=38572739-8ecec7d616fae8b4ce60f4b21&q=dog&image_type=photo&orientation =horizontal&safesearch =true&per_page=5`
    )
    .then(response => {
      return response.data;
    });

searchPhoto()
  .then(data => console.log(data))
  .catch(error => console.log(error));

  console.log('Hello');
