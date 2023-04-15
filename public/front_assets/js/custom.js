

jQuery(function($){


 
    
     jQuery(".aa-cartbox").hover(function(){
      jQuery(this).find(".aa-cartbox-summary").fadeIn(500);
    }
      ,function(){
          jQuery(this).find(".aa-cartbox-summary").fadeOut(500);
      }
     );   
  

    jQuery('[data-toggle="tooltip"]').tooltip();
    jQuery('[data-toggle2="tooltip"]').tooltip();

     

    jQuery('.aa-popular-slider').slick({
      dots: false,
      infinite: false,
      speed: 300,
      slidesToShow: 4,
      slidesToScroll: 4,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    }); 

  
       

    jQuery('.aa-featured-slider').slick({
        dots: false,
        infinite: false,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
          
        ]
    });
    
       
    jQuery('.aa-latest-slider').slick({
        dots: false,
        infinite: false,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
          
        ]
    });


  /* ----------------------------------------------------------- */
  /*  9. PRICE SLIDER  (noUiSlider SLIDER)
  /* ----------------------------------------------------------- */        

    jQuery(function(){
      if($('body').is('.productPage')){
       var skipSlider = document.getElementById('skipstep');

       var filter_price_start=jQuery('#filter_price_start').val();
       var filter_price_end=jQuery('#filter_price_end').val();
       
       if(filter_price_start=='' || filter_price_end==''){
        var filter_price_start=100;
        var filter_price_end=1700;
       }

        noUiSlider.create(skipSlider, {
            range: {
                'min': 0,
                '10%': 1000,
                '20%': 10000,
                '30%': 30000,
                '40%': 50000,
                '50%': 80000,
                '60%': 100000,
                '70%': 150000,
                '80%': 500000,
                '90%': 1000000,
                'max': 2000000
            },
            snap: true,
            connect: true,
            start: [filter_price_start, filter_price_end]
        });
        // for value print
        var skipValues = [
          document.getElementById('skip-value-lower'),
          document.getElementById('skip-value-upper')
        ];

        skipSlider.noUiSlider.on('update', function( values, handle ) {
          skipValues[handle].innerHTML = values[handle];
        });
      }
    });


    
  //10. SCROLL TOP BUTTON

  //Check to see if the window is top if not then display button

    jQuery(window).scroll(function(){
      if ($(this).scrollTop() > 300) {
        $('.scrollToTop').fadeIn();
      } else {
        $('.scrollToTop').fadeOut();
      }
    });
     
    //Click event to scroll to top

    jQuery('.scrollToTop').click(function(){
      $('html, body').animate({scrollTop : 0},800);
      return false;
    });
  
  /*  11. PRELOADER */

    jQuery(window).load(function() { // makes sure the whole site is loaded      
      jQuery('#wpf-loader-two').delay(200).fadeOut('slow'); // will fade out      
    })

  /*  12. GRID AND LIST LAYOUT CHANGER */

  jQuery("#list-catg").click(function(e){
    e.preventDefault(e);
    jQuery(".aa-product-catg").addClass("list");
  });
  jQuery("#grid-catg").click(function(e){
    e.preventDefault(e);
    jQuery(".aa-product-catg").removeClass("list");
  });


  /*  13. RELATED ITEM SLIDER (SLICK SLIDER) */

    jQuery('.aa-related-item-slider').slick({
      dots: false,
      infinite: false,
      speed: 300,
      slidesToShow: 4,
      slidesToScroll: 4,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
        
      ]
    }); 
    
});

function change_product_color_image(img,color){
  jQuery('#color_id').val(color);
  jQuery('.simpleLens-big-image-container').html('<a data-lens-image="'+img+'" class="simpleLens-lens-image"><img src="'+img+'" class="simpleLens-big-image"></a>');
}


function home_add_to_cart(id,color_str_id){
  jQuery('#color_id').val(color_str_id);
  add_to_cart(id,color_str_id);
}
function add_to_cart(id,color_str_id,_type="new"){
  jQuery('#add_to_cart_msg').html('');
  var color_id=jQuery('#color_id').val();
  if(color_str_id==0){
    color_id='no';
  }
  if(color_id=='' && color_id!='no'){
    jQuery('#add_to_cart_msg').html('<div class="alert alert-danger fade in alert-dismissible mt10"><a href="#" class="close" data-dismiss="alert" aria-label="close" title="close">×</a>Please select color</div>');
  }else{
    jQuery('#product_id').val(id);
    jQuery('#pqty').val(jQuery('#qty').val());
    jQuery.ajax({
      url:'/add_to_cart',
      data:jQuery('#frmAddToCart').serialize(),
      type:'post',
      success:function(result){
        var totalPrice=0;

        if(result.msg=='not_avaliable'){
          alert(result.data);
        }else{
          alert("Product "+result.msg);
          if(result.totalItem==0){
            jQuery('.aa-cart-notify').html('0'); 
            jQuery('.aa-cartbox-summary').remove();
         }else{
           
           jQuery('.aa-cart-notify').html(result.totalItem); 
           var html='<ul>';
           jQuery.each(result.data, function(arrKey,arrVal){
             totalPrice=parseInt(totalPrice)+(parseInt(arrVal.qty)*parseInt(arrVal.price));
             html+='<li><a class="aa-cartbox-img" href="#"><img src="'+PRODUCT_IMAGE+'/'+arrVal.image+'" alt="img"></a><div class="aa-cartbox-info"><h4><a href="#">'+arrVal.name+'</a></h4><p> '+arrVal.qty+' * Rs  '+arrVal.price+'</p></div></li>';
           });
          
         }
         html+='<li><span class="aa-cartbox-total-title">Total</span><span class="aa-cartbox-total-price">Rs '+totalPrice+'</span></li>';
         html+='</ul><a class="aa-cartbox-checkout aa-primary-btn" href="cart">Cart</a>';
         console.log(html);
         jQuery('.aa-cartbox-summary').html(html);
        }
      }
    });
  }
}


function deleteCartProduct(pid,color,attr_id){
  jQuery('#color_id').val(color);
  jQuery('#qty').val(0)
  add_to_cart(pid,color);
  jQuery('#cart_box'+attr_id).hide();
}

function updateQty(pid,color,attr_id,price){
  jQuery('#color_id').val(color);
  var qty=jQuery('#qty'+attr_id).val();
  jQuery('#qty').val(qty)
  add_to_cart(pid,color,"change");
  jQuery('#total_price_'+attr_id).html('Rs '+qty*price);
}

function sort_by(){
  var sort_by_value=jQuery('#sort_by_value').val();
  jQuery('#sort').val(sort_by_value);
  jQuery('#categoryFilter').submit();
}

function sort_price_filter(){
  jQuery('#filter_price_start').val(jQuery('#skip-value-lower').html());
  jQuery('#filter_price_end').val(jQuery('#skip-value-upper').html());
  jQuery('#categoryFilter').submit(); 
}

function setColor(color,type){
  var color_str=jQuery('#color_filter').val();
  if(type==1){
    var new_color_str=color_str.replace(color+':','');
    jQuery('#color_filter').val(new_color_str);
  }else{
    jQuery('#color_filter').val(color+':'+color_str);
    jQuery('#categoryFilter').submit();
  }
 
  jQuery('#categoryFilter').submit();
}

function funSearch(){
  var search_str=jQuery('#search_str').val();
  if(search_str!='' && search_str.length>3){
    window.location.href='/search/'+search_str;
  }
}
jQuery('#frmRegistration').submit(function(e){
  e.preventDefault();
  jQuery('.field_error').html('');
  jQuery.ajax({
    url:'registration_process',
    data:jQuery('#frmRegistration').serialize(),
    type:'post',
    success:function(result){
      if(result.status=="error"){
        jQuery.each(result.error,function(key,val){
          jQuery('#'+key+'_error').html(val[0]);
        });
      }
      
      if(result.status=="success"){
        jQuery('#frmRegistration')[0].reset();
        jQuery('#thank_you_msg').html(result.msg);
      }
    }
  });
});

jQuery('#frmLogin').submit(function(e){
  jQuery('#login_msg').html("");
  e.preventDefault();
  jQuery.ajax({
    url:'/login_process',
    data:jQuery('#frmLogin').serialize(),
    type:'post',
    success:function(result){
      if(result.status=="error"){
        jQuery('#login_msg').html(result.msg);
      }
      
      if(result.status=="success"){
       window.location.href=window.location.href;
        //jQuery('#frmLogin')[0].reset();
        //jQuery('#thank_you_msg').html(result.msg);
      }
    }
  });
});


function forgot_password(){
  jQuery('#popup_forgot').show();
  jQuery('#popup_login').hide();
}

function show_login_popup(){
  jQuery('#popup_forgot').hide();
  jQuery('#popup_login').show();
}

jQuery('#frmForgot').submit(function(e){
  jQuery('#forgot_msg').html("Please wait...");
  
  e.preventDefault();
  jQuery.ajax({
    url:'/forgot_password',
    data:jQuery('#frmForgot').serialize(),
    type:'post',
    success:function(result){
      console.log(result);
      jQuery('#forgot_msg').html(result.msg);
    }
  });
});


jQuery('#frmUpdatePassword').submit(function(e){
  jQuery('#thank_you_msg').html("Please wait...");
  jQuery('#thank_you_msg').html("");
  e.preventDefault();
  jQuery.ajax({
    url:'/forgot_password_change_process',
    data:jQuery('#frmUpdatePassword').serialize(),
    type:'post',
    success:function(result){
      console.log(result);
      jQuery('#frmUpdatePassword')[0].reset();
      jQuery('#thank_you_msg').html(result.msg);
    }
  });
});
var config = {
  // replace the publicKey with yours
  "publicKey": "test_public_key_8b563a69ce684c3a90d669b6f42d1b1a",
  "productIdentity": "1234567890",
  "productName": "Dragon",
  "productUrl": "http://127.0.0.1:8000/product/Iphone%2013",
  "paymentPreference": [
      "KHALTI",
      "EBANKING",
      "MOBILE_BANKING",
      "CONNECT_IPS",
      "SCT",
      ],
  "eventHandler": {
      onSuccess (payload) {
          // hit merchant api for initiating verfication
          console.log(payload);
      },
      onError (error) {
          console.log(error);
      },
      onClose () {
          console.log('widget is closing');
      }
  }
};

var checkout = new KhaltiCheckout(config);
var btn = document.getElementById("payment-button");
btn.onclick = function () {
  // minimum transaction amount must be 10, i.e 1000 in paisa.
  checkout.show({amount: 1000});
}

jQuery('#frmPlaceOrder').submit(function(e){
  jQuery('#order_place_msg').html("Please wait...");
  e.preventDefault();
  jQuery.ajax({
    url:'/place_order',
    data:jQuery('#frmPlaceOrder').serialize(),
    type:'post',
    success:function(result){
      if(result.status=='success'){
          window.location.href="/order_placed";
      }
      jQuery('#order_place_msg').html(result.msg);
    }
  });
});
function applyCouponCode(){
  jQuery('#coupon_code_msg').html('');
  var coupon_code=jQuery('#coupon_code').val();
  if(coupon_code!=''){
    jQuery.ajax({
      type:'post',
      url:'/apply_coupon_code',
      data:'coupon_code='+coupon_code+'&_token='+jQuery("[name='_token']").val(),
      success:function(result){
        console.log(result.status);
        if(result.status=='success'){
          jQuery('.show_coupon_box').removeClass('hide');
          jQuery('#coupon_code_str').html(coupon_code);
          jQuery('#total_price').html('Rs '+result.totalPrice);
          jQuery('.apply_coupon_code_box').hide();
        }else{
          
        }
        jQuery('#coupon_code_msg').html(result.msg);
      }
    });
  }else{
    jQuery('#coupon_code_msg').html('Please enter coupon code');
  }
}

function remove_coupon_code(){
  jQuery('#coupon_code_msg').html('');
  var coupon_code=jQuery('#coupon_code').val();
  jQuery('#coupon_code').val('');
  if(coupon_code!=''){
    jQuery.ajax({
      type:'post',
      url:'/remove_coupon_code',
      data:'coupon_code='+coupon_code+'&_token='+jQuery("[name='_token']").val(),
      success:function(result){
        if(result.status=='success'){
          jQuery('.show_coupon_box').addClass('hide');
          jQuery('#coupon_code_str').html('');
          jQuery('#total_price').html('Rs '+result.totalPrice);
          jQuery('.apply_coupon_code_box').show();
        }else{
          
        }
        jQuery('#coupon_code_msg').html(result.msg);
      }
    });
  }
}
jQuery('#frmProductReview').submit(function(e){
  e.preventDefault();
  jQuery.ajax({
    url:'/product_review_process',
    data:jQuery('#frmProductReview').serialize(),
    type:'post',
    success:function(result){
      if(result.status=="success"){
        jQuery('.review_msg').html(result.msg);
        jQuery('#frmProductReview')[0].reset();
        setInterval(function(){
          window.location.href=window.location.href
        },3000);
      }if(result.status=="error"){
        jQuery('.review_msg').html(result.msg)
      }
      //jQuery('#frmUpdatePassword')[0].reset();
      //jQuery('#thank_you_msg').html(result.msg);
    }
  });
});

// function redirectToURLOnBack(targetURL, redirectTo) {
//   if (window.location.href === targetURL) {
//     // Add a dummy history entry to ensure the popstate event is fired
//     history.pushState({}, '');
//     console.log('hello')
//     // Listen for the popstate event
//     window.addEventListener('popstate', function (event) {
//       // Redirect to the specified URL
//       window.location.href = redirectTo;
//     });
//   }
// }

// // Usage
// // Replace the URLs with your specific URLs
// redirectToURLOnBack('', 'http://127.0.0.1:8000');
