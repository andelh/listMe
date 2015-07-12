;(function ($, window, undefined) {
  'use strict';
})(jQuery, this);

$(document).ready(function() {
    $("#signup").submit(function(e) {
    e.preventDefault();
    signup();
  });

});

function signup(){
    var username = $("#username").val();
    var pass = $("#password").val();
    var email = $("#email").val();
    var FullName = $("#fullname").val();
    console.log(FullName);
    
    var user = new Parse.User();
    user.set("username", username);
    user.set("password", pass);
    user.set("email", email);
    user.set("fullname", FullName);
    user.set("adminStatus", true);
    
    user.signUp(null, {
  success: function(user) {
      window.location.replace('index.html');
    // Hooray! Let them use the app now.
  },
  error: function(user, error) {
      document.getElementById("invalid").innerHTML = error.message
    // Show the error message somewhere and let the user try again.
    alert("Error: " + error.code + " " + error.message);
  }
});
}