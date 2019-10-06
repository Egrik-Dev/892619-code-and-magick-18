'use strict';

(function () {
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var similarListElement = window.setupModal.querySelector('.setup-similar-list');
  var wizardCoat = document.querySelector('.wizard-coat');
  var wizardEyes = document.querySelector('.wizard-eyes');
  var fireBall = document.querySelector('.setup-fireball-wrap');
  var fireBallInput = fireBall.querySelector('input');
  var form = window.setupModal.querySelector('.setup-wizard-form');

  var getRandomItem = function (arr) {
    return arr[Math.round(Math.random() * (arr.length - 1))];
  };

  var createWizard = function (arrElement) {
    var wizardElement = wizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = arrElement.name;
    wizardElement.querySelector('.wizard-coat').style.fill = arrElement.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = arrElement.colorEyes;

    return wizardElement;
  };

  var successLoad = function (arr) {
    var fragment = document.createDocumentFragment();
    var startArr = window.util.getRandomNum(0, arr.length - 5);

    for (var j = startArr; j < startArr + 4; j++) {
      fragment.appendChild(createWizard(arr[j]));
    }
    similarListElement.appendChild(fragment);
    window.setupModal.querySelector('.setup-similar').classList.remove('hidden');
  };

  var errorLoad = function (errorMessage, height) {
    var node = document.createElement('div');
    node.classList.add('bounce');
    node.style = 'z-index: 100; margin: 5px 250px; padding: 10px 0px; border-radius: 35px; text-align: center; background-color: red; position: absolute; left: 0px; right: 0px; font-size: 30px;';
    node.style.top = height + 'px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var successSave = function () {
    window.setupModal.classList.add('hidden');
  };

  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), successSave, errorLoad);
    evt.preventDefault();
  });

  window.backend.load(successLoad, errorLoad);

  var changeColorFill = function (elem, colors) {
    elem.style.fill = getRandomItem(colors);
  };

  var changeColorBackground = function () {
    var fireballColor = getRandomItem(FIREBALL_COLORS);
    fireBall.style.backgroundColor = fireballColor;
    fireBallInput.value = fireballColor;
  };

  wizardCoat.addEventListener('click', function () {
    changeColorFill(wizardCoat, COAT_COLORS);
  });

  wizardEyes.addEventListener('click', function () {
    changeColorFill(wizardEyes, EYES_COLORS);
  });

  fireBall.addEventListener('click', function () {
    changeColorBackground();
  });
})();
