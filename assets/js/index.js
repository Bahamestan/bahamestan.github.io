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
  var clipboard = new ClipboardJS('.btnCopy');
  clipboard.on('success', function(e) {
      e.trigger.innerHTML = "کپی شد!";
      e.clearSelection();
  });
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
// formspree js start
  window.addEventListener("DOMContentLoaded", function() {

    // get the form elements defined in your form HTML above

    var form = document.getElementById("join-form");
    var button = document.getElementById("join-form-button");
    var status = document.getElementById("join-form-status");

    // Success and Error functions for after the form is submitted

    function success() {
      form.reset();
      button.style = "display: none ";
      status.innerHTML = "با تشکر از همراهی شما. به زودی با شما تماس گرفته خواهد شد.";
    }

    function error() {
      status.innerHTML = "در فرایند ثبت فرم مشکلی به وجود آمده است. لطفا مجدداً تلاش کنید.";
    }

    // handle the form submission event

    form.addEventListener("submit", function(ev) {
      ev.preventDefault();
      var data = new FormData(form);
      ajax(form.method, form.action, data, success, error);
    });
  });

  // helper function for sending an AJAX request

  function ajax(method, url, data, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = function() {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.status === 200) {
        success(xhr.response, xhr.responseType);
      } else {
        error(xhr.status, xhr.response, xhr.responseType);
      }
    };
    xhr.send(data);
  }
// formspree js end
