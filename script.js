let popupNode = document.querySelector('.popup');
let profileEditBtnNode = document.querySelector('.profile__edit-btn');
let profileNameNode = document.querySelector('.profile__name');
let profileStatusNode = document.querySelector('.profile__status');
let popupInputNameNode  = document.querySelector('.popup__input_type_name');
let popupInputStatusNode  = document.querySelector('.popup__input_type_status');
let popupCloseBtnNode = document.querySelector('.popup__close-btn');
let popupSubmitBtnNode = document.querySelector('.popup__submit-btn');

popupCloseBtnNode.addEventListener('click', togglePopup);
popupCloseBtnNode.addEventListener('click', changeInputText);

profileEditBtnNode.addEventListener('click', togglePopup);

popupSubmitBtnNode.addEventListener('click', changeProfileInfo);
popupSubmitBtnNode.addEventListener('click', togglePopup);

function togglePopup (event) {
  event.preventDefault();
  popupNode.classList.toggle('visible');
  changeInputText();
}

function changeInputText() {
  popupInputNameNode.value = profileNameNode.textContent;
  popupInputStatusNode.value = profileStatusNode.textContent;
}

function changeProfileInfo (event) {
  event.preventDefault();
  profileNameNode.textContent = popupInputNameNode.value;
  profileStatusNode.textContent = popupInputStatusNode.value;
}


