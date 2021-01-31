import './index.css';

import {initialCards} from '../utils/constants.js';
import {formValidationData} from '../utils/constants.js';
import {resetRequiredFormNames} from '../utils/constants.js'
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';

const profileEditBtnNode = document.querySelector('.profile__edit-btn');
const profileAddBtnNode = document.querySelector('.profile__add-btn');

const profileNameNode = document.querySelector('.profile__name');
const profileStatusNode = document.querySelector('.profile__status');

//edit profile popup
const popupEditNode = document.querySelector('.popup_type_edit-profile');
const popupEditInputNameNode  = popupEditNode.querySelector('.popup__input_type_name');
const popupEditInputStatusNode  = popupEditNode.querySelector('.popup__input_type_status');

const cardContainerSelector = '.places__grid'

const formList = [...document.forms];

const popupAddCard = new PopupWithForm({
  popupSelector: '.popup_type_add-card',
  handleFormSubmit: (formData) => {
    const card = new Card({data:formData, handleCardClick: handleCardClick}, '#template-card');
    const cardElement = card.generateCard();
    carsList.addItem(cardElement);
  }
});

const popupEditProfile = new PopupWithForm({
  popupSelector: '.popup_type_edit-profile',
  handleFormSubmit: (formData) => {
    console.log('work');
  }
});

const popupWithImage = new PopupWithImage({
  popupSelector: '.popup_type_image'
});

function handleCardClick(imageData) {
  popupWithImage.open(imageData);
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
  popupAddCard.open();
});

//edit profile events
profileEditBtnNode.addEventListener('click', () => {
  popupEditInputNameNode.value = profileNameNode.textContent;
  popupEditInputStatusNode.value = profileStatusNode.textContent;
  resetRequiredFormValidators['edit-profile'].resetValidation();
  resetRequiredFormValidators['edit-profile'].enableValidation();
  popupEditProfile.open();
});



