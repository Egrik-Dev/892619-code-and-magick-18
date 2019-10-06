'use strict';

(function () {
  var URL_LOAD = 'https://js.dump.academy/code-and-magick/data';
  var URL_SAVE = 'https://js.dump.academy/code-and-magick';
  var MESSAGE_GET = 'Ошибка получения данных!';
  var MESSAGE_POST = 'Ошибка отправки данных!';
  var HEIGHT_SECOND_ERROR = 60;

  window.backend = {
    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.open('GET', URL_LOAD);

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          onError(MESSAGE_GET + ' Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        onError(MESSAGE_GET + ' Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        onError(MESSAGE_GET + ' Запрос не успел выполниться за: ' + (xhr.timeout / 1000) + ' сек.');
      });

      xhr.timeout = 1000;

      xhr.send();
    },
    save: function (data, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.open('POST', URL_SAVE);

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          onError(MESSAGE_POST + ' Статус ответа: ' + xhr.status + ' ' + xhr.statusText, HEIGHT_SECOND_ERROR);
        }
      });

      xhr.addEventListener('error', function () {
        onError(MESSAGE_POST + ' Произошла ошибка соединения', HEIGHT_SECOND_ERROR);
      });

      xhr.addEventListener('timeout', function () {
        onError(MESSAGE_POST + ' Запрос не успел выполниться за: ' + (xhr.timeout / 1000) + ' сек.', HEIGHT_SECOND_ERROR);
      });

      xhr.timeout = 10000;

      xhr.send(data);
    },
  };
})();
