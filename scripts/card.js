const popUpNode = document.querySelector('.popup_type_image');
const popUpCloseBttnNode = popUpNode.querySelector('.popup__close-btn');
const popUpImageNode = popUpNode.querySelector('.popup__image');
const popUpFigcaptionNode = popUpNode.querySelector('.popup__figcaption');

export default class Card {
  constructor(data, selector) {
    this._title = data.name;
    this._image = data.link
    this._selector = selector;
  }

  _getTemplate() {
    const cardNode = document
      .querySelector(this._selector)
      .content
      .querySelector('.card')
      .cloneNode(true);
    return cardNode;
  }

  _handleOpenPopup() {
    popUpImageNode.src = this._image;
    popUpFigcaptionNode.textContent = this._title;
    popUpNode.classList.add('popup_visible');
    document.addEventListener('keydown', this._handleKeyboardPopup);
    popUpNode.addEventListener('click', this._handleOutsideClickPopup);
  }

  _handleClosePopup() {
    popUpNode.classList.remove('popup_visible');
    document.removeEventListener('keydown', this._handleKeyboardPopup);
    popUpNode.removeEventListener('click', this._handleOutsideClickPopup);
    popUpImageNode.src = '';
    popUpFigcaptionNode.textContent = '';
  }

  _handleKeyboardPopup = (evt) => {
    if(evt.key === 'Escape') {
      this._handleClosePopup();
    }
  }

  _handleOutsideClickPopup = (evt) => {
    if(!evt.target.closest('.popup__container')){
      this._handleClosePopup();
    }
  }

  _deleteCard() {
    this._element.remove();
  }

  _likeCard() {
    this._likeBttn.classList.toggle('btn_status_liked');
  }

  _setEventListeners() {
    this._element.querySelector('.card__img').addEventListener('click', () => {
      this._handleOpenPopup();
    });
    //Тут функция будет выполняться минимум 6 раз, в тренажере так же (написать в поддержку)
    popUpCloseBttnNode.addEventListener('click', () => {
      if(popUpNode.classList.contains('popup_visible')) {
        this._handleClosePopup();
      }
    });
    this._element.querySelector('.card__trash-btn').addEventListener('click', () => {
      this._deleteCard();
    });
    this._likeBttn = this._element.querySelector('.card__like-btn');
    this._likeBttn.addEventListener('click', () => {
      this._likeCard();
    });
  }

  generateCard() {
    this._element = this._getTemplate(); //Получили элемент из шаблона
    this._setEventListeners(); //Установили обработчики
    this._element.querySelector('.card__title').textContent = this._title; //Название карточки
    this._element.querySelector('.card__img').src = this._image; //Ссылка на изображение
    this._element.querySelector('.card__img').alt = this._title;
    return this._element; //Элемент для последующей вставки
  }
}
