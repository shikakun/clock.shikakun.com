$(function() {
  $('html').attr('data-mode', 'current');
  switchMode();

  var current, remaining, date, hour, min, sec, minRaw, secRaw;

  $('#time').click(function () {
    switchMode();
  });
});

function switchMode() {
  var mode = $('html').attr('data-mode');
  if (mode == 'current') {
    getCurrentTime();
    current = setInterval("getCurrentTime()", 500);
    mode = 'remaining';
  } else if (mode == 'remaining') {
    $('html').attr('data-remaining-time-sec', '900');
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
  $('#time').html(hour + ':' + min + ':' + sec);
}

function getRemainingTime() {
  if ($('html').attr('data-status-current') > 0) {
    clearInterval(current);
    $('html').attr('data-status-current', '0');
  }
  $('html').attr('data-status-remaining', '1');
  date = $('html').attr('data-remaining-time-sec');
  secRaw = date % 60;
  sec = makeNumSameLength(secRaw, 2);
  minRaw = (date - secRaw) / 60;
  min = makeNumSameLength(minRaw, 2);
  $('#time').html(min + ':' + sec);
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
