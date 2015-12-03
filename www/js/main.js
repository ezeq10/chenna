        $(document).ready(function() {
          $('a.page-scroll').click(function() {
              if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                if (target.length) {
                  $('html,body').animate({
                    scrollTop: target.offset().top - 55
                  }, 900);
                  return false;
                }
              }
            });
        });



$(window).scroll(function() {    
    var scroll = $(window).scrollTop();

     //>=, not <=
    if (scroll >= 100) {
        //clearHeader, not clearheader - caps H
        $(".navbar-inverse").addClass("scroll");
    }else{
        $(".navbar-inverse").removeClass("scroll");      
    }
});        



