(function() {
  (function($, Drupal) {
    Drupal.behaviors.pioneer_base = {
      attach: function(context, settings) {
        
        // Newer IE support (10+)
        document.documentElement.setAttribute('data-useragent', navigator.userAgent);

        // Select a Library dropdowns
        $('#edit-select-library').bind('change', function() {
          window.location = $(this).val();
        });

        if ($('#edit-county').length && !$('#edit-county.processed').length) {
          var $ul = $('<ul></ul>').prependTo('.form-item-county');
          $('#edit-county option').each(function(index) {
            var $this = $(this);
            var $link = $('<a></a>');
            $('<li></li>').append($link).appendTo($ul);
            $link.text($this.text()).attr('href', '#');
            if ($this.val() == $('#edit-county').val()) {
              $link.addClass('active');
            }
            $link.bind('click', function() {
              $('#edit-county').val($this.val()).trigger('change');
              $('.form-item-county li a').removeClass('active');
              $(this).addClass('active');
              return false;
            });
          });
          $('#edit-county').hide().addClass('processed');
        }

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
