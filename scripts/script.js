
const profileEditBtnNode = document.querySelector('.profile__edit-btn');
const profileAddBtnNode = document.querySelector('.profile__add-btn');
const profileNameNode = document.querySelector('.profile__name');
const profileStatusNode = document.querySelector('.profile__status');
//edit profile popup
const popupEditNode = document.querySelector('.popup_type_edit-profile');
const popupEditTitleNode = popupEditNode.querySelector('.popup__title');
const popupEditInputNameNode  = popupEditNode.querySelector('.popup__input_type_name');
const popupEditInputStatusNode  = popupEditNode.querySelector('.popup__input_type_status');
const popupEditCloseBtnNode = popupEditNode.querySelector('.popup__close-btn');
const popupEditSubmitBtnNode = popupEditNode.querySelector('.popup__submit-btn');
const popupEditForm = popupEditNode.querySelector('.popup__form');
//add card popup
const popupAddNode = document.querySelector('.popup_type_add-card');
const popupAddTitleNode = popupAddNode.querySelector('.popup__title');
const popupAddInputTitleNode  = popupAddNode.querySelector('.popup__input_type_title');
const popupAddInputLinkNode  = popupAddNode.querySelector('.popup__input_type_url');
const popupAddCloseBtnNode = popupAddNode.querySelector('.popup__close-btn');
const popupAddSubmitBtnNode = popupAddNode.querySelector('.popup__submit-btn');
const popupAddForm = popupAddNode.querySelector('.popup__form');
//image popup
const imagePopupNode = document.querySelector('.popup_type_image');
const imagePopupCloseButtonNode= imagePopupNode.querySelector('.popup__close-btn');
const imagePopup = imagePopupNode.querySelector('.popup__image');
const imagePopupFigcaption = imagePopupNode.querySelector('.popup__figcaption');
//all popup
const popupNodeList = [popupEditNode, popupAddNode, imagePopupNode];

const templateCard = document.querySelector('#template-card').content;
const placesGridNode = document.querySelector('.places__grid');


function openPopup(popupNode) {
  popupNode.classList.add('popup_visible');
  document.addEventListener('keydown', keyboardHandler);
}

function closePopup (popupNode) {
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

function createNewCard(cardData) {
  const card = templateCard.cloneNode(true);
  const cardImage = card.querySelector('.card__img');
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  card.querySelector('.card__title').textContent = cardData.name;
  cardImage.addEventListener('click', (event) => {
    event.preventDefault();
    showCardImage(cardData.link, cardData.name);
  })
  card.querySelector('.card__trash-btn').addEventListener('click', (event) => {
    event.preventDefault();
    deleteCard(event.target.closest('.card'));
  });
  card.querySelector('.card__like-btn').addEventListener('click', (event) => {
    event.preventDefault();
    likeCard(event.target.closest('.card'));
  })
  return card;
}

function showCardImage(imageSrc, imageTitle) {
  imagePopup.src = imageSrc;
  imagePopup.alt = imageTitle;
  imagePopupFigcaption.textContent = imageTitle;
  openPopup(imagePopupNode);
}

function deleteCard(card) {
  card.remove();
}

function likeCard(card) {
  card.querySelector('.card__like-btn').classList.toggle('btn_status_liked');
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

function addCard(event) {
  event.preventDefault();
  const form = event.target;
  const cardData =
    {
      name: popupAddInputTitleNode.value,
      link: popupAddInputLinkNode.value,
    };
    const card = createNewCard(cardData);
    renderCard(card, placesGridNode);
    closePopup(popupAddNode);
    form.reset();
}

initialCards.forEach(elem => {
  renderCard(createNewCard(elem), placesGridNode);
});

profileEditBtnNode.addEventListener('click', (event) => {
  event.preventDefault();
  popupEditInputNameNode.value = profileNameNode.textContent;
  popupEditInputStatusNode.value = profileStatusNode.textContent;
  openPopup(popupEditNode);
});

profileAddBtnNode.addEventListener('click', (event) => {
  event.preventDefault();
  openPopup(popupAddNode);
});

popupEditCloseBtnNode.addEventListener('click', (event) => {
  event.preventDefault();
  closePopup(popupEditNode);
});

popupAddCloseBtnNode.addEventListener('click', (event) => {
  event.preventDefault();
  closePopup(popupAddNode);
});

imagePopupCloseButtonNode.addEventListener('click', (event) => {
  event.preventDefault();
  closePopup(imagePopupNode);
});

popupEditNode.addEventListener('click', (event) => {
  if(!event.target.closest('.popup__container')){
    closePopup(popupEditNode);
  }
});

popupAddNode.addEventListener('click', (event) => {
  if(!event.target.closest('.popup__container')){
    closePopup(popupAddNode);
  }
});

imagePopupNode.addEventListener('click', (event) => {
  if(!event.target.closest('.popup__container')){
    closePopup(imagePopupNode);
  }
});

popupEditForm.addEventListener('submit', (event) => {
  saveProfile(event);
});

popupAddForm.addEventListener('submit', (event) => {
  addCard(event);
});

