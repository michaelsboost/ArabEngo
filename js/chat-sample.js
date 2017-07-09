// Check if user's browser supports voice support
if (!responsiveVoice.voiceSupport()) {
  alertify.alert("You're browser does not have voice support!<br>Please upgrade to a more recent browser. <p>We recommend <a href='http://chrome.google.com/' target='_blank'>Google Chrome</a>!</p>");
}

var male   = "Kareem Shamon",
    female = "Akira Khoury";

if ( !$.inArray($("[data-gender]").text().toLowerCase(), ["male", "female"]) ) {
  alertify.error("Operation cancelled! Contact MUST have a male/female gender!");
}
if ( $("[data-person]").attr("data-person") ) {
  $("[data-person], [data-output=name]").text($("[data-person]").attr("data-person"));
} else {
  if ( $("[data-gender]").attr("data-gender") === "female" ) {
    $("[data-gender]").text(female);
  } else {
    $("[data-gender]").text(male);
  }
}

// Reply and keyboard variables
var intervalChat,
    remWord        = "",
    str            = $(".chat-history > .you:hidden:first").text().trim(),
    typeIt         = str.substr(0, str.length - str.length + 1),
    nextStr        = str.substr(1, str.length),
    audioElement   = document.createElement("audio"),
    audioWord      = document.createElement("audio"),
    audioKey       = document.createElement("audio"),
    url            = window.location.hash,
    finishedLesson = function() {
      audioElement.setAttribute("src", "../../sounds/lesson-complete.mp3");
      audioElement.play();
    },
    scroll2B       = function() {
      $(".chat-container").animate({
        scrollTop: $(this).height()
      });
    },
    checkSentence  = function() {
      // Word used to reply
      str = nextStr;
      // Detect first letter for typing
      typeIt = str.substr(0, str.length - str.length + 1);
      // Remove first letter for typing
      nextStr = str.substr(1, str.length);
    },
    speakSentence  = function() {
      // Speak arabic word/sentence
      $(".them, .you").find("[data-meaning]").on("click mouseover", function() {
        responsiveVoice.cancel();
        if ( $("[data-gender]").attr("data-gender") === "female" ) {
          responsiveVoice.speak(this.textContent, "Arabic Female");
        } else {
          responsiveVoice.speak(this.textContent, "Arabic Male");
        }
        return false;
      });
      responsiveVoice.cancel();
      if ( $("[data-gender]").attr("data-gender") === "female" ) {
        responsiveVoice.speak($(".chat-history > div").last().text(), "Arabic Female");
      } else {
        responsiveVoice.speak($(".chat-history > div").last().text(), "Arabic Male");
      }
    },
    speakSentenceHover  = function() {
      // Speak arabic word/sentence
      $(".them, .you").find("[data-meaning]").on("click mouseover", function() {
        responsiveVoice.cancel();
        if ( $("[data-gender]").attr("data-gender") === "female" ) {
          responsiveVoice.speak(this.textContent, "Arabic Female");
        } else {
          responsiveVoice.speak(this.textContent, "Arabic Male");
        }
        return false;
      });
    },
    speakThis      = function(msg) {
      // Speak arabic word/sentence
      responsiveVoice.cancel();
      if ( $("[data-gender]").attr("data-gender") === "female" ) {
        responsiveVoice.speak(msg, "Arabic Female");
      } else {
        responsiveVoice.speak(msg, "Arabic Male");
      }
      return false;
    },
    reloadChat     = function() {
      // Reload chat history
      $(".chat-history div").each(function(i) {
        $(this).remove();
        $(".chat-history").append(this);
      });
    },
    typeWord       = function() {
      // Detect first letter for typing
      typeIt = str.substr(0, str.length - str.length + 1);
      // Remove first letter for typing
      nextStr = str.substr(1, str.length);

      // Find out character's charCode
      // alertify.log(typeIt.charCodeAt(0));
      
      // Remove clicked letter and reset word to type
      $(".keyboard .active").removeClass("active");

      // Remember typed word
      remWord = remWord += typeIt;
      $(".preview h1").text(remWord);
      // alertify.log(nextStr);

      if (!nextStr) {
        // Hello
        if (remWord === $(".chat-history > .you:hidden:first").text().trim()) {
          $(".chat-history > .you:hidden:first").removeClass("hide");
          $(".typingloader").removeClass("hide");
          $(".bottom-bar").fadeOut();
          $(".chat-container").delay(150).css("height", "calc(100vh - 55px");

          speakThis( $(".chat-history .you:visible:last").text() );
          scroll2B();
          intervalChat = setInterval(function() {
            // Detect if they have multiple messages
            if ( $(".chat-history > .msg:hidden:first").hasClass("them")) {
              $(".typingloader").removeClass("hide");
              scroll2B();
              $(".chat-history > .them:hidden:first").removeClass("hide");
              speakThis( $(".chat-history .them:visible:last").text() );
              scroll2B();

              if ( $(".chat-history > .msg:hidden:first").hasClass("you")) {
                $(".typingloader").addClass("hide");
                $(".chat-container").attr("style", "");
                $(".bottom-bar").fadeIn();

                // Detect first letter for typing
                typeIt = str.substr(0, str.length - str.length + 1);
                // Remove first letter for typing
                nextStr = str.substr(1, str.length);

                // Find out character's charCode
                // alertify.log(typeIt.charCodeAt(0));
                
                // Remove clicked letter and reset word to type
                $(".keyboard .active").removeClass("active");

                // Remember typed word
                remWord = remWord += typeIt;
                $(".preview h1").text("");
                
                clearInterval(intervalChat);
              }
            } else {
              clearInterval(intervalChat);
              $(".typingloader").addClass("hide");
              // Detect if last message
              if ($(".chat-history > .you:last").is(":visible")) {
                clearInterval(intervalChat);
                $(".chat-container").css("height", "calc(100vh - 55px");
                $(".bottom-bar").remove();
                
                UIkit.modal.alert("<h3>Fantastic! You've completed the lesson!").then(function() {
                  window.location.href = "../#community";
                });
                finishedLesson();
                speakSentence();
                return false;
              } else {
                clearInterval(intervalChat);
                $(".chat-container").attr("style", "");
                $(".bottom-bar").fadeIn();
              }
            }
            
            var chatHistory = $("[data-output=messages]").html();
            $("[data-output=messages]").html("");
            $("[data-output=messages]").html(chatHistory);

            // Reset variables
            remWord = "";
            str = $(".chat-history > .you:hidden:first").text().trim();
            nextStr = str;
            checkSentence();
            $(".keyboard button:contains('"+ typeIt +"')").addClass("active");
            scroll2B();
          }, 2000);
          $(".preview h1").text("");
        }
        reloadChat();
        
        // Speak message when hovered over
        speakSentenceHover();
        return false;
      } else {
        checkSentence();
        $(".keyboard button:contains('"+ typeIt +"')").addClass("active");
      }
      
      // See console outputs
      // console.log("Type String: " + str);
      // console.log("Remember Word: " + remWord);
      // console.log("Next String: " + nextStr);
      return false;
    },
    keySound  = function() {
      audioKey.setAttribute("src", "../sounds/keypress.mp3");
      audioKey.play();
    };

// Share to Social Networks
$("[data-call=share]").click(function() {
  $(".sharelist").slideToggle();
});
$(".chat-container, .bottom-bar").click(function() {
  if ($(".sharelist").is(":visible")) {
    $(".sharelist").slideToggle();
  }
});
$(".comingsoon").click(function() {
  alertify.log("coming soon");
});

// Speak first message
setTimeout(function() {
  if ($(".chat-history > .msg:visible:first").is(":visible")) {
    speakThis( $(".chat-history .msg:visible:first").text() );
  }
}, 300);

// Speak message when hovered over
speakSentence();

// Type the word with a physical keyboard
function typeWordKeyBoard() {
  $(window).on("keydown", function(e) {
    if (e.shiftKey) {
      if ( e.shiftKey && e.which === 191 ) {
        $(".keyboard button:contains('؟')").trigger("click");
      }
      return false;
    } else {
      // Numbers
      if ( e.which === 49 ) {
        $('.keyboard button:contains("١")').trigger("click");
      }
      if ( e.which === 50 ) {
        $('.keyboard button:contains("٢")').trigger("click");
      }
      if ( e.which === 51 ) {
        $('.keyboard button:contains("٣")').trigger("click");
      }
      if ( e.which === 52 ) {
        $('.keyboard button:contains("٤")').trigger("click");
      }
      if ( e.which === 53 ) {
        $('.keyboard button:contains("٥")').trigger("click");
      }
      if ( e.which === 54 ) {
        $('.keyboard button:contains("٦")').trigger("click");
      }
      if ( e.which === 55 ) {
        $('.keyboard button:contains("٧")').trigger("click");
      }
      if ( e.which === 56 ) {
        $('.keyboard button:contains("٨")').trigger("click");
      }
      if ( e.which === 57 ) {
        $('.keyboard button:contains("٩")').trigger("click");
      }
      if ( e.which === 48 ) {
        $('.keyboard button:contains("٠")').trigger("click");
      }
      // Alphabet
      if ( e.which === 81 ) {
        $('.keyboard button:contains("ض")').trigger("click");
      }
      if ( e.which === 87 ) {
        $('.keyboard button:contains("ص")').trigger("click");
      }
      if ( e.which === 69 ) {
        $('.keyboard button:contains("ث")').trigger("click");
      }
      if ( e.which === 82 ) {
        $('.keyboard button:contains("ق")').trigger("click");
      }
      if ( e.which === 84 ) {
        $('.keyboard button:contains("ف")').trigger("click");
      }
      if ( e.which === 89 ) {
        $('.keyboard button:contains("غ")').trigger("click");
      }
      if ( e.which === 85 ) {
        $('.keyboard button:contains("ع")').trigger("click");
      }
      if ( e.which === 73 ) {
        $('.keyboard button:contains("ه")').trigger("click");
      }
      if ( e.which === 79 ) {
        $('.keyboard button:contains("خ")').trigger("click");
      }
      if ( e.which === 80 ) {
        $('.keyboard button:contains("ح")').trigger("click");
      }

      if ( e.which === 219 ) {
        $('.keyboard button:contains("ج")').trigger("click");
      }
      if ( e.which === 221 ) {
        $('.keyboard button:contains("ة")').trigger("click");
      }

      if ( e.which === 65 ) {
        $('.keyboard button:contains("ش")').trigger("click");
      }
      if ( e.which === 83 ) {
        $('.keyboard button:contains("س")').trigger("click");
      }
      if ( e.which === 68 ) {
        $('.keyboard button:contains("ي")').trigger("click");
      }
      if ( e.which === 70 ) {
        $('.keyboard button:contains("ب")').trigger("click");
      }
      if ( e.which === 71 ) {
        $('.keyboard button:contains("ل")').trigger("click");
      }
      if ( e.which === 72 ) {
        $('.keyboard button:contains("ا")').trigger("click");
      }
      if ( e.which === 74 ) {
        $('.keyboard button:contains("ت")').trigger("click");
      }
      if ( e.which === 75 ) {
        $('.keyboard button:contains("ن")').trigger("click");
      }
      if ( e.which === 76 ) {
        $('.keyboard button:contains("م")').trigger("click");
      }

      if ( e.which === 186 ) {
        $('.keyboard button:contains("ك")').trigger("click");
      }
      if ( e.which === 90 ) {
        $('.keyboard button:contains("ظ")').trigger("click");
      }
      if ( e.which === 88 ) {
        $('.keyboard button:contains("ط")').trigger("click");
      }
      if ( e.which === 67 ) {
        $('.keyboard button:contains("ذ")').trigger("click");
      }
      if ( e.which === 86 ) {
        $('.keyboard button:contains("د")').trigger("click");
      }
      if ( e.which === 66 ) {
        $('.keyboard button:contains("ز")').trigger("click");
      }
      if ( e.which === 78 ) {
        $('.keyboard button:contains("ر")').trigger("click");
      }
      if ( e.which === 77 ) {
        $('.keyboard button:contains("و")').trigger("click");
      }
      if ( e.which === 32 ) {
        $('.keyboard button:contains(" ")').trigger("click");
      }

      // Symbols
      if ( e.which === 222 ) {
        $('.keyboard button:contains("؛")').trigger("click");
      }
      if ( e.which === 188 ) {
        $(".keyboard button:contains('،')").trigger("click");
      }
      if ( e.which === 190 ) {
        $(".keyboard button:contains('.')").trigger("click");
      }
      return false;
    }
    return false;
  });
}

// Check and see if you start first
if ($(".chat-history > .you:first").is(":visible")) {
  $(".typingloader").removeClass("hide");
  $(".bottom-bar").fadeOut();
  $(".chat-container").delay(150).css("height", "calc(100vh - 55px");
  speakThis( $(".chat-history .you:visible:last").text() );
  scroll2B();
  setTimeout(function() {
    $(".chat-history > .them:hidden:first").removeClass("hide");
    $(".typingloader").addClass("hide");
    $(".chat-container").attr("style", "");
    $(".bottom-bar").fadeIn();
    speakThis( $(".chat-history .them:visible:last").text() );
    scroll2B();
  }, 2000);
}

// If url doesn't contain a hash launch editor
$(document).ready(function() {
  if (!url) {
    typeWordKeyBoard();

    // Make first letter active to type
    $(".keyboard button:contains('"+ typeIt +"')").addClass("active");

    // Reload keyboard keys click function
    $(".keyboard").each(function(i) {
      $(".keyboard").eq(i).on("click", "> div > .active", function(e) {
        $(".keyboard").eq( Number(!i) ).append(this);

        $(".keyboard").find(".active").on("click", function(e) {
          if ($(e.target).hasClass("active")) {
            typeWord();
            keySound();
          }
          return false;
        }).trigger("click");
        return false;
      });
    });
  } else {
    // Show Editors If URL Contains Them
    if (url.indexOf("?") > -1) {
      if (url.indexOf("full") > -1) {
        $(".bottom-bar, .typingloader").remove();
        $(".chat-container").css("height", "calc(100vh - 55px");
        $(".chat-history .them, .chat-history .you").removeClass("hide");
        $(".chat-history .them, .chat-history .you").removeClass("hide");
        $(".chat-history .them:last-child").remove();
      }
    }
  }
});

//// Trigger letter for completion
//$(".keyboard .active").trigger("click");

// Detect pressed letter
//$("[data-detect=key]").on("keydown", function(e) {
//  e.preventDefault();
//  alertify.log(e.which);
//  alertify.log( String.fromCharCode(e.which) );
//});