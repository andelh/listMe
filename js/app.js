;(function ($, window, undefined) {
  'use strict';
})(jQuery, this);

$(document).ready(function() {
    $("#logout").submit(function(e) {
    logOut();
  });
    
    $("#newClub").submit(function(e) {
    newClub();
  });
    
    userCheck();
    getClubs();
});

function userCheck(){
    var currentUser = Parse.User.current();
    var username = currentUser.getUsername();
    var fullllnamee = currentUser.get("fullname");
    console.log(fullllnamee);
    if (currentUser) {
        document.getElementById("user").innerHTML = '<a href="profile.html" class="navbar-brand pull-right user">' + username + ' <span class="glyphicon glyphicon-option-vertical"></span></a>'
    } else {
        window.location.replace('login.html');
    }
}

function newClub(){
    var name = $("#name").val();
    var location = $("#location").val();
    var description = $("#description").val();
    
    var Clubs = Parse.Object.extend("Clubs");
    var clubs = new Clubs;
    
    clubs.set("Name", name);
    clubs.set("Location", location);
    clubs.set("Description", description);
    
    clubs.save(null, {
        success: function(clubs){
        alert("Eh it saved well done");
        getPumps();
},      error: function(clubs, error) {
        alert("bruh..what did you do, couldn't save this pump" + error)
    
}
    }
        )};


function getClubs() {
    var Clubs = Parse.Object.extend("Clubs");
    var query = new Parse.Query(Clubs);
    
    query.ascending("Name");
    
    query.find({
    success: function(results) {
      // The query was successful, and has passed
      // back an array of PFObjects for you to use

      // Since we're appending, clear the list out 
      // every time we're about to add results
      $("#clubList").html("");

      // Compile the Handlebars template we're going
      // to stick the results into. Pass Handlebars the
      // ID of the script tags in index.html that contain
      // the template.
      var template = Handlebars.compile($("#single-club-entry").html());
      var imageTemplate = Handlebars.compile($("#single-image-entry").html());

      // Iterate over all the results
      $(results).each(function(i,e) {
        // Serialize the PFObject and store it in q
        var q = e.toJSON();
        //var logo = e.get("Logo");
        //var image = logo.url();
        //alert(logo);
        //console.log(logo.url());
        
        //alert(logo);
        // Select the DOM element we're appending to,
        // Then append the template, passing in q to
        // provide the values of the template variables
        //$("#logo").append(imageTemplate(logo));
        $("#clubList").append(template(q));
        //document.getElementById("image").innerHTML = '<img src ="' + image + '"/>';
      });
    },
    error: function(error) {
      if (error.message == "unauthorized") {
        // Temporary message if you haven't added your own credentials for Parse.com yet. Remove once set up.
        console.warn("Please fill in your own Parse.com App ID and Javascript Key on line 107 of index.html");
      }
      // Handle the error here
    }
  });
}
