export default class Card {
  constructor(data, selector, handleCardClick) {
    this._title = data.name;
    this._image = data.link;
    this._selector = selector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardNode = document
      .querySelector(this._selector)
      .content
      .querySelector('.card')
      .cloneNode(true);
    return cardNode;
  }

  _deleteCard() {
    this._element.remove();
  }

  _likeCard() {
    this._likeBttn.classList.toggle('btn_status_liked');
  }

  _setEventListeners() {
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._title, this._image);
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
    this._cardImage = this._element.querySelector('.card__img');
    this._setEventListeners(); //Установили обработчики
    this._element.querySelector('.card__title').textContent = this._title; //Название карточки
    this._cardImage.src = this._image; //Ссылка на изображение
    this._cardImage.alt = this._title;
    return this._element; //Элемент для последующей вставки
  }
}
