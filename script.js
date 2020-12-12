
const profileEditBtnNode = document.querySelector('.profile__edit-btn');
const profileAddBtnNode = document.querySelector('.profile__add-btn');
const profileNameNode = document.querySelector('.profile__name');
const profileStatusNode = document.querySelector('.profile__status');

const popupNode = document.querySelector('.popup');
const popupTitleNode = popupNode.querySelector('.popup__title');
const popupInputMainNode  = popupNode.querySelector('.popup__input_type_main');
const popupInputContentNode  = popupNode.querySelector('.popup__input_type_content');
const popupCloseBtnNode = popupNode.querySelector('.popup__close-btn');
const popupSubmitBtnNode = popupNode.querySelector('.popup__submit-btn');

const imagePopupNode = document.querySelector('.page__image-popup');
const imagePopupCloseButtonNode= imagePopupNode.querySelector('.popup__close-btn');

const templateCard = document.querySelector('#template-card').content;
const placesGridNode = document.querySelector('.places__grid');


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
  event.target.parentElement.parentElement.classList.remove('popup_visible');
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

function openImagePopup(event) {
  let imageNode = event.target.previousElementSibling;
  let cardTitleNode = event.target.nextElementSibling.firstElementChild;
  imagePopupNode.classList.add('popup_visible');
  imagePopupNode.querySelector('.popup__image').src = imageNode.src;
  imagePopupNode.querySelector('.popup__image').alt = cardTitleNode.textContent;
  imagePopupNode.querySelector('.popup__figcaption').textContent = cardTitleNode.textContent;
}

function addButtonsListeners() {
  let likeBtnsNodes = document.querySelectorAll('.btn_type_like');
  let trashBtnNodes = document.querySelectorAll('.btn_type_trash');
  let cardImageHovers = document.querySelectorAll('.card__img-hover');

  trashBtnNodes.forEach(elem => {
    elem.addEventListener('click', deleteCard);
  })

  likeBtnsNodes.forEach(elem => {
    elem.addEventListener('click', likeCard);
  });

  cardImageHovers.forEach(elem => {
    elem.addEventListener('click', openImagePopup);
  });
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
    const card = makeNewCard(cardData);
    placesGridNode.prepend(card)
    addButtonsListeners();
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
  addButtonsListeners();
}


initialCards.forEach(elem => {
  let card = makeNewCard(elem);
  placesGridNode.append(card);
})

addButtonsListeners()

popupCloseBtnNode.addEventListener('click', closePopup);
imagePopupCloseButtonNode.addEventListener('click', closePopup);

profileEditBtnNode.addEventListener('click', openPopup);

profileAddBtnNode.addEventListener('click', openPopup);

popupSubmitBtnNode.addEventListener('click', submitPopup);
