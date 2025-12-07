import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export const refs = {
  searchForm: document.querySelector('.form'),
  searchBtn: document.querySelector('button[type="submit"]'),
  galleryList: document.querySelector('.gallery'),
  loader: document.querySelector('.loader'),
};

export const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
  const markup = images
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

  refs.galleryList.innerHTML = markup;
  lightbox.refresh();
}

export function clearGallery() {
  refs.galleryList.innerHTML = '';
}

export function showLoader() {
  refs.loader.classList.add('is-visible');
}

export function hideLoader() {
  refs.loader.classList.remove('is-visible');
}
