export function smoothScrollGallery(galleryListEl) {
  const { height } = galleryListEl.firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: height * 2,
    behavior: 'smooth',
  });
}

export function onScrollGalleryStart() {
  window.scroll({
    top: 0,
    behavior: 'smooth',
  });
}
