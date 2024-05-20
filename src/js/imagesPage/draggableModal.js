export class DraggableModal {
  constructor({ className, event, onClick }) {
    this.close = this.close.bind(this)
    this.dragElement = this.dragElement.bind(this)
    this.onClick = onClick
    this.imageIndex = event.target.closest(className).dataset.imageIndex

    this.initialize(event)
  }

  initialize(event) {
    this.modal = document.createElement('div')
    this.modal.classList.add('draggable-modal')

    this.modal.style.top = (Math.random() * window.innerHeight) / 2 + 'px'
    this.modal.style.left = (Math.random() * window.innerWidth) / 2 + 'px'

    this.modal.innerHTML = `
      <div class='draggable-modal__toolbar'>
        <button class='draggable-modal__close-button'>X</button>
      </div>
      <img class='modal-image-preview'
      src='${event.target.src.replace('300w', '600w')}' alt='modal_image'>
    `

    this.closeButton = this.modal.querySelector(
      '.draggable-modal__close-button',
    )
    this.closeButton.addEventListener('click', this.close)

    this.modal
      .querySelector('.modal-image-preview')
      .addEventListener('click', () => this.onClick(this.imageIndex))

    this.dragElement(this.modal)
    document.body.appendChild(this.modal)
  }

  close() {
    this.closeButton.removeEventListener('click', this.close)
    this.modal.remove()
  }

  dragElement(el) {
    let positions = [0, 0, 0, 0]

    if (el) {
      el.onmousedown = dragMouseDown
    }

    function dragMouseDown(e) {
      e.preventDefault()

      positions[2] = e.clientX
      positions[3] = e.clientY
      document.onmouseup = closeDragElement
      document.onmousemove = elementDrag
    }

    function elementDrag(e) {
      e.preventDefault()

      positions[0] = positions[2] - e.clientX
      positions[1] = positions[3] - e.clientY
      positions[2] = e.clientX
      positions[3] = e.clientY
      el.style.top = el.offsetTop - positions[1] + 'px'
      el.style.left = el.offsetLeft - positions[0] + 'px'
    }

    function closeDragElement() {
      document.onmouseup = null
      document.onmousemove = null
    }
  }
}
