'use strict';

(function () {
  var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Нионго'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var QUANTITY_WIZARDS = 4;
  // window.setupModal = document.querySelector('.setup');
  var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var similarListElement = window.setupModal.querySelector('.setup-similar-list');
  var wizardCoat = document.querySelector('.wizard-coat');
  var wizardEyes = document.querySelector('.wizard-eyes');
  var fireBall = document.querySelector('.setup-fireball-wrap');
  var fireBallInput = fireBall.querySelector('input');

  var getRandomItem = function (arr) {
    return arr[Math.round(Math.random() * (arr.length - 1))];
  };

  var generateWizards = function (quantity) {
    var wizards = [];

    for (var i = 0; i < quantity; i++) {
      wizards.push({
        name: getRandomItem(NAMES) + ' ' + getRandomItem(SURNAMES),
        coatColor: getRandomItem(COAT_COLORS),
        eyesColor: getRandomItem(EYES_COLORS)});
    }
    return wizards;
  };

  var wizards = generateWizards(QUANTITY_WIZARDS);

  var createWizard = function (arrElement) {
    var wizardElement = wizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = arrElement.name;
    wizardElement.querySelector('.wizard-coat').style.fill = arrElement.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = arrElement.eyesColor;

    return wizardElement;
  };

  var renderWizards = function (arr) {
    var fragment = document.createDocumentFragment();
    for (var j = 0; j < arr.length; j++) {
      fragment.appendChild(createWizard(arr[j]));
    }
    similarListElement.appendChild(fragment);
  };

  renderWizards(wizards);
  window.setupModal.querySelector('.setup-similar').classList.remove('hidden');

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
