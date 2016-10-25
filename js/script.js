var webApp = function () {};

webApp.prototype.init = function () {
  this.silder();
  this.myAccount();
  this.validate();
  this.customScript();
  this.responsiveMenu();
};

webApp.prototype.validate = function () {
  $('#register-form').validate({
    rules: {
      firstname: 'required',
      lastname: 'required',
      dateOfBirth: 'required',
      email: 'required',
      password: {
          required: true,
          minlength: 5,
        },
      confirmPassword: {
        equalTo: '#password',
      },
    },
    messages: {
      firstname: 'Please enter your firstname',
      lastname: 'Please enter your lastname',
      dateOfBirth: 'Please enter your DOB',
      email: 'Please enter a valid email id',
      password: {
        required: 'Please provide a password',
      },
    },
  });
  $('#login-form').validate({
    rules: {
      email: 'required',
      password: {
        required: true,
        minlength: 5,
      },
    },
  });
};

webApp.prototype.customScript = function () {
  $('#dateOfBirthPicker').datepicker({
    orientation: 'bottom',
  });
  $.material.init();
};

webApp.prototype.myAccount = function () {
  $('.accordion-header').click(function () {
    $(this).siblings('.accordion-content').show('slow/400/fast',
      function () {});

    $(this).parent().parent().siblings().children().children(
      '.accordion-content').hide('slow/400/fast', function () {
      $('html,body').animate({
        scrollTop: $(this).siblings('.accordion-content'),
      }, 1000, 'linear');
    });
  });

  var $changePasswordWrapper = $('.change-password-wrapper'),
    $addNewAddress = $('.add-new-address'),
    $changePassword = $('#change-password'),
    $closeAddress = $('.close-address'),
    $addAddress = $('.add-address '),
    $billingWrapper = $('.billing-wrapper');
  $changePasswordWrapper.hide();
  $addNewAddress.hide();

  $changePassword.click(function () {
    fadeInContent($changePasswordWrapper);
  });

  $closeAddress.click(function () {
    $(this).parent().parent().parent().addClass('add-transition');
  });

  $addAddress.click(function () {
    fadeInContent($addNewAddress);
    $('html,body').animate({
      scrollTop: $('.add-new-address').offset().top,
    }, 500, 'linear');
  });

  function fadeInContent(element) {
    $(element).fadeIn(1000);
  }

  function fadeOutContent(element) {
    $(element).fadeOut(1000);
  }
};

webApp.prototype.silder = function () {
  var totalItems = $('.item').length,
    currentIndex = $('div.active').index() + 1,
    $spotLight = $('#spotlight'),
    $productCarousel = $('.responsive'),
    $testimonialCarousel = $('.slick-wrapper');
  $spotLight.owlCarousel({
    loop: true,
    singleItem: true,
    navigation: true,
    navigationText: [
      "<i class='fa fa-angle-left prev'></i>",
      "<i class='fa fa-angle-right next'></i>",
    ],
    autoPlay: true,
    addClassActive: true,
    transitionStyle: 'fade',
    afterMove: function () {
      currentIndex = $('div.active').index() + 1;
      $('.paging-info').html(currentIndex + '/' + totalItems);
    },

    afterInit: function () {
      $('.owl-buttons').append('<span class="paging-info"></span>');
      currentIndex = $('div.active').index() + 1;
      $('.paging-info').html(currentIndex + '/' + totalItems);
    },
  });
  $productCarousel.owlCarousel({
    loop: true,
    singleItem: false,
    navigation: true,
    items: 4,
    autoPlay: true,
  });
  $testimonialCarousel.owlCarousel({
    loop: true,
    singleItem: true,
    navigation: true,
    autoPlay: true,
    transitionStyle: 'fade',
  });
  $('.navbar-nav li').removeClass('current');
  $('html').on('click', '.top-menu li, .navbar-nav li', function (e) {
    e.stopPropagation();
    $(this).toggleClass('current');
    $(this).siblings().removeClass('current');
  });

  $('html').on('click', '.submenu', function (e) {
    e.stopPropagation();
  });

  $('html').on('click', function (e) {
    $('.navbar-nav li').removeClass('current');
    $('.top-menu li').removeClass('current');
  });

  $('html').on('click', '.accordion-mobile', function () {
    var $target = $(this);
    $('html, body').animate({
      scrollTop: $target.offset().top - 50,
    }, 2000);

    $(this).toggleClass('active');
    $(this).parent().siblings().children('.accordion-mobile').removeClass(
      'active');
    $(this).siblings('ul').slideToggle('slow');
    $(this).parent().siblings().children('ul').slideUp('slow');
  });

  $(window).load(function () {
    $('body').removeClass('preload');
  });
};

webApp.prototype.responsiveMenu = function () {
  $('nav#menu').mmenu({
    extensions: ['effect-slide-menu', 'shadow-page', 'shadow-panels', 'pagedim-black', 'effect-listitems-drop'],
    counters: true,
    navbar: {
      title: 'MENU',
    },
    navbars: [{
      position: 'top',
      content: [
         'title',
         'close',
       ],
    }, {
      position: 'top',
      content: ['prev'],
    },
    ],
    offCanvas: {
      position: 'left',
      zposition: 'front',
    },
  });
  $('nav#menu .mm-navbar-top-2').on('click', function () {
    $(this).hide();
    $(this).parent('.responsive-menu').find('.mm-panels').css({ top: '40px' });
  });

  $('nav#menu .mob-menu-wrapper li .mm-next').on('click', function () {
    $('.mm-navbar-top-2').show();
    $('.mm-navbar-top-2').parent('.responsive-menu').find('.mm-panels').css({ top: '80px' });
  });
};

jQuery(document).ready(function () {
  var sunnyDiamonds = new webApp();
  sunnyDiamonds.init();
});
