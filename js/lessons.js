// $("body").append("<a href=\"../../\" class=\"gohome pointer\">\n    <i class=\"fa fa-home\"></i>\n  </a>")
// $("body").append("<a onclick='history.back()' class=\"goback pointer\">\n    <i class=\"fa fa-chevron-left\"></i>\n  </a>")
$("body").append("<a onclick='history.back()' class=\"goback pointer\">\n    <i class=\"fa fa-chevron-left\"></i>\n  </a>")

// Variables
var audioElement  = document.createElement("audio"),
    audioWord     = document.createElement("audio"),
    audioLetter   = document.createElement("audio"),
    singleLetter  = document.createElement("audio"),
    successSound  = function() {
      audioElement.setAttribute("src", "../../sounds/effects/success.mp3")
      audioElement.play()
    },
    errorSound    = function() {
      audioElement.setAttribute("src", "../../sounds/effects/error.mp3")
      audioElement.play()
    },
    letterSounds  = function() {
      اSound = function() {
        audioLetter.setAttribute("src", "../../sounds/alphabet/ا.mp3")
        audioLetter.play()
      },
      بSound = function() {
        audioLetter.setAttribute("src", "../../sounds/alphabet/ب.mp3")
        audioLetter.play()
      },
      تSound = function() {
        audioLetter.setAttribute("src", "../../sounds/alphabet/ت.mp3")
        audioLetter.play()
      },
      ثSound = function() {
        audioLetter.setAttribute("src", "../../sounds/alphabet/ث.mp3")
        audioLetter.play()
      },
      جSound = function() {
        audioLetter.setAttribute("src", "../../sounds/alphabet/ج.mp3")
        audioLetter.play()
      },
      حSound = function() {
        audioLetter.setAttribute("src", "../../sounds/alphabet/ح.mp3")
        audioLetter.play()
      },
      خSound = function() {
        audioLetter.setAttribute("src", "../../sounds/alphabet/خ.mp3")
        audioLetter.play()
      },
      دSound = function() {
        audioLetter.setAttribute("src", "../../sounds/alphabet/د.mp3")
        audioLetter.play()
      },
      ذSound = function() {
        audioLetter.setAttribute("src", "../../sounds/alphabet/ذ.mp3")
        audioLetter.play()
      },
      رSound = function() {
        audioLetter.setAttribute("src", "../../sounds/alphabet/ر.mp3")
        audioLetter.play()
      },
      زSound = function() {
        audioLetter.setAttribute("src", "../../sounds/alphabet/ز.mp3")
        audioLetter.play()
      },
      سSound = function() {
        audioLetter.setAttribute("src", "../../sounds/alphabet/س.mp3")
        audioLetter.play()
      },
      شSound = function() {
        audioLetter.setAttribute("src", "../../sounds/alphabet/ش.mp3")
        audioLetter.play()
      },
      صSound = function() {
        audioLetter.setAttribute("src", "../../sounds/alphabet/ص.mp3")
        audioLetter.play()
      },
      ضSound = function() {
        audioLetter.setAttribute("src", "../../sounds/alphabet/ض.mp3")
        audioLetter.play()
      },
      طSound = function() {
        audioLetter.setAttribute("src", "../../sounds/alphabet/ط.mp3")
        audioLetter.play()
      },
      ظSound = function() {
        audioLetter.setAttribute("src", "../../sounds/alphabet/ظ.mp3")
        audioLetter.play()
      },
      عSound = function() {
        audioLetter.setAttribute("src", "../../sounds/alphabet/ع.mp3")
        audioLetter.play()
      },
      غSound = function() {
        audioLetter.setAttribute("src", "../../sounds/alphabet/غ.mp3")
        audioLetter.play()
      },
      فSound = function() {
        audioLetter.setAttribute("src", "../../sounds/alphabet/ف.mp3")
        audioLetter.play()
      },
      قSound = function() {
        audioLetter.setAttribute("src", "../../sounds/alphabet/ق.mp3")
        audioLetter.play()
      },
      كSound = function() {
        audioLetter.setAttribute("src", "../../sounds/alphabet/ك.mp3")
        audioLetter.play()
      },
      لSound = function() {
        audioLetter.setAttribute("src", "../../sounds/alphabet/ل.mp3")
        audioLetter.play()
      },
      مSound = function() {
        audioLetter.setAttribute("src", "../../sounds/alphabet/م.mp3")
        audioLetter.play()
      },
      نSound = function() {
        audioLetter.setAttribute("src", "../../sounds/alphabet/ن.mp3")
        audioLetter.play()
      },
      هSound = function() {
        audioLetter.setAttribute("src", "../../sounds/alphabet/ه.mp3")
        audioLetter.play()
      },
      وSound = function() {
        audioLetter.setAttribute("src", "../../sounds/alphabet/و.mp3")
        audioLetter.play()
      },
      يSound = function() {
        audioLetter.setAttribute("src", "../../sounds/alphabet/ي.mp3")
        audioLetter.play()
      }

      $("[data-asound=0]").click(function() {
        اSound()
      })
      $("[data-asound=1]").click(function() {
        بSound()
      })
      $("[data-asound=2]").click(function() {
        تSound()
      })
      $("[data-asound=3]").click(function() {
        ثSound()
      })
      $("[data-asound=4]").click(function() {
        جSound()
      })
      $("[data-asound=5]").click(function() {
        حSound()
      })
      $("[data-asound=6]").click(function() {
        خSound()
      })
      $("[data-asound=7]").click(function() {
        دSound()
      })
      $("[data-asound=8]").click(function() {
        ذSound()
      })
      $("[data-asound=9]").click(function() {
        رSound()
      })
      $("[data-asound=10]").click(function() {
        زSound()
      })
      $("[data-asound=11]").click(function() {
        سSound()
      })
      $("[data-asound=12]").click(function() {
        شSound()
      })
      $("[data-asound=13]").click(function() {
        صSound()
      })
      $("[data-asound=14]").click(function() {
        ضSound()
      })
      $("[data-asound=15]").click(function() {
        طSound()
      })
      $("[data-asound=16]").click(function() {
        ظSound()
      })
      $("[data-asound=17]").click(function() {
        عSound()
      })
      $("[data-asound=18]").click(function() {
        غSound()
      })
      $("[data-asound=19]").click(function() {
        فSound()
      })
      $("[data-asound=20]").click(function() {
        قSound()
      })
      $("[data-asound=21]").click(function() {
        كSound()
      })
      $("[data-asound=22]").click(function() {
        لSound()
      })
      $("[data-asound=23]").click(function() {
        مSound()
      })
      $("[data-asound=24]").click(function() {
        نSound()
      })
      $("[data-asound=25]").click(function() {
        هSound()
      })
      $("[data-asound=26]").click(function() {
        وSound()
      })
      $("[data-asound=27]").click(function() {
        يSound()
      })
    },
    basic1Words = function() {
      $man = $("<div>", {
        text: "رجل",
        title: "man = ر ج ل"
      }).prepend($("<a>", {
          class: "pointer fl man audioFile"
        }).on("click mouseover", function() {
          audioWord.setAttribute("src", "../../sounds/nouns/man.mp3")
          audioWord.play()
        }).html('<i class="fa fa-volume-up"></i>')
      ),
      $woman = $("<div>", {
        text: "امراه",
        title: "woman = ا م ر أ ة"
      }).prepend($("<a>", {
          class: "pointer fl woman audioFile"
        }).on("click mouseover", function() {
          audioWord.setAttribute("src", "../../sounds/nouns/woman.mp3")
          audioWord.play()
        }).html('<i class="fa fa-volume-up"></i>')
      ),
      $girl = $("<div>", {
        text: "بنت",
        title: "girl"
      }).prepend($("<a>", {
          class: "pointer fl girl audioFile"
        }).on("click mouseover", function() {
          audioWord.setAttribute("src", "../../sounds/nouns/girl.mp3")
          audioWord.play()
        }).html('<i class="fa fa-volume-up"></i>')
      ),
      $boy = $("<div>", {
        text: "ولد",
        title: "boy = و ل د"
      }).prepend($("<a>", {
          class: "pointer fl boy audioFile"
        }).on("click mouseover", function() {
          audioWord.setAttribute("src", "../../sounds/nouns/boy.mp3")
          audioWord.play()
        }).html('<i class="fa fa-volume-up"></i>')
      ),
      $I = $("<div>", {
        text: "انا",
        title: "I = ا ن ا"
      }).prepend($("<a>", {
          class: "pointer fl I audioFile"
        }).on("click mouseover", function() {
          audioWord.setAttribute("src", "../../sounds/nouns/I.mp3")
          audioWord.play()
        }).html('<i class="fa fa-volume-up"></i>')
      );
    },
    basic2Words = function() {
      // nothing to add yet
    },
    basic3Words = function() {
      $bread = $("<div>", {
        text: "خبز",
        title: "bread = خ ب ز"
      }).prepend($("<a>", {
          class: "pointer fl bread audioFile"
        }).on("click mouseover", function() {
          audioWord.setAttribute("src", "../../sounds/nouns/bread.mp3")
          audioWord.play()
        }).html('<i class="fa fa-volume-up"></i>')
      )
    };

function alphabetLesson() {
  $(".goback").remove()
  $("body").append("<a href=\"../../\" class=\"goback pointer\">\n    <i class=\"fa fa-home\"></i>\n  </a>")
  $("body").append('<div class="grid"><div class="grid__col--12 lesson blacktxt"></div></div>')

  for ( i = 0; i < 28; i++ ) {
    var $sound = '<nav class="cell txtleft" style="padding-left: 20%;"><a class="pointer blacktxt" data-asound="'+ i +'"><i class="fa fa-volume-up"></i></a></nav>'
    var $letter = '<nav class="cell txtright" data-letter="'+ i +'" style="padding-right: 20%;">Letter</nav>'
    var $newDiv = $('<header class="table hauto lessonSec" data-alphabet="'+ i +'"/>').html($sound + $letter)
    $(".lesson").css("margin-top", "3em").append( $newDiv )
  }
  letterSounds()
  $("[data-letter=0]").text("ا")
  $("[data-letter=1]").text("ب")
  $("[data-letter=2]").text("ت")
  $("[data-letter=3]").text("ث")
  $("[data-letter=4]").text("ج")
  $("[data-letter=5]").text("ح")
  $("[data-letter=6]").text("خ")
  $("[data-letter=7]").text("د")
  $("[data-letter=8]").text("ذ")
  $("[data-letter=9]").text("ر")
  $("[data-letter=10]").text("ز")
  $("[data-letter=11]").text("س")
  $("[data-letter=12]").text("ش")
  $("[data-letter=13]").text("ص")
  $("[data-letter=14]").text("ض")
  $("[data-letter=15]").text("ط")
  $("[data-letter=16]").text("ظ")
  $("[data-letter=17]").text("ع")
  $("[data-letter=18]").text("غ")
  $("[data-letter=19]").text("ف")
  $("[data-letter=20]").text("ق")
  $("[data-letter=21]").text("ك")
  $("[data-letter=22]").text("ل")
  $("[data-letter=23]").text("م")
  $("[data-letter=24]").text("ن")
  $("[data-letter=25]").text("ه")
  $("[data-letter=26]").text("و")
  $("[data-letter=27]").text("ي")
};
function alphabetHearing() {
  var char = "ابتثجحخدذرزسشصضطظعغفقكلمنهوي",
      setLetter  = "";

  for (i = 0; i < 1; i++) {
    var rnum  = Math.floor(Math.random() * char.length)
    setLetter += char.substring(rnum, rnum + 1)
  }

  var grabLetter = '<div class="hide grabLetter">'+ setLetter +'</div>'
  $("body").append(grabLetter)

  $(".goback").remove()
  $("body").append("<a href=\"../../\" class=\"goback pointer\">\n    <i class=\"fa fa-home\"></i>\n  </a>")
  $("body").append('<div class="grid"><div class="grid__col--12 lesson blacktxt"></div></div>')

  for ( i = 0; i < char.length; i++ ) {
    var $sound = '<nav class="cell txtleft" style="padding-left: 10%;"><a class="pointer blacktxt" data-asound="'+ i +'"><i class="fa fa-volume-up"></i></a></nav>'
    var $csound = '<nav class="cell"><input type="text" class="txtcenter" data-csound="'+ i +'" data-getletter="'+ char[i] +'" /></nav>'
    var $newDiv = $('<header class="table lessonSec" data-alphabet="'+ i +'" data-alphabetLetter="'+ char[i] +'"/>').html($sound + $csound)
    $(".lesson").css("margin-top", "3em").append( $newDiv )
  }
  letterSounds()

  $("body").append('<button class="btn--default block fill nomar noborderradius pointer" style="position: absolute; bottom: 0;" onclick="location.reload(true)">skip</button>')
  $(".lessonSec").addClass("hide")
  $("[data-alphabetLetter="+ $(".grabLetter").text() +"]").removeClass("hide")
  $("[data-alphabetLetter="+ $(".grabLetter").text() +"] [data-asound]").click()
  $("[data-getletter="+ $(".grabLetter").text() +"]").focus().on("keyup", function(e) {
    if ( e.which == 13 ) {
      $("[data-alphabetLetter="+ $(".grabLetter").text() +"] [data-asound]").click()
      e.preventDefault()
    } else if ( this.value === $(this).attr("data-getletter") ) {
      successSound()
      setTimeout(function() {
        location.reload(true)
      }, 1300)
    } else {
      errorSound()
      this.value = ""
    }
  })
};

function Basics1() {
  basic1Words()
  $("body").append('<div class="grid"><div class="grid__col--12 lesson blacktxt"></div></div>')

  var $cell = '<nav class="cell lessonSec"></nav>'
  var $newDiv = $('<header class="table" />').html($cell)
  $(".lesson").append( $newDiv )

  // Find translation for "woman = امرأة"
  // Find translation for "man = رجل"
  // Find translation for "girl = بنت"
  // Find translation for "boy = ولد"
  // I am a girl = انا فتاة
  // The man, the boy = الرجل والصبي
  // A boy = ولد

  var $sentenceInput = [
    $man,
    $woman,
    $girl,
    $boy
  ]

  $sentence = $("<p>", {class: "translateSentence txtcenter"}).html( $sentenceInput[Math.floor(Math.random() * $sentenceInput.length)] )
  $input    = $("<input>", {class: "userSentence txtcenter"}).on("keyup", function(e) {
    if ( e.which == 13 ) {
      $(".checkSentence").trigger("click")
    }
  })
  $button   = $("<button>", {class: "btn--default fill checkSentence", text: "Confirm"}).on("click", function() {
    if ( $(".userSentence").val() === $(".translateSentence").text() ) {
      successSound()
      // $(".translateSentence").html( $sentenceInput[Math.floor(Math.random() * $sentenceInput.length)] )
      // $(".userSentence").val("")
      // $(".audioFile").trigger("click")
      // $(".userSentence").focus()
      setTimeout(function() {
        location.reload(true)
      }, 1300)
    } else {
      errorSound()
    }
  })
  $(".lessonSec").append( $sentence )
  $(".lessonSec").append( $input )
  $(".lessonSec").append( "<p></p>" )
  $(".lessonSec").append( $button )
  $(".userSentence").focus()
  $(".audioFile").trigger("click")
}

// Test Script
// $("body").append('<textarea class="writescript" style="position: absolute; bottom: 0; left: 0; height: 25%; overflow: auto; z-index: 9;"></textarea>')
// $(".writescript").on("keyup", function() {
//   eval(this.value)
// })
