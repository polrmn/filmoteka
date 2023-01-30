import { createFilmData, createFilmDataByQuery } from './createFilmData';
import { createListItem } from './createFilmListMarkup';

const {
  headerContainer,
  homeButton,
  libraryButton,
  libraryButtonContainer,
  movieSearchInputContainer,
  watchedButton,
  queueButton,
  searchForm,
  cardList,
  searchInput,
  logo,
} = {
  homeButton: document.querySelector('.home-nav-button'),
  searchInput: document.querySelector('.movie-search-input'),
  libraryButton: document.querySelector('.library-nav-button'),
  libraryButtonContainer: document.querySelector('.library-button-container'),
  movieSearchInputContainer: document.querySelector(
    '.movie-search-input-container'
  ),
  watchedButton: document.querySelector('.watched-button'),
  queueButton: document.querySelector('.queue-button'),
  headerContainer: document.querySelector('.header-container'),
  searchForm: document.querySelector('.movie-search-form'),
  cardList: document.querySelector('.card-list'),
  logo: document.querySelector('.header-logo-container'),
};

homeButton.addEventListener('click', homeButtonHandler);
libraryButton.addEventListener('click', libraryButtonHandler);
watchedButton.addEventListener('click', watchedButtonHandler);
queueButton.addEventListener('click', queueButtonHandler);
searchForm.addEventListener('submit', searchFormSubmitHandler);
searchInput.addEventListener('input', inputChangeHandler);
logo.addEventListener('click', logoButtonHandler);

let headerSearchInput = true;
headerSearchInput
  ? libraryButtonContainer.classList.add('hidden')
  : libraryButtonContainer.classList.remove('hidden');
headerSearchInput
  ? headerContainer.classList.add('header-home-bg')
  : libraryButtonContainer.classList.add('header-library-bg');

function inputChangeHandler(e) {
  document.querySelector('.search-error').classList.add('hidden');
  if (e.target.value === '') {
    cardList.innerHTML = '';
    createFilmData().then(arr => {
      arr.forEach(film => {
        createListItem(film);
      });
    });
  }
}

function homeButtonHandler(e) {
  headerContainer.classList.add('header-home-bg');
  headerContainer.classList.remove('header-library-bg');
  libraryButtonContainer.classList.add('hidden');
  movieSearchInputContainer.classList.remove('hidden');
  homeButton.classList.add('active-nav-button');
  libraryButton.classList.remove('active-nav-button');
  headerSearchInput = true;

  cardList.innerHTML = '';

  createFilmData().then(arr => {
    document.querySelector('.loader').classList.add('hidden');
    arr.forEach(film => {
      createListItem(film);
    });
  });
}

function libraryButtonHandler(e) {
  headerContainer.classList.add('header-library-bg');
  headerContainer.classList.remove('header-home-bg');
  libraryButtonContainer.classList.remove('hidden');
  movieSearchInputContainer.classList.add('hidden');
  homeButton.classList.remove('active-nav-button');
  libraryButton.classList.add('active-nav-button');
  headerSearchInput = false;
}

function watchedButtonHandler(e) {
  watchedButton.classList.add('library-active-button');
  queueButton.classList.remove('library-active-button');
}

function queueButtonHandler(e) {
  watchedButton.classList.remove('library-active-button');
  queueButton.classList.add('library-active-button');
}

async function searchFormSubmitHandler(e) {
  e.preventDefault();
  try {
    const query = e.target.elements['search-input'].value;
    const res = await createFilmDataByQuery(query);
    cardList.innerHTML = '';
    res.forEach(film => createListItem(film));
  } catch (e) {
    document.querySelector('.search-error').classList.remove('hidden');
  }
}

function logoButtonHandler() {
  cardList.innerHTML = '';

  createFilmData().then(arr => {
    document.querySelector('.loader').classList.add('hidden');
    arr.forEach(film => {
      createListItem(film);
    });
  });
}
