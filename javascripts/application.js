$(function() {
  getCurrentTime();
  setInterval("getCurrentTime()", 500);
});

function getCurrentTime() {
  var date = new Date();
  var hour = makeNumSameLength(date.getHours(), 2);
  var min = makeNumSameLength(date.getMinutes(), 2);
  var sec = makeNumSameLength(date.getSeconds(), 2);
  $('#time').html(hour + ':' + min + ':' + sec);
}

function makeNumSameLength (num, figures) {
  var num = String(num);
  while (num.length < figures) {
    num = '0' + num;
  }
  return num;
}
