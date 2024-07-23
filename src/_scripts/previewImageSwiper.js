class previewImageSwiper {
  constructor(classname_swiper, id_swiperWrapper) {
    this.swiper = new Swiper('.mySwiper', {
      slidesPerView: 2,
      speed: 350,
      loop: true,
      autoplay: {
        delay: 4000,
        pauseOnMouseEnter: true,
      },
      pagination: {
        el: '.swiper-pagination',
        type: 'custom',
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        1000: {
          slidesPerView: 2,
        },
      }
    })

    this.swiperElement = document.getElementsByClassName(classname_swiper)[0]
    this.swiperWrapper = document.getElementById(id_swiperWrapper)
  }
  destructor() {}

  slideNext() {
    this.swiper.slideNext()
  }
  slidePrev() {
    this.swiper.slidePrev()
  }


  switch_fullscreen() {
    let buttonClose = document.querySelector(".swiper-button-close");

    if(this.swiperElement.classList.contains("fullscreen")){
      this.fullscreen = false;

      this.swiperElement.classList.remove("fullscreen");
      buttonClose.style.display = "none";

      this.swiper.autoplay.start();
    } else {
      this.fullscreen = true;

      this.swiper.params.slidesPerView = 1;
      this.swiperElement.classList.add("fullscreen");
      buttonClose.style.display = "block";

      this.swiper.autoplay.stop();
    }
  }
}