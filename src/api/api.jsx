import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '34470950-02ddf263054359fc18b5be4c8';

export const searchImages = async (query, page) => {
  const params = {
    q: query,
    page,
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
  };
  try {
    const { data } = await axios.get(BASE_URL, { params });
    const { hits, totalHits } = data;
    const images = hits.map(({ id, webformatURL, tags, largeImageURL }) => ({
      id,
      tags,
      webformatURL,
      largeImageURL,
    }));
    return { images, totalHits };
  } catch (error) {
    throw new Error(error);
  }
};
