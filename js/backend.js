'use strict';

(function () {
  var SUCCESS_STATUS = 200;
  var ONE_SECOND = 1000;
  var TEN_SECONDS = 10000;
  var HEIGHT_SECOND_ERROR = 60;
  var body = document.querySelector('body');

  window.backend = {
    ajax: function (method, url, onLoad, onError, data) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.open(method, url);

      xhr.addEventListener('load', function () {
        if (xhr.status === SUCCESS_STATUS) {
          onLoad(xhr.response);
        } else {
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за: ' + (xhr.timeout / ONE_SECOND) + ' сек.');
      });

      xhr.timeout = TEN_SECONDS;

      xhr.send(data);
    },
    errorLoad: function (errorMessage) {
      var node = document.createElement('div');
      node.classList.add('error');
      node.classList.add('bounce');
      node.style = 'z-index: 100; margin: 5px 250px; padding: 10px 0px; border-radius: 35px; text-align: center; background-color: red; position: absolute; left: 0px; right: 0px; font-size: 30px;';
      if (body.querySelector('.error')) {
        node.style.top = HEIGHT_SECOND_ERROR + 'px';
      }

      node.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', node);
    },
  };
})();
