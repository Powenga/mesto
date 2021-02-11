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

//Document forms for validation
const popupAddform = document.forms['add-card'];
const popupEditform = document.forms['edit-profile'];

//funtions
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


//get user info
api.getUserInfo()
  .then(data => {
    userInfo.setUserInfo(data);
    userInfo.setUserAvatar(data);
  })
  .catch((err) => {
    console.log(`Что-то пошло не так. Ошибка: ${err}`)
  })

let cardsList = '';


//get cards
api.getInitialCards()
  .then(cardItemList => {
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
    console.log(`Что-то пошло не так. Ошибка: ${err}`)
  });

const popupAddCard = new PopupWithForm({
  popupSelector: '.popup_type_add-card',
  handleFormSubmit: (formData) => {
    const {title:name, link} = formData;
    api.addCard({ name, link })
      .then(newCard => {
        const {name:title, link, likes, _id:id, owner} = newCard;
        const cardElement = generateCard({title, link, likes, id, owner});
        cardsList.addItem(cardElement);
      })
      .catch(err => {
        console.log(`Что-то пошло не так. Ошибка: ${err}`)
      })
  }
});

const popupRemoveCard = new PopupWithForm({
  popupSelector: '.popup_type_remove-card',
  handleFormSubmit: (formData) => {
    const { cardId: cardId } = formData;
    api.removeCard({cardId})
      .then(() => {
        popupRemoveCard.removedCard.remove();
      })
      .catch(err => {
        //тут логика ошибки, если карточка не удалилась с сервера
        console.log(`Что-то пошло не так. Ошибка: ${err}`)
      });
  }
});

const popupEditProfile = new PopupWithForm({
  popupSelector: '.popup_type_edit-profile',
  handleFormSubmit: (formData) => {
    const { userName: name, userAbout: about } = formData;
    api.editProfile({ name, about })
      .then(data => {
        userInfo.setUserInfo(data);
      })
      .catch(err => {
        console.log(`Что-то пошло не так. Ошибка: ${err}`)
      });
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



