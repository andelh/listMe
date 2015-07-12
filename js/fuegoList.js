;(function ($, window, undefined) {
  'use strict';
})(jQuery, this);

$(document).ready(function() {
    $("#logout").submit(function(e) {
    logOut();
  });
    getEvents();
});

function getEvents() {
    var Fuego = Parse.Object.extend("Fuego");
    console.log("done1");
    var query = new Parse.Query(Fuego);
    console.log("done2");
    
    query.descending("createdAt");
    console.log("done3");
    
    query.find({
    success: function(results) {
      // The query was successful, and has passed
      // back an array of PFObjects for you to use

      // Since we're appending, clear the list out 
      // every time we're about to add results
      $("#eventList").html("");

      // Compile the Handlebars template we're going
      // to stick the results into. Pass Handlebars the
      // ID of the script tags in index.html that contain
      // the template.
      var template = Handlebars.compile($("#single-event-entry").html());
      
      // Iterate over all the results
      $(results).each(function(i,e) {
        // Serialize the PFObject and store it in q
        var q = e.toJSON();
          
        // Select the DOM element we're appending to,
        // Then append the template, passing in q to
        // provide the values of the template variables
        $("#eventList").append(template(q));
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
