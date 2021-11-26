import { Controller } from '@hotwired/stimulus'
import { Turbo } from '@hotwired/turbo-rails'

export default class extends Controller {
  connect() {
    if (window.previousPageWasAPaneStartPage) {
      document.removeEventListener('turbo:before-render', disableTurboScroll)
      document.removeEventListener('turbo:render', pageRendered)
    }

    document.addEventListener('turbo:visit', fetchRequested)
    document.addEventListener('turbo:before-render', disableTurboScroll)
    document.addEventListener('turbo:render', pageRendered)
  }

  disconnect() {
    document.removeEventListener('turbo:visit', fetchRequested)
  }
}

function fetchRequested() {
  window.previousPageWasAPaneStartPage = true
  window.paneStartPageScrollY = window.scrollY
}

function disableTurboScroll() {
  if (!window.previousPageWasAPaneStartPage)
    Turbo.navigator.currentVisit.scrolled = true
}

function pageRendered() {
  if (window.previousPageWasAPaneStartPage) window.paneStartPageScrollY = null
  if (window.paneStartPageScrollY)
    window.scrollTo(0, window.paneStartPageScrollY)
}
