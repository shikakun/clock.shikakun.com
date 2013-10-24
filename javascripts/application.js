$(function() {
  $('html').attr('data-mode', 'current');
  switchMode();

  var current, remaining, date, hour, min, sec, time, minRaw, secRaw;

  $('#time').click(function () {
    switchMode();
  });
});

function switchMode() {
  var mode = $('html').attr('data-mode');
  $('#view').attr('class', mode);
  if (mode == 'current') {
    getCurrentTime();
    current = setInterval("getCurrentTime()", 500);
    mode = 'remaining';
  } else if (mode == 'remaining') {
    var countSec = 900;
    var urlQueryParam = function(name) {
      var vars = {};
      var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
      for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars[hash[0]] = hash[1];
      }
      return vars[name];
    };

    if (!isNaN(urlQueryParam('sec'))) {
      countSec = urlQueryParam('sec');
    }

    $('html').attr('data-remaining-time-sec', countSec);
    getRemainingTime();
    remaining = setInterval("getRemainingTime()", 1000);
    mode = 'current';
  }
  $('html').attr('data-mode', mode);
}

function getCurrentTime() {
  if ($('html').attr('data-status-remaining') > 0) {
    clearInterval(remaining);
    $('html').attr('data-status-remaining', '0');
  }
  $('html').attr('data-status-current', '1');
  date = new Date();
  hour = makeNumSameLength(date.getHours(), 2);
  min = makeNumSameLength(date.getMinutes(), 2);
  sec = makeNumSameLength(date.getSeconds(), 2);
  time = hour + ':' + min + ':' + sec;
  $('#time').html(time);
  document.title = time;
}

function getRemainingTime() {
  if ($('html').attr('data-status-current') > 0) {
    clearInterval(current);
    $('html').attr('data-status-current', '0');
  }
  $('html').attr('data-status-remaining', '1');
  date = $('html').attr('data-remaining-time-sec');
  if (date <= 0) {
    clearInterval(remaining);
    $('html').attr('data-status-remaining', '0');
    $('#view').addClass('over');
  }
  secRaw = date % 60;
  sec = makeNumSameLength(secRaw, 2);
  minRaw = (date - secRaw) / 60;
  min = makeNumSameLength(minRaw, 2);
  time = min + ':' + sec;
  $('#time').html(time);
  document.title = time;
  date = date - 1;
  $('html').attr('data-remaining-time-sec', date);
}

function makeNumSameLength(num, figures) {
  var num = String(num);
  while (num.length < figures) {
    num = '0' + num;
  }
  return num;
}
