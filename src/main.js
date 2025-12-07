import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  refs,
} from './js/render-functions';
import errorIcon from './img/errorIcon.svg';
document.addEventListener('DOMContentLoaded', () => {
  refs.searchForm.addEventListener('submit', event => {
    event.preventDefault();

    const query = refs.searchForm.elements['search-text'].value.trim();

    if (!query) {
      iziToast.show({
        message: 'Please enter a search query!',
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

    clearGallery();
    showLoader();

    getImagesByQuery(query)
      .then(images => {
        if (images.length === 0) {
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

        createGallery(images);
      })
      .catch(err => {
        console.error(err);
        iziToast.show({
          message: 'Error while loading images. Please try again later.',
          backgroundColor: '#ef4040',
          messageColor: '#fff',
          position: 'topRight',
        });
      })
      .finally(() => {
        hideLoader();
      });
  });
});
