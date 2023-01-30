(() => {
  const refs = {
    openModalBtn: document.querySelector('[footer-modal-open]'),
    closeModalBtn: document.querySelector('[footer-modal-close]'),
    modal: document.querySelector('[footer-modal]'),
  };

  refs.openModalBtn.addEventListener('click', toggleModal);
  refs.closeModalBtn.addEventListener('click', toggleModal);

  function toggleModal() {
    refs.modal.classList.toggle('is-hidden');
  }
  window.addEventListener('click', function (e) {
    if (!refs.modal.classList.contains('is-hidden') && e.target == refs.modal) {
      refs.modal.classList.add('is-hidden');
    }
  });
})();
