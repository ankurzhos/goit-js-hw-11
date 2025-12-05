import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  lightbox,
  showLoader,
  hideLoader,
} from './js/render-functions';
import errorIcon from './img/errorIcon.svg';

const refs = {
  searchForm: document.querySelector('.form'),
  searchBtn: document.querySelector('button[type="submit"]'),
  galleryList: document.querySelector('.gallery'),
};

refs.searchForm.addEventListener('submit', event => {
  event.preventDefault();

  clearGallery();
  const query = refs.searchForm.elements['search-text'].value;

  if (query.trim() !== '') {
    showLoader();
    getImagesByQuery(query)
      .then(allImages => {
        if (allImages.length === 0) {
          iziToast.show({
            message:
              'Sorry, there are no images matching your search query. Please try again!',
            iconUrl: errorIcon,
            backgroundColor: '#ef4040',
            messageColor: '#fff',
            titleColor: '#fff',
            messageSize: '16px',
            position: 'topRight',
            close: false,
          });
          return;
        }
        const markup = createGallery(allImages);
        refs.galleryList.insertAdjacentHTML('afterbegin', markup);

        lightbox.refresh();
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => {
        hideLoader();
      });
  }
});
