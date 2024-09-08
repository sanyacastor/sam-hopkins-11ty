export class DraggableModal {
  constructor({ event, className, onClick }) {
    this.onClick = onClick
    this.close = this.close.bind(this)
    this.imageIndex = event.target.closest(className).dataset.imageIndex

    this.initialize(event)
  }

  initialize(event) {
    this.modal = document.createElement('div')
    this.modal.classList.add('draggable-modal')

    this.modal.style.top = (Math.random() * window.innerHeight) / 2 + 'px'
    this.modal.style.left = (Math.random() * window.innerWidth) / 2 + 'px'

    const title = event.target.parentElement.parentElement.dataset.title
    const slug = event.target.parentElement.parentElement.dataset.slug

    this.modal.innerHTML = `
      <div class='draggable-modal__toolbar'>
        <a href="/projects/${slug}" target='_blank' class='draggable-modal__link'>${title}</a>
        <button class='draggable-modal__close-button'>X</button>
      </div>
      <img class='modal-image-preview'
      src='${event.target.src}' alt='modal_image'>
    `

    this.closeButton = this.modal.querySelector(
      '.draggable-modal__close-button',
    )

    this.toolbar = this.modal.querySelector('.draggable-modal__toolbar')

    this.closeButton.addEventListener('click', this.close)

    this.modal
      .querySelector('.modal-image-preview')
      .addEventListener('click', () => this.onClick(this.imageIndex))

    document.body.appendChild(this.modal)
  }

  close() {
    this.closeButton.removeEventListener('click', this.close)
    this.modal.remove()
  }
}
