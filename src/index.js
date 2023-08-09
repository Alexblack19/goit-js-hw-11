//============= Підключення бібліотек ===============
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
// ==================================================

import {
  formEl,
  galleryListEl,
  loadMoreBtnEl,
  upScrollBtnEl,
} from './js/refs.js';
import { numRequestedPhotos, fetchPhoto } from './js/photo-api.js';
import { createGalleryMarkup } from './js/markup-card.js';
import { simpleLightboxPlugin } from './js/lightbox.js';
import { loadBtnOff, loadBtnOn, scrollBtnOff, scrollBtnOn} from './js/btn-toggle.js';

loadBtnOff;
scrollBtnOff;

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

    Notiflix.Notify.info(`Hooray! We found ${data.totalHits} images.`);
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
        "We're sorry, but you've reached the end of search results."
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



function smoothScrollGallery() {
  const { height } = galleryListEl.firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: height * 2,
    behavior: 'smooth',
  });
}

function scrollGalleryStart() {
  window.scroll({
    top: 0,
    behavior: 'smooth',
  });
}

formEl.addEventListener('submit', onSearchSubmit);
loadMoreBtnEl.addEventListener('click', onLoadMoreClick);
upScrollBtnEl.addEventListener('click', scrollGalleryStart);

window.addEventListener('scroll', () => {
  // визначаємо величину прокручування
  const scrollY = window.scrollY || document.documentElement.scrollTop;
  // якщо сторінка прокручена більше ніж на 400px, то кнопку показуємо, інакше ховаємо
  scrollY > 400
    ? upScrollBtnEl.classList.remove('is-hidden')
    : upScrollBtnEl.classList.add('is-hidden');
});
