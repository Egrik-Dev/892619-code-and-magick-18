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

  // upload.addEventListener('mousedown', function (evt) {
  //   evt.preventDefault();

  //   var startCoords = {
  //     x: evt.clientX,
  //     y: evt.clientY
  //   }

  //   var dragged = false;

  //   var onMouseMove = function (moveEvt) {
  //     moveEvt.preventDefault();
  //     dragged = true;

  //     var shift = {
  //       x: startCoords.x - moveEvt.clientX,
  //       y: startCoords.y - moveEvt.clientY
  //     };

  //     startCoords = {
  //       x: moveEvt.clientX,
  //       y: moveEvt.clientY
  //     };

  //     setupModal.style.top = (setupModal.offsetTop - shift.y) + 'px';
  //     setupModal.style.left = (setupModal.offsetLeft - shift.x) + 'px';
  //   };

  //   var onMouseUp = function (upEvt) {
  //     upEvt.preventDefault();

  //     if (dragged) {
  //       var onClickPreventDefault = function (evt) {
  //         evt.preventDefault();
  //         upload.removeEventListener('click', onClickPreventDefault);
  //       }
  //       upload.addEventListener('click', onClickPreventDefault);
  //     }
  //     document.removeEventListener('mousemove', onMouseMove);
  //     document.removeEventListener('mouseup', onMouseUp);
  //   };

  //   document.addEventListener('mousemove', onMouseMove);
  //   document.addEventListener('mouseup', onMouseUp);
  // })
})();
