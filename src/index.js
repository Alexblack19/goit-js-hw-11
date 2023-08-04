//=========== Підключення бібліотек ============
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
// =============================================

import { fetchPhoto } from './js/photo-api.js';

const formEl = document.querySelector('#search-form');
const galleryListEl = document.querySelector('.gallery');
const loadMoreBtnEl = document.querySelector('.load-more');

function onSearchSubmit(e) {
  e.preventDefault();
  galleryListEl.innerHTML = '';
  const photoTitle = e.target.firstElementChild.value;
  if (photoTitle === '') {
    galleryListEl.innerHTML = '';
    return;
  }

  fetchPhoto(photoTitle)
    .then(data => {
      if (!data.hits.length) {
        Notiflix.Notify.warning(
          'Sorry, there are no images matching your search query. Please try again.',
          { position: 'center-center' }
        );
      }

      const galleryMarkup = createGalleryMarkup(data.hits);
      galleryListEl.insertAdjacentHTML('beforeend', galleryMarkup);
      new SimpleLightbox('.gallery .card-link', {
        captionsData: 'alt',
        captionDelay: 250,
        enableKeyboard: true,
      });
    })
    .catch(error => console.log(error.message));
}

function createGalleryMarkup(photoArr) {
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
    );
}

formEl.addEventListener('submit', onSearchSubmit);
loadMoreBtnEl.addEventListener('click', onLoadMoreClick);

function onLoadMoreClick(e) {
  const load =
    e.target.previousElementSibling.previousElementSibling.elements.searchQuery
      .value;
}
