export const debounce = (callback, delay) => {
  let timeout
  return function (e) {
    timeout && clearTimeout(timeout)
    timeout = setTimeout(function () {
      callback(e)
    }, delay)
  }
}

export class Autocomplete {
  constructor({ className, projects, resetFilter, callback }) {
    this.projects = projects
    this.className = className
    this.projectOptions = projects.map(p => p.title)

    this.resetFilter = resetFilter
    this.callback = callback
    this.formElement = document.querySelector(className)
    this.autocompleteElement = document.querySelector(
      `${className} .search-form__autocomplete`,
    )
    this.searchInputElement = this.formElement.querySelector(
      `${className} .search-form__input`,
    )

    this.initialize()
  }

  initialize = () => {
    this.searchInputElement.addEventListener('input', this.debouncedSearch)

    this.formElement.addEventListener('submit', event => {
      event.preventDefault()
    })

    this.autocompleteElement.addEventListener('click', event => {
      if (event.target.classList.contains('autocomplete-list__item')) {
        this.searchInputElement.value = event.target.dataset.value
        this.hide()
        this.callback(event.target.dataset.value)
      }
    })
  }

  show = () => {
    this.autocompleteElement.classList.remove('search-form__autocomplete--hidden')
  }

  hide = () => {
    this.autocompleteElement.classList.add('search-form__autocomplete--hidden')
  }

  getMatches = value =>
    this.projects.filter(project =>
      project.title.toLowerCase().includes(value.toLowerCase()),
    )

  onSearch = event => {
    const value = event.target.value.toLowerCase()

    if (value.trim() === '') {
      this.hide()
      this.resetFilter()

      return
    }

    const matches = this.getMatches(value)

    if (matches?.length > 0) {
      this.renderResults(matches)
      this.show()
    } else {
      this.hide()
    }
  }

  debouncedSearch = debounce(this.onSearch, 250)

  renderResults = matches => {
    const innerHTML =
      matches.length > 0
        ? `
      <ul class='autocomplete-list'>
        ${matches.map(match => `<li class='autocomplete-list__item' data-value='${match.title}'>${match.title}</li>`).join('')}
      </ul>
    `
        : `
      <ul class='autocomplete-list'>
        <li class='autocomplete-list__item'>
          Nothing found
        </li>
      </ul>`

    this.autocompleteElement.innerHTML = innerHTML
  }
}
