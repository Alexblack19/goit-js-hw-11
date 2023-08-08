//============= Підключення бібліотек ===============
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
// ==================================================

import './img/icons.svg'

// const cardHeight = photo-card (flex-basis)
// console.log(cardHeight);

// console.log(window.getComputedStyle());

import { formEl, galleryListEl, loadMoreBtnEl } from './js/refs.js';
import { numRequestedPhotos, fetchPhoto } from './js/photo-api.js';
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
  try {
    const data = await fetchPhoto(photoTitle, page);
    Notiflix.Notify.info(`Hooray! We found ${data.totalHits} images.`);

    if (!data.hits.length) {
      Notiflix.Notify.warning(
        'Sorry, there are no images matching your search query. Please try again.',
        { position: 'center-center' }
      );
      loadMoreBtnEl.classList.add('is-hidden');
      return;
    }

    if (data.hits.length * page === data.totalHits) {
      loadMoreBtnEl.classList.add('is-hidden');
    } else {
      loadMoreBtnEl.classList.remove('is-hidden');
    }

    galleryMarkupDom(data.hits);
  } catch (error) {
    console.log(error.message);
  }
}

async function onLoadMoreClick(e) {
  page += 1;
  try {
    const data = await fetchPhoto(photoTitle, page);
    galleryMarkupDom(data.hits);
    smoothScrollGallery();

    if (numRequestedPhotos * page >= data.totalHits) {
      loadMoreBtnEl.classList.add('is-hidden');
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results.",
        { position: 'center-center' }
      );
    }
  } catch (error) {
    console.log(error.message);
  }
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
  console.dir(galleryListEl);
  const { height: cardHeight } =
    galleryListEl.firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

// ==============================================================

const upBtnMarkup = `<button type="button" class="upscroll-btn">
<svg class="icon-uparrow" width="16" height="16">
  <use href="icons.svg#icon-uparrow"></use>
</svg>
</button>`;
loadMoreBtnEl.insertAdjacentHTML('afterend', upBtnMarkup);

function scrollGalleryStart() {
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
}
const upScrollBtnEl = document.querySelector('.upscroll-btn');
upScrollBtnEl.addEventListener('click', scrollGalleryStart);
// ==============================================================

formEl.addEventListener('submit', onSearchSubmit);
loadMoreBtnEl.addEventListener('click', onLoadMoreClick);
