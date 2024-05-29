class projectView_imageProcessor {
  //!!!!Peligro!!! it must not be a class, it must be a function!!!!
  constructor(hscroll_id) {
    this.hscroll = document.getElementById(hscroll_id);

    let imgCollection = this.hscroll.getElementsByTagName('img');
    let images = [];
    
    for(let img of imgCollection){
      images.push({src: img.src, alt: img.alt, title: img.title, element: img});
    }

    this.add_captions_to_images(images);

    //!!!!PRLIGRO!!!projectView_swiperController_instance.swiper.update();
  }

  add_captions_to_images(img_collection) {
    for(let item of img_collection){
      item.element.insertAdjacentHTML('afterend', `<p class="projectView_imgCaptionMobile">${item.title}</p>`);
    }
  }
}