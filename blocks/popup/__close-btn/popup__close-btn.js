import {togglePopup} from '../../popup/popup.js';
const popupCloseBtnNode = document.querySelector('.popup__close-btn');

popupCloseBtnNode.addEventListener('click', togglePopup);
