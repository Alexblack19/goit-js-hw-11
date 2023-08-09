let galleryLightbox;

export function simpleLightboxPlugin() {  
  if (galleryLightbox) {
    galleryLightbox.refresh();
  } else {
    galleryLightbox = new SimpleLightbox('.gallery .card-link', {
      captionsData: 'alt',
      captionDelay: 250,
      enableKeyboard: true,
    });
  }
}