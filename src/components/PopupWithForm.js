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

  setInputValues(data){
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._formValues = data;
    this._inputList.forEach(input => {
      input.value = this._formValues[input.name];
    });
    return this._formValues;
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners(){
    super.setEventListeners();
    this._form = this._popupElement.querySelector('.popup__form');
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    })
  }
}
