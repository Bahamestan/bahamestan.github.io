byString = function(o, s) {
  s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
  s = s.replace(/^\./, '');           // strip a leading dot
  var a = s.split('.');
  for (var i = 0, n = a.length; i < n; ++i) {
      var k = a[i];
      if (k in o) {
          o = o[k];
      } else {
          return;
      }
  }
  return o;
}

$(document).ready(function(){
  $.ajax({
    url: $("meta#page-data-url").data("url"),
    method: "GET",
    success: function(data){            
      $("[data-ref]").each(function(){
        if ($(this).prop("tagName") === "A"){
          $(this).prop("href", byString(data, $(this).data('ref')))
        } else if($(this).prop("tagName") === "IMG") {
          $(this).prop("src", byString(data, $(this).data('ref')))
        } else {
          $(this).html(byString(data, $(this).data('ref')))
        }
      });
    },
  });


  $('#bg-video-control').click(function(e){
    var $this = $('#bg-video-control');
    var $controlText = $this.children('.control-text');
    var vid = document.getElementById("bg-video");
    if( vid.muted === true){
      vid.muted = false;
      $this.find('i').removeClass('fa-volume-up');
      $this.find('i').addClass('fa-volume-off');
      $controlText.animate({ width: 0 }, 500 );
    } else {
      vid.muted = true;
      $this.find('i').removeClass('fa-volume-off');
      $this.find('i').addClass('fa-volume-up');
      $controlText.animate({ width: 'auto' }, 500 );

    }

  });
});
