import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor({popupSelector, handleFormSubmit}) {
    super({popupSelector});
    this._handleFormSubmit = handleFormSubmit;
  }
  _getInputValues(){
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }
  close() {
    this._popupElement.classList.remove('popup_visible');
    document.removeEventListener('keydown', this._handleEscCloseBinded);
    this._form.reset();
  }
  _setEventListeners(){
    this._popupElement.addEventListener('click', (evt) => {
      if(evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-btn')) {
        this.close();
      }
    });
    this._form = this._popupElement.querySelector('.popup__form');
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault;
      this._handleFormSubmit(this._getInputValues());
      this.close();
    })
  }
}
