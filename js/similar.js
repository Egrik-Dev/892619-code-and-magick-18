'use strict';

(function () {
  var URL_LOAD = 'https://js.dump.academy/code-and-magick/data';
  var METHOD_GET = 'GET';
  var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var similarList = window.setupModal.querySelector('.setup-similar-list');
  var wizards = [];
  var newColorCoat;
  var newColorEyes;

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === newColorCoat) {
      rank += 2;
    }

    if (wizard.colorEyes === newColorEyes) {
      rank += 1;
    }

    return rank;
  };

  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  var updateWizards = function () {
    renderWizards(wizards.sort(function (a, b) {
      var rankDiff = getRank(b) - getRank(a);
      if (rankDiff === 0) {
        rankDiff = namesComparator(a.name, b.name);
      }
      return rankDiff;
    }));
  };

  window.wizard.onEyesChange = window.util.debounce(function (color) {
    newColorEyes = color;
    updateWizards();
  });

  window.wizard.onCoatChange = window.util.debounce(function (color) {
    newColorCoat = color;
    updateWizards();
  });

  var successLoad = function (arr) {
    wizards = arr;
    updateWizards();
  };

  var createWizard = function (arrElement) {
    var wizardElement = wizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = arrElement.name;
    wizardElement.querySelector('.wizard-coat').style.fill = arrElement.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = arrElement.colorEyes;

    return wizardElement;
  };

  var renderWizards = function (arr) {
    similarList.innerHTML = '';
    var fragment = document.createDocumentFragment();

    for (var j = 0; j < 4; j++) {
      fragment.appendChild(createWizard(arr[j]));
    }

    similarList.appendChild(fragment);
    window.setupModal.querySelector('.setup-similar').classList.remove('hidden');
  };

  window.backend.ajax(METHOD_GET, URL_LOAD, successLoad, window.backend.errorLoad);
})();
