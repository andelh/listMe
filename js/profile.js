;(function ($, window, undefined) {
  'use strict';
})(jQuery, this);

$(document).ready(function() {
    $("#editInfo").submit(function(e) {
    editInfo();
  })
    getInfo();
});

function getInfo(){
    var currentuser = Parse.User.current();
    var username = currentuser.getUsername();
    var fullname = currentuser.get("fullname");
    console.log(fullname);
    var email = currentuser.get("email");
    console.log(email);
    
    document.getElementById("name").innerHTML = '<input class="form-control" id="username" value="' + fullname + '" name="username" type="text" autofocus>'
    document.getElementById("mail").innerHTML = '<input class="form-control" id="username" value="' + email + '" name="username" type="text" autofocus>'
}

function editInfo(){
    var name = $("#username").val();
    var mail = $("#email").val();
    
    var currentuser = Parse.User.current();
    currentuser.set("fullname", name);
    currentuser.set("email", mail);
    
    currentuser.save();
    alert("Successfully Updated Information")
}