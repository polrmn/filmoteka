import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
const apiKey = '5e0ca358c6a85ef9a9e43b6452e61748';
const params = {
  params: {
    api_key: `${apiKey}`,
    media_type: 'movie',
    page: 1,
  },
};

async function getMovieTrends(page) {
  params.params.page = page || 1;

  try {
    const { data } = await axios.get(
      'https://api.themoviedb.org/3/trending/all/week',
      params
    );
    const { results } = data;
    return results;
  } catch (error) {
    console.log(error);
  }
}

async function getMovieByQuery(seachingQuery) {
  try {
    const response = await axios.get('/search/movie', {
      params: {
        api_key: '5e0ca358c6a85ef9a9e43b6452e61748',
        query: seachingQuery,
      },
    });

    if (response.data.results.length === 0) {
      throw new Error('404');
    }

    return response.data.results;
  } catch (error) {
    console.log(error);
  }
}

async function getTvGenres() {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/genre/tv/list?api_key=${apiKey}&language=en-US`
  );
  const { genres } = data;
  return genres;
}

async function getMovieGenres() {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`
  );
  const { genres } = data;
  return genres;
}

export async function getTrendingFilms(page = 1) {
  const trendingFilms = await getMovieTrends(page);
  const tvGenres = await getTvGenres();
  const movieGenres = await getMovieGenres();
  const allGenres = [...tvGenres, ...movieGenres];
  trendingFilms.forEach(f => {
    const uniqGenresName = [];
    allGenres.forEach(g => {
      if (f.genre_ids.includes(g.id)) {
        uniqGenresName.push(g.name);
      }
    });
    const filtredGenres = uniqGenresName.filter(
      (genre_name, index, array) => array.indexOf(genre_name) === index
    );
    f.genres_name = [...filtredGenres];
  });
  return trendingFilms;
}

export async function getMoviesByName(seachingQuery) {
  const filmsByQuery = await getMovieByQuery(seachingQuery);
  const tvGenres = await getTvGenres();
  const movieGenres = await getMovieGenres();
  const allGenres = [...tvGenres, ...movieGenres];
  filmsByQuery.forEach(f => {
    const uniqGenresName = [];
    allGenres.forEach(g => {
      if (f.genre_ids.includes(g.id)) {
        uniqGenresName.push(g.name);
      }
    });
    const filtredGenres = uniqGenresName.filter(
      (genre_name, index, array) => array.indexOf(genre_name) === index
    );
    f.genres_name = [...filtredGenres];
  });
  return filmsByQuery;
}

export async function getSingleMovieById(id) {
  try {
    const { data } = await axios.get(`/movie/${id}`, {
      params: {
        api_key: '5e0ca358c6a85ef9a9e43b6452e61748',
      },
    });
    return data;
  } catch (error) {
    if (error.request.status === 404) {
      return;
    }
    console.log(error);
  }
}
