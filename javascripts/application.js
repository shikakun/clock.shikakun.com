var status, timerInterval, currentSec, countSec = 900;

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

$(function() {
  setStatus('off');
  print(countSec);

  $('#time').click(function () {
    touch();
  });
});

function touch() {
  if (status === 'on') {
    setStatus('off');
    clearInterval(timerInterval);
    print(countSec);
  } else {
    setStatus('on');
    currentSec = countSec;
    timer();
    timerInterval = setInterval("timer()", 1000);
  }
}

function timer() {
  if (currentSec <= 0) {
    clearInterval(timerInterval);
    $('#view').addClass('over');
  }
  print(currentSec);
  currentSec--;
} 

function print(sec) {
  var s = sec % 60;
  var m = (sec - s) / 60;
  var time = keepLength(m, 2) + ':' + keepLength(s, 2);
  $('#time').html(time);
  document.title = time;
}

function setStatus(param) {
  status = param;
  $('#view').attr('class', param);
}

function keepLength(num, figures) {
  var num = String(num);
  while (num.length < figures) {
    num = '0' + num;
  }
  return num;
}
