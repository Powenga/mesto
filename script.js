
let profileEditBtnNode = document.querySelector('.profile__edit-btn');
let profileAddBtnNode = document.querySelector('.profile__add-btn');
let profileNameNode = document.querySelector('.profile__name');
let profileStatusNode = document.querySelector('.profile__status');

let popupNode = document.querySelector('.popup');
let popupTitleNode = document.querySelector('.popup__title');
let popupInputMainNode  = document.querySelector('.popup__input_type_main');
let popupInputContentNode  = document.querySelector('.popup__input_type_content');
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

function openPopup (event) {
  event.preventDefault();
  if ([...event.target.classList].includes('btn_type_edit')){
    popupTitleNode.textContent = 'Редактировать профиль';
    changeInputText();
    popupInputMainNode.placeholder = 'Редактировать профиль';
    popupInputContentNode.type = 'text';
    popupInputContentNode.placeholder = 'Статус';
    popupSubmitBtnNode.classList.remove('popup__add-btn');
  } else {
    popupTitleNode.textContent = 'Новое место';
    popupInputMainNode.placeholder = 'Название';
    popupInputContentNode.placeholder = 'Ссылка на картинку';
    popupInputMainNode.value = '';
    popupInputContentNode.type = 'url';
    popupInputContentNode.value = '';
    popupSubmitBtnNode.classList.add('popup__add-btn');
  }
  popupNode.classList.add('popup_visible');
}

function closePopup (event) {
  popupNode.classList.remove('popup_visible');
}

function changeInputText() {
  popupInputMainNode.value = profileNameNode.textContent;
  popupInputContentNode.value = profileStatusNode.textContent;
}

function makeNewCard(cardData) {
  let card = templateCard.cloneNode(true);
  card.querySelector('.card__img').src = cardData.link;
  card.querySelector('.card__img').alt = cardData.alt;
  card.querySelector('.card__title').textContent = cardData.name;
  return card;
}

function submitPopup (event) {
  event.preventDefault();
  if ([...event.target.classList].includes('popup__add-btn')) {
    let cardData =
      {
        name: popupInputMainNode.value,
        link: popupInputContentNode.value,
        alt: popupInputMainNode.value
      };
    let card = makeNewCard(cardData);
    placesGridNode.prepend(card)
  } else {
    profileNameNode.textContent = popupInputMainNode.value;
    profileStatusNode.textContent = popupInputContentNode.value;
  }
  closePopup(event);
}

function likeCard(event) {
  event.target.classList.toggle('btn_status_liked');
}

function deleteCard(event) {
  event.target.parentElement.remove();
}

initialCards.forEach(elem => {
  let card = makeNewCard(elem);
  placesGridNode.append(card);
})

let likeBtnsNodes = document.querySelectorAll('.btn_type_like');
let trashBtnNodes = document.querySelectorAll('.btn_type_trash');

likeBtnsNodes.forEach(elem => {
  elem.addEventListener('click', likeCard);
});

trashBtnNodes.forEach(elem => {
  elem.addEventListener('click', deleteCard);
})


popupCloseBtnNode.addEventListener('click', closePopup);

profileEditBtnNode.addEventListener('click', openPopup);

profileAddBtnNode.addEventListener('click', openPopup);

popupSubmitBtnNode.addEventListener('click', submitPopup);
