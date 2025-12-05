import axios from 'axios';

const server = axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    key: '53496925-12126050e94d4f0ec9c3f9f2d',
    q: '',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
  },
});

export function getImagesByQuery(query) {
  return server
    .get('/', { params: { q: query } })
    .then(response => response.data.hits);
}
