import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor({popupSelector}){
    super({popupSelector});
    this.image = this._popupElement.querySelector('.popup__image');
    this.title = this._popupElement.querySelector('.popup__figcaption');
  }
  open(imageData){
    this.image.src = imageData.src;
    this.title.textContent = imageData.title;
    super.open();
  }
}
