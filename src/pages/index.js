import './index.css';

import {initialCards} from '../utils/constants.js';
import {formValidationData} from '../utils/constants.js';
import {resetRequiredFormNames} from '../utils/constants.js'
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

//buttons
const profileEditBtnNode = document.querySelector('.profile__edit-btn');
const profileAddBtnNode = document.querySelector('.profile__add-btn');

//edit profile popup
const popupEditNode = document.querySelector('.popup_type_edit-profile');
const popupEditInputNameNode  = popupEditNode.querySelector('.popup__input_type_name');
const popupEditInputStatusNode  = popupEditNode.querySelector('.popup__input_type_status');

//Selectors
const cardContainerSelector = '.places__grid'
const cardTemplateSelector = '#template-card';

//Document forms
const formList = [...document.forms];

//funtions
function handleCardClick(imageData) {
  popupWithImage.open(imageData);
}

const userInfo = new UserInfo({
  userNameSelector: '.profile__name',
  userInfoSelector: '.profile__status'
});

const popupAddCard = new PopupWithForm({
  popupSelector: '.popup_type_add-card',
  handleFormSubmit: (formData) => {
    const card = new Card({data: formData, handleCardClick: handleCardClick}, cardTemplateSelector);
    const cardElement = card.generateCard();
    carsList.addItem(cardElement);
  }
});

const popupEditProfile = new PopupWithForm({
  popupSelector: '.popup_type_edit-profile',
  handleFormSubmit: (formData) => {
    userInfo.setUserInfo(formData)
  }
});

const popupWithImage = new PopupWithImage({
  popupSelector: '.popup_type_image'
});

const carsList = new Section({
  data: initialCards,
  renderer: (cardItem) => {
      const card = new Card({data: cardItem, handleCardClick: handleCardClick}, cardTemplateSelector);
      const cardElement = card.generateCard();
      carsList.addItem(cardElement);
    }
  },
  cardContainerSelector
);

//render init cards
carsList.renderItems();

//create all form validators
//add forms requiring reset to object
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
  const userInfoData = userInfo.getUserInfo();
  popupEditInputNameNode.value = userInfoData.userName;
  popupEditInputStatusNode.value = userInfoData.userInfo;
  resetRequiredFormValidators['edit-profile'].resetValidation();
  resetRequiredFormValidators['edit-profile'].enableValidation();
  popupEditProfile.open();
});



