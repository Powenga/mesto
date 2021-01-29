import './index.css';

import {initialCards} from '../utils/constants.js';
import {formValidationData} from '../utils/constants.js';
import {resetRequiredFormNames} from '../utils/constants.js'
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';

const profileEditBtnNode = document.querySelector('.profile__edit-btn');
const profileAddBtnNode = document.querySelector('.profile__add-btn');
const profileNameNode = document.querySelector('.profile__name');
const profileStatusNode = document.querySelector('.profile__status');

const popups = document.querySelectorAll('.popup')

//edit profile popup
const popupEditNode = document.querySelector('.popup_type_edit-profile');
const popupEditInputNameNode  = popupEditNode.querySelector('.popup__input_type_name');
const popupEditInputStatusNode  = popupEditNode.querySelector('.popup__input_type_status');
const popupEditForm = popupEditNode.querySelector('.popup__form');
//add card popup
const popupAddNode = document.querySelector('.popup_type_add-card');
const popupAddForm = popupAddNode.querySelector('.popup__form');
//image popup
const imagePopup  = document.querySelector('.popup_type_image');
const popUpImageNode = imagePopup.querySelector('.popup__image');
const popUpFigcaptionNode = imagePopup.querySelector('.popup__figcaption');

const placesGridNode = document.querySelector('.places__grid');

const formList = [...document.forms];

function handleCardClick(name, link) {
  openPopup(imagePopup);
  popUpImageNode.src = link;
  popUpFigcaptionNode.textContent = name;
}

function openPopup(popupNode) {
  popupNode.classList.add('popup_visible');
  document.addEventListener('keydown', keyboardHandler);
}

function closePopup(popupNode) {
  popupNode.classList.remove('popup_visible');
  document.removeEventListener('keydown', keyboardHandler);
}

function keyboardHandler(event){
  if(event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_visible')
    closePopup(openedPopup);
  }
}

function addCard(event) {
  event.preventDefault();
  const form = event.target;
  const cardData =
    {
      name: form.elements.title.value,
      link: form.elements.content.value,
    };
    const card = createCard(cardData);
    renderCard(card, placesGridNode);
    closePopup(popupAddNode);
    form.reset();
}

function createCard(cardData) {
  const card = new Card(cardData, '#template-card', handleCardClick);
  return card.generateCard();
}

function renderCard(card, container) {
  container.prepend(card);
}

function saveProfile(event) {
  event.preventDefault();
  profileNameNode.textContent = popupEditInputNameNode.value;
  profileStatusNode.textContent = popupEditInputStatusNode.value;
  closePopup(popupEditNode);
}

initialCards.forEach(elem => {
  const card = createCard(elem);
  renderCard(card, placesGridNode);
});

//Создаем валидаторы для всех возможных форм на странице
//Формы, которые требуют очистки сообщений, собираем в объект
const resetRequiredFormValidators = formList.reduce((object, form) => {
  const validator = new FormValidator(formValidationData, form);
  if(resetRequiredFormNames.includes(form.name)) {
    object[form.name] = validator;
    return object;
  } else {
    validator.enableValidation();
  }
}, {})

popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-btn')) {
      closePopup(popup);
    }
  })
})

//add card events
profileAddBtnNode.addEventListener('click', () => {
  resetRequiredFormValidators['add-card'].resetValidation();
  resetRequiredFormValidators['add-card'].enableValidation();
  openPopup(popupAddNode);
});

popupAddForm.addEventListener('submit', (event) => {
  addCard(event);
});

//edit profile events
profileEditBtnNode.addEventListener('click', () => {
  popupEditInputNameNode.value = profileNameNode.textContent;
  popupEditInputStatusNode.value = profileStatusNode.textContent;
  resetRequiredFormValidators['edit-profile'].resetValidation();
  resetRequiredFormValidators['edit-profile'].enableValidation();
  openPopup(popupEditNode);
});

popupEditForm.addEventListener('submit', (event) => {
  saveProfile(event);
});


