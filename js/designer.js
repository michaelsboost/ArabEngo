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
      },
      setLessonCode        = function() {
        $(".lessonpage").each(function() {
          var lessonPage = $(this).parents(".mdl-layout__tab-panel").attr('id').toString();
          lessonPage     = lessonPage.substring(11);
          var nextPage   = parseInt(lessonPage.toString()) + 1;
          var lessonType = $(this).parent().prev("h3").find("span").text();
          
          // Grab lesson answers
          var arbWord = $(this).parent().find("[data-word=arbword]").val();
          var engTrans = $(this).parent().find("[data-word=engtrans]").val();
          var correctAnswer = $(this).parent().find("[data-word=correctanswer]").val();
          var wrongAnswer1 = $(this).parent().find("[data-word=wronganswer1]").val();
          var wrongAnswer2 = $(this).parent().find("[data-word=wronganswer2]").val();
          var wrongAnswer3 = $(this).parent().find("[data-word=wronganswer3]").val();
          
          // Grab text for cards
          var engWord = $(this).parent().find(".cards-container").find("h1").text();
          var correctCard = $(this).parent().find(".card.correct").find("h2").text();
          var wrongCard1 = $(this).parent().find(".card.wrong").first().find("h2").text();
          var wrongCard2 = $(this).parent().find(".card.wrong").first().next().find("h2").text();
          var wrongCard3 = $(this).parent().find(".card.wrong").last().find("h2").text();
          
          if (lessonType.toUpperCase() === "WHICH ONE OF THESE IS?") {
            $(this).val("<div class=\"page "+ lessonPage +"\">\n      <div class=\"txtcenter\" style=\"font: 400 normal normal 24px/2 'Lato';\">\n        Which one of these is \"<span class=\"pointer underline eng ques\">"+ engWord +"</span>\"?\n      </div>\n      \n      <div class=\"cards-container txtcenter\">\n        <a class=\"card correct answer pointer\">\n          <h2 class=\"arb\">"+ correctCard +"</h2>\n\n          <img src=\"../imgs/basics/man.jpg\">\n        </a>\n        <a class=\"card wrong pointer\">\n          <h2 class=\"arb\">"+ wrongCard1 +"</h2>\n\n          <img src=\"../imgs/basics/woman.png\">\n        </a>\n        <a class=\"card wrong pointer\">\n          <h2 class=\"arb\">"+ wrongCard3 +"</h2>\n\n          <img src=\"../imgs/basics/girl.jpg\">\n        </a>\n        <a class=\"card wrong pointer\">\n          <h2 class=\"arb\">"+ wrongCard2 +"</h2>\n\n          <img src=\"../imgs/basics/boy.jpg\">\n        </a>\n      </div>\n    </div>\n    <input id=\""+ nextPage +"\" type=\"radio\" name=\"lesson\">");
          }
          if (lessonType.toUpperCase() === "HOW DO YOU SAY?") {
            $(this).val("<div class=\"page "+ lessonPage +"\">\n      <div class=\"txtcenter\" style=\"font: 400 normal normal 24px/2 'Lato'; cursor: default;\">\n        <p>&nbsp;</p>\n        How do you say \"<span class=\"pointer underline arb ques\" data-meaning=\""+ engTrans +"\">"+ arbWord +"</span>\"?\n      </div>\n\n      <div class=\"grid\">\n        <div class=\"grid__col--12 list txtcenter\">\n          <p>&nbsp;</p>\n          <button class=\"btn--default addword wrong\">"+ wrongAnswer1 +"</button>\n          <button class=\"btn--default addword wrong\">"+ wrongAnswer2 +"</button>\n          <button class=\"btn--default addword correct answer\">"+ correctAnswer +"</button>\n          <button class=\"btn--default addword wrong\">"+ wrongAnswer3 +"</button>\n        </div>\n      </div>\n    </div>\n    <input id=\""+ nextPage +"\" type=\"radio\" name=\"lesson\">");
          }
          if (lessonType.toUpperCase() === "HOW DO YOU SAY {TYPING}?") {
            $(this).val("<div class=\"page "+ lessonPage +"\">\n      <div class=\"txtcenter\" style=\"font: 400 normal normal 24px/2 'Lato'; cursor: default;\">\n        <p>&nbsp;</p>\n        <p>&nbsp;</p>\n        How do you say \"<span class=\"pointer underline eng ques\" data-meaning=\""+ arbWord +"\">"+ engTrans +"</span>\"?\n      </div>\n      \n      <div class=\"hide answer\">"+ arbWord +"</div>\n      \n      <div id=\"charmenu\" class=\"charmenu txtcenter\">\n        <a class=\"pointer\" data-char=\"0\">ي</a>\n        <a class=\"pointer\" data-char=\"1\">و</a>\n        <a class=\"pointer\" data-char=\"2\">ه</a>\n        <a class=\"pointer\" data-char=\"3\">ن</a>\n        <a class=\"pointer\" data-char=\"4\">م</a>\n        <a class=\"pointer\" data-char=\"5\">ل</a>\n        <a class=\"pointer\" data-char=\"6\">ك</a>\n        <a class=\"pointer\" data-char=\"7\">ق</a>\n        <a class=\"pointer\" data-char=\"8\">ف</a>\n        <a class=\"pointer\" data-char=\"9\">غ</a>\n        <a class=\"pointer\" data-char=\"10\">ع</a>\n        <a class=\"pointer\" data-char=\"11\">ظ</a>\n        <a class=\"pointer\" data-char=\"12\">ط</a>\n        <a class=\"pointer\" data-char=\"13\">ض</a>\n        <a class=\"pointer\" data-char=\"14\">ص</a>\n        <a class=\"pointer\" data-char=\"15\">ش</a>\n        <a class=\"pointer\" data-char=\"16\">س</a>\n        <a class=\"pointer\" data-char=\"17\">ز</a>\n        <a class=\"pointer\" data-char=\"18\">ر</a>\n        <a class=\"pointer\" data-char=\"19\">ذ</a>\n        <a class=\"pointer\" data-char=\"20\">د</a>\n        <a class=\"pointer\" data-char=\"21\">خ</a>\n        <a class=\"pointer\" data-char=\"22\">ح</a>\n        <a class=\"pointer\" data-char=\"23\">ج</a>\n        <a class=\"pointer\" data-char=\"24\">ث</a>\n        <a class=\"pointer\" data-char=\"25\">ت</a>\n        <a class=\"pointer\" data-char=\"26\">ب</a>\n        <a class=\"pointer\" data-char=\"27\">ا</a>\n      </div>\n\n      <div class=\"grid\">\n        <div class=\"grid__col--12\">\n          <div>\n            <p>&nbsp;</p>\n            <input class=\"userSentence txtcenter\">\n            <p></p>\n            <button class=\"btn--default fill checkSentence\">\n              Confirm\n            </button>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"grid\">\n        <div class=\"grid__col--8 wordlist txtcenter\">\n          <button class=\"btn--default addword block\" style=\"width: 100%;\">&nbsp;</button>\n        </div>\n        <div class=\"grid__col--4\">\n          <button class=\"btn--default delword fr\" style=\"background: #fff;\">\n            <img class=\"nomar\" src=\"../imgs/backspace.svg\" alt=\"backspace\">\n          </button>\n        </div>\n      </div>\n    </div>\n    <input id=\""+ nextPage +"\" type=\"radio\" name=\"lesson\">");
          }
          if (lessonType.toUpperCase() === "HOW DO YOU SAY (ARB)?") {
            $(this).val("<div class=\"page "+ lessonPage +"\">\n      <div class=\"txtcenter\" style=\"font: 400 normal normal 24px/2 'Lato'; cursor: default;\">\n        <p>&nbsp;</p>\n        How do you say \"<span class=\"pointer underline eng ques\" data-meaning=\""+ arbWord +"\">"+ engTrans +"</span>\"?\n      </div>\n\n      <div class=\"grid\">\n        <div class=\"grid__col--12 list txtcenter\">\n          <p>&nbsp;</p>\n          <button class=\"btn--default arb addword wrong\">"+ wrongAnswer1 +"</button>\n          <button class=\"btn--default arb addword wrong\">"+ wrongAnswer2 +"</button>\n          <button class=\"btn--default arb addword correct answer\">"+ correctAnswer +"</button>\n          <button class=\"btn--default arb addword wrong\">"+ wrongAnswer3 +"</button>\n        </div>\n      </div>\n    </div>\n    <input id=\""+ nextPage +"\" type=\"radio\" name=\"lesson\">");
          }
          if (lessonType.toUpperCase() === "WHAT WAS SAID?") {
            $(this).val("<div class=\"page "+ lessonPage +"\">\n      <span class=\"invisible arb ques\">"+ arbWord +"</span>\n      \n      <div class=\"txtcenter\" style=\"font: 400 normal normal 24px/2 'Lato'; cursor: default;\">\n        <p>\n          What was said?\n        </p>\n        <p>&nbsp;</p>\n      </div>\n      \n      <div class=\"txtcenter\">\n        <a class=\"ib pointer hear xxx-large\">\n          <i class=\"fa fa-volume-up\" style=\"transform: scale(0.8);\"></i>\n        </a>\n      </div>\n      \n      <div class=\"grid\">\n        <div class=\"grid__col--12 list txtcenter\">\n          <p>&nbsp;</p>\n          <button class=\"btn--default addword correct answer\">"+ correctAnswer +"</button>\n          <button class=\"btn--default addword wrong\">"+ wrongAnswer1 +"</button>\n          <button class=\"btn--default addword wrong\">"+ wrongAnswer2 +"</button>\n          <button class=\"btn--default addword wrong\">"+ wrongAnswer3 +"</button>\n        </div>\n      </div>\n    </div>\n    <input id=\""+ nextPage +"\" type=\"radio\" name=\"lesson\">");
          }
          if (lessonType.toUpperCase() === "WHAT WAS SAID {TYPING}?") {
            $(this).val("<div class=\"page "+ lessonPage +"\">\n      <span class=\"invisible arb ques answer\">"+ arbWord +"</span>\n      \n      <div class=\"txtcenter\" style=\"font: 400 normal normal 24px/2 'Lato'; cursor: default;\">\n        <p>&nbsp;</p>\n        <p>\n          What was said?\n        </p>\n      </div>\n\n      <div class=\"txtcenter\">\n        <a class=\"ib pointer hear xxx-large\">\n          <i class=\"fa fa-volume-up\" style=\"transform: scale(0.8);\"></i>\n        </a>\n      </div>\n\n      <div id=\"charmenu\" class=\"charmenu txtcenter\">\n        <a class=\"pointer\" data-char=\"0\">ي</a>\n        <a class=\"pointer\" data-char=\"1\">و</a>\n        <a class=\"pointer\" data-char=\"2\">ه</a>\n        <a class=\"pointer\" data-char=\"3\">ن</a>\n        <a class=\"pointer\" data-char=\"4\">م</a>\n        <a class=\"pointer\" data-char=\"5\">ل</a>\n        <a class=\"pointer\" data-char=\"6\">ك</a>\n        <a class=\"pointer\" data-char=\"7\">ق</a>\n        <a class=\"pointer\" data-char=\"8\">ف</a>\n        <a class=\"pointer\" data-char=\"9\">غ</a>\n        <a class=\"pointer\" data-char=\"10\">ع</a>\n        <a class=\"pointer\" data-char=\"11\">ظ</a>\n        <a class=\"pointer\" data-char=\"12\">ط</a>\n        <a class=\"pointer\" data-char=\"13\">ض</a>\n        <a class=\"pointer\" data-char=\"14\">ص</a>\n        <a class=\"pointer\" data-char=\"15\">ش</a>\n        <a class=\"pointer\" data-char=\"16\">س</a>\n        <a class=\"pointer\" data-char=\"17\">ز</a>\n        <a class=\"pointer\" data-char=\"18\">ر</a>\n        <a class=\"pointer\" data-char=\"19\">ذ</a>\n        <a class=\"pointer\" data-char=\"20\">د</a>\n        <a class=\"pointer\" data-char=\"21\">خ</a>\n        <a class=\"pointer\" data-char=\"22\">ح</a>\n        <a class=\"pointer\" data-char=\"23\">ج</a>\n        <a class=\"pointer\" data-char=\"24\">ث</a>\n        <a class=\"pointer\" data-char=\"25\">ت</a>\n        <a class=\"pointer\" data-char=\"26\">ب</a>\n        <a class=\"pointer\" data-char=\"27\">ا</a>\n      </div>\n\n      <div class=\"grid\">\n        <div class=\"grid__col--12\">\n          <div>\n            <p>&nbsp;</p>\n            <input class=\"userSentence txtcenter\">\n            <p></p>\n            <button class=\"btn--default fill checkSentence\">\n              Confirm\n            </button>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"grid\">\n        <div class=\"grid__col--8 wordlist txtcenter\">\n          <button class=\"btn--default addword block\" style=\"width: 100%;\">&nbsp;</button>\n        </div>\n        <div class=\"grid__col--4\">\n          <button class=\"btn--default delword fr\" style=\"background: #fff;\">\n            <img class=\"nomar\" src=\"../imgs/backspace.svg\" alt=\"backspace\">\n          </button>\n        </div>\n      </div>\n    </div>\n    <input id=\""+ nextPage +"\" type=\"radio\" name=\"lesson\">");
          }
          if (lessonType.toUpperCase() === "SELECT THE MISSING WORD?") {
            $(this).val("<div class=\"page "+ lessonPage +"\">\n      <div class=\"txtcenter\" style=\"font: 400 normal normal 24px/2 'Lato'; cursor: default;\">\n        <p>&nbsp;</p>\n        Select the missing word \"<span class=\"pointer underline arb ques\" data-meaning=\""+ engTrans +"\">"+ arbWord +"</span>\"?\n      </div>\n\n      <div class=\"grid\">\n        <div class=\"grid__col--12 list txtcenter\">\n          <p>&nbsp;</p>\n          <button class=\"btn--default arb addword wrong\">"+ wrongAnswer1 +"</button>\n          <button class=\"btn--default arb addword wrong\">"+ wrongAnswer2 +"</button>\n          <button class=\"btn--default arb addword wrong\">"+ wrongAnswer3 +"</button>\n          <button class=\"btn--default arb addword correct answer\">"+ correctAnswer +"</button>\n        </div>\n      </div>\n    </div>\n    <input id=\""+ nextPage +"\" type=\"radio\" name=\"lesson\">");
          }
          
          if (lessonPage === "1") {
            var firstPage = '<input id="1" type="radio" name="lesson" checked>';
            $(this).val(firstPage + '\n' + $(this).val());
          }
          if (lessonPage === "20") {
            var lastPage = "<!--End of the lesson-->\n    <div class=\"page 21 end\">\n      <div class=\"txtcenter\" style=\"font: 400 normal normal 24px/2 'Lato';\">\n        <br><br>\n        You've completed <span data-document=\"title\"></span>\n        <p>&nbsp;</p>\n      </div>\n      \n      <div class=\"grid\">\n        <div class=\"grid__col--12\">\n          <h2>You scored!</h2>\n          <h1>\n            <span data-correct=\"amount\">0</span> out of 20\n          </h1>\n        </div>\n      </div>\n      \n      <p>&nbsp;</p>\n      <p>&nbsp;</p>\n      \n      <div class=\"grid\">\n        <div class=\"grid__col--12 txtcenter\">\n          <a href=\"../skills/basics1.html\" class=\"btn--default fill pointer\">\n            Back\n          </a>\n        </div>\n      </div>\n    </div>\n    \n    <!-- Speaking Tips -->\n    <div class=\"tips\">\n      <div class=\"txtcenter\" style=\"font: 400 normal normal 24px/2 'Lato';\">\n        <br><br>\n        General tips on how to pass a speaking exercise:\n        <p>&nbsp;</p>\n      </div>\n      \n      <div class=\"grid\">\n        <div class=\"grid__col--12\">\n          <p>\n            <i class=\"fa fa-circle\" style=\"transform: scale(0.6);\"></i>\n            Speak aloud and close to the microphone.\n          </p>\n          <p>\n            <i class=\"fa fa-circle\" style=\"transform: scale(0.6);\"></i>\n            Don't speak slowly. Speak at a natural pace.\n          </p>\n          <p>\n            <i class=\"fa fa-circle\" style=\"transform: scale(0.6);\"></i>\n            For beginners, focus more on the whole sentence. Don't get stuck on 1~2 mispronounced words.\n          </p>\n        </div>\n      </div>\n      \n      <p>&nbsp;</p>\n      <p>&nbsp;</p>\n      \n      <div class=\"grid\">\n        <div class=\"grid__col--12 txtcenter\">\n          <label for=\"speak\" class=\"btn--default fill pointer\">\n            Back\n          </label>\n        </div>\n      </div>\n    </div>\n    \n    <!--Translation tooltip-->\n    <div class=\"translation hide\">\n      <i class=\"fa fa-caret-up\"></i>\n      \n      <div class=\"text\"></div>\n    </div>";
            $(this).val($(this).val() + '\n\n' + lastPage);
          }
        });
      },
      fullLessonCode       = function() {
        $('.fullcode').val(function() {
          return $.map($(".lessonpage"), function(el) {
            return el.value
          }).join('\n\n');
        });
      };
  
  $("input, [contentEditable]").on("keyup change", function() {
    setLessonCode();
    fullLessonCode();
  });
  setLessonCode();
  fullLessonCode();
  
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
    
    var fullLesson = "<!DOCTYPE html>\n<html>\n  <head>\n    <title>ArabEngo: "+ $("[data-lesson=title]").text() +"</title>\n    <meta charset=\"utf-8\">\n    <meta name=\"viewport\" content=\"initial-scale=1.0\">\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=9\">\n    <link rel=\"stylesheet\" href=\"../css/lessons.css\">\n    <script src=\"../libraries/jquery/jquery.js\"></script>\n    <script src=\"../libraries/alertify/alertify.min.js\"></script>\n  </head>\n  <body>\n    <script src=\"../js/responsivevoice.js\"></script>\n    <script src=\"../js/annyang.min.js\"></script>\n    <script src=\"../js/speechkitt.min.js\"></script>\n    <script src=\"../js/lessons.js\"></script>\n    \n    <!--Lesson Pages-->\n    "+ $('.fullcode').val() +"\n  </body>\n</html>";
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
//    WHAT WAS SAID {TYPING}?
//    SELECT THE MISSING WORD?

    var lessonType = $(this).find("span").text();
    $(this).parent().parent().next().find("[data-output=questiontype]").text(lessonType);
    if (lessonType.toUpperCase() === "WHICH ONE OF THESE IS?") {
      $(this).parent().parent().next().find("[data-output=lesson]").empty().html("<textarea class=\"lessonpage\"></textarea>\n\n<div class=\"cards-container txtcenter\">\n  <h1 contenteditable=\"true\">hello</h1>\n  <a class=\"card correct answer pointer\">\n    <h2 class=\"arb\" contenteditable=\"true\">رجل</h2>\n\n    <img src=\"../imgs/basics/man.jpg\">\n  </a>\n  <a class=\"card wrong pointer\">\n    <h2 class=\"arb\" contenteditable=\"true\">امراه</h2>\n\n    <img src=\"../imgs/basics/woman.png\">\n  </a>\n  <a class=\"card wrong pointer\">\n    <h2 class=\"arb\" contenteditable=\"true\">ولد</h2>\n\n    <img src=\"../imgs/basics/boy.jpg\">\n  </a>\n  <a class=\"card wrong pointer\">\n    <h2 class=\"arb\" contenteditable=\"true\">بنت</h2>\n\n    <img src=\"../imgs/basics/girl.jpg\">\n  </a>\n</div>");
      WHICHONEOFTHESEIS();
    }
    if (lessonType.toUpperCase() === "HOW DO YOU SAY?") {
      $(this).parent().parent().next().find("[data-output=lesson]").empty().html("<textarea class=\"lessonpage\"></textarea>\n\n<form action=\"#\" class=\"mdl-cell--6-col ib\">\n  <div class=\"mdl-textfield mdl-js-textfield\">\n    <input class=\"mdl-textfield__input\" type=\"text\" placeholder=\"Arabic word:\" data-word=\"arbword\" value=\"مرحبا\">\n  </div>\n</form>\n<form action=\"#\" class=\"mdl-cell--6-col ib\">\n  <div class=\"mdl-textfield mdl-js-textfield\">\n    <input class=\"mdl-textfield__input\" type=\"text\" placeholder=\"English translation:\" data-word=\"engtrans\" value=\"hello\">\n  </div>\n</form>\n<div>\n  <form action=\"#\" class=\"mdl-cell--6-col ib\">\n    <div class=\"mdl-textfield mdl-js-textfield\">\n      <input class=\"mdl-textfield__input\" type=\"text\" placeholder=\"Correct answer:\" data-word=\"correctanswer\" value=\"hello\">\n    </div>\n  </form>\n  <form action=\"#\" class=\"mdl-cell--6-col ib\">\n    <div class=\"mdl-textfield mdl-js-textfield\">\n      <input class=\"mdl-textfield__input\" type=\"text\" placeholder=\"Wrong answer:\" data-word=\"wronganswer1\" value=\"woman\">\n    </div>\n  </form>\n</div>\n<div>\n  <form action=\"#\" class=\"mdl-cell--6-col ib\">\n    <div class=\"mdl-textfield mdl-js-textfield\">\n      <input class=\"mdl-textfield__input\" type=\"text\" placeholder=\"Wrong answer:\" data-word=\"wronganswer2\" value=\"goodbye\">\n    </div>\n  </form>\n  <form action=\"#\" class=\"mdl-cell--6-col ib\">\n    <div class=\"mdl-textfield mdl-js-textfield\">\n      <input class=\"mdl-textfield__input\" type=\"text\" placeholder=\"Wrong answer:\" data-word=\"wronganswer3\" value=\"good morning\">\n    </div>\n  </form>\n</div>");
      HOWDOYOUSAY();
    }
    if (lessonType.toUpperCase() === "HOW DO YOU SAY (ARB)?") {
      $(this).parent().parent().next().find("[data-output=lesson]").empty().html("<textarea class=\"lessonpage\"></textarea>\n\n<form action=\"#\" class=\"mdl-cell--6-col ib\">\n  <div class=\"mdl-textfield mdl-js-textfield\">\n    <input class=\"mdl-textfield__input\" type=\"text\" placeholder=\"Arabic word:\" data-word=\"arbword\" value=\"انا\">\n  </div>\n</form>\n<form action=\"#\" class=\"mdl-cell--6-col ib\">\n  <div class=\"mdl-textfield mdl-js-textfield\">\n    <input class=\"mdl-textfield__input\" type=\"text\" placeholder=\"English translation:\" data-word=\"engtrans\" value=\"I; I am; Me\">\n  </div>\n</form>\n<div>\n  <form action=\"#\" class=\"mdl-cell--6-col ib\">\n    <div class=\"mdl-textfield mdl-js-textfield\">\n      <input class=\"mdl-textfield__input\" type=\"text\" placeholder=\"Correct answer:\" data-word=\"correctanswer\" value=\"انا\">\n    </div>\n  </form>\n  <form action=\"#\" class=\"mdl-cell--6-col ib\">\n    <div class=\"mdl-textfield mdl-js-textfield\">\n      <input class=\"mdl-textfield__input\" type=\"text\" placeholder=\"Wrong answer:\" data-word=\"wronganswer1\" value=\"مرحبا\">\n    </div>\n  </form>\n</div>\n<div>\n  <form action=\"#\" class=\"mdl-cell--6-col ib\">\n    <div class=\"mdl-textfield mdl-js-textfield\">\n      <input class=\"mdl-textfield__input\" type=\"text\" placeholder=\"Wrong answer:\" data-word=\"wronganswer2\" value=\"امراه\">\n    </div>\n  </form>\n  <form action=\"#\" class=\"mdl-cell--6-col ib\">\n    <div class=\"mdl-textfield mdl-js-textfield\">\n      <input class=\"mdl-textfield__input\" type=\"text\" placeholder=\"Wrong answer:\" data-word=\"wronganswer3\" value=\"ولد\">\n    </div>\n  </form>\n</div>");
      HOWDOYOUSAYARB();
    }
    if (lessonType.toUpperCase() === "HOW DO YOU SAY {TYPING}?") {
      $(this).parent().parent().next().find("[data-output=lesson]").empty().html("<textarea class=\"lessonpage\"></textarea>\n\n<form action=\"#\" class=\"mdl-cell--6-col ib\">\n  <div class=\"mdl-textfield mdl-js-textfield\">\n    <input class=\"mdl-textfield__input\" type=\"text\" placeholder=\"Arabic word:\" data-word=\"arbword\" value=\"مرحبا\">\n  </div>\n</form>\n<form action=\"#\" class=\"mdl-cell--6-col ib\">\n  <div class=\"mdl-textfield mdl-js-textfield\">\n    <input class=\"mdl-textfield__input\" type=\"text\" placeholder=\"English translation:\" data-word=\"engtrans\" value=\"hello\">\n  </div>\n</form>");
      HOWDOYOUSAYTYPING();
    }
    if (lessonType.toUpperCase() === "WHAT WAS SAID?") {
      $(this).parent().parent().next().find("[data-output=lesson]").empty().html("<textarea class=\"lessonpage\"></textarea>\n\n<form action=\"#\" class=\"mdl-cell--6-col ib\">\n  <div class=\"mdl-textfield mdl-js-textfield\">\n    <input class=\"mdl-textfield__input\" type=\"text\" placeholder=\"Arabic word:\" data-word=\"arbword\" value=\"مرحبا\">\n  </div>\n</form>\n<div>\n  <form action=\"#\" class=\"mdl-cell--6-col ib\">\n    <div class=\"mdl-textfield mdl-js-textfield\">\n      <input class=\"mdl-textfield__input\" type=\"text\" placeholder=\"Correct answer:\" data-word=\"correctanswer\" value=\"girl\">\n    </div>\n  </form>\n  <form action=\"#\" class=\"mdl-cell--6-col ib\">\n    <div class=\"mdl-textfield mdl-js-textfield\">\n      <input class=\"mdl-textfield__input\" type=\"text\" placeholder=\"Wrong answer:\" data-word=\"wronganswer1\" value=\"man\">\n    </div>\n  </form>\n</div>\n<div>\n  <form action=\"#\" class=\"mdl-cell--6-col ib\">\n    <div class=\"mdl-textfield mdl-js-textfield\">\n      <input class=\"mdl-textfield__input\" type=\"text\" placeholder=\"Wrong answer:\" data-word=\"wronganswer2\" value=\"hello\">\n    </div>\n  </form>\n  <form action=\"#\" class=\"mdl-cell--6-col ib\">\n    <div class=\"mdl-textfield mdl-js-textfield\">\n      <input class=\"mdl-textfield__input\" type=\"text\" placeholder=\"Wrong answer:\" data-word=\"wronganswer3\" value=\"woman\">\n    </div>\n  </form>\n</div>");
      WHATWASSAID();
    }
    if (lessonType.toUpperCase() === "WHAT WAS SAID {TYPING}?") {
      $(this).parent().parent().next().find("[data-output=lesson]").empty().html("<textarea class=\"lessonpage\"></textarea>\n\n<form action=\"#\" class=\"mdl-cell--6-col ib\">\n  <div class=\"mdl-textfield mdl-js-textfield\">\n    <input class=\"mdl-textfield__input\" type=\"text\" placeholder=\"Arabic word:\" data-word=\"arbword\" value=\"امراه\">\n  </div>\n</form>");
      WHATWASSAIDTYPING();
    }
    if (lessonType.toUpperCase() === "SELECT THE MISSING WORD?") {
      $(this).parent().parent().next().find("[data-output=lesson]").empty().html("<textarea class=\"lessonpage\"></textarea>\n\n<form action=\"#\" class=\"mdl-cell--6-col ib\">\n  <div class=\"mdl-textfield mdl-js-textfield\">\n    <input class=\"mdl-textfield__input\" type=\"text\" placeholder=\"Arabic word:\" data-word=\"arbword\" value=\"... انا\">\n  </div>\n</form>\n<form action=\"#\" class=\"mdl-cell--6-col ib\">\n  <div class=\"mdl-textfield mdl-js-textfield\">\n    <input class=\"mdl-textfield__input\" type=\"text\" placeholder=\"English translation:\" data-word=\"engtrans\" value=\"I am; I am a ...\">\n  </div>\n</form>\n<div>\n  <form action=\"#\" class=\"mdl-cell--6-col ib\">\n    <div class=\"mdl-textfield mdl-js-textfield\">\n      <input class=\"mdl-textfield__input\" type=\"text\" placeholder=\"Correct answer:\" data-word=\"correctanswer\" value=\"ولد\">\n    </div>\n  </form>\n  <form action=\"#\" class=\"mdl-cell--6-col ib\">\n    <div class=\"mdl-textfield mdl-js-textfield\">\n      <input class=\"mdl-textfield__input\" type=\"text\" placeholder=\"Wrong answer:\" data-word=\"wronganswer1\" value=\"شكرا\">\n    </div>\n  </form>\n</div>\n<div>\n  <form action=\"#\" class=\"mdl-cell--6-col ib\">\n    <div class=\"mdl-textfield mdl-js-textfield\">\n      <input class=\"mdl-textfield__input\" type=\"text\" placeholder=\"Wrong answer:\" data-word=\"wronganswer2\" value=\"مع السلامه\">\n    </div>\n  </form>\n  <form action=\"#\" class=\"mdl-cell--6-col ib\">\n    <div class=\"mdl-textfield mdl-js-textfield\">\n      <input class=\"mdl-textfield__input\" type=\"text\" placeholder=\"Wrong answer:\" data-word=\"wronganswer3\" value=\"مرحبا\">\n    </div>\n  </form>\n</div>");
      SELECTTHEMISSINGWORD();
    }
    
    localStorage.setItem("grabLessons", $("[data-output=html]").html());
  });
});