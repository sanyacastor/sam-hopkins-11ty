const TEMPLATE = `<div class='draggable-modal__toolbar'>
<button class='draggable-modal__close-button'>X</button>
</div><iframe
  width="560"
  height="315"
  src="https://www.youtube.com/embed/HASH_PLACEHOLDER"
  title="YouTube video player"
  frameborder="0"
  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
  referrerpolicy="strict-origin-when-cross-origin"
  allowfullscreen></iframe>
`

export class DraggableModal {
  constructor({ event, hash }) {
    this.hash = hash
    this.close = this.close.bind(this)

    this.initialize(event)
  }

  initialize() {
    this.modal = document.createElement('div')
    this.modal.classList.add('draggable-modal')
    this.modal.id = this.hash

    this.modal.style.top = (Math.random() * window.innerHeight) / 2 + 'px'
    this.modal.style.left = (Math.random() * window.innerWidth) / 2 + 'px'

    this.modal.innerHTML = TEMPLATE.replace('HASH_PLACEHOLDER', this.hash)

    this.closeButton = this.modal.querySelector(
      '.draggable-modal__close-button',
    )
    this.closeButton.addEventListener('click', this.close)

    document.body.appendChild(this.modal)
  }

  close() {
    this.closeButton.removeEventListener('click', this.close)
    this.modal.remove()
  }
}
