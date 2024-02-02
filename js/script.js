/* $(document).ready(function(){
  $('.carousel_inner').slick({
      speed: 900,
      autoplay: true,
      autoplaySpeed: 2000,
      prevArrow: '<button type="button" class="slick-prev"><img src="img/chevron left solid.png"></button>',
      nextArrow: '<button type="button" class="slick-next"><img src="img/chevron right solid.png"></button>',
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
 */


const slider = tns({ /* Слайдер,для нашей карусели */
  container: '.carousel_inner',
  items: 1,
  slideBy: 'page',
  autoplay: false,
  controls: false,
  nav: true
});

document.querySelector('.prev').addEventListener('click', function () {
  slider.goTo('prev');
});

document.querySelector('.next').addEventListener('click', function () {
  slider.goTo('next');
});

$('ul.catalog_tabs').on('click', 'li:not(.catalog_tabs_li_active)', function () {
  $(this)
    .addClass('catalog_tabs_li_active').siblings().removeClass('catalog_tabs_li_active')
    .closest('div.container').find('div.catalog_content').removeClass('catalog_content_active').eq($(this).index()).addClass('catalog_content_active');
});

$('.catalog_item_id').each(function(i) {
    $(this).on('click', function(e) {
      e.preventDefault();
      $('.catalog_item_content').eq(i).toggleClass('catalog_item_content_active');
      $('.catalog_item_list').eq(i).toggleClass('catalog_item_list_active');
    })
});

$('.catalog_item_list_id').each(function(i) {
  $(this).on('click', function(e) {
    e.preventDefault();
    $('.catalog_item_content').eq(i).toggleClass('catalog_item_content_active');
    $('.catalog_item_list').eq(i).toggleClass('catalog_item_list_active');
  })


    // modaL
    $('[data-modal=consultation]').on('click', function() { /* создания модального окна */
      $('.overlay, #consultation').fadeIn('slow');
    });
    
    $('.modal_close').on('click', function() {
      $('.overlay, #consultation, #thanks, #order').fadeOut('slow') /* Для того чтобы можно было нажать на крестик и закрыть окно */
    });

    $('.content_btn_mini').each(function(i) {
      $(this).on('click', function() {
        $('#order .modal_descr').text($('.catalog_item_title').eq(i).text()); /* Смена текста при клике на товар */
          $('.overlay, #order').fadeIn('slow');
      })
    });

    /* Разобраться со скриптом завтра!!! */

    function validateForms(form){ /* Оптимизировали валидацию форм */
      $(form).validate({
        rules: {
          name: "required",
          email: {
            required: true,
            email: true
          }
        },
        messages: {
          name: "Пожалуйста, введите своё имя",
          phone: "Пожалуйста, введите свой номер телефона",
          email: {
            required: "Пожалуйста, введите свою почту",
            email: "Неправильно введен адрес почты"
          }
        }
      }); 
    };
 
    validateForms('#consultation form');
    /* validateForms('.consulation_inputs'); */
    validateForms('#order form');



    $('input[name=phone]').mask("+380 999-99-9999"); /* Маска для наших инпутов(полностью настраиваемая) */

    $('form').submit(function(e) {  /* Часть создания отправки писем из сайта на почту */
      e.preventDefault();

      if (!$(this).valid()) {
        return
      }

      $.ajax({
        type: "POST",
        url: "mailer/smart.php",
        data: $(this).serialize()
      }).done(function() {
        $(this).find("input").val("");
        $('#consultation, #order').fadeOut();
        $('.overlay, #thanks').fadeIn('slow');

        $('form').trigger('reset');
      });
      return false;
    });

    /* smooth scroll */

    $(window).scroll(function() {
      if ($(this).scrollTop() > 1600 && $(window).width() > 992) {
        $('.pageup').fadeIn();
      } else {
        $('.pageup').fadeOut();
      }
    });

    new WOW().init();
});