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
    })

    this.swiperElement = document.getElementsByClassName(classname_swiper)[0]
    this.swiperWrapper = document.getElementById(id_swiperWrapper)
  }
  destructor() {}
  onLoad(isMobileVerison) {
    this.recalc(isMobileVerison)
  }
  recalc(isMobileVerison) {
    this.recalcSwiperImages(isMobileVerison)
  }

  slideNext() {
    this.swiper.slideNext()
  }
  slidePrev() {
    this.swiper.slidePrev()
  }

  recalcSwiperImages(isMobileVerison) {
    if (typeof isMobileVerison === 'undefined')
      isMobileVerison = this.isMobileVerison;
    this.isMobileVerison = isMobileVerison;
    
    let boxWidth = this.swiperElement.offsetWidth

    if (isMobileVerison) {
      this.swiper.params.slidesPerView = 1
      this.swiperWrapper.style.width = window.innerWidth + 'px'
      return
    }

    if(this.fullscreen === true){
      this.swiper.params.slidesPerView = 1
      return;  
    }

    if (boxWidth > 526) {
      this.swiper.params.slidesPerView = 2
    } else {
      this.swiper.params.slidesPerView = 1
    }
  }

  switch_fullscreen() {
    let buttonClose = document.querySelector(".swiper-button-close");

    if(this.swiperElement.classList.contains("fullscreen")){
      this.fullscreen = false;

      this.swiperElement.classList.remove("fullscreen");
      buttonClose.style.display = "none";

      this.swiper.autoplay.start();
      this.recalcSwiperImages();
    } else {
      this.fullscreen = true;

      this.swiper.params.slidesPerView = 1;
      this.swiperElement.classList.add("fullscreen");
      buttonClose.style.display = "block";

      this.swiper.autoplay.stop();
    }
  }
}