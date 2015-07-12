;(function ($, window, undefined) {
  'use strict';
})(jQuery, this);

$(document).ready(function() {
    $("#newPump").submit(function(e) {
    e.preventDefault();
    savePump();
    closeModal();
  });

  getPumps();
});

function closeModal() {
  $('#myModal').modal('toggle')
}


function savePump(parseFile) {
    var pumpName = $("#pumpName").val();
    var startTime = $("#startTime").val();
    var pumpDate = $("#pumpDate").val();
    var endTime = $("#endTime").val();
    var pumpLocation = $("#pumpLocation").val();
    var dressCode = $("#dressCode").val();
    var pumpSpecials = $("#pumpSpecials").val();
    var malePrice = $("#malePrice").val();
    var femalePrice = $("#femalePrice").val();
    var pumpInfo = $("#pumpInfo").val();
    
    //Create Object in backend
    var Pump = Parse.Object.extend("Pump");
    var pump = new Pump();
    
    pump.set("title", pumpName);
    pump.set("date", pumpDate);
    pump.set("time", startTime);
    pump.set("endtime", endTime);
    pump.set("location", pumpLocation);
    pump.set("dresscode", dressCode);
    pump.set("specials", pumpSpecials);
    pump.set("maleprice", malePrice);
    pump.set("femaleprice", femalePrice);
    pump.set("flyer", parseFile);
    //pump.set("pumpInfo", pumpInfo);
    
    //saving
    pump.save(null, {
        success: function(pump){
        alert("Eh it saved well done");
        getPumps();
},      error: function(pump, error) {
        alert("bruh..what did you do, couldn't save this pump")
    
}
    }
        )};

Parse.initialize("ZJr86mnZpSGdGVpdtsUZ1O1DJHjTX66LzBgRKxBx", "j8opJT6m4gryO0P28XKSdzaWMvDbdMlpDs1CpeDE");

$('#flyer').bind("change", function(e) {
    var fileUploadControl = document.getElementById("flyer");
    var file = fileUploadControl.files[0];
    var name = "photo.jpg";
    var parseFile = new Parse.File(name, file);
    
    parseFile.save().then 
    (
        function()
        {
            savePump(parseFile);
        },
        function(error)
        {
            alert("error");
        }
    );
});


function getPumps() {
    var Pump = Parse.Object.extend("Pump");
    var query = new Parse.Query(Pump);
    
    query.descending("createdAt");
    
    query.find({
    success: function(results) {
      // The query was successful, and has passed
      // back an array of PFObjects for you to use

      // Since we're appending, clear the list out 
      // every time we're about to add results
      $("#pumpList").html("");

      // Compile the Handlebars template we're going
      // to stick the results into. Pass Handlebars the
      // ID of the script tags in index.html that contain
      // the template.
      var template = Handlebars.compile($("#single-pump-entry").html());

      // Iterate over all the results
      $(results).each(function(i,e) {
        // Serialize the PFObject and store it in q
        var q = e.toJSON();
        // Select the DOM element we're appending to,
        // Then append the template, passing in q to
        // provide the values of the template variables
        $("#pumpList").append(template(q));
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