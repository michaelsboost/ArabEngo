// To Do
/* 
  Add sound for typing, sending and receiving messages
  Add sound for when lesson is completed
*/

var male   = "Kareem Shamon",
    female = "Akira Khoury";

if ( !$.inArray($("[data-gender]").text().toLowerCase(), ["male", "female"]) ) {
  alertify.error("Operation cancelled! Contact MUST have a male/female gender!");
}
if ( $("[data-person]").attr("data-person") ) {
  $("[data-person]").text($("[data-person]").attr("data-person"));
} else {
  if ( $("[data-gender]").attr("data-gender") === "female" ) {
    $("[data-gender]").text(female);
  } else {
    $("[data-gender]").text(male);
  }
}

// Type the word with a physical keyboard
function typeWordKeyBoard() {
  $(window).on("keydown", function(e) {
    if (e.shiftKey) {
      if ( e.shiftKey && e.which === 191 ) {
        $(".keyboard button:contains('؟')").trigger("click");
      }
      return false;
    } else {
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
typeWordKeyBoard();

// Check if user's browser supports voice support
if (!responsiveVoice.voiceSupport()) {
  alertify.alert("You're browser does not have voice support!<br>Please upgrade to a more recent browser. <p>We recommend <a href='http://chrome.google.com/' target='_blank'>Google Chrome</a>!</p>");
}

// Reply and keyboard variables
var remWord        = "",
    str            = $(".chat-history > .you:hidden:first").text().trim(),
    typeIt         = str.substr(0, str.length - str.length + 1),
    nextStr        = str.substr(1, str.length),
    audioElement   = document.createElement("audio"),
    audioWord      = document.createElement("audio"),
    audioKey       = document.createElement("audio"),
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
      $("h1").text(remWord);
      // alertify.log(nextStr);

      if (!nextStr) {
        // Hello
        if (remWord === $(".chat-history > .you:hidden:first").text().trim()) {
          $(".chat-history > .you:hidden:first").removeClass("hide");
          $(".typingloader").removeClass("hide");
          speakThis( $(".chat-history .you:visible:last").text() );
          setTimeout(function() {
            $(".chat-history > .them:hidden:first").removeClass("hide");
            $(".typingloader").addClass("hide");
            scroll2B();
            speakThis( $(".chat-history .them:visible:last").text() );
          
            // Reset variables
            remWord = "";
            str = $(".chat-history > .you:hidden:first").text().trim();
            nextStr = str;
            checkSentence();
            $(".keyboard button:contains('"+ typeIt +"')").addClass("active");
            // Speak message when hovered over
            speakSentence();
          }, 2000);
          $("h1").text("");
          scroll2B();
          // Speak message when hovered over
          speakSentence();
        }
        // Goodbye
        if (remWord === $(".chat-history > .them:last").prev().text().trim()) {
          $("h1").text("");

          // Reset variables
          remWord = "";
          str = $(".chat-history > .you:last").text().trim();
          nextStr = str;
          checkSentence();
          $(".keyboard button:contains('"+ typeIt +"')").addClass("active");
          
          alertify.alert("Congrats! You've completed the Introductory Chat :)", function(e) {
            if (e) {
              // Speak message when hovered over
              speakSentence();
            } else {
              alertify.error("Houston there's a problem " + e);
            }
          });
          finishedLesson();
          // Speak message when hovered over
          speakSentence();
        }
        reloadChat();
        return false;
      } else {
        checkSentence();
        $(".keyboard button:contains('"+ typeIt +"')").addClass("active");
      }
      
      // See console outputs
      // console.log("Type String: " + str);
      // console.log("Remember Word: " + remWord);
      // console.log("Next String: " + nextStr);
    },
    keySound  = function() {
      audioKey.setAttribute("src", "../../sounds/keypress.mp3");
      audioKey.play();
    };

// Speak first message
setTimeout(function() {
  speakThis( $(".chat-history .them:first").text() );
}, 300);

// Speak message when hovered over
speakSentence();

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

//// Auto complete "Hello"
//$(".keyboard .active").trigger("click");
//$(".keyboard .active").trigger("click");
//$(".keyboard .active").trigger("click");
//$(".keyboard .active").trigger("click");
//$(".keyboard .active").trigger("click");
//$(".keyboard .active").trigger("click");
//$(".keyboard .active").trigger("click");
//$(".keyboard .active").trigger("click");
//$(".keyboard .active").trigger("click");
//$(".keyboard .active").trigger("click");
//$(".keyboard .active").trigger("click");
//$(".keyboard .active").trigger("click");
//$(".keyboard .active").trigger("click");
//$(".keyboard .active").trigger("click");
//$(".keyboard .active").trigger("click");
//
//// Auto complete "How are you?"
//$(".keyboard .active").trigger("click");
//$(".keyboard .active").trigger("click");
//$(".keyboard .active").trigger("click");
//$(".keyboard .active").trigger("click");
//$(".keyboard .active").trigger("click");
//$(".keyboard .active").trigger("click");
//$(".keyboard .active").trigger("click");
//$(".keyboard .active").trigger("click");
//$(".keyboard .active").trigger("click");
//
//// Auto complete "I'm good thanks"
//$(".keyboard .active").trigger("click");
//$(".keyboard .active").trigger("click");
//$(".keyboard .active").trigger("click");
//$(".keyboard .active").trigger("click");
//$(".keyboard .active").trigger("click");
//$(".keyboard .active").trigger("click");
//$(".keyboard .active").trigger("click");
//$(".keyboard .active").trigger("click");
//$(".keyboard .active").trigger("click");
//$(".keyboard .active").trigger("click");
//$(".keyboard .active").trigger("click");
//$(".keyboard .active").trigger("click");

//// Auto complete "Goodbye"
//$(".keyboard .active").trigger("click");
//$(".keyboard .active").trigger("click");
//$(".keyboard .active").trigger("click");
//$(".keyboard .active").trigger("click");
//$(".keyboard .active").trigger("click");
//$(".keyboard .active").trigger("click");
//$(".keyboard .active").trigger("click");
//$(".keyboard .active").trigger("click");
//$(".keyboard .active").trigger("click");
//$(".keyboard .active").trigger("click");

// Detect pressed letter
//$("[data-detect=key]").on("keydown", function(e) {
//  e.preventDefault();
//  alertify.log(e.which);
//  alertify.log( String.fromCharCode(e.which) );
//});