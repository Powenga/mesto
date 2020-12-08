let popupNode = document.querySelector('.popup');
let profileEditBtnNode = document.querySelector('.profile__edit-btn');
let profileNameNode = document.querySelector('.profile__name');
let profileStatusNode = document.querySelector('.profile__status');
let popupInputNameNode  = document.querySelector('.popup__input_type_name');
let popupInputStatusNode  = document.querySelector('.popup__input_type_status');
let popupCloseBtnNode = document.querySelector('.popup__close-btn');
let popupSubmitBtnNode = document.querySelector('.popup__submit-btn');

const templateCard = document.querySelector('#template-card').content;
const placesGridNode = document.querySelector('.places__grid');
const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
      alt: 'Горы Архыза'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
      alt: 'Река в Челябинской области'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
      alt: 'Многоэтажные дома в Иваново'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
      alt: 'Камчатчкие сопки'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
      alt: 'Железная дорога в Архангельской области'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
      alt: 'Скалистый берег Байкала'
  }
];

function togglePopup (event) {
  event.preventDefault();
  popupNode.classList.toggle('popup_visible');
}

function changeInputText() {
  popupInputNameNode.value = profileNameNode.textContent;
  popupInputStatusNode.value = profileStatusNode.textContent;
}

function changeProfileInfo (event) {
  event.preventDefault();
  profileNameNode.textContent = popupInputNameNode.value;
  profileStatusNode.textContent = popupInputStatusNode.value;
  togglePopup(event);
}

popupCloseBtnNode.addEventListener('click', togglePopup);

profileEditBtnNode.addEventListener('click', togglePopup);
profileEditBtnNode.addEventListener('click', changeInputText);

popupSubmitBtnNode.addEventListener('click', changeProfileInfo);

initialCards.map(elem => {
  let card = templateCard.cloneNode(true);
  card.querySelector('.card__img').src = elem.link;
  card.querySelector('.card__img').alt = elem.alt;
  card.querySelector('.card__title').textContent = elem.name;
  placesGridNode.append(card);
})
