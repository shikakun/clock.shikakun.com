$(function() {
  var current, timerInterval;
  $('#view').attr('class', 'off');
  print(900);

  $('#time').click(function () {
    touch();
  });
});

function touch() {
  var status = $('html').attr('data-timer-status');
  if (status == 'on') {
    status = 'off';
    clearInterval(timerInterval);
    print(900);
  } else {
    status = 'on';
    current = 900;
    timer();
    timerInterval = setInterval("timer()", 1000);
  }
  $('html').attr('data-timer-status', status);
  $('#view').attr('class', status);
}

function timer() {
  if (current <= 0) {
    clearInterval(timerInterval);
    $('#view').addClass('over');
  }
  print(current);
  current--;
}

function print(sec) {
  var s = sec % 60;
  var m = (sec - s) / 60;
  var time = keepLength(m, 2) + ':' + keepLength(s, 2);
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
