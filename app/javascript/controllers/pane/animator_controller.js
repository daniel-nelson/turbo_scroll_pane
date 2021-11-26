import { Controller } from '@hotwired/stimulus'
import { Turbo } from '@hotwired/turbo-rails'

const ANIMATION_DURATION = 250

// Hiding the elements caused us to lose scroll while animating the pane away
// (see app/javascript/turbo/controllers/pane/start_page_controller.js)
function scrollUndermain() {
  if (window.paneStartPageScrollY)
    window.scrollTo(0, window.paneStartPageScrollY)
}

function showAriaHiddenElements() {
  document
    .querySelectorAll('[aria-hidden]:not(.icon):not(.micromodal)')
    .forEach((element) => element.classList.remove('default-hidden'))
}

function hideAriaHiddenElements() {
  document
    .querySelectorAll('[aria-hidden]:not(.icon):not(.micromodal)')
    .forEach((element) => element.classList.add('default-hidden'))
}

export default class extends Controller {
  connect() {
    setTimeout(() => this.element.classList.add('slide-in'))

    this.hideTimeoutID = setTimeout(() => {
      hideAriaHiddenElements()
    }, ANIMATION_DURATION + 1000)
  }

  closePane(e) {
    e.preventDefault()
    this.closePaneAnimation(e)
    clearTimeout(this.hideTimeoutID)
    const href = e.target.closest('a').href
    setTimeout(() => Turbo.visit(href), ANIMATION_DURATION)
  }

  closePaneAnimation(e) {
    showAriaHiddenElements()
    scrollUndermain()
    this.element.classList.remove('slide-in')
    this.element.classList.add('slide-out')
  }
}
