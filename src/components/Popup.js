export default class Popup {
  constructor({popupSelector}) {
    this._popupElement = document.querySelector(popupSelector);
    this.setEventListeners();
    this._handleEscCloseBinded = this._handleEscClose.bind(this);
  }
  open() {
    this._popupElement.classList.add('popup_visible');
    document.addEventListener('keydown', this._handleEscCloseBinded);
  }
  close() {
    this._popupElement.classList.remove('popup_visible');
    document.removeEventListener('keydown', this._handleEscCloseBinded);
  }
  _handleEscClose(evt) {
    if(evt.key === 'Escape') {
      this.close();
    }
  }
  setEventListeners() {
    this._popupElement.addEventListener('click', (evt) => {
      if(evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-btn')) {
        this.close();
      }
    });
  }
}
