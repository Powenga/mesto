import {initialCards} from './data.js';
import {formValidationData} from './data.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';

const profileEditBtnNode = document.querySelector('.profile__edit-btn');
const profileAddBtnNode = document.querySelector('.profile__add-btn');
const profileNameNode = document.querySelector('.profile__name');
const profileStatusNode = document.querySelector('.profile__status');
//edit profile popup
const popupEditNode = document.querySelector('.popup_type_edit-profile');
const popupEditInputNameNode  = popupEditNode.querySelector('.popup__input_type_name');
const popupEditInputStatusNode  = popupEditNode.querySelector('.popup__input_type_status');
const popupEditCloseBtnNode = popupEditNode.querySelector('.popup__close-btn');
const popupEditForm = popupEditNode.querySelector('.popup__form');
//add card popup
const popupAddNode = document.querySelector('.popup_type_add-card');
const popupAddCloseBtnNode = popupAddNode.querySelector('.popup__close-btn');
const popupAddForm = popupAddNode.querySelector('.popup__form');

const popupNodeList = [popupEditNode, popupAddNode];

const placesGridNode = document.querySelector('.places__grid');

const formList = [...document.forms];

function openPopup(popupNode) {
  popupNode.classList.add('popup_visible');
  document.addEventListener('keydown', keyboardHandler);
  validators.forEach((validator) => {
    validator.enableValidation();
  });
}

function closePopup(popupNode) {
  popupNode.classList.remove('popup_visible');
  document.removeEventListener('keydown', keyboardHandler);
}

function keyboardHandler(event){
  if(event.key === 'Escape') {
    popupNodeList.forEach((popupNode) => {
      if(popupNode.classList.contains('popup_visible')) {
        closePopup(popupNode);
      }
    })
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
    const card = new Card(cardData, '#template-card')
    renderCard(card, placesGridNode);
    closePopup(popupAddNode);
    form.reset();
}

function renderCard(card, container) {
  const cardNode = card.generateCard();
  container.prepend(cardNode);
}

function saveProfile(event) {
  event.preventDefault();
  profileNameNode.textContent = popupEditInputNameNode.value;
  profileStatusNode.textContent = popupEditInputStatusNode.value;
  closePopup(popupEditNode);
}

initialCards.forEach(elem => {
  const card = new Card(elem, '#template-card');
  renderCard(card, placesGridNode);
});

const validators = formList.map(form => {
  const validator = new FormValidator(formValidationData, form);
  return validator;
});

//add card events
profileAddBtnNode.addEventListener('click', () => {
  openPopup(popupAddNode);
});

popupAddCloseBtnNode.addEventListener('click', () => {
  closePopup(popupAddNode);
});

popupAddNode.addEventListener('click', (evt) => {
  if(!evt.target.closest('.popup__container')) {
    closePopup(popupAddNode);
  }
});

popupAddForm.addEventListener('submit', (event) => {
  addCard(event);
});

//edit profile events
profileEditBtnNode.addEventListener('click', () => {
  popupEditInputNameNode.value = profileNameNode.textContent;
  popupEditInputStatusNode.value = profileStatusNode.textContent;
  openPopup(popupEditNode);
});

popupEditCloseBtnNode.addEventListener('click', () => {
  closePopup(popupEditNode);
});

popupEditNode.addEventListener('click', (event) => {
  if(!event.target.closest('.popup__container')){
    closePopup(popupEditNode);
  }
});

popupEditForm.addEventListener('submit', (event) => {
  saveProfile(event);
});


