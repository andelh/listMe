;(function ($, window, undefined) {
  'use strict';
})(jQuery, this);

$(document).ready(function() {
    $("#login").submit(function(e) {
    e.preventDefault();
    login();
  });

});

function login() {
    var username = $("#username").val();
    var pass = $("#password").val();
    
    Parse.User.logIn(username, pass, {
  success: function(user) {
      console.log("oh hi.");
      window.location.replace('index.html');
    // Do stuff after successful login.
  },
  error: function(user, error) {
      console.log("nah bruh.");
      alert("Error: " + error.code + " " + error.message);
      document.getElementById("invalid").innerHTML = '<p>Invalid Username/Password. Try again!</p>'
    // The login failed. Check error to see why.
  }
});
    
}