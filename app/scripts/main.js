/* global Velocity */
window.TAIWAN = {
  ANIM_DURATION: 2000
};

var playSound = function(elemId) {
  'use strict';
  var $elem = document.getElementById(elemId);

  if ($elem) {
    if (elemId === 'inception') {
      $elem.volume = 0.3;
    }
    $elem.play();
  }
};

var stopSound = function(elemId) {
  'use strict';
  var $elem = document.getElementById(elemId);

  if ($elem) {
    $elem.pause();
  }
};

var spinToInterrogation = function() {
  'use strict';

  var $elem = document.querySelector('.view-box');

  var slot = 4,
      top = -slot * 206,
      time =  400 * slot / 4;

  $elem.style.top = 0;
  Velocity($elem, {top: top}, {
    duration: time,
    easing: 'easeOutQuad',
    complete: stopSound('rolling')
  });
};

var spin = function(count) {
  'use strict';

  var $elem = document.querySelector('.view-box');

  Velocity($elem,
    { top: -1030 },
    { duration: 400,
      easing: 'linear',
      complete: function() {
        if (count === 0) {
          spinToInterrogation();
        } else {
          $elem.style.top = 0;
          spin(count - 1);
        }
      }
    });
};

var animateTitleStep = function(step) {
  'use strict';

  var $elem = document.querySelector('.title.step-'+ step);
  Velocity($elem, 'fadeIn', {
    duration: TAIWAN.ANIM_DURATION,
    begin: playSound('inception'),
    complete: function() {
      if (step < 4) {
        Velocity($elem, 'fadeOut', {
          duration: TAIWAN.ANIM_DURATION,
          complete: function() {
            animateTitleStep(step + 1);
          }
        });
      } else {
        lastStepDone();
      }
    }
  });
};

var lastStepDone = function() {
  'use strict';
  setTimeout(function() {
    spin(5);
    playSound('rolling');
  }, 1000);
};

window.onload = function() {
  'use strict';
//  animateTitleStep(1);
};