$(document).ready(function() {
  // Announce Discontinuation
  alertify.alert("ArabEngo Discontinued:", "As of Mar 21, 2018 Github updated their API on Gists. In which you can <a href='https://help.github.com/articles/creating-gists' target='_blank'>no longer save gists anonymously</a>.<br><br>If you try to save a gist anonymously you will be presented with a 404 as seen on Dabblet.com.<br><br><img src='https://user-images.githubusercontent.com/2473707/38180483-933e0d50-35f2-11e8-8e24-0cca98d4f4db.png'><br><br>ArabEngo relied on Github Gists to save your chats and lessons anonymously to the community. Do to this update ArabEngo is officially a discontinued project as of April 2, 2018.");

  var hash = window.location.hash.substring(1);
  function loadgist(gistid) {
    $.ajax({
      url: "https://api.github.com/gists/" + gistid,
      type: "GET",
      dataType: "jsonp",
      jsonp: "callback"
    }).success(function(gistdata) {
      var grabLesson = gistdata.data.files["lesson.html"];
      var properties   = gistdata.data.files["properties.json"].content;
      var jsonSets     = JSON.parse(properties);
      
      // Remove preloader
      $(".preloader").remove();
      
      // Initiate lesson
      $(".preview").empty();
      var frame = document.createElement("iframe");
      frame.setAttribute("id", "preview");
      frame.setAttribute("sandbox", "allow-forms allow-modals allow-pointer-lock allow-popups allow-same-origin allow-scripts");
      document.querySelector(".preview").appendChild(frame);
      var previewFrame = document.getElementById("preview"),
          preview =  previewFrame.contentDocument ||  previewFrame.contentWindow.document;
      
      document.title = "ArabEngo: " + jsonSets.lessonTitle;
      
      var fullLesson = "<!DOCTYPE html>\n<html>\n  <head>\n    <title>ArabEngo: "+ jsonSets.lessonTitle +"</title>\n    <meta charset=\"utf-8\">\n    <meta name=\"viewport\" content=\"initial-scale=1.0\">\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=9\">\n    <link rel=\"stylesheet\" href=\"../css/lessons.css\">\n    <script src=\"../libraries/jquery/jquery.js\"></script>\n    <script src=\"../libraries/alertify/alertify.min.js\"></script>\n  </head>\n  <body>\n    <script src=\"../js/responsivevoice.js\"></script>\n    <script src=\"../js/lessons.js\"></script>\n    \n    <!--Lesson Pages-->\n    "+ grabLesson.content +"\n  </body>\n</html>";
      preview.open();
      preview.write(fullLesson);
      preview.close();
    }).error(function(e) {
      // ajax error
      console.warn("Error: Could not load weave!", e);
      alertify.error("Error: Could not load weave!");
    });
  }
  
  if (window.location.hash) {
    $(document.body).append('<div class="fixedfill preloader"></div>');
    $(".preloader").html('<div class="table"><div class="cell"><img class="spin" src="../imgs/loading.svg"></div></div>');
    
    // Initiate lesson
    loadgist(hash);
  } else {
    // No less? Make one in our desigenr
    $(document.body).append('<div class="wrapper"><div id="container"></div></div><div class="fixedfill nohash"></div>');
    $('#container').astral();
    $(".nohash").html('<div class="table"><div class="cell"><h1>No lesson detected!</h1><a class="launchdesigner" href="../designer" target="_blank">Launch Designer!</a></div></div>');
    document.body.style.overflow = "hidden";
  }
});
