export default class Card {
  constructor({data, handleCardClick, handleTrashClick, handleLikeClick}, templateSelector) {
    this._title = data.title;
    this._image = data.link;
    this._likes = data.likes;
    this._likedUserIdList = this._likes.map(user => user._id);
    this._id = data.id;
    this._ownerId = data.owner._id
    this._userId = data.userId;
    this._numberOfLikes = this._likes.length;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleTrashClick = handleTrashClick;
    this._handleLikeClick = handleLikeClick;
  }

  _getTemplate() {
    const cardNode = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);
    return cardNode;
  }

  deleteCard() {
    this._element.remove();
  }

  _likeCard() {
    this._likeBttn.classList.toggle('btn_status_liked');
    let like = false;
    if(this._likeBttn.classList.contains('btn_status_liked')) {
      this._numberOfLikes++;
      like = true;
    } else {
      this._numberOfLikes--;
    }
    this._setLikeCount();
    this._handleLikeClick({like:like, cardId:this._id});
  }

  _setEventListeners() {
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick({title:this._title, src:this._image});
    });

    this._cardTrashBttn.addEventListener('click', () => {
      //this._deleteCard();
      this._handleTrashClick({id:this._id, removedCard:this._element});
    });
    this._likeBttn.addEventListener('click', () => {
      this._likeCard();
    });
  }

  _setLikeCount() {
    this._cardLikeCount.textContent = this._numberOfLikes;
  }

  generateCard() {
    this._element = this._getTemplate(); //Получили элемент из шаблона
    this._cardImage = this._element.querySelector('.card__img');
    this._cardTrashBttn = this._element.querySelector('.card__trash-btn');
    //Отдельная функция
    if(this._ownerId !== this._userId) {
      this._cardTrashBttn.remove();
    }
    //Установить статус лайка
    this._likeBttn = this._element.querySelector('.card__like-btn');
    if(this._likedUserIdList.includes(this._userId)) {
      this._likeBttn.classList.add('btn_status_liked');
    }
    this._element.querySelector('.card__title').textContent = this._title; //Название карточки
    this._cardImage.src = this._image; //Ссылка на изображение
    this._cardImage.alt = this._title;
    this._cardLikeCount = this._element.querySelector('.card__like-count');
    this._setLikeCount();
    this._setEventListeners(); //Установили обработчики
    return this._element; //Элемент для последующей вставки
  }
}
