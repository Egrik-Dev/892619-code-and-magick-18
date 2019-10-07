'use strict';

(function () {
  var SUCCESS_STATUS = 200;
  var ONE_SECOND = 1000;
  var TEN_SECONDS = 10000;

  window.postGetData = function (method, url, message, onLoad, onError, height, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open(method, url);

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_STATUS) {
        onLoad(xhr.response);
      } else {
        onError(message + ' Статус ответа: ' + xhr.status + ' ' + xhr.statusText, height);
      }
    });

    xhr.addEventListener('error', function () {
      onError(message + ' Произошла ошибка соединения', height);
    });

    xhr.addEventListener('timeout', function () {
      onError(message + ' Запрос не успел выполниться за: ' + (xhr.timeout / ONE_SECOND) + ' сек.', height);
    });

    xhr.timeout = TEN_SECONDS;

    xhr.send(data);
  };
})();
