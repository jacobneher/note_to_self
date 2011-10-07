(function ($) {
  Drupal.behaviors.note_to_self = {
    attach: function(context, settings) {
      $('#note-to-self .note-tab').click(function() {
        if ($('#note-to-self').is('.visible')) {
          $('#note-to-self').animate({ right: '-=320' }, 800);
          $('#note-to-self').removeClass('visible');
          $(this).removeClass('visible');
        }
        else {
          $('#note-to-self').animate({ right: '+=320' }, 800);
          $('#note-to-self').addClass('visible');
          $(this).addClass('visible');
        }
      });
      
      $('#note-to-self input[type=button]').click(function() {
        $('#note-to-self .note-saving').toggle();
        $('#note-to-self textarea').attr('disabled', 'disabled');
        $(this).attr('disabled', 'disabled');
        
        $.ajax({
          type: "GET",
          url: Drupal.settings.basePath + "note-to-self/save", // Using basePath in case Drupal is in a subdirectory
          data: {
            'note': $('#note-to-self textarea').val()
          },
          success: function(msg) {
            $('#note-to-self .note-message').toggle().html(msg);
            $('#note-to-self .note-message').delay(3000).fadeOut(400);
            $('#note-to-self .note-saving').toggle();
            $('#note-to-self textarea').removeAttr('disabled');
            $('#note-to-self input[type=button]').removeAttr('disabled');
            
            $('#note-to-self').delay(3000).animate({ right: '-=320' }, 800).removeClass('visible');
            $('#note-to-self .note-tab').delay(3000).removeClass('visible');
          }
        });
      });
		}
  }
})(jQuery);