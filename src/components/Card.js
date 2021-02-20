export default class Card {
  constructor({data, handleCardClick, handleTrashClick, handleLikeClick, handleLikeError, clearLikeError}, templateSelector) {
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
    this._handleLikeError = handleLikeError;
    this._clearLikeError = clearLikeError;

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
    this._likeCardAnimation(true);
    const like = this._likeBttn.classList.contains('btn_status_liked') ? false : true;
    this._handleLikeClick({like:like, cardId:this._id})
      .then((data) => {
        console.log(data);
        this._numberOfLikes = data.likes.length;
        this._clearLikeError();
        this._likeBttn.classList.toggle('btn_status_liked');
        //like ? this._numberOfLikes++ : this._numberOfLikes-- ;
        this._setLikeCount();
      })
      .catch((err) => {
        this._handleLikeError({err:err, container:this._element});
      })
      .finally(() => {
        this._likeCardAnimation(false);
      })
  }

  _likeCardAnimation(state) {
    if(state) {
      this._likeBttn.classList.add('btn_animate_like');
    } else {
      this._likeBttn.classList.remove('btn_animate_like');
    }
  }

  _setEventListeners() {
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick({title:this._title, src:this._image});
    });
    this._cardTrashBttn.addEventListener('click', () => {
      this._handleTrashClick({id:this._id, removedCard:this._element});
    });
    this._likeBttn.addEventListener('click', () => {
      this._likeCard();
    });
  }

  _setLikeCount() {
    this._cardLikeCount.textContent = this._numberOfLikes;
  }

  _removeTrashBttn() {
    this._cardTrashBttn = this._element.querySelector('.card__trash-btn');
    if(this._ownerId !== this._userId) {
      this._cardTrashBttn.remove();
    }
  }

  _setLikeStatus() {
    this._likeBttn = this._element.querySelector('.card__like-btn');
    if (this._likedUserIdList.includes(this._userId)) {
      this._likeBttn.classList.add('btn_status_liked');
    }
    this._setLikeCount();
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.card__img');
    this._removeTrashBttn();
    this._cardLikeCount = this._element.querySelector('.card__like-count');
    this._setLikeStatus();
    this._element.querySelector('.card__title').textContent = this._title;
    this._cardImage.src = this._image;
    this._cardImage.alt = this._title;
    this._setEventListeners();
    return this._element;
  }
}
