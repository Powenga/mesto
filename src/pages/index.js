import './index.css';

import {formValidationData} from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithText from '../components/PopupWithText.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import ErrorNotification from '../components/ErrorNotification.js';

//buttons
const profileEditBtnNode = document.querySelector('.profile__edit-btn');
const profileAddBtnNode = document.querySelector('.profile__add-btn');

//profile
const profileAvatarContainerNode = document.querySelector('.profile__avatar-container');
const profileNode = document.querySelector('.profile');

//edit profile popup
const popupEditNode = document.querySelector('.popup_type_edit-profile');
const popupEditInputNameNode  = popupEditNode.querySelector('.popup__input_type_name');
const popupEditInputStatusNode  = popupEditNode.querySelector('.popup__input_type_status');

//selectors
const cardContainerSelector = '.places__grid'
const cardTemplateSelector = '#template-card';

//document forms for validation
const popupAddForm = document.forms['add-card'];
const popupEditForm = document.forms['edit-profile'];
const popupAvatarForm = document.forms['edit-avatar'];

//functions
function handleCardClick(imageData) {
  popupWithImage.open(imageData);
}

function handleTrashClick({id, removedCard}) {
  popupRemoveCard.setInputValues({cardId:id});
  popupRemoveCard.removedCard = removedCard;
  popupRemoveCard.open();
}

function handleLikeClick({like, cardId}) {
  let method = 'DELETE';
  if(like) {
    method = 'PUT';
  }
  api.likeCard(cardId, method);
}

function generateCard (cardItem) {
  const card = new Card({
    data: cardItem,
    handleCardClick: handleCardClick,
    handleTrashClick: handleTrashClick,
    handleLikeClick: handleLikeClick
  }, cardTemplateSelector);
    return card.generateCard();
}

function handleErrorClick(evt, {title, err}) {
  evt.stopPropagation();
  const text = `Ошибка: ${err}. Пожалуйста, повторите попытку позже`
  popupError.open({title, text})
}

function renderErrorNotification(title) {
  return new ErrorNotification({
    data: {
      title: title,
    },
    handleClick: handleErrorClick
  }, '#template-error-notification');
}

const errorUserInfo = renderErrorNotification('Не удалось загрузить данные пользователя');
errorUserInfo.setContainer(profileNode);
const errorUserSetInfo = renderErrorNotification('Не удалось сохранить данные пользователя');
errorUserSetInfo.setContainer(document.querySelector('.profile__info'));
const errorInitCard = renderErrorNotification('Не удалось загрузить карточки');
errorInitCard.setContainer(document.querySelector(cardContainerSelector));
const errorAddCard = renderErrorNotification('Не удалось добавить новое место');
errorAddCard.setContainer(profileAddBtnNode);
const errorSetAvatar = renderErrorNotification('Не удалось сохранить аватар');
errorSetAvatar.setContainer(profileNode);
const errorRemoveCard = renderErrorNotification('Не удалось удалить карточку');


//Classes instances
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

//initial user and card data
api.getUserInfo()
  .then(data => {
    errorUserInfo.hide();
    userInfo.setUserInfo(data);
    userInfo.setUserAvatar(data);
  })
  .catch((err) => {
    errorUserInfo.setErrorType(err);
    errorUserInfo.show();
  })

let cardsList = '';

api.getInitialCards()
  .then(cardItemList => {
    errorInitCard.hide();
    cardsList = new Section({
      data: cardItemList,
      renderer: (cardItem) => {
        const {name:title, link, likes, _id:id, owner} = cardItem;
        const userId = userInfo.userId;
        const cardElement = generateCard({title, link, likes, id, owner, userId});
        cardsList.addItem(cardElement);
      }
    },
      cardContainerSelector
    );
    //render init cards
    cardsList.renderItems();
  })
  .catch((err) => {
    errorInitCard.setErrorType(err);
    errorInitCard.show();
  });

//popup instances
const popupAddCard = new PopupWithForm({
  popupSelector: '.popup_type_add-card',
  handleFormSubmit: (formData) => {
    const {title:name, link} = formData;
    popupAddCard.startLoadAnimation('Сохранение');
    api.addCard({ name, link })
      .then(newCard => {
        errorAddCard.hide();
        const {name:title, link, likes, _id:id, owner} = newCard;
        const userId = userInfo.userId;
        const cardElement = generateCard({title, link, likes, id, owner, userId});
        cardsList.addItem(cardElement);
      })
      .catch(err => {
        errorAddCard.setErrorType(err);
        errorAddCard.show();

      })
      .finally(() => {
        popupAddCard.stopLoadAnimation();
        popupAddCard.close();
      })
  }
});

const popupRemoveCard = new PopupWithForm({
  popupSelector: '.popup_type_remove-card',
  handleFormSubmit: (formData) => {
    const { cardId: cardId } = formData;
    errorRemoveCard.setContainer(popupRemoveCard.removedCard);
    api.removeCard({cardId})
      .then(() => {
        errorRemoveCard.hide();
        popupRemoveCard.removedCard.remove();
      })
      .catch(err => {
        errorRemoveCard.setErrorType(err);
        errorRemoveCard.show();
      });
    popupRemoveCard.close();
  }
});

const popupEditProfile = new PopupWithForm({
  popupSelector: '.popup_type_edit-profile',
  handleFormSubmit: (formData) => {
    popupEditProfile.startLoadAnimation('Загрузка');
    const { userName: name, userAbout: about } = formData;
    api.editProfile({ name, about })
      .then(data => {
        errorUserSetInfo.hide();
        userInfo.setUserInfo(data);
      })
      .catch(err => {
        errorUserSetInfo.setErrorType(err);
        errorUserSetInfo.show();
      })
      .finally(() => {
        popupEditProfile.stopLoadAnimation();
        popupEditProfile.close();
      })
  }
});

const popupEditAvatar = new PopupWithForm({
  popupSelector: '.popup_type_edit-avatar',
  handleFormSubmit: (formData) => {
    popupEditAvatar.startLoadAnimation('Сохранение');
    const { link: avatar} = formData;
    api.editAvatar({ avatar })
      .then(data => {
        errorSetAvatar.hide();
        userInfo.setUserAvatar(data);
      })
      .catch(err => {
        errorSetAvatar.setErrorType(err);
        errorSetAvatar.show();
      })
      .finally(() => {
        popupEditAvatar.stopLoadAnimation();
        popupEditAvatar.close();
      })
  }
});

const popupWithImage = new PopupWithImage({
  popupSelector: '.popup_type_image'
});

const popupError = new PopupWithText({
  popupSelector: '.popup_type_error'
})

//validators
const addFormValidator = new FormValidator(formValidationData, popupAddForm);
addFormValidator.enableValidation();
const editFormValidator = new FormValidator(formValidationData, popupEditForm);
editFormValidator.enableValidation();
const editAvatarFormValidator = new FormValidator(formValidationData, popupAvatarForm)
editAvatarFormValidator.enableValidation();

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

//edit avatar event
profileAvatarContainerNode.addEventListener('click', () => {
  editAvatarFormValidator.resetValidation();
  popupEditAvatar.open();
})




