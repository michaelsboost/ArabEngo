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
var audioKey       = document.createElement("audio"),
    scroll2B       = function() {
      $(".chat-container").animate({
        scrollTop: $(this).height()
      });
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
    keySound  = function() {
      audioKey.setAttribute("src", "../../sounds/keypress.mp3");
      audioKey.play();
    },
    setLocalStorage = function() {
      // name
      if ( localStorage.getItem("personName")) {
        $("[data-person]").text(localStorage.getItem("personName"));
        $("[data-output=name]").text(localStorage.getItem("personName"));
      }
      $("[data-person]").on("keyup change", function() {
        $("[data-person]").attr("data-person", this.textContent);
        $("[data-output=name]").text(this.textContent);
        localStorage.setItem("personName", this.textContent);
      });
      // gender
      if ( localStorage.getItem("personGender") ) {
        $("[data-gender]").attr("data-gender", localStorage.getItem("personGender"));
      }
      var checked = JSON.parse(localStorage.getItem("genderState"));
      document.getElementById("setGender").checked = checked;
      $("[data-call=gender]").on("click", function() {
        if (this.checked) {
          $("[data-gender]").attr("data-gender", "male");
          localStorage.setItem("personGender", "male");
        } else {
          $("[data-gender]").attr("data-gender", "female");
          localStorage.setItem("personGender", "female");
        }
        var checkbox = document.getElementById("setGender");
        (checkbox.checked) ? localStorage.setItem("genderState", "true") : localStorage.setItem("genderState", "false");
      });
      // avatar
      if ( localStorage.getItem("personAvatar")) {
        $("[data-set=avatar]").css("background-image", "url('"+ localStorage.getItem("personAvatar") +"')");
      }
      $("[data-set=avatar]").on("click", function() {
        UIkit.modal.prompt('Enter Image URL!').then(function(value) {
          if (!value) {
            location.reload(true);
          } else {
            $(this).css("background-image", "url('"+ value +"')");
            localStorage.setItem("personAvatar", value);
            // console.log(value);
            location.reload(true);
          }
        });
      });
      // location
      if ( localStorage.getItem("personLocation")) {
        $("[data-set=location]").text(localStorage.getItem("personLocation"));
      }
      $("[data-set=location]").on("keyup change", function() {
        localStorage.setItem("personLocation", this.textContent);
      });
      // topic
      if ( localStorage.getItem("personTopic")) {
        $("[data-set=topic]").text(localStorage.getItem("personTopic"));
      }
      $("[data-set=topic]").on("keyup change", function() {
        localStorage.setItem("personTopic", this.textContent);
      });
      // bio
      if ( localStorage.getItem("personBio")) {
        $("[data-set=bio]").text(localStorage.getItem("personBio"));
      }
      $("[data-set=bio]").on("keyup change", function() {
        localStorage.setItem("personBio", this.textContent);
      });
      // social network communication
      // var arr = localStorage.getItem("socialValues") || {};
      // if ( localStorage.getItem("socialValues")) {
      //   var savedArrData = JSON.parse(arr);
      //   $.each(savedArrData, function(key, value) {
      //     $("[data-social=links] input#" + key).val(value);
      //     // console.log(key + ": " + value);
      //   });
      // }
      // $("[data-social=links] input").on("change keyup", function() {
      //   arr[this.id] = (this.value ? '"' + this.value + '"' : "");
      //   localStorage.setItem("socialValues", JSON.stringify(arr));
      // });
      // $("[data-social=links] input").trigger("change");
    };

// Set Localstorage
setLocalStorage();

// Share to Social Networks
$("[data-call=share]").on("click", function() {
  $(".sharelist").slideToggle();
});
$(".comingsoon").on("click", function() {
  alertify.log("coming soon");
});

// Scroll to top from info screen
$("[data-scroll=top]").click(function() {
  $(".uk-offcanvas-bar").animate({
    scrollTop: 0
  });
});

// Speak first message
setTimeout(function() {
  speakThis( $(".chat-history .them:first").text() );
}, 300);

// Speak message when hovered over
speakSentence();
$('.keyboard button').click(function() {
  if ($(this).attr("class") === "spacebar editor") {
    $val = $(".preview h1").text();
    $(".preview h1").text($val + " ");
    return false;
  } else if ($(this).attr("class") === "backspace") {
    $val = $(".preview h1").text();
    $(".preview h1").text($val.slice(0, -1));
    return false;
  } else if ($(this).attr("class") === "pictures") {
    alertify.log("pictures & emoticons coming soon....");
    return false;
  } else if ($(this).attr("class") === "enter") {
    if ($(".preview h1").text() === "") {
      alertify.error("Abandoned operation!");
      setTimeout(function() {
        alertify.log("Cannot send empty messages!");
      }, 500);
      return false;
    } else {
      // Bot talks, you talk, bot talks, you talk...
      // That's how the app is configured.
      // Chat ends when the bot says goodbye, followed by your goodbye response.

      
    }
  } else {
    $val = $(".preview h1").text();
    $(".preview h1").text($val + this.textContent);
  }
});

// Type the word with a physical keyboard
function typeWordKeyBoard() {
  $(window).on("keydown", function(e) {
    if (e.shiftKey) {
      if ( e.shiftKey && e.which === 191 ) {
        $(".keyboard button:contains('؟')").trigger("click");
        return false;
      }
    } else {
      if (!$(".uk-input").is(":focus") && !$("[contenteditable]").is(":focus") && !$(".socialbox").is(":focus")) {
        // Enter & Backspace
        if ( e.which === 8 ) {
          $('.keyboard .backspace').trigger("click");
        }
        if ( e.which === 13 ) {
          $('.keyboard .enter').trigger("click");
        }
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
      }
    }
  });
}
typeWordKeyBoard();

// Save as a Gist Online
$("[data-action=save-gist]").click(function() {
  // check if description and markdown editor have a value
  if ( !$("[data-set=topic]").text()) {
     $("[data-set=topic]").text("Saved from ArabEngo!");
  }

  // Return user properties
  var sArr = {
    "personName": $("[data-person]").text(),
    "personLocation": $("[data-set=location]").text(),
    "personTopic": $("[data-set=topic]").text(),
    "personBio": $("[data-set=bio]").text(),
    "description": $("[data-set=topic]").text()
  };

  var socialArr = {};
  $("[data-social=links] input").each(function() {
    var id = this.id;
    socialArr[id] = (this.value ? '"' + this.value + '"' : "");
  });

  var files = {};
	files["social.json"] = { "content": JSON.stringify(socialArr) };
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
    document.querySelector("[data-output=projectURL]").value = "https://mikethedj4.github.io/kodeWeave/editor/#" + embedProject;
    document.querySelector("[data-output=projectURL]").onclick = function() {
      this.select(true);
    };
    
    document.getElementById("clearSharePreview").innerHTML = "";
    var shareFrame = document.createElement("iframe");
    shareFrame.setAttribute("id", "shareWeavePreview");
    shareFrame.setAttribute("sandbox", "allow-forms allow-modals allow-pointer-lock allow-popups allow-same-origin allow-scripts");
    shareFrame.style.width = "calc(100% + 1.5em)";
    shareFrame.style.height = "300px";
    document.getElementById("clearSharePreview").appendChild(shareFrame);
    var previewWeave = document.getElementById("shareWeavePreview");
    previewWeave.src = "https://mikethedj4.github.io/kodeWeave/embed/#" + embedProject + "?" + showEditors;
    document.querySelector("[data-output=embedProject]").value = "<iframe width=\"100%\" height=\"300\" src=\"https://mikethedj4.github.io/kodeWeave/embed/#" + embedProject + "?" + showEditors + "\" allowfullscreen=\"allowfullscreen\" frameborder=\"0\"></iframe>";
    document.querySelector("[data-output=embedProject]").onclick = function() {
      this.select(true);
    };

    $(".share-facebook").attr("href", "https://www.facebook.com/sharer/sharer.php?u=https%3A//mikethedj4.github.io/kodeWeave/editor/%23" + hash);
    $(".share-twitter").attr("href", "https://twitter.com/home?status=Checkout%20my%20"+ document.querySelector("[data-action=sitetitle]").value.split(" ").join("%20") +"%20%23weave%20on%20%23kodeWeave%20%23kodeWeaveShare%20-%20https%3A//mikethedj4.github.io/kodeWeave/e/%23" + hash);
    $(".share-gplus").attr("href", "https://plus.google.com/share?url=https%3A//mikethedj4.github.io/kodeWeave/editor/%23" + hash);
    $(".share-linkedin-square").attr("href", "https://www.linkedin.com/shareArticle?mini=true&url=https%3A//mikethedj4.github.io/kodeWeave/editor/%23"+ hash +"&title=Checkout%20my%20%23weave%20on%20%23kodeWeave%3A%20&summary=&source=");
    $("[data-action=socialdialog]").fadeIn();

    // Successfully saved weave. 
    // Ask to support open source software.
    // UIkit.notification("<div class=\"grid\"><div class=\"centered grid__col--12 tc\"><h2>Help keep this free!</h2><a href=\"https://snaptee.co/t/2nezt/?r=fb&teeId=2nezt\" target=\"_blank\"><img src=\"../assets/images/model-2.jpg\" width=\"100%\"></a><a class=\"btn--success\" href=\"https://snaptee.co/t/2nezt/?r=fb&teeId=2nezt\" target=\"_blank\" style=\"display: block;\">Buy Now</a></div></div>");
  }).error(function(e) {
    console.warn("Error: Could not save weave!", e);
    alertify.error("Error: Could not save weave!");
  });
});

// Auto open profile info
// $(".fa-user-circle-o").trigger("click");