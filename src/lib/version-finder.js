;$(function(){
  $(document).ready( function() {
    $.getJSON('https://api.github.com/repos/citiususc/hipster/tags', function (data) {
      // take the last tag from GitHub
      $('span.version').append('(' + data[0].name + ')');
      // set the corresponding url to the zip archive
      $('a#download-release').attr('href', data[0].zipball_url);
    });
  });
});
