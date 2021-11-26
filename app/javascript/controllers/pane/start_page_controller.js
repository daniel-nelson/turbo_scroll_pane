import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  connect() {
    if (window.previousPageWasAPaneStartPage) {
      document.removeEventListener('turbo:render', pageRendered)
    }

    document.addEventListener('turbo:visit', fetchRequested)
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

function pageRendered() {
  if (window.previousPageWasAPaneStartPage) window.paneStartPageScrollY = null
  if (window.paneStartPageScrollY)
    window.scrollTo(0, window.paneStartPageScrollY)
}
