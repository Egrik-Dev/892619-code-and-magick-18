'use strict';

(function () {
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var CLOUD_X = 100;
  var CLOUD_Y = 10;
  var GAP = 10;
  var FONT_GAP = 20;
  var BAR_GRAPH_HEIGHT = 150;
  var BAR_GRAPH_X = 40;
  var BAR_GRAPH_WIDTH = 40;
  var BAR_GRAPH_GAP = 50;
  var BAR_GRAPH_Y = CLOUD_HEIGHT - GAP - FONT_GAP - BAR_GRAPH_HEIGHT;
  var finalText = 'Ура вы победили!\nСписок результатов:';

  var renderCloud = function (ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  };

  var getMaxElement = function (arr) {
    var maxElement = arr[0];

    for (var i = 0; i < arr.length; i++) {
      if (arr[i] > maxElement) {
        maxElement = arr[i];
      }
    }

    return maxElement;
  };

  var createFinalText = function (ctx, text) {
    var textArr = text.split(/\n/);
    for (var i = 0; i < textArr.length; i++) {
      ctx.fillStyle = 'black';
      ctx.font = '16px PT Mono';
      ctx.fillText(textArr[i], CLOUD_X + FONT_GAP, CLOUD_Y + GAP + (FONT_GAP * (i + 1)));
    }
  };

  window.renderStatistics = function (ctx, names, times) {
    renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
    renderCloud(ctx, CLOUD_X, CLOUD_Y, '#ffffff');

    createFinalText(ctx, finalText);

    var maxPoints = getMaxElement(times);

    var getHeightBar = function (arr, index) {
      return BAR_GRAPH_HEIGHT * arr[index] / maxPoints;
    };

    for (var i = 0; i < names.length; i++) {
      ctx.fillStyle = 'black';
      ctx.fillText(
          names[i],
          CLOUD_X + BAR_GRAPH_X + (BAR_GRAPH_WIDTH + BAR_GRAPH_GAP) * i,
          CLOUD_HEIGHT - GAP);

      ctx.fillText(
          Math.round(times[i]),
          CLOUD_X + BAR_GRAPH_X + (BAR_GRAPH_WIDTH + BAR_GRAPH_GAP) * i,
          BAR_GRAPH_Y + (BAR_GRAPH_HEIGHT - getHeightBar(times, i) - GAP));

      if (names[i] === 'Вы') {
        ctx.fillStyle = 'rgba(255, 0, 0, 1)';
      } else {
        ctx.fillStyle = 'hsl(240, ' + Math.round(Math.random() * 100) + '%, 50%)';
      }
      ctx.fillRect(
          CLOUD_X + BAR_GRAPH_X + (BAR_GRAPH_WIDTH + BAR_GRAPH_GAP) * i,
          BAR_GRAPH_Y + (BAR_GRAPH_HEIGHT - getHeightBar(times, i)),
          BAR_GRAPH_WIDTH,
          getHeightBar(times, i));
    }
  };
})();
