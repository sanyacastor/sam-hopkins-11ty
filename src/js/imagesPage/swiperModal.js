export class SwiperModal {
  constructor({ className, swiper }) {
    this.swiper = swiper
    this.className = className
    this.close = this.close.bind(this)
    this.slideTo = this.slideTo.bind(this)

    this.initialize()
  }

  initialize() {
    this.swiperWrapper = document.querySelector('.swiper-wrapper')

    this.modalElement = document.querySelector(`.${this.className}`)
    this.closeButton = this.modalElement.querySelector('.close-button')
    this.closeButton.addEventListener('click', this.close)
  }

  update() {
    let newContent = ''

    const activeImages = document.querySelectorAll(
      '.images-list__item:not(.images-list__item--hidden)',
    )

    activeImages.forEach(element => {
      const pictureOuterHtml = element.querySelector('picture').outerHTML
      newContent += `<div class="slider-modal__slide swiper-slide">${pictureOuterHtml}</div>`
    })

    this.swiperWrapper.innerHTML = newContent
    this.swiper.update()
  }

  slideTo(index) {
    this.swiper.slideTo(index)
  }

  open() {
    this.modalElement.classList.remove(`${this.className}--hidden`)
  }

  close() {
    this.modalElement.classList.add(`${this.className}--hidden`)
  }

  destroy() {
    this.closeButton.removeEventListener('click', this.close)
  }
}
