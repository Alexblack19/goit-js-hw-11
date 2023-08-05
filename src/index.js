//=========== Підключення бібліотек ============
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
// =============================================

import { fetchPhoto } from './js/photo-api.js';
import { createGalleryMarkup } from './js/markup-card.js';

const refs = {
  formEl: document.querySelector('#search-form'),
  galleryListEl: document.querySelector('.gallery'),
  loadMoreBtnEl: document.querySelector('.load-more'),
};

const { formEl, galleryListEl, loadMoreBtnEl } = refs;

async function onSearchSubmit(e) {
  e.preventDefault();
  galleryListEl.innerHTML = '';

  const photoTitle = e.target.firstElementChild.value.trim();
  if (photoTitle === '') {
    galleryListEl.innerHTML = '';
    return;
  }

  await fetchPhoto(photoTitle)
    .then(data => {
      if (!data.hits.length) {
        Notiflix.Notify.warning(
          'Sorry, there are no images matching your search query. Please try again.',
          { position: 'center-center' }
        );
      }
      const galleryMarkup = createGalleryMarkup(data.hits);
      galleryListEl.insertAdjacentHTML('beforeend', galleryMarkup);
      simpleLightboxPlugin();
    })
    .catch(error => console.log(error.message));
}

function simpleLightboxPlugin() {
  new SimpleLightbox('.gallery .card-link', {
    captionsData: 'alt',
    captionDelay: 250,
    enableKeyboard: true,
  });
}

formEl.addEventListener('submit', onSearchSubmit);
// loadMoreBtnEl.addEventListener('click', onLoadMoreClick);

// function onLoadMoreClick(e) {
//   console.dir(e);
//   const load =
//     e.target.previousElementSibling.previousElementSibling.elements.searchQuery
//       .value;
// }
