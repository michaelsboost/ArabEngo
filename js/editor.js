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
var grabHTML, 
    audioKey        = document.createElement("audio"),
    scroll2B        = function() {
      $(".chat-container").animate({
        scrollTop: $(this).height()
      });
    },
    speakSentence   = function() {
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
    speakThis       = function(msg) {
      // Speak arabic word/sentence
      responsiveVoice.cancel();
      if ( $("[data-gender]").attr("data-gender") === "female" ) {
        responsiveVoice.speak(msg, "Arabic Female");
      } else {
        responsiveVoice.speak(msg, "Arabic Male");
      }
      return false;
    },
    keySound        = function() {
      audioKey.setAttribute("src", "../sounds/keypress.mp3");
      audioKey.play();
    },
    clearHash       = function() {
      // Remove hash when user makes a change
      if (window.location.hash) {
        $("[data-person], [data-set=location], [data-set=topic], [data-set=bio], [data-social=links] input").trigger("keyup");
        $("[data-output=messages]").trigger("change");
        window.location.href = window.location.toString().split(/\?|#/)[0];
      }
    },
    setLocalStorage = function() {
      // name
      if ( localStorage.getItem("personName")) {
        $("[data-person]").text(localStorage.getItem("personName"));
        $("[data-output=name]").text(localStorage.getItem("personName"));
      } else if ( !localStorage.getItem("personName")) {
        $("[data-person], [data-output=name]").text("Your Name").trigger("change");
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
      $("[data-call=gender]").on("click change", function() {
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
        $("[data-avatarurl]").attr("data-avatarurl", localStorage.getItem("personAvatar"))
        $("[data-set=avatar]").css("background-image", "url("+ localStorage.getItem("personAvatar") +")");
      }
      $("[data-set=avatar]").on("click keyup", function() {
        UIkit.modal.prompt('Enter Image URL!').then(function(value) {
          if (!value) {
            location.reload(true);
          } else {
            $(this).css("background-image", "url('"+ value +"')");
            localStorage.setItem("personAvatar", value);
            // console.log(value);
            
            // Remove hash when user makes a change
            clearHash();

            setTimeout(function() {
              location.reload(true);
            }, 100);
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
      // messages
      if ( localStorage.getItem("chatMessages")) {
        $("[data-output=messages]").html(localStorage.getItem("chatMessages"));
      }
      // social network communication
      var arr = JSON.parse(localStorage.getItem("socialValues")) || {};

      if (localStorage.getItem("socialValues")) {
        var savedArrData = JSON.parse(localStorage.getItem("socialValues"));
        $.each(savedArrData, function(key, value) {
          $("#" + key).val(value);
        });
      }

      $("[data-social=links] input").on("change keyup", function() {
        var id = this.id;
        arr[id] = (this.value ? this.value : "");
        localStorage.removeItem("socialValues");
        localStorage.setItem("socialValues", JSON.stringify(arr));
      });
    },
    msgTranslation  = function() {
      localStorage.setItem("chatMessages", $("[data-output=messages]").html());

      $(".them, .you").find("[data-meaning]").on("click", function() {
        if ($(this).hasClass('emoticon')) {
          return false;
        }
        $(this).addClass("selected-msg");

        // First do you want to delete this message
        UIkit.modal.confirm('<h3>Do you want to delete this message?</h3>').then(function() {
          $(".selected-msg").parent().remove();
          localStorage.setItem("chatMessages", $("[data-output=messages]").html());
        
          // Remove hash when user makes a change
          clearHash();
          return false;
        }, function () {
          UIkit.modal.prompt('<h3>What does "'+ $(".selected-msg").text() +'" mean?</h3>').then(function(value) {
            if (!value) {
              // location.reload(true);
            } else {
              $(".selected-msg").attr("data-meaning", value);
              console.log(value);
              $(".selected-msg").removeClass("selected-msg");
              localStorage.setItem("chatMessages", $("[data-output=messages]").html());
        
              // Remove hash when user makes a change
              clearHash();
            }
          });
        });
      });
    },
    msgUpdate       = function() {
      localStorage.setItem("chatMessages", $("[data-output=messages]").html());

      $(".them, .you").find("[data-edit]").on("click", function() {
        $(this).parent().find("[data-meaning]").addClass("selected-msg");

        // Update message if spelling was wrong
        UIkit.modal.prompt('<h3>Did you spell "'+ $(".selected-msg").text() +'" wrong?</h3><i>Make sure you\'re using the correct keyboard!<br><u>Remember! ArabEngo does <strong>NOT</strong> integrate accent marks!</u></i><hr>').then(function(value) {
          if (!value) {
            // location.reload(true);
          } else {
            $(".selected-msg").text(value);
            console.log(value);
            $(".selected-msg").removeClass("selected-msg");
            localStorage.setItem("chatMessages", $("[data-output=messages]").html());
        
            // Remove hash when user makes a change
            clearHash();
          }
        });
      });
    },
    delEmoticons    = function() {
      $(".them img").on("click", function() {
        $(this).parent().addClass("selected-msg");
        // First do you want to delete this message
        UIkit.modal.confirm('<h3>Do you want to delete this message?</h3>').then(function() {
          UIkit.modal.confirm('<h3>This is a distructive action that cannot be undone!<br> Are you sure you wish to proceed?</h3>').then(function() {
            $(".selected-msg").parent().remove();
            localStorage.setItem("chatMessages", $("[data-output=messages]").html());
            return false;
          }, function () {
            // rejected
          });
        });
      });
    },
    addImage        = function(source) {
      $("[data-search=flicker]").val("").trigger("change");
      $("[data-output=images]").empty();
      
      $("[data-output=messages]").append('<div class="them emoticon msg"><p class="message"><img src="'+ source +'" /></p></div>');
      localStorage.setItem("chatMessages", $("[data-output=messages]").html());
      delEmoticons();
      scroll2B();

      // Remove hash when user makes a change
      clearHash();
    },
    searchForPictures = function(source) {
      UIkit.notification('Searching for "'+source+'"', {
        pos: 'bottom-right'
      });

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
            class: "pointer uk-modal-close"
          }).attr("href", "javascript:void(0)").html('<img src="'+item.media.m+'" onclick="addImage(this.src)">').appendTo("[data-output=images]");
          if ( i === 100 ) {
            return false;
          }
        });
      });
    },
    initiateEditor  = function() {
      // Set Localstorage
      setLocalStorage();

      // Share to Social Networks
      $("[data-call=share]").on("click", function() {
        $(".sharelist").slideToggle();
      });
      $(".chat-container, .bottom-bar").click(function() {
        if ($(".sharelist").is(":visible")) {
          $(".sharelist").slideToggle();
        }
      });
      $(".comingsoon").on("click", function() {
        alertify.message("coming soon");
      });

      // Clear chat
      $("[data-clear=chat]").on("click", function() {
        UIkit.modal.confirm('Do you wish to start a new clean chat?').then(function() {
          UIkit.modal.confirm('This is a distructive action that cannot be undone!<br> Are you sure you wish to proceed?').then(function() {
            if (window.location.hash) {
              window.location.href = window.location.toString().split(/\?|#/)[0];
            }
            $("[data-output=messages]").html("");
            localStorage.setItem("chatMessages", $("[data-output=messages]").html());
            // localStorage.clear();
            setTimeout(function() {
              location.reload(true);
            }, 100);
            return false;
          }, function () {
            // rejected
          });
        }, function () {
          // rejected
        });
      });

      // Search for pictures
      // Add searched image as message
      $("[data-search=flicker]").on("keyup change", function(e) {
        if (!this.value) {
          $("[data-output=images], [data-clear=search]").fadeOut();
          $("[data-output=emoticons]").fadeIn();
        } else {
          $("[data-clear=search]").fadeIn();
          
          //If user presses enter
          if (e.which === 13) {
            var site = this.value.toString();
            if (site.substring(0, 7) === "http://" || site.substring(0, 8) === "https://") {
              $("[data-output=messages]").append('<div class="them emoticon msg"><p class="message"><img src="'+this.value+'"></p></div>');
              localStorage.setItem("chatMessages", $("[data-output=messages]").html());
              delEmoticons();
              scroll2B();
              $("[data-clear=search]").trigger('click');
            } else {
              $("[data-output=images]").empty().fadeIn();
              $("[data-output=emoticons]").fadeOut();
              searchForPictures(this.value);
            }
          }
        }
      });
      $("[data-clear=search]").click(function() {
        $("[data-search=flicker]").val("").trigger("change");
        $("[data-output=images]").empty();
      });

      // Add emotion as message
      $("[data-add=emotion]").on("click", function() {
        $("[data-output=messages]").append('<div class="them emoticon msg"><p class="message">'+ this.innerHTML +'</p></div>');
        localStorage.setItem("chatMessages", $("[data-output=messages]").html());
        delEmoticons();
        scroll2B();

        // Remove hash when user makes a change
        clearHash();
      });

      // Scroll to top from info screen
      $("[data-scroll=top]").on("click", function() {
        $(".uk-offcanvas-bar").animate({
          scrollTop: 0
        });
      });

      // Speak first message
      setTimeout(function() {
        if ($(".chat-history > .msg:visible:first").is(":visible")) {
          speakThis( $(".chat-history .msg:visible:first").text() );
        }
      }, 300);

      // Speak message when hovered over
      speakSentence();

      // Once message is added
      // You can click on it to set its translation
      msgTranslation();
      msgUpdate();

      // Add emoticons
      delEmoticons();

      $('.keyboard button').on("click", function() {
        if ($(this).attr("class") === "spacebar editor") {
          $val = $(".preview h1").text();
          $(".preview h1").text($val + " ");
          return false;
        } else if ($(this).attr("class") === "backspace") {
          $val = $(".preview h1").text();
          $(".preview h1").text($val.slice(0, -1));
          return false;
        } else if ($(this).attr("class") === "pictures") {
          // ignore pictures
          return false;
        } else if ($(this).attr("class") === "enter") {
          if ($(".preview h1").text().trim() === "") {
            UIkit.notification("Cannot send empty messages!", {
              status:'warning',
              pos: 'bottom-right'
            });
            return false;
          } else {
            // Bot talks, you talk, bot talks, you talk...
            // That's how the app is configured.
            // Chat ends when the bot says goodbye, followed by your goodbye response.

            if ( $("[data-output=messages").html() ) {
              if ($("[data-output=messages] > div:last").hasClass("them")) {
                $("[data-output=messages]").append('<div class="tr you msg"><p class="message" data-meaning="">'+ $(".preview h1").text() +'</p><a href="javascript:void(0)" data-edit="msg" style="margin: 0 12px 0 0;"><i class="fa fa-edit scale"></i></a></div>');
              } else {
                $("[data-output=messages]").append('<div class="them msg"><a href="javascript:void(0)" data-edit="msg" style="margin: 0 0 0 12px;"><i class="fa fa-edit scale"></i></a><p class="message" data-meaning="">'+ $(".preview h1").text() +'</p></div>');
              }
            }
            var chatHistory = $("[data-output=messages]").html();
            $("[data-output=messages]").html("");
            $("[data-output=messages]").html(chatHistory);
            $(".preview h1").text("");

            // Once message is added
            // You can click on it to set its translation
            msgTranslation();
            msgUpdate();
            scroll2B();

            // Speak message when hovered over
            speakSentence();
            
            // Remove hash when user makes a change
            clearHash();
          }
        } else {
          $val = $(".preview h1").text();
          $(".preview h1").text($val + this.textContent);
        }
        return false;
      });

      scroll2B();

      // Type the word with a physical keyboard
      typeWordKeyBoard();

      // Save as a Gist Online
      $("[data-action=save-gist]").on("click", function() {
        $(".sharelist").slideToggle();
        
        // Announce Discontinuation
        alertify.alert("ArabEngo Discontinued:", "As of Mar 21, 2018 Github updated their API on Gists. In which you can <a href='https://help.github.com/articles/creating-gists' target='_blank'>no longer save gists anonymously</a>.<br><br>If you try to save a gist anonymously you will be presented with a 404 as seen on Dabblet.com.<br><br><img src='https://user-images.githubusercontent.com/2473707/38180483-933e0d50-35f2-11e8-8e24-0cca98d4f4db.png'><br><br>ArabEngo relied on Github Gists to save your chats and lessons anonymously to the community. Do to this update ArabEngo is officially a discontinued project as of April 2, 2018.");
      });
      $("[data-action=social-close]").click(function() {
        $("[data-output=messages]").html(grabHTML);
        $("[data-action=socialdialog]").fadeOut();
      });
    };

$("[data-play=howto]").click(function() {
  $.fancybox.open({
    youtube : {
      controls : 0,
      showinfo : 0
    },
    src  : 'https://www.youtube.com/embed/xRYeqeyYgZc', // Source of the content
    type : 'iframe' // Content type: image|inline|ajax|iframe|html (optional)
  });
});

// Type the word with a physical keyboard
function typeWordKeyBoard() {
  $(window).on("keydown", function(e) {
    if (e.shiftKey) {
      if (!$(".uk-input").is(":focus") && !$("[contenteditable]").is(":focus") && !$(".socialbox").is(":focus") && !$(".txtbox").is(":focus")) {
        if ( e.shiftKey && e.which === 191 ) {
          $(".keyboard button:contains('؟')").trigger("click");
          return false;
        }
      }
    } else {
      if (!$(".uk-input").is(":focus") && !$("[contenteditable]").is(":focus") && !$(".socialbox").is(":focus") && !$(".txtbox").is(":focus")) {
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
          $('.keyboard .spacebar').trigger("click");
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

var hash = window.location.hash.substring(1);
function loadgist(gistid) {
  $.ajax({
    url: "https://api.github.com/gists/" + gistid,
    type: "GET",
    dataType: "jsonp",
    jsonp: "callback"
  }).success(function(gistdata) {
    var chatMessages = gistdata.data.files["messages.html"];
    var properties   = gistdata.data.files["properties.json"].content;
    var social       = gistdata.data.files["social.json"].content;
    var jsonSets     = JSON.parse(properties);
    var jsonSocial   = JSON.parse(social);

    // Return biographical information from json
    $("[data-person]").attr("data-person", jsonSets.personName);
    $("[data-person]").text(jsonSets.personName);
    $("[data-output=name]").text(jsonSets.personName);
    $("[data-avatarurl]").attr("data-avatarurl", jsonSets.personAvatar)
    $("[data-avatarurl]").css('background-image', "url("+ jsonSets.personAvatar +")");
    localStorage.setItem("personAvatar", jsonSets.personAvatar);
    $("#setGender").prop("checked", jsonSets.personGender).trigger("change");
    $("[data-set=location]").text(jsonSets.personLocation);
    $("[data-set=topic]").text(jsonSets.personTopic);
    $("[data-set=bio]").text(jsonSets.personBio);
    $("[data-set=topic]").text(jsonSets.description);

    // Return social links from json
    $.each(jsonSocial, function(name, value) {
      $("[data-social=links] #" + name).val(value);
    });
    // Load in conversation
    $("[data-output=messages]").html(chatMessages.content);
    if ( $("[data-output=messages").html() ) {
      $("[data-output=messages] > .you").append('<a href="javascript:void(0)" data-edit="msg" style="margin: 0 12px 0 0;"><i class="fa fa-edit scale"></i></a>');
      
       if ($("[data-output=messages] > .them").hasClass("emoticon")) {
        $("[data-output=messages] > .them:not(.emoticon)").prepend('<a href="javascript:void(0)" data-edit="msg"  style="margin: 0 0 0 12px;"><i class="fa fa-edit scale"></i></a>');
       } else {
        $("[data-output=messages] > .them").prepend('<a href="javascript:void(0)" data-edit="msg"  style="margin: 0 0 0 12px;"><i class="fa fa-edit scale"></i></a>');
       }
    }

    // Initiate Chat

    // Check and see if you start first
    $("[data-output=messages] .msg:hidden").removeClass("hide");
    speakThis( $(".chat-history .msg:visible:last").text() );

    // Speak first message
    setTimeout(function() {
      if ($(".chat-history > .msg:visible:first").is(":visible")) {
        speakThis( $(".chat-history .msg:visible:first").text() );
      }
    }, 300);

    // Speak message when hovered over
    speakSentence();

    // Once message is added
    // You can click on it to set its translation
    msgTranslation();
    msgUpdate();

    scroll2B();
    
    $(".preloader").remove();
  }).error(function(e) {
    // ajax error
    console.warn("Error: Could not load weave!", e);
    alertify.error("Error: Could not load weave!");
  });
}
if (window.location.hash) {
  $(document.body).append('<div class="fixedfill preloader"></div>');
  $(".preloader").html('<div class="table"><div class="cell"><img class="spin" src="../imgs/loading.svg"></div></div>');
  loadgist(hash);
    
  // Initiate Editor
  setTimeout(function() {
    initiateEditor();
  }, 150);
} else {
  // Initiate Editor
  initiateEditor();
}
