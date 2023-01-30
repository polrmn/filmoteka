import { createListItem } from './createFilmListMarkup';
import { createFilmData } from './createFilmData';

import Pagination from 'tui-pagination';
// import 'tui-pagination/dist/tui-pagination.min.css';

const container = document.getElementById('tui-pagination-container');
const options = {
  totalItems: 1000,
  itemsPerPage: 20,
  visiblePages: 5,
  page: 1,
  centerAlign: false,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
  template: {
    page: '<a href="#" class="tui-page-btn pagination__numb pagination__item">{{page}}</a>',
    currentPage:
      '<strong class="tui-page-btn tui-is-selected pagination__active pagination__numb pagination__item">{{page}}</strong>',
    moveButton:
      '<a href="#" class="tui-page-btn tui-{{type}} pagination__arrow pagination__item">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}} pagination__arrow" >' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip pagination__dots pagination__item">' +
      '<span class="tui-ico-ellip">...</span>' +
      '</a>',
  },
};
const pagination = new Pagination(container, options);

pagination.on('afterMove', e => {
  createFilmData(e.page).then(arr => {
    document.querySelector('.loader').classList.add('hidden');
    const movieItem = document.querySelector('.card-list');
    movieItem.innerHTML = '';
    arr.forEach(film => {
      createListItem(film);
    });
  });
});
