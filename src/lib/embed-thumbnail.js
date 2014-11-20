/*!
 * Removes the youtube thumbnail and loads the iframe
 * when clicking the play button.
 *
 * Pablo Rodríguez Mier
 */
;(function($){
  $(document).ready( function(){
    $('.play-video-button').click(function(){
      $('.embed-video-thumbnail').css({'opacity':'1'});
      var frame = $('#video-tutorial-frame');
      $('play-video-button').remove();
      frame[0].src = frame[0].src.replace('autoplay=0','autoplay=1');
      frame.css({'opacity':'1','display':'block'});
      $('img-video-thumbnail').remove();
      $(this).unbind('click');
    });
  } );
})(jQuery)
