// import axios from 'axios';

import { getSingleMovieById } from './fetchServices';
import { LocaleStorageService } from './localeStorage';

const movieCards = document.querySelector('.card-list');

const refs = {
  openModalBtn: document.querySelector('[data-modal-open]'),
  closeModalBtn: document.getElementById('button-modal-close'),
  modal: document.getElementById('modal'),
  modalImg: document.getElementById('modal-img'),
  modalTitle: document.getElementById('modal-title'),
  modalVote: document.getElementById('modal-vote'),
  modalVotes: document.getElementById('modal-votes'),
  modalPopular: document.getElementById('modal-popular'),
  modalOriginalTitle: document.getElementById('modal-original-title'),
  modalGenre: document.getElementById('modal-genre'),
  modalDescr: document.getElementById('modal-descr'),
  loadingState: document.getElementById('status-loading'),
  watchedBtn: document.getElementById('watchedBtn'),
  queueBtn: document.getElementById('queueBtn'),
};

class ModalService_ {
  elem = {};
  isHidden = true;

  generateModalContent() {
    refs.modalImg.setAttribute(
      'src',
      `https://image.tmdb.org/t/p/w500/${this.elem.poster_path}`
    );
    refs.modalTitle.textContent = this.elem.original_title;
    refs.modalVote.textContent = this.elem.vote_average.toFixed(1);
    refs.modalVotes.textContent = this.elem.vote_count;
    refs.modalPopular.textContent = this.elem.popularity.toFixed(1);
    refs.modalOriginalTitle.textContent = this.elem.original_title;
    refs.modalGenre.textContent = this.elem.genres
      .map(({ name }) => name)
      .join(', ');
    refs.modalDescr.textContent = this.elem.overview;
  }

  clearModalContent() {
    refs.modalImg.removeAttribute('src');
    refs.modalTitle.textContent = '';
    refs.modalVote.textContent = '';
    refs.modalVotes.textContent = '';
    refs.modalPopular.textContent = '';
    refs.modalOriginalTitle.textContent = '';
    refs.modalGenre.textContent = '';
    refs.modalDescr.textContent = '';
  }

  async openModal(id) {
    refs.modal.classList.remove('is-hidden');
    // this.toggleModal();
    this.isHidden = false;
    refs.loadingState.classList.remove('hidden-state');
    this.elem = await getSingleMovieById(id);
    refs.loadingState.classList.add('hidden-state');
    this.generateModalContent();
  }

  closeModal() {
    refs.modal.classList.add('is-hidden');
    this.isHidden = true;
    this.clearModalContent();
  }

  saveToList(listName) {
    const load = LocaleStorageService.loadFromLS(listName);
    if (load === null) {
      const savedArray = [this.elem];
      LocaleStorageService.saveToLS(listName, savedArray);
    } else if (load.some(elem => this.elem.id === elem.id)) {
      return;
    } else {
      load.push(this.elem);
      LocaleStorageService.saveToLS(listName, load);
    }
  }

  saveToWatched() {
    this.saveToList('watched');
    this.closeModal();
  }

  saveToQueue() {
    this.saveToList('queue');
    this.closeModal();
  }

  init() {
    refs.closeModalBtn.addEventListener('click', this.closeModal.bind(this));
    window.addEventListener('keydown', e => {
      if (this.isHidden) {
        return;
      }
      if (e.code === 'Escape') {
        this.closeModal();
      }
    });
    window.addEventListener(
      'click',
      function (e) {
        if (
          !refs.modal.classList.contains('is-hidden') &&
          e.target == refs.modal
        ) {
          this.closeModal();
        }
      }.bind(this)
    );
    refs.watchedBtn.addEventListener('click', this.saveToWatched.bind(this));
    refs.queueBtn.addEventListener('click', this.saveToQueue.bind(this));
  }
}

export const ModalService = new ModalService_();
ModalService.init();
