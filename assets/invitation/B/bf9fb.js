const qselect = (element, elements = false) => {
  if (elements === false) { //single element
    return document.querySelector(element)
  } else { //all elements
    return document.querySelectorAll(element)
  }
}

const getBody = qselect('body')

getBody.style.overflowY = "hidden"

// $(document).ready(function(){
//     $(this).scrollTop(0);
// });

document.onreadystatechange = () => {
  if (document.readyState === 'complete') {

    AOS.init();

    qselect(".spanner").classList.remove("show")

    const musicControl = qselect("#musicControl")
    const playPauseIcon = qselect("#playPause")
    const bgMusic = qselect("audio")

    if (bgMusic) { bgMusic.load() }

    const bgMusicPlay = (play = true) => {
      if (bgMusic) {
        bgMusic.loop = true
        bgMusic.controls = false

        if (play == true) {
          bgMusic.play()
        } else {
          bgMusic.pause()
        }
      }
    }

    if (musicControl) {
      musicControl.addEventListener("click", (event) => {
        if (bgMusic.paused == true) {
          bgMusicPlay()
          playPauseIcon.classList.replace('icofont-music-alt', 'icofont-ui-pause');
        } else {
          bgMusicPlay(false)
          playPauseIcon.classList.replace('icofont-ui-pause', 'icofont-music-alt');
        }
      })
    }

    const envelopeSection = qselect('#sectionEnvelope')
    const envelopeBtn = qselect('#closeEnvelope')

    if (envelopeSection) {
      envelopeSection.scrollIntoView();
    }

    if (envelopeBtn) {
      envelopeBtn.addEventListener("click", (event) => {
        envelopeSection.style.transform = "translateY(-100%)";
        getBody.style.overflowY = "auto"
        bgMusicPlay()
      })
    } else {
      getBody.style.overflowY = "auto"
      bgMusicPlay()
    }

    // $(document).scroll(function() {
    //   $('.navbar').toggleClass('scrolled', $(this).scrollTop() > $('.navbar').height())
    // });
    var previousScroll = 70;
    $(window).scroll(function (e) {

      // add/remove class to navbar when scrolling to hide/show
      var scroll = $(window).scrollTop();
      if (scroll >= previousScroll) {
        $('nav').addClass("navbar-hide");
      } else if (scroll < previousScroll) {
        $('nav').removeClass("navbar-hide");
        $('nav').addClass("scrolled");
      }

      if (scroll == 0) {
        $('nav').removeClass("navbar-hide");
        $('nav').removeClass("scrolled");
      }
      previousScroll = scroll;
    });
    // var previousScroll = 70;
    // $(window).scroll(function(e) {
    //
    //   // add/remove class to navbar when scrolling to hide/show
    //   var scroll = $(window).scrollTop();
    //   if (scroll >= previousScroll) {
    //       $('nav').addClass("navbar-hide");
    //   }else if (scroll < previousScroll) {
    //       $('nav').removeClass("navbar-hide");
    //       $('nav').addClass("scrolled");
    //   }
    //
    //   if(scroll == 0){
    //       $('nav').removeClass("navbar-hide");
    //       $('nav').removeClass("scrolled");
    //   }
    //   previousScroll = scroll;
    // });
  }
};

// hide and show name, email, address form if anonymous checked
$("#anonymous_angpao").click(function () {
  if ($(this).is(':checked')) {
    $('#name_angpao').prop('required', false);
    $('#email_angpao').prop('required', false);
    $('#address_angpao').prop('required', false);
    $('#name_angpao_wrapper').hide('500');
    $('#email_angpao_wrapper').hide('500');
    $('#address_angpao_wrapper').hide('500');
  } else {
    $('#name_angpao').prop('required', true);
    $('#email_angpao').prop('required', true);
    $('#address_angpao').prop('required', true);
    $('#name_angpao_wrapper').show('500');
    $('#email_angpao_wrapper').show('500');
    $('#address_angpao_wrapper').show('500');
  }

  AOS.refresh();
});
// end hide and show name, email, address form if anonymous checked

$('iframe, img').on('load', function () {
  AOS.refresh();
  console.log('AOS Refreshed');
});

$(window).on('resize', function () {
  console.log('Window Resized');
  setTimeout(function () {
    AOS.refresh();
  }, 1000);
});

const parseDateString = (dateString) => {
  let matchers = [];
  matchers.push(/^[0-9]*$/.source);
  matchers.push(/([0-9]{1,2}\/){2}[0-9]{4}( [0-9]{1,2}(:[0-9]{2}){2})?/.source);
  matchers.push(/[0-9]{4}([\/\-][0-9]{1,2}){2}( [0-9]{1,2}(:[0-9]{2}){2})?/.source);
  matchers = new RegExp(matchers.join("|"));
  if (dateString instanceof Date) {
    return dateString;
  }
  if (String(dateString).match(matchers)) {
    if (String(dateString).match(/^[0-9]*$/)) {
      dateString = Number(dateString);
    }
    if (String(dateString).match(/\-/)) {
      dateString = String(dateString).replace(/\-/g, "/");
    }
    return new Date(dateString);
  } else {
    throw new Error("Couldn't cast `" + dateString + "` to a date object.");
  }
}

const newYear = () => {
  const now = new Date().getTime();
  gap = countDate - now;

  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const d = Math.floor(gap / (day));
  const h = Math.floor((gap % (day)) / (hour));
  const m = Math.floor((gap % (hour)) / (minute));
  const s = Math.floor((gap % (minute)) / second);

  if (d >= 0)
    qselect('#day').innerText = d;
  else
    qselect('#day').innerText = '0';
  if (h >= 0)
    qselect('#hour').innerText = h;
  else
    qselect('#hour').innerText = '0';
  if (m >= 0)
    qselect('#minute').innerText = m;
  else
    qselect('#minute').innerText = '0';
  if (s >= 0)
    qselect('#second').innerText = s;
  else
    qselect('#second').innerText = '0';
}

document.addEventListener("DOMContentLoaded", () => {

  const btnOpenAngpao = document.querySelector("#openAngpao")
  const formAngpao = document.querySelector("#formGift")

  if (btnOpenAngpao) {
    btnOpenAngpao.addEventListener('click', () => {
      formAngpao.classList.remove("d-none")
      btnOpenAngpao.classList.add("d-none")
      AOS.refresh()
    })
  }

  setInterval(() => {
    newYear();
  }, 1000);
})

$(document).ready(() => {
  if (document.querySelector(".zoom-gallery")) {
    $(".zoom-gallery").magnificPopup({
      delegate: "a",
      type: "image",
      mainClass: "mfp-with-zoom mfp-img-mobile",
      gallery: {
        enabled: true,
      },
      zoom: {
        enabled: true,
        easing: "ease-in-out",
      },
    });
  }
});

$('.translate-btn').on('click', function () {
  lang = $(this).data('lang');
  changeLanguageByButtonClick(lang);
});

function googleTranslateElementInit() {
  new google.translate.TranslateElement({ pageLanguage: 'viding' }, 'google_translate_element');
}

function changeLanguageByButtonClick(lang) {
  // var language = document.getElementById("language").value;
  var selectField = document.querySelector("#google_translate_element select");
  for (var i = 0; i < selectField.children.length; i++) {
    var option = selectField.children[i];
    // find desired langauge and change the former language of the hidden selection-field
    if (option.value == lang) {
      selectField.selectedIndex = i;
      // trigger change event afterwards to make google-lib translate this side
      selectField.dispatchEvent(new Event('change'));
      break;
    }
  }
}

function reset_translation() {
  $('.goog-te-banner-frame').contents().find('#\\:1\\.restore').click();
}

$(document).ready(() => {
  const galleryDefault = document.querySelector(".default-gallery")
  if (galleryDefault) {
    const splide = new Splide(galleryDefault, {
      // type: "loop",
      perPage: 3,
      pagination: false,
      gap: '.75rem',
      perMove: 1,
      focus: 'center',
      breakpoints: {
        576: {
          perPage: 1,
        }
      }
    });
    splide.mount();
  }

  $("#zoom-gallery").magnificPopup({
    delegate: "li a",
    type: "image",
    mainClass: "mfp-with-zoom mfp-img-mobile",
    fixedContentPos: false,
    gallery: {
      enabled: true,
    },
    zoom: {
      enabled: true,
      easing: "ease-in-out",
    },
  });
});