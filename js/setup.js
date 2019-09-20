'use strict';

var setupModal = document.querySelector('.setup');
var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Нионго'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var similarListElement = setupModal.querySelector('.setup-similar-list');

setupModal.classList.remove('hidden');

var createRandomItem = function (arr) {
  return arr[Math.round(Math.random() * (arr.length - 1))];
};

var wizards = [];

for (var i = 0; i <= 3; i++) {
  wizards.push({
    name: createRandomItem(NAMES) + ' ' + createRandomItem(SURNAMES),
    coatColor: createRandomItem(COAT_COLORS),
    eyesColor: createRandomItem(EYES_COLORS)});
}

var createWizard = function (arr, index) {
  var wizardElement = wizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = arr[index].name;
  wizardElement.querySelector('.wizard-coat').style.fill = arr[index].coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = arr[index].eyesColor;

  return wizardElement;
};

var addWizard = function () {
  var fragment = document.createDocumentFragment();
  for (var j = 0; j <= wizards.length - 1; j++) {
    fragment.appendChild(createWizard(wizards, j));
  }
  similarListElement.appendChild(fragment);
};

addWizard();
setupModal.querySelector('.setup-similar').classList.remove('hidden');
