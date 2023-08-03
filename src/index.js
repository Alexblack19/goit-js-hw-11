import { searchPhoto } from './js/photo-api.js';

searchPhoto()
  .then(data => console.log(data))
  .catch(error => console.log(error));

console.log('Hello');
