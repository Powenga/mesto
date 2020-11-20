import {changeInputText} from '../popup/__input/popup__input.js';
const popupNode = document.querySelector('.popup');

export function togglePopup (event) {
  event.preventDefault();
  popupNode.classList.toggle('visible');
  changeInputText();
}


