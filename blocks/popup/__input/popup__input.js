import {profileNameNode} from '../../profile/__name/profile__name.js';
import {profileStatusNode} from '../../profile/__status/profile__status.js';

export const popupInputNodes  = [...document.querySelectorAll('.popup__input')];

let profileInfo = [];
profileInfo.push(profileNameNode);
profileInfo.push(profileStatusNode);

export function changeInputText() {
  console.log(profileInfo);
  popupInputNodes.forEach((elem, i = 0) => {
    elem.value = profileInfo[i].textContent;
    i++;
  })
}




