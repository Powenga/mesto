import {profileNameNode} from '../../profile/__name/profile__name.js';
import {profileStatusNode} from '../../profile/__status/profile__status.js';
import {popupInputNodes} from '../../popup/__input/popup__input.js';
import {togglePopup} from '../../popup/popup.js';

const popupSubmitBtnNode = document.querySelector('.popup__submit-btn');

popupSubmitBtnNode.addEventListener('click', changeProfileInfo);
popupSubmitBtnNode.addEventListener('click', togglePopup);

let profileInfo = [];
  profileInfo.push(profileNameNode);
  profileInfo.push(profileStatusNode);

function changeProfileInfo (event) {
  event.preventDefault();
  popupInputNodes.forEach((elem, i = 0, val) => {
    val = elem.value;
    profileInfo[i].textContent= val;
    i++
  })
}
