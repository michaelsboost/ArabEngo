// Is back button visible?
if ( !$(".goback").is(":visible") ) {
  // $("body").append("<a href=\"../../index.html\" class=\"gohome pointer\">\n    <i class=\"fa fa-home\"></i>\n  </a>");
  // $("body").append("<a onclick='history.back()' class=\"goback pointer\">\n    <i class=\"fa fa-chevron-left\"></i>\n  </a>");
  // $("body").append("<a onclick='history.back()' class=\"goback pointer\">\n    <i class=\"fa fa-chevron-left\"></i>\n  </a>");
  $("body").append("<a href='../../index.html' class=\"goback pointer\">\n    <i class=\"fa fa-home\"></i>\n  </a>");
}

//if (window.location.indexOf("basics1") > -1) {
//  $("body").append("<a href=\"../../\" class=\"goback pointer\">\n    <i class=\"fa fa-home\"></i>\n  </a>");
//}

// Plugins
(function($) {
  $.fn.randomize = function(childElm) {
    return this.each(function() {
      var $this = $(this);
      var elms = $this.children(childElm);
      
      elms.sort(function() {
        return (Math.round(Math.random())-0.05);
      });
      $this.remove(childElm);
      
      for (i = 0; i < elms.length; i++) {
        $this.append(elms[i]);
      }
    });
  }
})(jQuery);

// Variables
var counter = 0;
    parentPage = window.location.toString().split(/\?|#/)[0],
    audioElement  = document.createElement("audio"),
    audioWord     = document.createElement("audio"),
    successSound  = function() {
      audioElement.setAttribute("src", "../../sounds/effects/success.mp3");
      audioElement.play();
    },
    errorSound    = function() {
      audioElement.setAttribute("src", "../../sounds/effects/error.mp3");
      audioElement.play();
    },
    wrongSound    = function() {
      audioElement.setAttribute("src", "../../sounds/effects/wrong.mp3");
      audioElement.play();
    },
    wrongAnswer   = function(answer, call) {
      wrongSound();

      alertify.alert("The correct answer is... " + "<h1>"+ answer +"</h1>");
    },
    randomCorrect = function() {
      successSound();
//      alertify.log("correct")
      setTimeout(function() {
        location.reload(true);
      }, 1300);
      return false;
    },
    randomError   = function() {
//      alertify.log("wrong")
      errorSound();
    },
    randomWrong   = function(answer) {
      wrongSound();
      $("body").css("background", "#fec2f1");
      
      // Show the user what question he/she got wrong
      alertify.set({
        labels: {
          ok    : "Continue"
        }
      });
      alertify.alert("The correct answer is... " + answer, function(e) {
        if (e) {
//          setTimeout(function() {
//            location.reload(true);
//          }, 1300);
            location.reload(true);
        } else {
          alertify.error("Houston there's a problem " + e);
        }
      });
      
      return answer;
    };
    basic1L1Words = function() {
      $man = $("<a>", {
          class: "card pointer"
        }).html('<h2 data-title="man">رجل</h2><img src="../../imgs/basics/man.jpg">')
      $woman = $("<a>", {
          class: "card pointer"
        }).html('<h2 data-title="woman">امراه</h2><img src="../../imgs/basics/woman.png">')
      $girl = $("<a>", {
          class: "card pointer"
        }).html('<h2 data-title="girl">بنت</h2><img src="../../imgs/basics/girl.jpg">')
      $boy = $("<a>", {
          class: "card pointer"
        }).html('<h2 data-title="boy">ولد</h2><img src="../../imgs/basics/boy.jpg">')
    },
    basic1L2Words = function() {
      $I = $("<div>", {
        text: "انا",
        title: "I = ا ن ا"
      }).prepend($("<a>", {
          class: "pointer fl I audioFile"
        }).on("click mouseover", function() {
          audioWord.setAttribute("src", "../../sounds/nouns/I.mp3");
          audioWord.play();
        }).html('<i class="fa fa-volume-up"></i>')
      );
    };

function reverseStr(str) {
  var splitString = str.split("");

  var reverseArray = splitString.reverse();

  var joinArray = reverseArray.join("");

  return joinArray;
}
function removeDuplicateChars(str) {
  var curr_index = 0;
  var curr_char;
  var strSplit;
  var found_first;
  while(curr_char != '') {
    curr_char = str.charAt(curr_index);
    // Ignores Spaces
    if (curr_char == ' ') {
      curr_index++;
      continue;
    }
  strSplit = str.split('');
  found_first = false;
  
  for (var i = 0; i < strSplit.length; i++) {
    if (str.charAt(i) == curr_char && !found_first) {
      found_first = true;
    } else if (str.charAt(i) == curr_char && found_first) {
      // Remove it from the string
      str = setCharAt(str,i,'');
    }
  }
  curr_index++
  }
  return str;
}
function setCharAt(str, index, chr) {
  if(index > str.length - 1) return str;
  return str.substr(0, index) + chr + str.substr(index + 1);
}

function testCards() {
  basic1L1Words();
  $("body").append('<div class="cards-container txtcenter"></div>');

  var $cards = [
    $man,
    $woman,
    $girl,
    $boy
  ];

  // Display Cards
  $(".cards-container").append( $cards );
  $(".cards-container").randomize(".card");

  // Randomize 1 Card
  $card = $cards[Math.floor(Math.random() * $cards.length)];
  $arabWord = $card.find("h2").attr("data-title");

  // Display Random work in title
  $("body").append("<div class=\"object\" style=\"position: absolute; top: 5px; left: 65px; right: 65px; text-align: center; font: 400 normal normal 24px/2 'Lato'; cursor: default;\">Press on the \"<span class=\"chosenword pointer\" style=\"text-decoration: underline;\">"+ $arabWord +"</span>\"</div>");
  
  // Click on Title word
  $(".chosenword").on("click", function() {
    audioWord.setAttribute("src", "../../sounds/nouns/"+ this.textContent +".mp3");
    audioWord.play();
  }).trigger("click");
  
  // Click on Card
  $(".card").on("click", function() {
    var cardName = $(this).find("h2").attr("data-title");
    
    if ( cardName === $(".chosenword").text() ) {
      successSound();
      setTimeout(function() {
        location.reload(true);
      }, 1300);
    } else {
      $(this).css("backgroundColor", "#ff3666")
      errorSound();
    }

    setTimeout(function() {
      audioWord.setAttribute("src", "../../sounds/nouns/"+ cardName +".mp3");
      audioWord.play();
    }, 500);
  })
}
function testSentence() {
  $They = $("<span>", {
      text: "They; Them",
      class: "word",
    }).attr("data-word", "انهم")

  // Find translation for "woman = امرأة"
  // Find translation for "man = رجل"
  // Find translation for "girl = بنت"
  // Find translation for "boy = ولد"
  // I am a girl = انا فتاة
  // He is a boy = هو ولد
  // She is a woman = هو انها
  // The man, the boy = الرجل والصبي
  // A boy = ولد

  var a_I = "<span data-word=\"I am\">انا</span>";
  var e_I = "<span data-word=\"انا\">I am</span>";
  var a_He = "<span data-word=\"He is\">هو</span>";
  var e_He = "<span data-word=\"هو\">He is</span>";
  var a_She = "<span data-word=\"She is\">هو</span>";
  var e_She = "<span data-word=\"هو\">She is</span>";
  
  var a_man = "<span data-word=\"man\">رجل</span>";
  var e_man = "<span data-word=\"رجل\">man</span>";
  var a_woman = "<span data-word=\"woman\">امرأة</span>";
  var e_woman = "<span data-word=\"امرأة\">woman</span>";
  var a_boy = "<span data-word=\"boy\">ولد</span>";
  var e_boy = "<span data-word=\"ولد\">boy</span>";
  var a_girl = "<span data-word=\"girl\">بنت</span>";
  var e_girl = "<span data-word=\"بنت\">girl</span>";
  var a_Aboy = "<span data-word=\"A boy\">ولد</span>";
  var e_Aboy = "<span data-word=\"ولد\">A boy</span>";
  var a_Tman = "<span data-word=\"The man\">الرجل</span>";
  var e_Tman = "<span data-word=\"الرجل\">The man</span>";
  var a_Tboy = "<span data-word=\"The boy\">والصبي</span>";
  var e_Tboy = "<span data-word=\"والصبي\">The boy</span>";
  
  var $sentenceInput = [
    "<span class=\"word eng\" data-sentence=\"انا رجل\">"+ e_I +" a "+ e_man +"</span>",
    "<span class=\"word arb\" data-sentence=\"I am a man\">"+ a_I +" "+ a_man +"</span>",
    "<span class=\"word eng\" data-sentence=\"انا رجل\">"+ e_I +" a "+ e_woman +"</span>",
    "<span class=\"word arb\" data-sentence=\"I am a woman\">"+ a_I +" "+ a_woman +"</span>",
    "<span class=\"word eng\" data-sentence=\"انا رجل\">"+ e_I +" a "+ e_boy +"</span>",
    "<span class=\"word arb\" data-sentence=\"I am a boy\">"+ a_I +" "+ a_boy +"</span>",
    "<span class=\"word eng\" data-sentence=\"انا رجل\">"+ e_I +" a "+ e_girl +"</span>",
    "<span class=\"word arb\" data-sentence=\"I am a girl\">"+ a_I +" "+ a_girl +"</span>",
    
    "<span class=\"word eng\" data-sentence=\"هو رجل\">"+ e_He +" a "+ e_man +"</span>",
    "<span class=\"word arb\" data-sentence=\"He is a man\">"+ a_He +" "+ a_man +"</span>",
    "<span class=\"word eng\" data-sentence=\"هو ولد\">"+ e_He +" a "+ e_boy +"</span>",
    "<span class=\"word arb\" data-sentence=\"He is a boy\">"+ a_He +" "+ a_boy +"</span>",
    "<span class=\"word eng\" data-sentence=\"هو امرأة\">"+ e_She +" a "+ e_woman +"</span>",
    "<span class=\"word arb\" data-sentence=\"She is a woman\">"+ a_She +" "+ a_woman +"</span>",
    "<span class=\"word eng\" data-sentence=\"هو بنت\">"+ e_She +" a "+ e_girl +"</span>",
    "<span class=\"word arb\" data-sentence=\"She is a girl\">"+ a_She +" "+ a_girl +"</span>",
    
    "<span class=\"word eng\" data-sentence=\"ولد\">"+ e_Aboy +"</span>",
    "<span class=\"word arb\" data-sentence=\"A boy\">"+ a_Aboy +"</span>",
    "<span class=\"word eng\" data-sentence=\"ولد\">"+ e_Tman +"</span>",
    "<span class=\"word arb\" data-sentence=\"The man\">"+ a_Tman +"</span>",
    "<span class=\"word eng\" data-sentence=\"والصبي\">"+ e_Tboy +"</span>",
    "<span class=\"word arb\" data-sentence=\"The man\">"+ a_Tboy +"</span>"
  ]

  $word = $sentenceInput[Math.floor(Math.random() * $sentenceInput.length)]
  
  // Word
  $input    = $("<input>", {class: "userSentence txtcenter"});
  $(document).on("keydown", function(e) {
    if ( e.which == 13 ) {
      $(".checkSentence").trigger("click");
    }
  });
  $button   = $("<button>", {class: "btn--default fill checkSentence", text: "Confirm"}).on("click", function(answer) {
    answer = $("[data-sentence]").attr("data-sentence");
    if ( $(".userSentence").val().toLowerCase() === answer.toLowerCase() ) {
      successSound();
      setTimeout(function() {
        location.reload(true);
      }, 1300);
    } else {
//      errorSound();
//      counter++
//      if (counter == 3) {
//        randomWrong(answer);
//      }
//      randomWrong(answer);
      
      if (answer.toString().match(/\s/g)) {
        randomWrong("<h1>"+ answer +"</h1>", "<p>Watch those spaces</p>");
      } else {
        randomWrong("<h1>"+ answer +"</h1>");
      }
    }
  })
  $("body").append('<div class="grid"></div>');
  $(".grid").append('<div class="grid__col--12"></div>');
  $(".grid__col--12").append('<div class="wordContain" style="height: auto; margin: calc(100vh/4) 0 0 0;"></div>');
  $(".wordContain").append('<div class="txtright"></div>');
  $(".txtright").append('<a class="pointer fl speak"><i class="fa fa-volume-up"></i></a>');
  $(".txtright").append('&nbsp;');
  $(".txtright").append($word);
  
  $(".wordContain").append("<p></p>");
  $(".wordContain").append($input);
  $(".wordContain").append("<p></p>");
  $(".wordContain").append($button);

  // Lesson Title
  if ($(".eng").is(":visible")) {
    var lessonTitle = 'How do you say, <span class=\"pointer speak\">"'+ $(".word").text() +'</span>"';
  } else {
    var lessonTitle = 'Translate the sentence, <span class=\"pointer speak\">"'+ $(".word").text() +'</span>"';
  }
  $("body").append("<div style=\"position: absolute; top: 5px; left: 65px; right: 65px; text-align: center; font: 400 normal normal 24px/2 'Lato'; cursor: default;\">"+ lessonTitle +"</div>");

  // Keyboard
  $("body").append('<div class="grid"><div class="grid__col--8 wordlist txtcenter"><div class="addbuts"></div><button class="btn--default addword spacebar block" style="width: 100%;"> </button></div><div class="grid__col--4"><button class="btn--default delword fr" style="background: #fff;"><img class="nomar" src="../../imgs/backspace.svg" alt="backspace"></button></div></div>');
  var $sentencenodups = $("[data-sentence]").attr("data-sentence").split(" ");
  
  // Remove duplicate words from string
  var uniqueList = $sentencenodups.filter(function(item,i,allItems) {
    return i==allItems.indexOf(item);
  });
  
  // Add word buttons
  for (i = 0; i < uniqueList.length; i++) {
    $(".addbuts").append('<button class="btn--default addword">'+ uniqueList[Math.floor(Math.abs(i))] +'</button>');
  }
  // Randomize words
  $(".addbuts").randomize(".addword");
  
  // Only spacebar to add spaces
  if ($(".addbuts").find(".addword:contains(' ')").is(":visible")) {
    $(".addbuts").find(".addword:contains(' ')").remove();
  }
  
  // Add words to textbox
//  var lastAddedWord = "";
  $(".addword").on("click", function(e) {
    var $val = $(".userSentence").val();
    $(".userSentence").val( $val + this.textContent);
//    var e = lastAddedWord = this.textContent;
//    console.log(e);
  });
  
  // Delete words from textbox
  $(".delword").on("click", function() {
    var $val = $(".userSentence").val();
    $(".userSentence").val($val.slice(0, -1));
//    $(".userSentence").val($val.replace(lastAddedWord, ""));
//    console.log(lastAddedWord)
  });
  
  // Speak sentences
  if ( $(".arb").is(":visible") ) {
    $(".speak").on("click mouseover", function() {
      responsiveVoice.cancel();
      responsiveVoice.speak($(".arb").text(), "Arabic Female");
    });
    setTimeout(function() {
      console.log('speaking...');
      responsiveVoice.cancel();
      responsiveVoice.speak($(".arb").text(), "Arabic Female");
    }, 500);
  } else if ( $(".eng").is(":visible") ) {
    $(".speak").on("click mouseover", function() {
      responsiveVoice.cancel();
      responsiveVoice.speak($(".eng").text(), "UK English Female");
    });
    setTimeout(function() {
      console.log('speaking...');
      responsiveVoice.cancel();
      responsiveVoice.speak($(".eng").text(), "UK English Female");
    }, 500);
  }
  
  $(".arb").find('[data-word]').on("click mouseover", function() {
    responsiveVoice.cancel();
    responsiveVoice.speak(this.textContent, "Arabic Female");
  });
  $(".eng").find('[data-word]').on("click mouseover", function() {
    responsiveVoice.cancel();
    responsiveVoice.speak(this.textContent, "UK English Female");
  });
}
function testWord() {
  $I = $("<span>", {
      text: "I; I am; me",
      class: "word eng",
    }).attr("data-word", "انا")
  $انا = $("<span>", {
      text: "انا",
      class: "word arb",
    }).attr("data-word", "I am; me")
    
  var $words = [
    $I,
    $انا
  ]

  $word = $words[Math.floor(Math.random() * $words.length)]
  $letter = $word.attr("data-word")
  var chosenLang = $word.attr("class").replace("word ", "");

  $input    = $("<input>", {class: "userSentence txtcenter"});
  $(document).on("keydown", function(e) {
    if ( e.which == 13 ) {
      $(".checkSentence").trigger("click");
    }
  });
  $button   = $("<button>", {class: "btn--default fill checkSentence", text: "Confirm"}).on("click", function(answer) {
    answer = $(".word").attr("data-word");
    $val = $(".userSentence").val();
    if (chosenLang === "arb") {
      $checkWord = answer.split("; ")
      $.each($checkWord, function(key, val) {
        if ($val.indexOf(val) != -1) {
          randomCorrect();
          return false;
        } else {
//          errorSound();
//          counter++
//          if (counter == 3) {
//            randomWrong(answer);
//          }
          randomWrong("<h1>"+ answer +"</h1>");
        }
      });
    } else {
      if ($val === $(".word").attr("data-word") ) {
        randomCorrect();
      } else {
//          errorSound();
//          counter++
//          if (counter == 3) {
//            randomWrong(answer);
//          }
          randomWrong("<h1>"+ answer +"</h1>");
      }
    }
  })
  $("body").append('<div class="grid"></div>');
  $(".grid").append('<div class="grid__col--12"></div>');
  $(".grid__col--12").append('<div class="wordContain" style="height: auto; margin: calc(100vh/4) 0 0 0;"></div>');
  $(".wordContain").append('<div class="txtright"></div>');
  $(".txtright").append('<a class="pointer fl"><i class="fa fa-volume-up"></i></a>');
  $(".txtright").append('&nbsp;');
  $(".txtright").append($word);
  $(".wordContain").append("<p></p>");
  $(".wordContain").append($input);
  $(".wordContain").append("<p></p>");
  $(".wordContain").append($button);

  // Lesson Title
  if ($(".eng").is(":visible")) {
    var lessonTitle = 'How do you spell, "'+ $word.text() +'"'
  } else {
    var lessonTitle = 'How do you spell, "'+ $word.text() +'"'
//    var lessonTitle = 'Translate the word, "'+ $word.text() +'"'
  }
  $("body").append("<div style=\"position: absolute; top: 5px; left: 65px; right: 65px; text-align: center; font: 400 normal normal 24px/2 'Lato'; cursor: default;\">"+ lessonTitle +"</div>");

  // Keyboard
  $("body").append('<div class="grid"><div class="grid__col--8 wordlist txtcenter"><div class="addbuts"></div><button class="btn--default addword spacebar block" style="width: 100%;"> </button></div><div class="grid__col--4"><button class="btn--default delword fr" style="background: #fff;"><img class="nomar" src="../../imgs/backspace.svg" alt="backspace"></button></div></div>');
  var $wordnospaces = $word.attr("data-word").split(" ").toString();
  var $wordnoduplics = removeDuplicateChars($wordnospaces);
  
  for (i = 0; i < $wordnoduplics.length; i++) {
    $(".addbuts").append('<button class="btn--default addword">'+ $wordnoduplics[Math.floor(Math.abs(i))] +'</button>');
  }
  
  if ($(".addbuts").find(".addword:contains(';')").is(":visible")) {
    $(".addbuts").find(".addword:contains(';')").remove();
    $(".addbuts").append('<button class="btn--default addword">;</button>');
  }
  if (!$(".addbuts").find(".addword:contains('e')").is(":visible") && $(".word").hasClass("arb")) {
    $(".addbuts").find(".addword:contains('e')").remove();
    $(".addbuts").append('<button class="btn--default addword">e</button>');
  }
  $(".addbuts").randomize(".addword");
  
  // Add words to textbox
  $(".addword").on("click", function() {
    var $val = $(".userSentence").val();
    $(".userSentence").val( $val + this.textContent);
  });
  
  // Delete words from textbox
  $(".delword").on("click", function() {
    var $val = $(".userSentence").val();
    $(".userSentence").val($val.slice(0, -1));
  });
}
var funcArray = [
  function() {
    testCards()
  },
  function() {
    testSentence()
  },
  function() {
    testWord()
  }
];
function randomFrom(array) {
  return array[Math.floor(Math.random() * array.length)];
}
function randomFunction() {
  randomFrom(funcArray).call()
}

$(document).ready(function() {
  if ( $("body").hasClass("speak") ) {
    if ( $(".arb").is(":visible") ) {
      $(".speak").on("click mouseover", function() {
        responsiveVoice.cancel();
        responsiveVoice.speak($(".arb").text(), "Arabic Female");
      });
      setTimeout(function() {
        responsiveVoice.cancel();
        responsiveVoice.speak($(".arb").text(), "Arabic Female");
      }, 500);
    } else if ( $(".eng").is(":visible") ) {
      $(".speak").on("click mouseover", function() {
        responsiveVoice.cancel();
        responsiveVoice.speak($(".eng").text(), "UK English Female");
      });
      setTimeout(function() {
        responsiveVoice.cancel();
        responsiveVoice.speak($(".eng").text(), "UK English Female");
      }, 500);
    }
  }
  
  $(".arb").on("click mouseover", function() {
    responsiveVoice.cancel();
    responsiveVoice.speak(this.textContent.trim(), "Arabic Female");
  });
  $(".eng").on("click mouseover", function() {
    responsiveVoice.cancel();
    responsiveVoice.speak(this.textContent.trim(), "UK English Female");
  });
  
  $(function() {
    // Variables
    var $val, nextElm,
        counter          = 1;
        words            = null,
        answer           = $("." + $("input:checked").attr("id") + " .answer").text(),
        speakQues        = function() {
          if ( $("." + $("input:checked").attr("id") + " .arb.ques").is(":visible") ) {
            var $txt = $("." + $("input:checked").attr("id") + " .arb.ques");
            setTimeout(function() {
              $txt.trigger("click");
            }, 300);
          } else {
            var $txt = $("." + $("input:checked").attr("id") + " .eng.ques");
            setTimeout(function() {
              $txt.trigger("click");
            }, 300);
          }
        },
        speechKitTest    = function() {
          // first we make sure annyang started succesfully
          if (annyang) {
            annyang.debug();

            // Add our commands to annyang
            annyang.addCommands({
              'hello': function() { alert('Hello world!'); }
            });

            // Tell KITT to use annyang
            SpeechKITT.annyang();

            // Define a stylesheet for KITT to use
            SpeechKITT.setStylesheet('../../css/flat.css');

            // Render KITT's interface
            SpeechKITT.vroom();

            // Set a language for speech recognition (defaults to English)
            // annyang.setLanguage('ar-EG');
          } else {
            alertify.error("Ooops... Looks like your browser does not support the HTML5 Speach API.");
            alertify.error("Please upgrade to a newer version. Chrome recommended");
          }
        },
        annyangTest      = function() {
          // first we make sure annyang started succesfully
          if (annyang) {
            // define our commands.
            var commands = {
              'hello': function() {
                alertify.log("hello");
              }
            };

            annyang.addCommands(commands);
            annyang.debug();

            // Set a language for speech recognition (defaults to English)
            // annyang.setLanguage('ar-EG');

            if ($(this).hasClass("listening")) {
              annyang.abort();
              $(this).removeClass("listening");
            } else {
              annyang.start();
              $(this).addClass("listening");
            }
          } else {
            alertify.error("Ooops... Looks like your browser does not support the HTML5 Speach API.");
            alertify.error("Please upgrade to a newer version. Chrome recommended");
          }
        },
        html5SpeechTest1 = function() {
          if ("webkitSpeechRecognition" in window) {
            var recognition = new webkitSpeechRecognition();
            recognition.lang = "EN-US";
            recognition.continuous = false;
            recognition.interimResults = false;
          }

          recognition.start();
          $(".mic").removeClass("fa-microphone")
                  .addClass("fa-microphone-slash");

          recognition.onresult = function(evt) {
            for (var i = evt.resultIndex; i < evt.results.length; i++) {
              var transcript = evt.results[i][0].transcript;
              if (evt.results[i].isFinal) {
                console.log(transcript);
                recognition.stop();
                $(".mic").removeClass("fa-microphone-slash")
                        .addClass("fa-microphone");
                return true;
              } else {
                console.log(transcript);
              }
            }
            console.log(evt);
          }
        };
        html5SpeechTest2 = function() {
          var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
          var recognition = new SpeechRecognition();
          recognition.lang = "en-US";
          // recognition.continuous = false;
          recognition.interimResults = false;
          recognition.maxAlternatives = 5;
          recognition.start();
          recognition.onstart = function() {
            $(".mic").addClass("fa-microphone")
                    .removeClass("fa-microphone-slash");
          };

          recognition.onresult = function(evt) {
            var transcript = evt.results[0][0].transcript;
            alertify.log("You said: " + transcript);
          }
          recognition.onspeechend = function() {
            $(".mic").removeClass("fa-microphone-slash")
                    .addClass("fa-microphone");
          };
        };

    function initializeTest() {
      // Translate Sentence
      $(".userSentence").on("keyup", function(e) {
        if ( e.which == 13 ) {
          $("." + $("input:checked").attr("id") + " .checkSentence").trigger("click");
        }
        if ( this.value === $("." + $("input:checked").attr("id") + " .answer").text() ) {
          $("." + $("input:checked").attr("id") + " .checkSentence").trigger("click");
        }
        return false;
      });
      // Check answer
      $(".checkSentence").on("click", function() {
        $val = $("." + $("input:checked").attr("id") + " .userSentence").val();
        nextElm = Number( $("input:checked").attr("id") ) + 1;

        if ( $val === $("." + $("input:checked").attr("id") + " .answer").text() ) {
          successSound();
          $("[data-correct=amount]").text(counter++);
          if ( $("input#" + nextElm).is(":visible") ) {
            $("input#" + nextElm).trigger("click");
            speakQues();
          } else {
            alertify.log("End of lesson");
          }
        } else {
          answer = $("." + $("input:checked").attr("id") + " .answer").text();

          if ( $("input#" + nextElm).is(":visible") ) {
            wrongSound();
            alertify.alert("The correct answer is... " + "<h1>"+ answer +"</h1>", function(e) {
              if (e) {
                // Go to next section when ok is clicked 
                $("input#" + nextElm).trigger("click");
              }
            });
          } else {
            wrongAnswer($("." + $("input:checked").attr("id") + " .answer").text());
            alertify.log("End of lesson");
          }
        }
        return false;
      });
      // Add a letter to the textbox
      $(".charmenu a").on("click", function() {
        $val = $("." + $("input:checked").attr("id") + " .userSentence").val();
        $("." + $("input:checked").attr("id") + " .userSentence").val( $val + this.textContent );

        // Is this correct?
        if ( $val === $("." + $("input:checked").attr("id") + " .answer").text() ) {
          $("." + $("input:checked").attr("id") + " .checkSentence").trigger("click");
        }
      });
      // Backspace
      $(".delword").on("click", function() {
        $val = $("." + $("input:checked").attr("id") + " .userSentence").val();
        $("." + $("input:checked").attr("id") + " .userSentence").val($val.slice(0, -1));
        return false;
      });

      // Find card answer
      $(".card").on("click", function() {
        var pickedCard = $(this).find("h2").text();
        answer = $("." + $("input:checked").attr("id") + " .answer");

        if ( !pickedCard === answer.text() ) {
          this.style.backgroundColor = "#ff3666";
        }
        return false;
      });

      // Speak the sentence
      $(".speak").on("click", function() {
        answer = $("." + $("input:checked").attr("id") + " .answer");

        // first we make sure annyang started succesfully
        if (annyang) {
          // define our commands.
          var commands = {
            answer.text(): function() {
              alertify.log("hello");
            }
          };

          annyang.addCommands(commands);
          annyang.debug();

          // Set a language for speech recognition (defaults to English)
          annyang.setLanguage('ar-EG');

          if ($(this).hasClass("listening")) {
            annyang.abort();
            $(this).removeClass("listening");
          } else {
            annyang.start();
            $(this).addClass("listening");
          }
        } else {
          alertify.error("Ooops... Looks like your browser does not support the HTML5 Speach API.");
          alertify.error("Please upgrade to a newer version. Chrome recommended");
        }
      });

      // Listen to sentence
      $(".listen").on("click mouseover", function() {
        speakQues();
      });
      $(".hear").on("click", function() {
        speakQues();
      });
      speakQues();

      // Check answers
      $(".correct").on("click", function() {
        $("[data-correct=amount]").text(counter++);
        nextElm = Number( $("input:checked").attr("id") ) + 1;
        if ( $("input#" + nextElm).is(":visible") ) {
          successSound();
          $("input#" + nextElm).trigger("click");
          speakQues();
        } else {
          successSound();
          alertify.log("End of lesson");
        }
        return false;
      });
      $(".wrong").on("click", function(e) {
        nextElm = Number( $("input:checked").attr("id") ) + 1;
        answer =  $("." + $("input:checked").attr("id") + " .answer").text();
        if ( $("input#" + nextElm).is(":visible") ) {
          wrongSound();
          alertify.alert("The correct answer is... " + "<h1>"+ answer +"</h1>", function(e) {
            if (e) {
              // Go to next section when ok is clicked 
              $("input#" + nextElm).trigger("click");
              speakQues();
            }
          });
        } else {
          wrongAnswer($("." + $("input:checked").attr("id") + " .answer").text());
          alertify.log("End of lesson");
        }
        return false;
      });
      $(".error").on("click", function() {
        errorSound();
        return false;
      });
      $(".skip").on("click", function() {
        nextElm = Number( $("input:checked").attr("id") ) + 1;
        if ( $("input#" + nextElm).is(":visible") ) {
          $("input#" + nextElm).trigger("click");
          speakQues();
        } else {
          alertify.log("End of lesson");
        }
        return false;
      });
    }
    initializeTest();

    // Randomize stuff
    $(".cards-container").randomize(".card");
    $(".list").randomize(".addword");  });
  
  // Check if alphabet menu is visible
  if ( $("#charmenu").is(":visible") ) {
    // Scroll Character Menu
    (function() {
      function scrollMenu(e) {
        e = window.event || e;
        var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
        document.getElementById('charmenu').scrollLeft -= (delta*40); // Multiplied by 40
        return false;
      }
      if (document.getElementById('charmenu').addEventListener) {
        // IE9, Chrome, Safari, Opera
        document.getElementById('charmenu').addEventListener('mousewheel', scrollMenu, false);
        // Firefox
        document.getElementById('charmenu').addEventListener('DOMMouseScroll', scrollMenu, false);
      } else {
        // IE 6/7/8
        document.getElementById('charmenu').attachEvent('onmousewheel', scrollMenu);
      }
    })();
  }
});