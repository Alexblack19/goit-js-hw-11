// Описаний в документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

import { searchPhoto } from './js/photo-api.js';

const formEl = document.querySelector('#search-form');
const galleryListEl = document.querySelector('.gallery');
// formEl.addEventListener('submit', onSearchPhotoSubmit);

searchPhoto('dog')
  .then(data => {
    const photoArr = data.hits;
    const galleryMarkup = createImgGalleryMarkup(photoArr);
    galleryListEl.insertAdjacentHTML('beforeend', galleryMarkup);
    let gallery = new SimpleLightbox('.gallery .card-link', {
      captionsData: 'alt',
      captionDelay: 250,
      enableKeyboard: true,
    });
  })

  .catch(error => console.log(error.message));

function createImgGalleryMarkup(photoArr) {
  return photoArr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<a class="card-link" href="${largeImageURL}">
             <div class="photo-card">        
               <img src="${webformatURL}" alt="${tags}" loading="lazy" />
               <div class="info">
                  <p class="info-item">
                      <b>Likes ${likes}</b>
                  </p>
                  <p class="info-item">
                      <b>Views ${views}</b>
                  </p>
                  <p class="info-item">
                      <b>Comments ${comments}</b>
                  </p>
                  <p class="info-item">
                      <b>Downloads ${downloads}</b>
                  </p>
               </div>           
             </div>
            </a>`
    )
    .join('');
}
