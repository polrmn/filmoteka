const queue = document.getElementById(`queueBtn`)
const watched = document.getElementById(`watchedBtn`)
const queueHeader = document.querySelector(`.queue-button`)
const watchedHeader = document.querySelector(`.watched-button`)
const myLibrary = document.querySelector(`.library-nav-button`)
const list = document.querySelector(`.card-list`)
import {createListItem} from './createFilmListMarkup'
import { LocaleStorageService } from './localeStorage';
import { createFilmData} from './createFilmData';

myLibrary.addEventListener(`click`, setMarkupWatched);
queueHeader.addEventListener(`click`, setMarkupQueue);
watchedHeader.addEventListener(`click`, setMarkupWatched);


// const watchedLs = JSON.parse(localStorage.getItem( "watched"))
// const queueLs = JSON.parse(localStorage.getItem("queue"))

 

// function createMoviesLsQueue(queueLs) {
//     const filmsDataArray = [];
//   const queueMarkup = queueLs; 
//   console.log(queueMarkup);
//         for (const film of queueMarkup) {
//           const filmData = {
//             id: film.id,
//           };
//           const releaseDate = film.first_air_date || film.release_date;
//           filmData.poster_path = `https://image.tmdb.org/t/p/w500${film.poster_path}`;
//           filmData.original_title =
//             film.name || film.title || film.original_name || film.original_title;
//           // filmData.first_air_date = releaseDate.slice(0, 4);
//           filmData.vote_average = Math.floor(film.vote_average * 10) / 10;
//           filmData.genres = film.genres_name;
//           filmsDataArray.push(filmData);
//         }

//     return filmsDataArray;
// }
// console.log(createMoviesLsQueue(queueLs));

function createMoviesLs(key) {
  const filmsDataArray = [];
      const watchedMarkup = LocaleStorageService.loadFromLS(key) || []; 
       
  for (const film of watchedMarkup) {
        //  console.log("test");
          const filmData = {
            id: film.id,};
    // console.log(filmData);
          const releaseDate = film.first_air_date || film.release_date;
           filmData.poster_path = `https://image.tmdb.org/t/p/w500${film.poster_path}`;
           filmData.original_title =
           film.name || film.title || film.original_name || film.original_title;
           filmData.first_air_date = releaseDate.slice(0, 4);
           filmData.vote_average = Math.floor(film.vote_average * 10) / 10;

    filmData.genres = film.genres.map(el => el.name);
          if (filmData.genres.length > 2) { 
            filmData.genres = [...filmData.genres.slice(0, 2), 'Other'].join( 
              ', ' 
            ); 
          }
          console.log(filmData.genres);
          filmsDataArray.push(filmData);
    
          
        }


  return filmsDataArray;
  
}
// createMoviesLs("watched")




function setMarkupQueue(queueLs) {

  if (queueLs !== null) {
      list.innerHTML = "";

      const moviesWatched = createMoviesLs("queue")
      moviesWatched.forEach(movie => { createListItem(movie) })
      console.log(4);
    }

}
    
function setMarkupWatched(watchedLs) {
    if (watchedLs !== null) {
      list.innerHTML = "";
      
      const moviesWatched = createMoviesLs("watched")
      moviesWatched.forEach(movie => { createListItem(movie) })
      console.log(4);
    }
}



//  const indexQueue = LocaleStorageService.loadFromLS(queue).indexOf(addMoviesWatched.id);
//  if (indexQueue === true) {
//     addMoviesQueue.splice(indexQueue, 1)
//     //  console.log(indexQueue);
// }
