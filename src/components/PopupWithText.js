import Popup from './Popup.js';

export default class PopupWithText extends Popup {
  constructor({popupSelector}){
    super({popupSelector});
    this.title = this._popupElement.querySelector('.popup__title');
    this.text = this._popupElement.querySelector('.popup__text');
  }

  open({title, text}){
    this.title.textContent = title;
    this.text.textContent = text;
    super.open();
  }
}
