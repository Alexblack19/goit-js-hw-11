import { searchPhoto } from './js/photo-api.js';

const formEl = document.querySelector('#search-form');
const galleryListEl = document.querySelector('.gallery');
// formEl.addEventListener('submit', onSearchPhotoSubmit);

searchPhoto('dog')
  .then(data => {
    const photoArr = data.hits;
    const galleryMarkup = createImgGalleryMarkup(photoArr);
    console.log(galleryMarkup);
    galleryListEl.insertAdjacentHTML('beforeend', galleryMarkup);
  })
  .catch(error => console.log(error.message));

function createImgGalleryMarkup(photoArr) {
  console.log(photoArr);
  const qwerty = photoArr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        `<div class="photo-card">
           <img src="${webformatURL}" alt="${tags}" loading="lazy" />
           <div class="info">
                <p class="info-item">
                    <b>Likes</b>
                </p>
                <p class="info-item">
                    <b>Views</b>
                </p>
                <p class="info-item">
                    <b>Comments</b>
                </p>
                <p class="info-item">
                    <b>Downloads</b>
                </p>
           </div>
         </div>`;
      }
    )
    .join('');
  console.log(qwerty);
  return qwerty;
}
