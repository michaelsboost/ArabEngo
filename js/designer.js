var addImage = function(source) {
  document.querySelector("[data-search=flicker]").value = "";
  document.querySelector("[data-output=images]").innerHTML = "";
  
  document.querySelector(".selected").src = source;
};

$(document).ready(function() {
  $(".mdl-layout__tab-bar a:eq(3)").click();
  $(".comingsoon").click(function() {
    alertify.message('coming soon..');
  });
  
  $(".lesson-types").html("<a data-lesson=\"whichoneoftheseis\" class=\"mdl-button mdl-js-button mdl-js-ripple-effect\">\n  <img src=\"../imgs/matching.png\">\n  <span>Which one of these is?</span>\n</a>\n<a data-lesson=\"howdoyousay\" class=\"mdl-button mdl-js-button mdl-js-ripple-effect\">\n  <img src=\"../imgs/speak.png\">\n  <span>How do you say?</span>\n</a>\n<a data-lesson=\"howdoyousayarbbtns\" class=\"mdl-button mdl-js-button mdl-js-ripple-effect\">\n  <img src=\"../imgs/ear.png\">\n  <span>How do you say (arb)?</span>\n</a>\n<a data-lesson=\"howdoyousaytyping\" class=\"mdl-button mdl-js-button mdl-js-ripple-effect\">\n  <img src=\"../imgs/message1.png\">\n  <span>How do you say {typing}?</span>\n</a>\n<a data-lesson=\"whatwassaid\" class=\"mdl-button mdl-js-button mdl-js-ripple-effect\">\n  <img src=\"../imgs/ear2.png\">\n  <span>What was said?</span>\n</a>\n<a data-lesson=\"whatwassaidtyping\" class=\"mdl-button mdl-js-button mdl-js-ripple-effect\">\n  <img src=\"../imgs/message2.png\">\n  <span>What was said {typing}?</span>\n</a>\n<a data-lesson=\"selectthemissingword\" class=\"mdl-button mdl-js-button mdl-js-ripple-effect\">\n  <img src=\"../imgs/eye.png\">\n  <span>Select the missing word?</span>\n</a>");
  
  var searchForPictures    = function(source) {
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
      },
      WHICHONEOFTHESEIS    = function() {
        $(".card img").on("click", function() {
          if ($(".selected").is(":visible")) {
            $(".selected").removeClass("selected");
            $(this).addClass("selected");
          } else {
            $(this).addClass("selected");
          }
          $(".images-modal").fadeIn();
          localStorage.setItem("grabLessons", $("[data-output=html]").html());
        });
      },
      HOWDOYOUSAY          = function() {
        localStorage.setItem("grabLessons", $("[data-output=html]").html());
      },
      HOWDOYOUSAYARB       = function() {
        localStorage.setItem("grabLessons", $("[data-output=html]").html());
      },
      HOWDOYOUSAYTYPING    = function() {
        localStorage.setItem("grabLessons", $("[data-output=html]").html());
      },
      WHATWASSAID          = function() {
        localStorage.setItem("grabLessons", $("[data-output=html]").html());
      },
      WHATWASSAIDARB       = function() {
        localStorage.setItem("grabLessons", $("[data-output=html]").html());
      },
      WHATWASSAIDTYPING    = function() {
        localStorage.setItem("grabLessons", $("[data-output=html]").html());
      },
      SELECTTHEMISSINGWORD = function() {
        localStorage.setItem("grabLessons", $("[data-output=html]").html());
      },
      setLocalStorage      = function() {
        // Remember Tab
//        if ( localStorage.getItem("rememberTab")) {
//          $('a.mdl-layout__tab').removeClass('is-active');
//          // activate desired tab
//          $('a[href="#scroll-tab-'+ localStorage.getItem("rememberTab") +'"]').addClass('is-active');
//          // remove all is-active classes from panels
//          $('.mdl-layout__tab-panel').removeClass('is-active');
//          // activate desired tab panel
//          $('#scroll-tab-'+ localStorage.getItem("rememberTab")).addClass('is-active');
//        }
        $("a.mdl-layout__tab").on("click", function() {
          localStorage.setItem("rememberTab", $(this).index());
        });
        
        // Remember Lessons
//        if ( localStorage.getItem("grabLessons")) {
//          $("[data-output=html]").html(localStorage.getItem("grabLessons"));
//        }
        $("input[type=text]").on("keyup change", function() {
          $(this).attr('value', this.value);
          localStorage.setItem("grabLessons", $("[data-output=html]").html());
        });
        $("form").submit(function(e) {
          e.preventDefault();
        });
        $("[contenteditable]").on("keyup change", function() {
          localStorage.setItem("grabLessons", $("[data-output=html]").html());
        });
      };
  
  //  Debug lesson
  $("[data-action=play]").click(function() {
    //alertify.message('Debug lesson coming soon...');
    
    if (!$("input").val()) {
      alertify.error('Run Failed: All inputs <u>MUST</u> have a value');
      return false;
    }
    if (!$("[data-lesson=title]").text().trim()) {
      alertify.error('Run Failed: Missing lesson title');
      return false;
    }
    if (!$("[data-lesson=description]").text().trim()) {
      alertify.error('Run Failed: Missing lesson description');
      return false;
    }
    
    $(".preview-modal").fadeIn();
    
    $(".preview").empty();
    var frame = document.createElement("iframe");
    frame.setAttribute("id", "preview");
    frame.setAttribute("sandbox", "allow-forms allow-modals allow-pointer-lock allow-popups allow-same-origin allow-scripts");
    document.querySelector(".preview").appendChild(frame);
    var previewFrame = document.getElementById("preview"),
        preview =  previewFrame.contentDocument ||  previewFrame.contentWindow.document;
    
    var fullLesson = 'lesson code coming soon';
    preview.open();
    preview.write(fullLesson);
    preview.close();
  });
  
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
          $(".selected").attr('src', this.value);
          $("[data-clear=search], button.close-modal:visible").trigger('click');
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
    if ($(".images-modal").is(":visible")) {
      $(".images-modal").fadeOut();
    }
    if ($(".preview-modal").is(":visible")) {
      $(".preview-modal").fadeOut();
    }
  });
  WHICHONEOFTHESEIS();
  setLocalStorage();
  
  $(".lesson-types a").on("click", function() {
//    WHICH ONE OF THESE IS?
//    HOW DO YOU SAY?
//    HOW DO YOU SAY {TYPING}?
//    HOW DO YOU SAY (ARB)?
//    WHAT WAS SAID?
//    WHAT WAS SAID (ARB)?
//    WHAT WAS SAID {TYPING}?
//    SELECT THE MISSING WORD?

    var lessonType = $(this).find("span").text();
    $(this).parent().parent().next().find("[data-output=questiontype]").text(lessonType);
    if (lessonType.toUpperCase() === "WHICH ONE OF THESE IS?") {
      $(this).parent().parent().next().find("[data-output=lesson]").empty().html("\n<div class=\"cards-container txtcenter\">\n  <h1 contenteditable=\"true\">hello</h1>\n  <a class=\"card correct answer pointer\">\n    <h2 class=\"arb\" contenteditable=\"true\">رجل</h2>\n\n    <img src=\"../imgs/basics/man.jpg\">\n  </a>\n  <a class=\"card wrong pointer\">\n    <h2 class=\"arb\" contenteditable=\"true\">امراه</h2>\n\n    <img src=\"../imgs/basics/woman.png\">\n  </a>\n  <a class=\"card wrong pointer\">\n    <h2 class=\"arb\" contenteditable=\"true\">ولد</h2>\n\n    <img src=\"../imgs/basics/boy.jpg\">\n  </a>\n  <a class=\"card wrong pointer\">\n    <h2 class=\"arb\" contenteditable=\"true\">بنت</h2>\n\n    <img src=\"../imgs/basics/girl.jpg\">\n  </a>\n</div>");
      WHICHONEOFTHESEIS();
    }
    if (lessonType.toUpperCase() === "HOW DO YOU SAY?") {
      $(this).parent().parent().next().find("[data-output=lesson]").empty().html("<form action=\"#\" class=\"mdl-cell--6-col ib\">\n  <div class=\"mdl-textfield mdl-js-textfield\">\n    <input class=\"mdl-textfield__input\" type=\"text\" placeholder=\"Arabic word:\" data-word=\"arbword\" value=\"مرحبا\">\n  </div>\n</form>\n<form action=\"#\" class=\"mdl-cell--6-col ib\">\n  <div class=\"mdl-textfield mdl-js-textfield\">\n    <input class=\"mdl-textfield__input\" type=\"text\" placeholder=\"English translation:\" data-word=\"engtrans\" value=\"hello\">\n  </div>\n</form>\n<div>\n  <form action=\"#\" class=\"mdl-cell--6-col ib\">\n    <div class=\"mdl-textfield mdl-js-textfield\">\n      <input class=\"mdl-textfield__input\" type=\"text\" placeholder=\"Correct answer:\" data-word=\"correctanswer\" value=\"hello\">\n    </div>\n  </form>\n  <form action=\"#\" class=\"mdl-cell--6-col ib\">\n    <div class=\"mdl-textfield mdl-js-textfield\">\n      <input class=\"mdl-textfield__input\" type=\"text\" placeholder=\"Wrong answer:\" data-word=\"wronganswer1\" value=\"woman\">\n    </div>\n  </form>\n</div>\n<div>\n  <form action=\"#\" class=\"mdl-cell--6-col ib\">\n    <div class=\"mdl-textfield mdl-js-textfield\">\n      <input class=\"mdl-textfield__input\" type=\"text\" placeholder=\"Wrong answer:\" data-word=\"wronganswer2\" value=\"goodbye\">\n    </div>\n  </form>\n  <form action=\"#\" class=\"mdl-cell--6-col ib\">\n    <div class=\"mdl-textfield mdl-js-textfield\">\n      <input class=\"mdl-textfield__input\" type=\"text\" placeholder=\"Wrong answer:\" data-word=\"wronganswer3\" value=\"good morning\">\n    </div>\n  </form>\n</div>");
      HOWDOYOUSAY();
    }
    if (lessonType.toUpperCase() === "HOW DO YOU SAY (ARB)?") {
      $(this).parent().parent().next().find("[data-output=lesson]").empty().html("<form action=\"#\" class=\"mdl-cell--6-col ib\">\n  <div class=\"mdl-textfield mdl-js-textfield\">\n    <input class=\"mdl-textfield__input\" type=\"text\" placeholder=\"Arabic word:\" data-word=\"arbword\" value=\"انا\">\n  </div>\n</form>\n<form action=\"#\" class=\"mdl-cell--6-col ib\">\n  <div class=\"mdl-textfield mdl-js-textfield\">\n    <input class=\"mdl-textfield__input\" type=\"text\" placeholder=\"English translation:\" data-word=\"engtrans\" value=\"I; I am; Me\">\n  </div>\n</form>\n<div>\n  <form action=\"#\" class=\"mdl-cell--6-col ib\">\n    <div class=\"mdl-textfield mdl-js-textfield\">\n      <input class=\"mdl-textfield__input\" type=\"text\" placeholder=\"Correct answer:\" data-word=\"correctanswer\" value=\"انا\">\n    </div>\n  </form>\n  <form action=\"#\" class=\"mdl-cell--6-col ib\">\n    <div class=\"mdl-textfield mdl-js-textfield\">\n      <input class=\"mdl-textfield__input\" type=\"text\" placeholder=\"Wrong answer:\" data-word=\"wronganswer1\" value=\"مرحبا\">\n    </div>\n  </form>\n</div>\n<div>\n  <form action=\"#\" class=\"mdl-cell--6-col ib\">\n    <div class=\"mdl-textfield mdl-js-textfield\">\n      <input class=\"mdl-textfield__input\" type=\"text\" placeholder=\"Wrong answer:\" data-word=\"wronganswer2\" value=\"امراه\">\n    </div>\n  </form>\n  <form action=\"#\" class=\"mdl-cell--6-col ib\">\n    <div class=\"mdl-textfield mdl-js-textfield\">\n      <input class=\"mdl-textfield__input\" type=\"text\" placeholder=\"Wrong answer:\" data-word=\"wronganswer3\" value=\"ولد\">\n    </div>\n  </form>\n</div>");
      HOWDOYOUSAYARB();
    }
    if (lessonType.toUpperCase() === "HOW DO YOU SAY {TYPING}?") {
      $(this).parent().parent().next().find("[data-output=lesson]").empty().html("<form action=\"#\" class=\"mdl-cell--6-col ib\">\n  <div class=\"mdl-textfield mdl-js-textfield\">\n    <input class=\"mdl-textfield__input\" type=\"text\" placeholder=\"Arabic word:\" data-word=\"arbword\" value=\"مرحبا\">\n  </div>\n</form>\n<form action=\"#\" class=\"mdl-cell--6-col ib\">\n  <div class=\"mdl-textfield mdl-js-textfield\">\n    <input class=\"mdl-textfield__input\" type=\"text\" placeholder=\"English translation:\" data-word=\"engtrans\" value=\"hello\">\n  </div>\n</form>");
      HOWDOYOUSAYTYPING();
    }
    if (lessonType.toUpperCase() === "WHAT WAS SAID?") {
      $(this).parent().parent().next().find("[data-output=lesson]").empty().html("<form action=\"#\" class=\"mdl-cell--6-col ib\">\n  <div class=\"mdl-textfield mdl-js-textfield\">\n    <input class=\"mdl-textfield__input\" type=\"text\" placeholder=\"Arabic word:\" data-word=\"arbword\" value=\"مرحبا\">\n  </div>\n</form>\n<div>\n  <form action=\"#\" class=\"mdl-cell--6-col ib\">\n    <div class=\"mdl-textfield mdl-js-textfield\">\n      <input class=\"mdl-textfield__input\" type=\"text\" placeholder=\"Correct answer:\" data-word=\"correctanswer\" value=\"girl\">\n    </div>\n  </form>\n  <form action=\"#\" class=\"mdl-cell--6-col ib\">\n    <div class=\"mdl-textfield mdl-js-textfield\">\n      <input class=\"mdl-textfield__input\" type=\"text\" placeholder=\"Wrong answer:\" data-word=\"wronganswer1\" value=\"man\">\n    </div>\n  </form>\n</div>\n<div>\n  <form action=\"#\" class=\"mdl-cell--6-col ib\">\n    <div class=\"mdl-textfield mdl-js-textfield\">\n      <input class=\"mdl-textfield__input\" type=\"text\" placeholder=\"Wrong answer:\" data-word=\"wronganswer2\" value=\"hello\">\n    </div>\n  </form>\n  <form action=\"#\" class=\"mdl-cell--6-col ib\">\n    <div class=\"mdl-textfield mdl-js-textfield\">\n      <input class=\"mdl-textfield__input\" type=\"text\" placeholder=\"Wrong answer:\" data-word=\"wronganswer3\" value=\"woman\">\n    </div>\n  </form>\n</div>");
      WHATWASSAID();
    }
    if (lessonType.toUpperCase() === "WHAT WAS SAID (ARB)?") {
      $(this).parent().parent().next().find("[data-output=lesson]").empty().html("\n<form action=\"#\" class=\"mdl-cell--6-col ib\">\n  <div class=\"mdl-textfield mdl-js-textfield\">\n    <input class=\"mdl-textfield__input\" type=\"text\" placeholder=\"Arabic word:\" data-word=\"arbword\">\n  </div>\n</form>\n<div>\n  <form action=\"#\" class=\"mdl-cell--6-col ib\">\n    <div class=\"mdl-textfield mdl-js-textfield\">\n      <input class=\"mdl-textfield__input\" type=\"text\" placeholder=\"Correct answer:\" data-word=\"correctanswer\">\n    </div>\n  </form>\n  <form action=\"#\" class=\"mdl-cell--6-col ib\">\n    <div class=\"mdl-textfield mdl-js-textfield\">\n      <input class=\"mdl-textfield__input\" type=\"text\" placeholder=\"Wrong answer:\" data-word=\"wronganswer1\">\n    </div>\n  </form>\n</div>\n<div>\n  <form action=\"#\" class=\"mdl-cell--6-col ib\">\n    <div class=\"mdl-textfield mdl-js-textfield\">\n      <input class=\"mdl-textfield__input\" type=\"text\" placeholder=\"Wrong answer:\" data-word=\"wronganswer2\">\n    </div>\n  </form>\n  <form action=\"#\" class=\"mdl-cell--6-col ib\">\n    <div class=\"mdl-textfield mdl-js-textfield\">\n      <input class=\"mdl-textfield__input\" type=\"text\" placeholder=\"Wrong answer:\" data-word=\"wronganswer3\">\n    </div>\n  </form>\n</div>");
      WHATWASSAIDARB();
    }
    if (lessonType.toUpperCase() === "WHAT WAS SAID {TYPING}?") {
      $(this).parent().parent().next().find("[data-output=lesson]").empty().html("<form action=\"#\" class=\"mdl-cell--6-col ib\">\n  <div class=\"mdl-textfield mdl-js-textfield\">\n    <input class=\"mdl-textfield__input\" type=\"text\" placeholder=\"Arabic word:\" data-word=\"arbword\" value=\"امراه\">\n  </div>\n</form>");
      WHATWASSAIDTYPING();
    }
    if (lessonType.toUpperCase() === "SELECT THE MISSING WORD?") {
      $(this).parent().parent().next().find("[data-output=lesson]").empty().html("<form action=\"#\" class=\"mdl-cell--6-col ib\">\n  <div class=\"mdl-textfield mdl-js-textfield\">\n    <input class=\"mdl-textfield__input\" type=\"text\" placeholder=\"Arabic word:\" data-word=\"arbword\" value=\"... انا\">\n  </div>\n</form>\n<form action=\"#\" class=\"mdl-cell--6-col ib\">\n  <div class=\"mdl-textfield mdl-js-textfield\">\n    <input class=\"mdl-textfield__input\" type=\"text\" placeholder=\"English translation:\" data-word=\"engtrans\" value=\"I am; I am a ...\">\n  </div>\n</form>\n<div>\n  <form action=\"#\" class=\"mdl-cell--6-col ib\">\n    <div class=\"mdl-textfield mdl-js-textfield\">\n      <input class=\"mdl-textfield__input\" type=\"text\" placeholder=\"Correct answer:\" data-word=\"correctanswer\" value=\"ولد\">\n    </div>\n  </form>\n  <form action=\"#\" class=\"mdl-cell--6-col ib\">\n    <div class=\"mdl-textfield mdl-js-textfield\">\n      <input class=\"mdl-textfield__input\" type=\"text\" placeholder=\"Wrong answer:\" data-word=\"wronganswer1\" value=\"شكرا\">\n    </div>\n  </form>\n</div>\n<div>\n  <form action=\"#\" class=\"mdl-cell--6-col ib\">\n    <div class=\"mdl-textfield mdl-js-textfield\">\n      <input class=\"mdl-textfield__input\" type=\"text\" placeholder=\"Wrong answer:\" data-word=\"wronganswer2\" value=\"مع السلامه\">\n    </div>\n  </form>\n  <form action=\"#\" class=\"mdl-cell--6-col ib\">\n    <div class=\"mdl-textfield mdl-js-textfield\">\n      <input class=\"mdl-textfield__input\" type=\"text\" placeholder=\"Wrong answer:\" data-word=\"wronganswer3\" value=\"مرحبا\">\n    </div>\n  </form>\n</div>");
      SELECTTHEMISSINGWORD();
    }
    
    localStorage.setItem("grabLessons", $("[data-output=html]").html());
  });
});