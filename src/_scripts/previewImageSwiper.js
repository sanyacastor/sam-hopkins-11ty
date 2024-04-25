class previewImageSwiper{
    constructor(classname_swiper, id_swiperWrapper){
      this.swiper =new Swiper(".mySwiper", {
                    slidesPerView: 2,
                    speed: 1000,
                    
                    autoplay: {
                      delay: 2000,
                      pauseOnMouseEnter: true,
                    },
                    pagination: {
                      el: ".swiper-pagination",
                      type: "progressbar",
                    },
                    navigation: {
                      nextEl: ".swiper-button-next",
                      prevEl: ".swiper-button-prev",
                    },
                  });
      
      this.swiperElement = document.getElementsByClassName(classname_swiper)[0];
      this.swiperWrapper = document.getElementById(id_swiperWrapper);
    }
    destructor(){
    }
    onLoad(){
      this.recalc();
    }
    recalc(){
      this.recalcSwiperImages();
    }

    slideNext(){
      this.swiper.slideNext();
    }
    slidePrev(){
      this.swiper.slidePrev();
    }

    recalcSwiperImages(){
      let boxWidth = this.swiperElement.offsetWidth;	

      if(boxWidth > 826){
        this.swiper.params.slidesPerView = 2;
        this.swiperWrapper.style.width = '826px';
      }
      else{
        this.swiper.params.slidesPerView = 1;
        this.swiperWrapper.style.width = '416px';
      }
    }
  }