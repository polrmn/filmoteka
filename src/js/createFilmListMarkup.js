import { ModalService } from './modal';
import { createFilmData } from './createFilmData';

const { cardList } = {
  cardList: document.querySelector('.card-list'),
};
createFilmData().then(arr => {
  document.querySelector('.loader').classList.add('hidden');
  arr.forEach(film => {
    createListItem(film);
  });
});

export function createListItem(elem) {
  const item = document.createElement('li');
  item.classList.add('listItem');
  const image = document.createElement('img');
  image.classList.add('listItemImage');
  image.setAttribute('src', elem.poster_path);
  const filmInfoContainer = document.createElement('div');
  filmInfoContainer.classList.add('filmInfoContainer');
  const filmName = document.createElement('h2');
  filmName.classList.add('filmName');
  filmName.textContent = elem.original_title;
  const filmInfo = document.createElement('span');
  filmInfo.classList.add('filmInfo');
  filmInfo.textContent = `${elem.genres} |  ${elem.first_air_date}`;
  const filmRating = document.createElement('span');
  filmRating.classList.add('filmRating');
  filmRating.textContent = `${elem.vote_average}`;
  item.append(image);
  filmInfoContainer.append(filmName);
  filmInfoContainer.append(filmInfo);
  filmInfoContainer.append(filmRating);
  item.append(filmInfoContainer);
  cardList.append(item);

  item.addEventListener('click', () => {
    ModalService.openModal(elem.id);
  });
}
