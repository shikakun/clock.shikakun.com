$(function() {
  $('html').attr('data-mode', 'current');
  switchMode();

  var current, remaining;

  $('#time').click(function () {
    switchMode();
  });
});

function switchMode() {
  var mode = $('html').attr('data-mode');
  if (mode == 'current') {
    if ($('html').attr('data-status-remaining') > 0) {
      clearInterval(remaining);
      $('html').attr('data-status-remaining', 0);
    }
    getCurrentTime();
    current = setInterval("getCurrentTime()", 500);
    mode = 'remaining';
  } else if (mode == 'remaining') {
    if ($('html').attr('data-status-current') > 0) {
      clearInterval(current);
      $('html').attr('data-status-current', 0);
    }
    getRemainingTime(current);
    remaining = setInterval("getRemainingTime()", 500);
    mode = 'current';
  }
  $('html').attr('data-mode', mode);
}

function getCurrentTime() {
  $('html').attr('data-status-current', 1);
  var date = new Date();
  var hour = makeNumSameLength(date.getHours(), 2);
  var min = makeNumSameLength(date.getMinutes(), 2);
  var sec = makeNumSameLength(date.getSeconds(), 2);
  $('#time').html(hour + ':' + min + ':' + sec);
}

function getRemainingTime() {
  $('html').attr('data-status-remaining', 1);
  $('#time').html('15:00:00');
}

function makeNumSameLength (num, figures) {
  var num = String(num);
  while (num.length < figures) {
    num = '0' + num;
  }
  return num;
}
