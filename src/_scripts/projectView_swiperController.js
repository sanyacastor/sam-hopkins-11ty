class projectView_swiperController {
  constructor(window_controller_instance, photoslot_id, photocaption_id) {
    this.window_controller = window_controller_instance;
    this.photoslot = document.getElementById(photoslot_id);
    this.photocaption = document.getElementById(photocaption_id);

    this.swiper = new Swiper(".mySwiper", {
      slidesPerView: 1,
      pagination: {
        el: ".swiper-pagination",
        type: "custom"
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      },
      onSlideChangeEnd: function(swiper){
        console.log("slide changed");
      }                
    });


    this.swiper.on('slideChange', () => {
      this.update_image_swiper_and_caption(); //Uncaught TypeError: this.update_image_swiper_and_caption is not a function
    });
  }

  update_image_swiper_and_caption = () => {
    if (this.swiper.slides.kength == 0
        || this.window_controller.isMobileVersion() == true) {

          this.photoslot.style.display = 'none';
          this.photocaption.style.display = 'none';
          return;

    } else {
      this.photoslot.style.display = 'block';
      this.photocaption.style.display = 'block';
    }

    let active_slide = this.swiper.slides[this.swiper.activeIndex];
    if (active_slide) { //!!!! is it the right way to check if active_slide is not null?
      let caption_text = active_slide.getAttribute('caption');
      this.photocaption.innerHTML = caption_text;
    } else {
      this.photocaption.innerHTML = '';
    }
  }

  swipt_image_to_fraction(fraction) { //!!!!PELIGRO!!! check if this is fraction or percent
    let nSlides = this.swiper.slides.length;

    if (nSlides == 0)
      return;

    let target_index = parseInt(nSlides * fraction);

    this.swiper.slideTo(target_index);
  }

  canSwipe(direction) {
    if(direction < 0) { //forward
      if(this.swiper.activeIndex < this.swiper.slides.length - 1)
        return true;
    } else { //backward
      if(this.swiper.activeIndex > 0)
        return true;
    }

    return false;
  }
}