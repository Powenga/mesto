
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
//add card popup
const popupAddNode = document.querySelector('.popup_type_add-card');
const popupAddTitleNode = popupAddNode.querySelector('.popup__title');
const popupAddInputTitleNode  = popupAddNode.querySelector('.popup__input_type_title');
const popupAddInputLinkNode  = popupAddNode.querySelector('.popup__input_type_url');
const popupAddCloseBtnNode = popupAddNode.querySelector('.popup__close-btn');
const popupAddSubmitBtnNode = popupAddNode.querySelector('.popup__submit-btn');
//image popup
const imagePopupNode = document.querySelector('.popup_type_image');
const imagePopupCloseButtonNode= imagePopupNode.querySelector('.popup__close-btn');


const templateCard = document.querySelector('#template-card').content;
const placesGridNode = document.querySelector('.places__grid');


function openPopup(popupNode) {
  popupNode.classList.add('popup_visible');
}

function closePopup (popupNode) {
  popupNode.classList.remove('popup_visible');
}

function changeInputText() {
  popupEditInputNameNode.value = profileNameNode.textContent;
  popupEditInputStatusNode.value = profileStatusNode.textContent;
}

function createNewCard(cardData) {
  const card = templateCard.cloneNode(true);
  const cardImage = card.querySelector('.card__img');
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  card.querySelector('.card__title').textContent = cardData.name;
  cardImage.addEventListener('click', (event) => {
    event.preventDefault();
    const imageSrc = event.target.src;
    const imageTitle = event.target.closest('.card__inner').querySelector('.card__title').textContent;
    addImageData(imageSrc, imageTitle);
    openPopup(imagePopupNode);
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

function addImageData(imageSrc, imageTitle) {
  const imagePopup = imagePopupNode.querySelector('.popup__image');
  imagePopup.src = imageSrc;
  imagePopupNode.querySelector('.popup__figcaption').textContent = imageTitle;
}

function deleteCard(card) {
  card.remove();
}

function likeCard(card) {
  card.querySelector('.card__like-btn').classList.toggle('btn_status_liked');
}

function renderCard(card, container, mode = '') {
  switch(mode) {
    case 'prepend':
      container.prepend(card);
      break;
    default:
      container.append(card);
  }
}

function saveProfile() {
  profileNameNode.textContent = popupEditInputNameNode.value;
  profileStatusNode.textContent = popupEditInputStatusNode.value;
  closePopup(popupEditNode);
}

function addCard() {
  const cardData =
    {
      name: popupAddInputTitleNode.value,
      link: popupAddInputLinkNode.value,
    };
    const card = createNewCard(cardData);
    renderCard(card, placesGridNode, 'prepend');
    closePopup(popupAddNode);
    popupAddInputTitleNode.value = '';
    popupAddInputLinkNode.value = '';
}

initialCards.forEach(elem => {
  let card = createNewCard(elem);
  renderCard(card, placesGridNode);
});

profileEditBtnNode.addEventListener('click', (event) => {
  event.preventDefault();
  changeInputText();
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

popupEditNode.querySelector('.popup__form').addEventListener('submit', (event) => {
  event.preventDefault();
  saveProfile();
});

popupAddNode.querySelector('.popup__form').addEventListener('submit', (event) => {
  event.preventDefault();
  addCard();
});

