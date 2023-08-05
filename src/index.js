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

loadMoreBtnEl.classList.add('is-hidden');

let page = 1;
let photoTitle = '';

async function onSearchSubmit(e) {
  e.preventDefault();
  galleryListEl.innerHTML = '';

  photoTitle = e.target.firstElementChild.value.trim();
  if (photoTitle === '') {
    return;
  }

  await fetchPhoto(photoTitle, page)
    .then(data => {
      page = 1;

      if (!data.hits.length) {
        Notiflix.Notify.warning(
          'Sorry, there are no images matching your search query. Please try again.',
          { position: 'center-center' }
        );
        loadMoreBtnEl.classList.add('is-hidden');
        return;
      }
      const galleryMarkup = createGalleryMarkup(data.hits);
      galleryListEl.insertAdjacentHTML('beforeend', galleryMarkup);

      loadMoreBtnEl.classList.remove('is-hidden');

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



async function onLoadMoreClick(e) {
  page += 1;
  console.log(page);

  await fetchPhoto(photoTitle, page)
    .then(data => {
      if (Math.ceil(data.total / data.hits.length) < page) {
        return;
      }

      const galleryMarkup = createGalleryMarkup(data.hits);
      galleryListEl.insertAdjacentHTML('beforeend', galleryMarkup);

      // console.log(data.total);
      // console.log(data.totalHits);

      // if (!data.hits.length) {
      //   Notiflix.Notify.warning(
      //     'Sorry, there are no images matching your search query. Please try again.',
      //     { position: 'center-center' }
      //   );
      //   loadMoreBtnEl.classList.add('is-hidden');
      //   return;
      // }

      // const galleryMarkup = createGalleryMarkup(data.hits);
      // galleryListEl.insertAdjacentHTML('beforeend', galleryMarkup);

      // loadMoreBtnEl.classList.remove('is-hidden');

      simpleLightboxPlugin();
    })
    .catch(error => console.log(error.message));
}




formEl.addEventListener('submit', onSearchSubmit);
loadMoreBtnEl.addEventListener('click', onLoadMoreClick);