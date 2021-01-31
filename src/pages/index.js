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
const popupAddform = document.forms['add-card'];
const popupEditform = document.forms['edit-profile'];

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

//validators
const addFormValidator = new FormValidator(formValidationData, popupAddform);
addFormValidator.enableValidation();
const editFormValidator = new FormValidator(formValidationData, popupEditform);
editFormValidator.enableValidation();

//add card events
profileAddBtnNode.addEventListener('click', () => {
  addFormValidator.resetValidation();
  popupAddCard.open();
});

//edit profile events
profileEditBtnNode.addEventListener('click', () => {
  const userInfoData = userInfo.getUserInfo();
  popupEditInputNameNode.value = userInfoData.userName;
  popupEditInputStatusNode.value = userInfoData.userInfo;
  editFormValidator.resetValidation();
  popupEditProfile.open();
});



