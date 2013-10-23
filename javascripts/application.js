$(function() {
  var current, min, sec, time, timerInterval;
  $('#view').attr('class', 'off');
  print('15:00');

  $('#time').click(function () {
    touch();
  });
});

function touch() {
  var status = $('html').attr('data-timer-status');
  if (status == 'on') {
    status = 'off';
    clearInterval(timerInterval);
    $('#time').html('15:00');
  } else {
    status = 'on';
    $('html').attr('data-timer-time-sec', '900');
    timer();
    timerInterval = setInterval("timer()", 1000);
  }
  $('html').attr('data-timer-status', status);
  $('#view').attr('class', status);
}

function timer() {
  current = $('html').attr('data-timer-time-sec');
  if (current <= 0) {
    clearInterval(timerInterval);
    $('#view').addClass('over');
  }
  sec = current % 60;
  min = (current - sec) / 60;
  time = keepLength(min, 2) + ':' + keepLength(sec, 2);
  print(time);
  current = current - 1;
  $('html').attr('data-timer-time-sec', current);
}

function print(time) {
  $('#time').html(time);
  document.title = time;
}

function keepLength(num, figures) {
  var num = String(num);
  while (num.length < figures) {
    num = '0' + num;
  }
  return num;
}
