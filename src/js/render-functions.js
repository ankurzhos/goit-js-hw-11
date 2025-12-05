import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
  return images
    .map(img => {
      return `<li class="gallery-item">
                    <a class="gallery-link" href="${img.largeImageURL}">
                        <img
                        class="gallery-image"
                        src="${img.webformatURL}"
                        alt="${img.tags}"
                        />
                    </a>
                    <ul class="info">
                        <li><b>Likes:</b> ${img.likes}</li>
                        <li><b>Views:</b> ${img.views}</li>
                        <li><b>Comments:</b> ${img.comments}</li>
                        <li><b>Downloads:</b> ${img.downloads}</li>
                    </ul>
                </li>`;
    })
    .join('');
}

export function clearGallery() {
  const galleryList = document.querySelector('.gallery');
  galleryList.innerHTML = '';
}

export function showLoader() {
  const loader = document.querySelector('.loader');
  loader.classList.add('is-visible');
}

export function hideLoader() {
  const loader = document.querySelector('.loader');
  loader.classList.remove('is-visible');
}
