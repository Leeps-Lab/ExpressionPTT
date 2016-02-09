
var char = '';
var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

var randomString = function(length, chars) {
  var result = '';
  for (var i = length; i > 0; --i) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

var randomChar = function(checktext,chars) {
  var char = Math.floor(Math.random() * chars.length);
  console.log(char);
  while (1) {
    if (checktext.indexOf(char) !== -1) break;
    char = Math.floor(Math.random() * chars.length);
  }
  return char;
}

var checkCount = function() {
  if ($("#randomtext").text().split(char).length-1 == $("#charNum").val()) {
    $("#status").text("Correct");
  } else {
    
    $("#status").text("Incorrect");
  }
};


$(document).ready(function() {
  var numLines = 10;
  var text = randomString(65 * numLines,chars);
  char = randomChar(text,chars);
  $("#randomtext").text(text);
  $("#searchfor").text("Search through the text for the character '"+char+"' and put the count in the input box below.");
});
