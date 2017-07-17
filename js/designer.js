var addImage = function(source) {
  document.querySelector("[data-search=flicker]").value = "";
  document.querySelector("[data-output=images]").innerHTML = "";
  
  document.querySelector(".selected").src = source;
  document.querySelector(".selected").className = "";
  document.querySelector("[data-action=saveCode]").click();
};
//localStorage.clear();

$(document).ready(function() {
//  $(".mdl-layout__tab-bar a:eq(3)").click();
  $(".comingsoon").click(function() {
    alertify.message('coming soon..');
  });
  $("[data-action=saveCode]").click(function() {
    setLessonCode();
    fullLessonCode();
  });
  
  $(".lesson-types").html("<a data-lesson=\"whichoneoftheseis\" class=\"mdl-button mdl-js-button mdl-js-ripple-effect\">\n  <img src=\"../imgs/matching.png\">\n  <span>Which one of these is?</span>\n</a>\n<a data-lesson=\"saveLessonState\" class=\"mdl-button mdl-js-button mdl-js-ripple-effect\">\n  <img src=\"../imgs/speak.png\">\n  <span>How do you say?</span>\n</a>\n<a data-lesson=\"saveLessonStatebtns\" class=\"mdl-button mdl-js-button mdl-js-ripple-effect\">\n  <img src=\"../imgs/ear.png\">\n  <span>How do you say (arb)?</span>\n</a>\n<a data-lesson=\"saveLessonState\" class=\"mdl-button mdl-js-button mdl-js-ripple-effect\">\n  <img src=\"../imgs/message1.png\">\n  <span>How do you say {typing}?</span>\n</a>\n<a data-lesson=\"saveLessonState\" class=\"mdl-button mdl-js-button mdl-js-ripple-effect\">\n  <img src=\"../imgs/ear2.png\">\n  <span>What was said?</span>\n</a>\n<a data-lesson=\"saveLessonState\" class=\"mdl-button mdl-js-button mdl-js-ripple-effect\">\n  <img src=\"../imgs/message2.png\">\n  <span>What was said {typing}?</span>\n</a>\n<a data-lesson=\"saveLessonState\" class=\"mdl-button mdl-js-button mdl-js-ripple-effect\">\n  <img src=\"../imgs/eye.png\">\n  <span>Select the missing word?</span>\n</a>");
  
  var page,
      searchForPictures    = function(source) {
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
          $("[data-search=flicker]").focus();
          localStorage.setItem("grabLessons", $("[data-output=html]").html());
        });
      },
      saveLessonState      = function() {
        localStorage.setItem("grabLessons", $("[data-output=html]").html());
      },
      setLocalStorage      = function() {
        // Remember tab
        if ( localStorage.getItem("rememberTab")) {
          $('a.mdl-layout__tab').removeClass('is-active');
          // activate desired tab
          $('a[href="#scroll-tab-'+ parseInt(localStorage.getItem("rememberTab")) +'"]').addClass('is-active');
          // remove all is-active classes from panels
          $('.mdl-layout__tab-panel').removeClass('is-active');
          // activate desired tab panel
          $('#scroll-tab-'+ parseInt(localStorage.getItem("rememberTab"))).addClass('is-active');
        }
        $("a.mdl-layout__tab").on("click", function() {
          page = $(this).index();
          localStorage.setItem("rememberTab", $(this).index());
        });
        
        // Remember lessons
        if ( localStorage.getItem("grabLessons")) {
          $("[data-output=html]").html(localStorage.getItem("grabLessons"));
        }
        $("[data-output=html] input[type=text]").on("keyup change", function() {
          $(this).attr('value', this.value);
          $("[data-action=saveCode]").trigger("click");
          localStorage.setItem("grabLessons", $("[data-output=html]").html());
        });
        $("form").submit(function(e) {
          e.preventDefault();
        });
        $("[contenteditable]").on("keyup change", function() {
          $("[data-action=saveCode]").trigger("click");
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
          var cardContainer = $(this).parent().find(".cards-container");
          cardContainer.find("h1").hide();
          cardContainer = cardContainer.html();
          
          if (lessonType.toUpperCase() === "WHICH ONE OF THESE IS?") {
            $(this).val("<div class=\"page "+ lessonPage +"\">\n      <div class=\"txtcenter\" style=\"font: 400 normal normal 24px/2 'Lato';\">\n        Which one of these is \"<span class=\"pointer underline eng ques\">"+ engWord +"</span>\"?\n      </div>\n      \n      <div class=\"cards-container txtcenter\">"+ cardContainer +"</div>\n    </div>\n    <input id=\""+ nextPage +"\" type=\"radio\" name=\"lesson\">");
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
            var lastPage = "<!--End of the lesson-->\n    <div class=\"page 21 end\">\n      <div class=\"txtcenter\" style=\"font: 400 normal normal 24px/2 'Lato';\">\n        <br><br>\n        You've completed <span data-document=\"title\"></span>\n        <p>&nbsp;</p>\n      </div>\n      \n      <div class=\"grid\">\n        <div class=\"grid__col--12\">\n          <h2>You scored!</h2>\n          <h1>\n            <span data-correct=\"amount\">0</span> out of 20\n          </h1>\n        </div>\n      </div>\n      \n      <p>&nbsp;</p>\n      <p>&nbsp;</p>\n      \n      <div class=\"grid\">\n        <div class=\"grid__col--12 txtcenter\">\n          <a href=\"../lessons/\" class=\"btn--default fill pointer\">\n            Back\n          </a>\n        </div>\n      </div>\n    </div>\n    \n    <!-- Speaking Tips -->\n    <div class=\"tips\">\n      <div class=\"txtcenter\" style=\"font: 400 normal normal 24px/2 'Lato';\">\n        <br><br>\n        General tips on how to pass a speaking exercise:\n        <p>&nbsp;</p>\n      </div>\n      \n      <div class=\"grid\">\n        <div class=\"grid__col--12\">\n          <p>\n            <i class=\"fa fa-circle\" style=\"transform: scale(0.6);\"></i>\n            Speak aloud and close to the microphone.\n          </p>\n          <p>\n            <i class=\"fa fa-circle\" style=\"transform: scale(0.6);\"></i>\n            Don't speak slowly. Speak at a natural pace.\n          </p>\n          <p>\n            <i class=\"fa fa-circle\" style=\"transform: scale(0.6);\"></i>\n            For beginners, focus more on the whole sentence. Don't get stuck on 1~2 mispronounced words.\n          </p>\n        </div>\n      </div>\n      \n      <p>&nbsp;</p>\n      <p>&nbsp;</p>\n      \n      <div class=\"grid\">\n        <div class=\"grid__col--12 txtcenter\">\n          <label for=\"speak\" class=\"btn--default fill pointer\">\n            Back\n          </label>\n        </div>\n      </div>\n    </div>\n    \n    <!--Translation tooltip-->\n    <div class=\"translation hide\">\n      <i class=\"fa fa-caret-up\"></i>\n      \n      <div class=\"text\"></div>\n    </div>";
            $(this).val($(this).val() + '\n\n' + lastPage);
          }
          $(".cards-container h1").show();
        });
      },
      fullLessonCode       = function() {
        $('.fullcode').val(function() {
          return $.map($(".lessonpage"), function(el) {
            return el.value
          }).join('\n\n');
        });
      },
      detectOrientation    = function() {
        if (window.innerWidth <= window.innerHeight) {
          // portrait
          if (window.innerWidth <= 325) {
            $(".mdl-spinner").css({
              "width": window.innerWidth / 2.5 + "px",
              "height": window.innerWidth / 2.5 + "px"
            });
          } else {
            $(".mdl-spinner").attr("style", "");
          }
        } else {
          // landscape
          if (window.innerHeight <= 325) {
            $(".mdl-spinner").css({
              "width": window.innerHeight / 2.5 + "px",
              "height": window.innerHeight / 2.5 + "px"
            });
          } else {
            $(".mdl-spinner").attr("style", "");
          }
        }
      },
      initiateDesigner     = function() {
        $("[data-output=html] input[type=text], [contentEditable]").on("keyup change", function() {
          setLocalStorage();
        });

        //  Debug lesson
        $("[data-action=play]").click(function() {
          //alertify.message('Debug lesson coming soon...');

          if (!$("[data-output=html] input").val()) {
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
          if ($(".display-modal").is(":visible")) {
            $(".display-modal").fadeOut();
          }
        });
        setLocalStorage();
        WHICHONEOFTHESEIS();
        setLessonCode();
        fullLessonCode();

        //  Change lesson type
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
            saveLessonState();
          }
          if (lessonType.toUpperCase() === "HOW DO YOU SAY (ARB)?") {
            $(this).parent().parent().next().find("[data-output=lesson]").empty().html("<textarea class=\"lessonpage\"></textarea>\n\n<form action=\"#\" class=\"mdl-cell--6-col ib\">\n  <div class=\"mdl-textfield mdl-js-textfield\">\n    <input class=\"mdl-textfield__input\" type=\"text\" placeholder=\"Arabic word:\" data-word=\"arbword\" value=\"انا\">\n  </div>\n</form>\n<form action=\"#\" class=\"mdl-cell--6-col ib\">\n  <div class=\"mdl-textfield mdl-js-textfield\">\n    <input class=\"mdl-textfield__input\" type=\"text\" placeholder=\"English translation:\" data-word=\"engtrans\" value=\"I; I am; Me\">\n  </div>\n</form>\n<div>\n  <form action=\"#\" class=\"mdl-cell--6-col ib\">\n    <div class=\"mdl-textfield mdl-js-textfield\">\n      <input class=\"mdl-textfield__input\" type=\"text\" placeholder=\"Correct answer:\" data-word=\"correctanswer\" value=\"انا\">\n    </div>\n  </form>\n  <form action=\"#\" class=\"mdl-cell--6-col ib\">\n    <div class=\"mdl-textfield mdl-js-textfield\">\n      <input class=\"mdl-textfield__input\" type=\"text\" placeholder=\"Wrong answer:\" data-word=\"wronganswer1\" value=\"مرحبا\">\n    </div>\n  </form>\n</div>\n<div>\n  <form action=\"#\" class=\"mdl-cell--6-col ib\">\n    <div class=\"mdl-textfield mdl-js-textfield\">\n      <input class=\"mdl-textfield__input\" type=\"text\" placeholder=\"Wrong answer:\" data-word=\"wronganswer2\" value=\"امراه\">\n    </div>\n  </form>\n  <form action=\"#\" class=\"mdl-cell--6-col ib\">\n    <div class=\"mdl-textfield mdl-js-textfield\">\n      <input class=\"mdl-textfield__input\" type=\"text\" placeholder=\"Wrong answer:\" data-word=\"wronganswer3\" value=\"ولد\">\n    </div>\n  </form>\n</div>");
            saveLessonState();
          }
          if (lessonType.toUpperCase() === "HOW DO YOU SAY {TYPING}?") {
            $(this).parent().parent().next().find("[data-output=lesson]").empty().html("<textarea class=\"lessonpage\"></textarea>\n\n<form action=\"#\" class=\"mdl-cell--6-col ib\">\n  <div class=\"mdl-textfield mdl-js-textfield\">\n    <input class=\"mdl-textfield__input\" type=\"text\" placeholder=\"Arabic word:\" data-word=\"arbword\" value=\"مرحبا\">\n  </div>\n</form>\n<form action=\"#\" class=\"mdl-cell--6-col ib\">\n  <div class=\"mdl-textfield mdl-js-textfield\">\n    <input class=\"mdl-textfield__input\" type=\"text\" placeholder=\"English translation:\" data-word=\"engtrans\" value=\"hello\">\n  </div>\n</form>");
            saveLessonState();
          }
          if (lessonType.toUpperCase() === "WHAT WAS SAID?") {
            $(this).parent().parent().next().find("[data-output=lesson]").empty().html("<textarea class=\"lessonpage\"></textarea>\n\n<form action=\"#\" class=\"mdl-cell--6-col ib\">\n  <div class=\"mdl-textfield mdl-js-textfield\">\n    <input class=\"mdl-textfield__input\" type=\"text\" placeholder=\"Arabic word:\" data-word=\"arbword\" value=\"بنت\">\n  </div>\n</form>\n<div>\n  <form action=\"#\" class=\"mdl-cell--6-col ib\">\n    <div class=\"mdl-textfield mdl-js-textfield\">\n      <input class=\"mdl-textfield__input\" type=\"text\" placeholder=\"Correct answer:\" data-word=\"correctanswer\" value=\"girl\">\n    </div>\n  </form>\n  <form action=\"#\" class=\"mdl-cell--6-col ib\">\n    <div class=\"mdl-textfield mdl-js-textfield\">\n      <input class=\"mdl-textfield__input\" type=\"text\" placeholder=\"Wrong answer:\" data-word=\"wronganswer1\" value=\"man\">\n    </div>\n  </form>\n</div>\n<div>\n  <form action=\"#\" class=\"mdl-cell--6-col ib\">\n    <div class=\"mdl-textfield mdl-js-textfield\">\n      <input class=\"mdl-textfield__input\" type=\"text\" placeholder=\"Wrong answer:\" data-word=\"wronganswer2\" value=\"hello\">\n    </div>\n  </form>\n  <form action=\"#\" class=\"mdl-cell--6-col ib\">\n    <div class=\"mdl-textfield mdl-js-textfield\">\n      <input class=\"mdl-textfield__input\" type=\"text\" placeholder=\"Wrong answer:\" data-word=\"wronganswer3\" value=\"woman\">\n    </div>\n  </form>\n</div>");
            saveLessonState();
          }
          if (lessonType.toUpperCase() === "WHAT WAS SAID {TYPING}?") {
            $(this).parent().parent().next().find("[data-output=lesson]").empty().html("<textarea class=\"lessonpage\"></textarea>\n\n<form action=\"#\" class=\"mdl-cell--6-col ib\">\n  <div class=\"mdl-textfield mdl-js-textfield\">\n    <input class=\"mdl-textfield__input\" type=\"text\" placeholder=\"Arabic word:\" data-word=\"arbword\" value=\"امراه\">\n  </div>\n</form>");
            saveLessonState();
          }
          if (lessonType.toUpperCase() === "SELECT THE MISSING WORD?") {
            $(this).parent().parent().next().find("[data-output=lesson]").empty().html("<textarea class=\"lessonpage\"></textarea>\n\n<form action=\"#\" class=\"mdl-cell--6-col ib\">\n  <div class=\"mdl-textfield mdl-js-textfield\">\n    <input class=\"mdl-textfield__input\" type=\"text\" placeholder=\"Arabic word:\" data-word=\"arbword\" value=\"... انا\">\n  </div>\n</form>\n<form action=\"#\" class=\"mdl-cell--6-col ib\">\n  <div class=\"mdl-textfield mdl-js-textfield\">\n    <input class=\"mdl-textfield__input\" type=\"text\" placeholder=\"English translation:\" data-word=\"engtrans\" value=\"I am; I am a ...\">\n  </div>\n</form>\n<div>\n  <form action=\"#\" class=\"mdl-cell--6-col ib\">\n    <div class=\"mdl-textfield mdl-js-textfield\">\n      <input class=\"mdl-textfield__input\" type=\"text\" placeholder=\"Correct answer:\" data-word=\"correctanswer\" value=\"ولد\">\n    </div>\n  </form>\n  <form action=\"#\" class=\"mdl-cell--6-col ib\">\n    <div class=\"mdl-textfield mdl-js-textfield\">\n      <input class=\"mdl-textfield__input\" type=\"text\" placeholder=\"Wrong answer:\" data-word=\"wronganswer1\" value=\"شكرا\">\n    </div>\n  </form>\n</div>\n<div>\n  <form action=\"#\" class=\"mdl-cell--6-col ib\">\n    <div class=\"mdl-textfield mdl-js-textfield\">\n      <input class=\"mdl-textfield__input\" type=\"text\" placeholder=\"Wrong answer:\" data-word=\"wronganswer2\" value=\"مع السلامه\">\n    </div>\n  </form>\n  <form action=\"#\" class=\"mdl-cell--6-col ib\">\n    <div class=\"mdl-textfield mdl-js-textfield\">\n      <input class=\"mdl-textfield__input\" type=\"text\" placeholder=\"Wrong answer:\" data-word=\"wronganswer3\" value=\"مرحبا\">\n    </div>\n  </form>\n</div>");
            saveLessonState();
          }

          $("[data-output=html] input, [contentEditable]").on("keyup change", function() {
            $("[data-action=saveCode]").trigger("click");
            setLocalStorage();
            localStorage.setItem("grabLessons", $("[data-output=html]").html());
          });
          $("[data-action=saveCode]").trigger("click");
          localStorage.setItem("grabLessons", $("[data-output=html]").html());
        });

        // Save as a Gist Online
        $("[data-action=save-gist]").on("click", function() {
          $(document.body).append('<div class="fixedfill preloader"></div>');
          $(".preloader").html('<div class="table"><div class="cell"><img class="spin" src="../imgs/loading.svg"></div></div>');
          detectOrientation();
          
          setLessonCode();
          fullLessonCode();
          var grabHTML = $("[data-output=html]").html();
          var lessonCode = $('.fullcode').val();

          // check for title
          if ( !$('[data-lesson=title]').text()) {
            $('[data-lesson=title]').text("Saved from ArabEngo!");
          }
          if ( !$('[data-lesson=description]').text()) {
            $('[data-lesson=description]').text("Saved from ArabEngo!");
          }

          // Return user properties
          var sArr = {
            "lessonTitle": $('[data-lesson=title]').text(),
            "lessonPage": $(".mdl-layout__tab-bar .mdl-layout__tab.is-active").index(),
            "description": $('[data-lesson=description]').text()
          };

          var files = {};
          files["lessons.html"]   = $("[data-output=html]").html() ? { content: $("[data-output=html]").html() } : null;
          files["lesson.html"]   = $('.fullcode').val() ? { content: $('.fullcode').val() } : null;
          files["properties.json"] = { "content": JSON.stringify(sArr) };

          data = {
            "description": $("[data-set=topic]").text(),
            "public": true,
            "files": files
          };

          // Post on Github via JQuery Ajax
          $.ajax({
            url: "https://api.github.com/gists",
            type: "POST",
            dataType: "json",
            data: JSON.stringify(data)
          }).success(function(e) {
            window.location.hash = e.html_url.split("https://gist.github.com/").join("");
            hash = window.location.hash.replace(/#/g,"");

            embedProject = e.html_url.split("https://gist.github.com/").join("");
            document.querySelector("[data-output=lessonURL]").value = "https://mikethedj4.github.io/ArabEngo/lessons/#" + embedProject;
            document.querySelector("[data-output=lessonURL]").onclick = function() {
              this.select(true);
            };
            document.querySelector("[data-output=editLesson]").value = "https://mikethedj4.github.io/ArabEngo/designer/#" + embedProject;
            document.querySelector("[data-output=editLesson]").onclick = function() {
              this.select(true);
            };

            $(".share-facebook").attr("href", "https://www.facebook.com/sharer/sharer.php?u=https%3A//mikethedj4.github.io/ArabEngo/lessons/%23" + hash);
            $(".share-twitter").attr("href", "https://twitter.com/home?status=Checkout%20my%20%23"+ $("[data-lesson=title]").text().replace(" ", "%20%23").toString() +"%20%23lesson%20on%20%23ArabEngo%20%23ArabEngoLessons%20-%20https%3A//mikethedj4.github.io/ArabEngo/lessons/%23" + hash);
            $(".share-gplus").attr("href", "https://plus.google.com/share?url=https%3A//mikethedj4.github.io/ArabEngo/lessons/%23" + hash);
            $(".share-linkedin-square").attr("href", "https://www.linkedin.com/shareArticle?mini=true&url=https%3A//mikethedj4.github.io/ArabEngo/lessons/%23"+ hash +"&title=Checkout%20my%20%23"+ $("[data-lesson=title]").text().replace(" ", "%20%23").toString() +"%20%23lesson%20on%20%23ArabEngo%3A%20&summary=&source=");
            $(".preloader").remove();
            $("[data-action=socialdialog]").fadeIn();

            // Successfully saved lesson. 
            // Ask to support open source software.
            // alertify.message("<div class=\"grid\"><div class=\"centered grid__col--12 tc\"><h2>Help keep this free!</h2><a href=\"https://snaptee.co/t/2nezt/?r=fb&teeId=2nezt\" target=\"_blank\"><img src=\"../assets/images/model-2.jpg\" width=\"100%\"></a><a class=\"btn--success\" href=\"https://snaptee.co/t/2nezt/?r=fb&teeId=2nezt\" target=\"_blank\" style=\"display: block;\">Buy Now</a></div></div>");
          }).error(function(e) {
            console.warn("Error: Could not save weave!", e);
            alertify.error("Error: Could not save weave!");
          });
        });
        
        // Donate modal
        $("[data-open=donate]").on("click", function() {
          $("[data-modal=donate]").fadeIn();
        });
      };
    
  var hash = window.location.hash.substring(1);
  function loadgist(gistid) {
    $.ajax({
      url: "https://api.github.com/gists/" + gistid,
      type: "GET",
      dataType: "jsonp",
      jsonp: "callback"
    }).success(function(gistdata) {
      var grabLessons = gistdata.data.files["lessons.html"];
      var properties   = gistdata.data.files["properties.json"].content;
      var jsonSets     = JSON.parse(properties);
      
      // Load lesson content
      $("[data-output=html]").html(grabLessons.content);
      
      // Trigger click on page
      $(".mdl-layout__tab-bar a:eq("+ jsonSets.lessonPage +")").trigger('click');
      
      // Remove preloader
      $(".preloader").remove();
      
      // Initiate designer once everything has loaded
      initiateDesigner();
    }).error(function(e) {
      // ajax error
      console.warn("Error: Could not load weave!", e);
      alertify.error("Error: Could not load weave!");
    });
  }
  
  if (window.location.hash) {
    $(document.body).append('<div class="fixedfill preloader"></div>');
    $(".preloader").html('<div class="table"><div class="cell"><div class="mdl-spinner mdl-js-spinner is-active"></div></div></div>');
    detectOrientation();
    loadgist(hash);
  } else {
    // Initiate Editor
    initiateDesigner();
  }
  
  $(window).on("load resize", function() {
    detectOrientation();
  });
});