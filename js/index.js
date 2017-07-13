var interval,
    /*
    Last value for background color
    counter   = 359,
    */
    counter   = 133,
    countDown = function() {
      if (counter === 0) {
        counter = "359";
        // clearInterval(interval);
      } else {
        document.querySelector(".hero").style.background = "hsla("+ counter-- +", 100%, 34%, 0.3)";
      }
    };

setInterval(countDown, 150);