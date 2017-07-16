var addImage = function(source) {
  document.querySelector("[data-search=flicker]").value = "";
  document.querySelector("[data-output=images]").innerHTML = "";
  
  document.querySelector(".selected").src = source;
};

$(document).ready(function() {
  $(".comingsoon").click(function() {
    alertify.message('coming soon..');
  });
  
  var searchForPictures = function(source) {
        alertify.message('Searching for "'+source+'"');

        // If domain is HTTP
        var flickerAPI;
        var site = window.location;
        site = site.toString();
        if (site.substring(0, 7) === "http://") {
          flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
        } else {
          flickerAPI = "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
        }

        $.getJSON(flickerAPI, {
          tags: source,
          tagmode: "any",
          format: "json"
        })
        .done(function( data ) {
          $.each( data.items, function( i, item ) {
            $("<a>", {
              class: "pointer close-modal"
            }).attr("href", "javascript:$('.images-modal').fadeOut();").html('<img src="'+item.media.m+'" onclick="addImage(this.src)">').appendTo("[data-output=images]");
            if ( i === 100 ) {
              return false;
            }
          });
        });
      };
  
  // Search for pictures
  // Change image source with searched image
  $("[data-search=flicker]").on("keyup change", function(e) {
    if (!this.value) {
      $("[data-output=images], [data-clear=search]").fadeOut();
    } else {
      $("[data-clear=search]").fadeIn();

      //If user presses enter
      if (e.which === 13) {
        var site = this.value.toString();
        if (site.substring(0, 7) === "http://" || site.substring(0, 8) === "https://") {
          $("[data-output=messages]").append('<div class="them emoticon msg"><p class="message"><img src="'+this.value+'"></p></div>');
          $("[data-clear=search]").trigger('click');
        } else {
          $("[data-output=images]").empty().fadeIn();
          searchForPictures(this.value);
        }
      }
    }
  });
  $("[data-clear=search]").click(function() {
    $("[data-search=flicker]").val("").trigger("change");
    $("[data-output=images]").empty();
  });
  $(".close-modal").click(function() {
    $(".images-modal").fadeOut();
  });

  var WHICHONEOFTHESEIS = function(){
    $(".card").on("click", function() {
      if ($(".selected").is(":visible")) {
        $(".selected").removeClass("selected");
        $(this).find("img").addClass("selected");
      } else {
        $(this).find("img").addClass("selected");
      }
      $(".images-modal").fadeIn();
    });
  };
  var HOWDOYOUSAY = function(){
    
  };
  var HOWDOYOUSAYTYPING = function(){
    
  };
  var WHATWASSAID = function(){
    
  };
  var WHATWASSAIDTYPING = function(){
    
  };
  var SELECTTHEMISSINGWORD = function(){
    
  };
  
  $(".lesson-types a").on("click", function() {
//    WHICH ONE OF THESE IS?
//    HOW DO YOU SAY?
//    HOW DO YOU SAY {TYPING}?
//    WHAT WAS SAID?
//    WHAT WAS SAID {TYPING}?
//    SELECT THE MISSING WORD?

    var lessonType = $(this).find("span").text();
    $(this).parent().parent().next().find("[data-output=questiontype]").text(lessonType);
    
    if (lessonType.toUpperCase() === "WHICH ONE OF THESE IS?") {
      $(this).parent().parent().next().find("[data-output=lesson]").empty().html("\n<div class=\"cards-container txtcenter\">\n  <a class=\"card correct answer pointer\">\n    <h2 class=\"arb\" contenteditable=\"true\">رجل</h2>\n\n    <img src=\"../imgs/basics/man.jpg\">\n  </a>\n  <a class=\"card wrong pointer\">\n    <h2 class=\"arb\" contenteditable=\"true\">امراه</h2>\n\n    <img src=\"../imgs/basics/woman.png\">\n  </a>\n  <a class=\"card wrong pointer\">\n    <h2 class=\"arb\" contenteditable=\"true\">ولد</h2>\n\n    <img src=\"../imgs/basics/boy.jpg\">\n  </a>\n  <a class=\"card wrong pointer\">\n    <h2 class=\"arb\" contenteditable=\"true\">بنت</h2>\n\n    <img src=\"../imgs/basics/girl.jpg\">\n  </a>\n</div>");
      WHICHONEOFTHESEIS();
    }
    if (lessonType.toUpperCase() === "HOW DO YOU SAY?") {
      $(this).parent().parent().next().find("[data-output=lesson]").empty().html("\n<form class=\"mdl-cell--6-col ib\">\n  <div class=\"mdl-textfield mdl-js-textfield\">\n    <input class=\"mdl-textfield__input\" type=\"text\" placeholder=\"Arabic word:\" id=\"arbword\">\n  </div>\n</form>\n<form class=\"mdl-cell--6-col ib\">\n  <div class=\"mdl-textfield mdl-js-textfield\">\n    <input class=\"mdl-textfield__input\" type=\"text\" placeholder=\"English translation:\" id=\"engtrans\">\n  </div>\n</form>\n<div>\n  <form class=\"mdl-cell--6-col ib\">\n    <div class=\"mdl-textfield mdl-js-textfield\">\n      <input class=\"mdl-textfield__input\" type=\"text\" placeholder=\"Correct answer:\" id=\"correctanswer\">\n    </div>\n  </form>\n  <form class=\"mdl-cell--6-col ib\">\n    <div class=\"mdl-textfield mdl-js-textfield\">\n      <input class=\"mdl-textfield__input\" type=\"text\" placeholder=\"Wrong answer:\" id=\"wronganswer1\">\n    </div>\n  </form>\n</div>\n<div>\n  <form class=\"mdl-cell--6-col ib\">\n    <div class=\"mdl-textfield mdl-js-textfield\">\n      <input class=\"mdl-textfield__input\" type=\"text\" placeholder=\"Wrong answer:\" id=\"wronganswer2\">\n    </div>\n  </form>\n  <form class=\"mdl-cell--6-col ib\">\n    <div class=\"mdl-textfield mdl-js-textfield\">\n      <input class=\"mdl-textfield__input\" type=\"text\" placeholder=\"Wrong answer:\" id=\"wronganswer3\">\n    </div>\n  </form>\n</div>");
      HOWDOYOUSAY();
    }
    if (lessonType.toUpperCase() === "HOW DO YOU SAY {TYPING}?") {
      $(this).parent().parent().next().find("[data-output=lesson]").empty().html("\n<form class=\"mdl-cell--6-col ib\">\n  <div class=\"mdl-textfield mdl-js-textfield\">\n    <input class=\"mdl-textfield__input\" type=\"text\" placeholder=\"Arabic word:\" id=\"arbword\">\n  </div>\n</form>\n<form class=\"mdl-cell--6-col ib\">\n  <div class=\"mdl-textfield mdl-js-textfield\">\n    <input class=\"mdl-textfield__input\" type=\"text\" placeholder=\"English translation:\" id=\"engtrans\">\n  </div>\n</form>");
      HOWDOYOUSAYTYPING();
    }
    if (lessonType.toUpperCase() === "WHAT WAS SAID?") {
      $(this).parent().parent().next().find("[data-output=lesson]").empty().html("\n<form class=\"mdl-cell--6-col ib\">\n  <div class=\"mdl-textfield mdl-js-textfield\">\n    <input class=\"mdl-textfield__input\" type=\"text\" placeholder=\"Arabic word:\" id=\"arbword\">\n  </div>\n</form>\n<form class=\"mdl-cell--6-col ib\">\n  <div class=\"mdl-textfield mdl-js-textfield\">\n    <input class=\"mdl-textfield__input\" type=\"text\" placeholder=\"English translation:\" id=\"engtrans\">\n  </div>\n</form>\n<div>\n  <form class=\"mdl-cell--6-col ib\">\n    <div class=\"mdl-textfield mdl-js-textfield\">\n      <input class=\"mdl-textfield__input\" type=\"text\" placeholder=\"Correct answer:\" id=\"correctanswer\">\n    </div>\n  </form>\n  <form class=\"mdl-cell--6-col ib\">\n    <div class=\"mdl-textfield mdl-js-textfield\">\n      <input class=\"mdl-textfield__input\" type=\"text\" placeholder=\"Wrong answer:\" id=\"wronganswer1\">\n    </div>\n  </form>\n</div>\n<div>\n  <form class=\"mdl-cell--6-col ib\">\n    <div class=\"mdl-textfield mdl-js-textfield\">\n      <input class=\"mdl-textfield__input\" type=\"text\" placeholder=\"Wrong answer:\" id=\"wronganswer2\">\n    </div>\n  </form>\n  <form class=\"mdl-cell--6-col ib\">\n    <div class=\"mdl-textfield mdl-js-textfield\">\n      <input class=\"mdl-textfield__input\" type=\"text\" placeholder=\"Wrong answer:\" id=\"wronganswer3\">\n    </div>\n  </form>\n</div>");
      WHATWASSAID();
    }
    if (lessonType.toUpperCase() === "WHAT WAS SAID {TYPING}?") {
      $(this).parent().parent().next().find("[data-output=lesson]").empty().html("\n<form class=\"mdl-cell--6-col ib\">\n  <div class=\"mdl-textfield mdl-js-textfield\">\n    <input class=\"mdl-textfield__input\" type=\"text\" placeholder=\"Arabic word:\" id=\"arbword\">\n  </div>\n</form>\n<form class=\"mdl-cell--6-col ib\">\n  <div class=\"mdl-textfield mdl-js-textfield\">\n    <input class=\"mdl-textfield__input\" type=\"text\" placeholder=\"English translation:\" id=\"engtrans\">\n  </div>\n</form>");
      WHATWASSAIDTYPING();
    }
    if (lessonType.toUpperCase() === "SELECT THE MISSING WORD?") {
      $(this).parent().parent().next().find("[data-output=lesson]").empty().html("\n<form class=\"mdl-cell--6-col ib\">\n  <div class=\"mdl-textfield mdl-js-textfield\">\n    <input class=\"mdl-textfield__input\" type=\"text\" placeholder=\"Arabic word:\" id=\"arbword\">\n  </div>\n</form>\n<form class=\"mdl-cell--6-col ib\">\n  <div class=\"mdl-textfield mdl-js-textfield\">\n    <input class=\"mdl-textfield__input\" type=\"text\" placeholder=\"English translation:\" id=\"engtrans\">\n  </div>\n</form>\n<div>\n  <form class=\"mdl-cell--6-col ib\">\n    <div class=\"mdl-textfield mdl-js-textfield\">\n      <input class=\"mdl-textfield__input\" type=\"text\" placeholder=\"Correct answer:\" id=\"correctanswer\">\n    </div>\n  </form>\n  <form class=\"mdl-cell--6-col ib\">\n    <div class=\"mdl-textfield mdl-js-textfield\">\n      <input class=\"mdl-textfield__input\" type=\"text\" placeholder=\"Wrong answer:\" id=\"wronganswer1\">\n    </div>\n  </form>\n</div>\n<div>\n  <form class=\"mdl-cell--6-col ib\">\n    <div class=\"mdl-textfield mdl-js-textfield\">\n      <input class=\"mdl-textfield__input\" type=\"text\" placeholder=\"Wrong answer:\" id=\"wronganswer2\">\n    </div>\n  </form>\n  <form class=\"mdl-cell--6-col ib\">\n    <div class=\"mdl-textfield mdl-js-textfield\">\n      <input class=\"mdl-textfield__input\" type=\"text\" placeholder=\"Wrong answer:\" id=\"wronganswer3\">\n    </div>\n  </form>\n</div>");
      SELECTTHEMISSINGWORD();
    }
  });
});