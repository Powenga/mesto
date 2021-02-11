import './index.css';

//import {initialCards} from '../utils/constants.js';
import {formValidationData} from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

//buttons
const profileEditBtnNode = document.querySelector('.profile__edit-btn');
const profileAddBtnNode = document.querySelector('.profile__add-btn');

//edit profile popup
const popupEditNode = document.querySelector('.popup_type_edit-profile');
const popupEditInputNameNode  = popupEditNode.querySelector('.popup__input_type_name');
const popupEditInputStatusNode  = popupEditNode.querySelector('.popup__input_type_status');

//user data
const userAvatarNode = document.querySelector('.profile__avatar');

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
  userInfoSelector: '.profile__status',
  userAvatarSelector: '.profile__avatar'
});

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-20',
  headers: {
    authorization: 'aad15f24-a077-4b33-9695-f949d459f3da',
    'Content-Type': 'application/json'
  }
});

//user info
api.getUserInfo((data) => {
  userInfo.setUserInfo(data);
  userInfo.setUserAvatar(data);
});

const renderCards = (initialCards) => {
  let cardsList = new Section({
    data: initialCards,
    renderer: (cardItem) => {
      const {name:title, link} = cardItem;
      const card = new Card({ data: {title, link}, handleCardClick: handleCardClick }, cardTemplateSelector);
      const cardElement = card.generateCard();
      cardsList.addItem(cardElement);
    }
  },
    cardContainerSelector
  );

  cardsList.clearContainer();

  //render init cards
  cardsList.renderItems();
  cardsList = '';
}

api.getInitialCards(renderCards);

const popupAddCard = new PopupWithForm({
  popupSelector: '.popup_type_add-card',
  handleFormSubmit: (formData) => {
    const {title:name, link} = formData;
    //***Проверить работоспособность без передачи аргумента */
    api.addCard({name, link}, (data) => {api.getInitialCards(renderCards)})
  }
});

const popupEditProfile = new PopupWithForm({
  popupSelector: '.popup_type_edit-profile',
  handleFormSubmit: (formData) => {
    const {userName:name, userAbout:about} = formData;
    api.editProfile({name, about}, userInfo.setUserInfo);
  }
});

const popupWithImage = new PopupWithImage({
  popupSelector: '.popup_type_image'
});


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



