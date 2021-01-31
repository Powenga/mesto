import './index.css';

import {initialCards} from '../utils/constants.js';
import {formValidationData} from '../utils/constants.js';
import {resetRequiredFormNames} from '../utils/constants.js'
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage';

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

const cardContainerSelector = '.places__grid'

const formList = [...document.forms];

/**/
const popup = new Popup({
  popupSelector: '.popup_type_edit-profile'
});

const popupWithImage = new PopupWithImage({
  popupSelector: '.popup_type_image'
});

function handleCardClick(imageData) {
  popupWithImage.open(imageData);
}

function addCard(event) {
  event.preventDefault();
  const form = event.target;
  const cardData =
    {
      name: form.elements.title.value,
      link: form.elements.content.value,
    };
    const card = new Card({data:cardData, handleCardClick: handleCardClick}, '#template-card');
    const cardElement = card.generateCard();
    carsList.addItem(cardElement)
    closePopup(popupAddNode);
    form.reset();
}

function saveProfile(event) {
  event.preventDefault();
  profileNameNode.textContent = popupEditInputNameNode.value;
  profileStatusNode.textContent = popupEditInputStatusNode.value;
  closePopup(popupEditNode);
}

const carsList = new Section({
  data:initialCards,
  renderer: (cardItem) => {
      const card = new Card({data:cardItem, handleCardClick: handleCardClick}, '#template-card');
      const cardElement = card.generateCard();
      carsList.addItem(cardElement);
    }
  },
  cardContainerSelector
);

carsList.renderItems();

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
  popup.open()
});

popupEditForm.addEventListener('submit', (event) => {
  saveProfile(event);
});


