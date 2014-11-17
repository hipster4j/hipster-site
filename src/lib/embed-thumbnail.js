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
      frame[0].src = frame[0].src.replace('autoplay=0','autoplay=1');
      frame.css({'opacity':'1','display':'block'});
      $('play-video-button').remove();
      $('img-video-thumbnail').remove();
      $(this).unbind('click');
    });
  } );
})(jQuery)
