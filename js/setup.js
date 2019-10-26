'use strict';

(function () {
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var METHOD_POST = 'POST';
  var URL_SAVE = 'https://js.dump.academy/code-and-magick';
  var FILE_TYPES = ['gif', 'jpg', 'png', 'jpeg'];
  var wizardCoat = document.querySelector('.wizard-coat');
  var wizardEyes = document.querySelector('.wizard-eyes');
  var fireBall = document.querySelector('.setup-fireball-wrap');
  var fireBallInput = fireBall.querySelector('input');
  var form = window.setupModal.querySelector('.setup-wizard-form');
  var prewiev = document.querySelector('.setup-user-pic');
  var avatarFileChoser = document.querySelector('.upload input[type=file]');

  var successSave = function () {
    window.setupModal.classList.add('hidden');
  };

  form.addEventListener('submit', function (evt) {
    window.ajax(METHOD_POST, URL_SAVE, successSave, window.backend.errorLoad, new FormData(form));
    evt.preventDefault();
  });

  var changeColorFill = function (elem, color) {
    elem.style.fill = color;
  };

  var changeColorBackground = function () {
    var fireballColor = window.util.getRandomItem(FIREBALL_COLORS);
    fireBall.style.backgroundColor = fireballColor;
    fireBallInput.value = fireballColor;
  };

  wizardCoat.addEventListener('click', function () {
    var newColor = window.util.getRandomItem(COAT_COLORS);
    changeColorFill(wizardCoat, newColor);
    window.wizard.onCoatChange(newColor);
  });

  wizardEyes.addEventListener('click', function () {
    var newColor = window.util.getRandomItem(EYES_COLORS);
    changeColorFill(wizardEyes, newColor);
    window.wizard.onEyesChange(newColor);
  });

  fireBall.addEventListener('click', function () {
    changeColorBackground();
  });

  avatarFileChoser.addEventListener('change', function () {
    var file = avatarFileChoser.files[0];

    if (file) {
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (item) {
        return fileName.endsWith(item);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          prewiev.src = reader.result;
        });

        reader.readAsDataURL(file);
      }
    }
  });
})();
