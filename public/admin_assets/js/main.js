(jQuery);
(function ($) {
  "use strict";
  try {
    var menu = $('.js-item-menu');
    var sub_menu_is_showed = -1;

    for (var i = 0; i < menu.length; i++) {
      $(menu[i]).on('click', function (e) {
        e.preventDefault();
        $('.js-right-sidebar').removeClass("show-sidebar");        
        if (jQuery.inArray(this, menu) == sub_menu_is_showed) {
          $(this).toggleClass('show-dropdown');
          sub_menu_is_showed = -1;
        }
        else {
          for (var i = 0; i < menu.length; i++) {
            $(menu[i]).removeClass("show-dropdown");
          }
          $(this).toggleClass('show-dropdown');
          sub_menu_is_showed = jQuery.inArray(this, menu);
        }
      });
    }
    $(".js-item-menu, .js-dropdown").click(function (event) {
      event.stopPropagation();
    });

    $("body,html").on("click", function () {
      for (var i = 0; i < menu.length; i++) {
        menu[i].classList.remove("show-dropdown");
      }
      sub_menu_is_showed = -1;
    });

  } catch (error) {
    console.log(error);
  }

  var wW = $(window).width();
    var right_sidebar = $('.js-right-sidebar');
    var sidebar_btn = $('.js-sidebar-btn');

    sidebar_btn.on('click', function (e) {
      e.preventDefault();
      for (var i = 0; i < menu.length; i++) {
        menu[i].classList.remove("show-dropdown");
      }
      sub_menu_is_showed = -1;
      right_sidebar.toggleClass("show-sidebar");
    });

    $(".js-right-sidebar, .js-sidebar-btn").click(function (event) {
      event.stopPropagation();
    });

    $("body,html").on("click", function () {
      right_sidebar.removeClass("show-sidebar");

    });
 
})(jQuery);
function update_payemnt_status(id){
  var check=confirm('Are your sure?');
  var payment_status=jQuery('#payment_status').val();
  if(check==true){
    window.location.href='/admin/update_payemnt_status/'+payment_status+'/'+id;
  }
}

function update_order_status(id){
  var check=confirm('Are your sure?');
  var order_status=jQuery('#order_status').val();
  if(check==true){
    window.location.href='/admin/update_order_status/'+order_status+'/'+id;
  }
}