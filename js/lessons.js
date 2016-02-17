// $("body").append("<a href=\"/\" class=\"gohome\">\n    <i class=\"fa fa-home\"></i>\n  </a>")
// $("body").append("<a href=\"/\" class=\"goback\">\n    <i class=\"fa fa-chevron-left\"></i>\n  </a>")
$("body").append("<a href=\"../\" class=\"goback\">\n    <i class=\"fa fa-chevron-left\"></i>\n  </a>")
// Add Sounds
$("body").append('<button class="play-success hide"></button>')
$("body").append('<button class="play-error hide"></button>')

// Variables
var audioElement = document.createElement("audio"),
    successSound = function() {
      audioElement.setAttribute("src", "/sounds/effects/success.mp3")
      audioElement.play()
    },
    errorSound = function() {
      audioElement.setAttribute("src", "/sounds/effects/error.mp3")
      audioElement.play()
    },
    alphabetLesson = function() {
      $(".goback").remove()

      // Show Home Button
      $("body").append("<a href=\"/\" class=\"goback\">\n    <i class=\"fa fa-home\"></i>\n  </a>")
      $("body").append("<a class=\"level\" style=\"position: absolute; top: 0.08em; right: 0.8em; font-size: 2em;\"></a>")

      // Lesson Course
      $("body").append('<div class="grid"><div class="grid__col--12 lesson"></div></div>')

      var $newLesson = $('<header class="table lessonSec" />').html('<nav class="cell"></nav>')
      $(".lesson").append($newLesson)

      // Create Lessons
      function initLessons() {
        function lesson0() {
          $(".lessonSec .cell").html("")
          .append("<p class='graytxt'>Type the letters below without spaces.</p>")
          .append("<h1>ا ن ا</h1>")
          .append("<input class='blacktxt txtcenter valsec' /><br>")
          .append("<button class='btn--default fill checkval'>Submit</button>")
          $(".level").text("0")
          $(".valsec").focus()

          function checkLesson() {
            var $val = $(".valsec").val()
            if ( $val == "" ) {
              errorSound()
            } else if ( $val == "انا" ) {
              successSound()
              $(".lessonSec .cell").html("<h1>You just spelled \"Boy\".</h1>")
              setTimeout(function() {
                lesson1()
              }, 1500)
            } else if ( $val.toLowerCase() == "lesson1" ) {
              lesson1()
            } else if ( $val.toLowerCase() == "lesson2" ) {
              lesson2()
            } else if ( $val.toLowerCase() == "lesson3" ) {
              lesson3()
            } else if ( $val.toLowerCase() == "lesson4" ) {
              lesson4()
            } else if ( $val.toLowerCase() == "lesson5" ) {
              lesson5()
            } else if ( $val.toLowerCase() == "lesson6" ) {
              lesson6()
            } else if ( $val.toLowerCase() == "lesson7" ) {
              lesson7()
            } else if ( $val.toLowerCase() == "lesson8" ) {
              lesson8()
            } else if ( $val.toLowerCase() == "lesson9" ) {
              lesson9()
            } else if ( $val.toLowerCase() == "lesson10" ) {
              lesson10()
            } else if ( $val.toLowerCase() == "lesson11" ) {
              lesson11()
            } else if ( $val.toLowerCase() == "lesson12" ) {
              lesson12()
            } else {
              errorSound()
            }
          }

          $(".valsec").keydown(function(e) {
            if ( e.which == 13 ) {
              checkLesson()
            }
          })
          $(".checkval").click(function() {
            checkLesson()
          })
        }
        function lesson1() {
          $(".lessonSec .cell").html("")
          .append("<p class='graytxt'>Type the letters below without spaces.</p>")
          .append("<h1>ص ب ي</h1>")
          .append("<input class='blacktxt txtcenter valsec' /><br>")
          .append("<button class='btn--default fill checkval'>Submit</button>")
          $(".level").text("1")
          $(".valsec").focus()

          function checkLesson() {
            if ( $val == "" ) {
              errorSound()
            } else if ( $val == "صبي" ) {
              successSound()
              $(".lessonSec .cell").html("<h1>You just spelled \"Boy\".</h1>")
              setTimeout(function() {
                lesson2()
              }, 1500)
            } else if ( $val.toLowerCase() == "lesson0" ) {
              lesson0()
            } else if ( $val.toLowerCase() == "lesson2" ) {
              lesson2()
            } else if ( $val.toLowerCase() == "lesson3" ) {
              lesson3()
            } else if ( $val.toLowerCase() == "lesson4" ) {
              lesson4()
            } else if ( $val.toLowerCase() == "lesson5" ) {
              lesson5()
            } else if ( $val.toLowerCase() == "lesson6" ) {
              lesson6()
            } else if ( $val.toLowerCase() == "lesson7" ) {
              lesson7()
            } else if ( $val.toLowerCase() == "lesson8" ) {
              lesson8()
            } else if ( $val.toLowerCase() == "lesson9" ) {
              lesson9()
            } else if ( $val.toLowerCase() == "lesson10" ) {
              lesson10()
            } else if ( $val.toLowerCase() == "lesson11" ) {
              lesson11()
            } else if ( $val.toLowerCase() == "lesson12" ) {
              lesson12()
            } else {
              errorSound()
            }
          }

          $(".valsec").keydown(function(e) {
            if ( e.which == 13 ) {
              checkLesson()
            }
          })
          $(".checkval").click(function() {
            checkLesson()
          })
        }
        function lesson2() {
          $(".lessonSec .cell").html("")
          .append("<p class='graytxt'>Type the letters below without spaces.</p>")
          .append("<h1>ف ت ا ة</h1>")
          .append("<input class='blacktxt txtcenter valsec' /><br>")
          .append("<button class='btn--default fill checkval'>Submit</button>")
          $(".level").text("2")
          $(".valsec").focus()

          function checkLesson() {
            if ( $val == "" ) {
              errorSound()
            } else if ( $val == "فتاة" ) {
              successSound()
              $(".lessonSec .cell").html("<h1>You just spelled \"Girl\".</h1>")
              setTimeout(function() {
                lesson3()
              }, 1500)
            } else if ( $val.toLowerCase() == "lesson1" ) {
              lesson1()
            } else if ( $val.toLowerCase() == "lesson0" ) {
              lesson0()
            } else if ( $val.toLowerCase() == "lesson3" ) {
              lesson3()
            } else if ( $val.toLowerCase() == "lesson4" ) {
              lesson4()
            } else if ( $val.toLowerCase() == "lesson5" ) {
              lesson5()
            } else if ( $val.toLowerCase() == "lesson6" ) {
              lesson6()
            } else if ( $val.toLowerCase() == "lesson7" ) {
              lesson7()
            } else if ( $val.toLowerCase() == "lesson8" ) {
              lesson8()
            } else if ( $val.toLowerCase() == "lesson9" ) {
              lesson9()
            } else if ( $val.toLowerCase() == "lesson10" ) {
              lesson10()
            } else if ( $val.toLowerCase() == "lesson11" ) {
              lesson11()
            } else if ( $val.toLowerCase() == "lesson12" ) {
              lesson12()
            } else {
              errorSound()
            }
          }

          $(".valsec").keydown(function(e) {
            if ( e.which == 13 ) {
              checkLesson()
            }
          })
          $(".checkval").click(function() {
            checkLesson()
          })
        }
        function lesson3() {
          $(".lessonSec .cell").html("")
          .append("<p class='graytxt'>Type the letters below without spaces.</p>")
          .append("<h1>ا م ر أ ة</h1>")
          .append("<input class='blacktxt txtcenter valsec' /><br>")
          .append("<button class='btn--default fill checkval'>Submit</button>")
          $(".level").text("3")
          $(".valsec").focus()

          function checkLesson() {
            if ( $val == "" ) {
              errorSound()
            } else if ( $val == "امرأة" ) {
              successSound()
              $(".lessonSec .cell").html("<h1>You just spelled \"Woman\".</h1>")
              setTimeout(function() {
                lesson4()
              }, 1500)
            } else if ( $val.toLowerCase() == "lesson1" ) {
              lesson1()
            } else if ( $val.toLowerCase() == "lesson2" ) {
              lesson2()
            } else if ( $val.toLowerCase() == "lesson0" ) {
              lesson0()
            } else if ( $val.toLowerCase() == "lesson4" ) {
              lesson4()
            } else if ( $val.toLowerCase() == "lesson5" ) {
              lesson5()
            } else if ( $val.toLowerCase() == "lesson6" ) {
              lesson6()
            } else if ( $val.toLowerCase() == "lesson7" ) {
              lesson7()
            } else if ( $val.toLowerCase() == "lesson8" ) {
              lesson8()
            } else if ( $val.toLowerCase() == "lesson9" ) {
              lesson9()
            } else if ( $val.toLowerCase() == "lesson10" ) {
              lesson10()
            } else if ( $val.toLowerCase() == "lesson11" ) {
              lesson11()
            } else if ( $val.toLowerCase() == "lesson12" ) {
              lesson12()
            } else {
              errorSound()
            }
          }

          $(".valsec").keydown(function(e) {
            if ( e.which == 13 ) {
              checkLesson()
            }
          })
          $(".checkval").click(function() {
            checkLesson()
          })
        }
        lesson0()
      }
      initLessons()
    };
