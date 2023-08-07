//=========== Підключення бібліотек ============
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
// =============================================

import { formEl, galleryListEl, loadMoreBtnEl } from './js/refs.js';
import { fetchPhoto } from './js/photo-api.js';
import { createGalleryMarkup } from './js/markup-card.js';

loadMoreBtnEl.classList.add('is-hidden');

let page = 1;
let photoTitle = '';

async function onSearchSubmit(e) {
  e.preventDefault();
  galleryListEl.innerHTML = '';
  loadMoreBtnEl.classList.add('is-hidden');

  photoTitle = e.target.firstElementChild.value.trim();
  if (!photoTitle) {
    return;
  }

  page = 1;
  await fetchPhoto(photoTitle, page)
    .then(data => {
      Notiflix.Notify.info(`Hooray! We found ${data.totalHits} images.`);

      if (!data.hits.length) {
        Notiflix.Notify.warning(
          'Sorry, there are no images matching your search query. Please try again.',
          { position: 'center-center' }
        );
        loadMoreBtnEl.classList.add('is-hidden');
        return;
      }

      galleryMarkupDom(data.hits);
      loadMoreBtnEl.classList.remove('is-hidden');

      if (data.hits.length * page === data.totalHits) {
        loadMoreBtnEl.classList.add('is-hidden');
        return;
      }
    })
    .catch(error => console.log(error.message));
}

async function onLoadMoreClick(e) {
  page += 1;
  await fetchPhoto(photoTitle, page)
    .then(data => {
      console.log(data);
      console.log(page);

      if (data.hits.length * page > data.totalHits) {
        loadMoreBtnEl.classList.add('is-hidden');
        Notiflix.Notify.info(
          "We're sorry, but you've reached the end of search results.",
          { position: 'center-center' }
        );
        return;
      }

      galleryMarkupDom(data.hits);
      smoothScrollGallery();
    })
    .catch(error => console.log(error.message));
}

function galleryMarkupDom(photoArr) {
  const galleryMarkup = createGalleryMarkup(photoArr);
  galleryListEl.insertAdjacentHTML('beforeend', galleryMarkup);
  simpleLightboxPlugin();
}

function simpleLightboxPlugin() {
  new SimpleLightbox('.gallery .card-link', {
    captionsData: 'alt',
    captionDelay: 250,
    enableKeyboard: true,
  });
}

function smoothScrollGallery() {
  const { height: cardHeight } =
    galleryListEl.firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

formEl.addEventListener('submit', onSearchSubmit);
loadMoreBtnEl.addEventListener('click', onLoadMoreClick);
