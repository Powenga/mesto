const profileEditBtnNode = document.querySelector('.profile__edit-btn');
const popupNode = document.querySelector('.popup');

const profileInfo = [];

profileInfo.push(document.querySelector('.profile__name'));
profileInfo.push(document.querySelector('.profile__status'));

const popupInputNodes  = [...document.querySelectorAll('.popup__input')];

profileEditBtnNode.addEventListener('click', togglePopup);

function togglePopup (event) {
  event.preventDefault();
  popupNode.classList.toggle('visible');

  popupInputNodes.forEach((elem, i = 0) => {
    elem.value = profileInfo[i].textContent;
    i++;
  })

}
