class projectView_swiperFullscreen {
  constructor() {
    this.is_fullscreen = false;
    this.swiperElement = document.querySelector('.mySwiper');
    this.buttonClose = document.querySelector('.swiper-button-close');

    this.switch_fullscreen = () => {
      if (this.swiperElement.classList.contains("fullscreen")) {
        this.is_fullscreen = false;
        this.swiperElement.classList.remove("fullscreen");
        this.buttonClose.style.display = 'none';
      } else {
        this.is_fullscreen = true;
        this.swiperElement.classList.add("fullscreen");
        this.buttonClose.style.display = 'block';
      }
    };
  }

  subscribe_to_fullscreen = () => {
    if (this.swiperElement) {
      this.swiperElement.addEventListener('click', (event) => {
        /* ignore clicks ontop of the navigation buttons */
        if (event.target.classList.contains('swiper-button-next') || event.target.classList.contains('swiper-button-prev')) {
          return;
        }
        /* ignore clicks ontop of the navigation buttons */
        this.switch_fullscreen();
      });

      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
          this.swiperElement.classList.remove("fullscreen");
          this.buttonClose.style.display = 'none';
          this.is_fullscreen = false;
        }
      });
    }
  };
}