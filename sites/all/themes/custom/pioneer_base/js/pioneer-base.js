(function() {
  (function($, Drupal) {
    Drupal.behaviors.pioneer_base = {
      attach: function(context, settings) {
        
        // IE 10 suppor
        document.documentElement.setAttribute('data-useragent', navigator.userAgent);

        // Select a Library dropdowns
        $('#edit-select-library').bind('change', function() {
          window.location = $(this).val();
        });

        var reg, triggerImageSize;
        triggerImageSize = function($image, callback) {
          if (!$image.hasClass("size-processing")) {
            $image.addClass("size-processing");
            $image.waitForImages({
              finished: function() {
                callback();
                $image.removeClass("size-processing");
              },
              each: $.noop,
              waitForAll: true
            });
          }
        };
        reg = new RegExp("/" + window.location.host + "/");
        $("a").each(function() {
          if (!reg.test(this.href)) {
            $(this).click(function(event) {
              event.preventDefault();
              event.stopPropagation();
              window.open(this.href, "_blank");
            });
          }
        });
        $("ul[data-orbit]", context).once("orbit-helper", function() {
          var $orbit, $orbitImage;
          $orbit = $(this);
          $orbitImage = $orbit.children("li:last-child");
          $orbit.on("before-slide-change.fndtn.orbit", function() {
            $orbit.addClass("orbit-transitioning");
          });
          $orbit.on("after-slide-change.fndtn.orbit", function() {
            $orbit.removeClass("orbit-transitioning");
          });
          $(document).on("replace", "img", function() {
            triggerImageSize($orbitImage, function() {
              $(window).trigger("resize");
            });
          });
        });
      }
    };
  })(jQuery, Drupal);

}).call(this);
