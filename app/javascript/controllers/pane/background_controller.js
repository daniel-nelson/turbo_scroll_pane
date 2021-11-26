import { Controller } from '@hotwired/stimulus'
import { Turbo } from '@hotwired/turbo-rails'

export default class extends Controller {
  connect() {
    window.previousPageWasAPaneStartPage = false
    Turbo.navigator.currentVisit.scrolled = true
  }
}
