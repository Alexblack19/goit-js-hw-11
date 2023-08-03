import { searchPhoto } from './js/photo-api.js';

const formEl = document.querySelector('#search-form');

// formEl.addEventListener('submit', onSearchPhotoSubmit);


  searchPhoto()
    .then(data => console.log(data.hits))
    .catch(error => console.log(error.message));


