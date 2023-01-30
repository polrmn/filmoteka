import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/movie';
const params = {
  params: {
    api_key: '5e0ca358c6a85ef9a9e43b6452e61748',
    language: 'en-US',
  },
};

async function fetchMovieTrailerByID(movieID) {
  const { data } = await axios.get(`/${movieID}/videos`, params);
  return `https://www.youtube.com/watch?v=${data.results[0].key}`;
}

export default fetchMovieTrailerByID;
