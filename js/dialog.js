'use strict';

(function () {
  window.setupModal = document.querySelector('.setup');
  var userAvatar = document.querySelector('.setup-open');
  var closeSetupModal = window.setupModal.querySelector('.setup-close');
  var inputSetupModal = window.setupModal.querySelector('.setup-user-name');
  window.upload = window.setupModal.querySelector('.upload');

  var onModalEscPress = function (evt) {
    window.util.isEscEvent(evt, closeModal);
    window.setupModal.removeAttribute('style');
  };

  var openModal = function () {
    window.setupModal.classList.remove('hidden');
    document.addEventListener('keydown', onModalEscPress);
  };

  var closeModal = function () {
    window.setupModal.classList.add('hidden');
    document.removeEventListener('keydown', onModalEscPress);
  };

  userAvatar.addEventListener('click', function () {
    openModal();
  });

  userAvatar.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, openModal);
  });

  closeSetupModal.addEventListener('click', function () {
    closeModal();
  });

  closeSetupModal.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closeModal);
  });

  inputSetupModal.addEventListener('keydown', function (evt) {
    evt.stopPropagation();
  });

  window.util.movingDialog(window.upload, window.setupModal);
})();
