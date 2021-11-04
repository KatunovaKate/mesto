//Экземпляр класса Card создаётся для каждой карточки. Класс Card должен:
export default class Card {
    constructor(item, cardSelector, handleCardClick, deletePopup, handleCardLike, api, myId) {
        this._name = item.name;
        this._link = item.link;
        this._likes = item.likes;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._deletePopup = deletePopup;
        this._handleCardLike = handleCardLike;
        this._api = api;
        this._myId = myId;
        this._cardElement = document.querySelector(this._cardSelector);
        this._likeButton = this._cardElement.querySelector('.element__like-button');
    }

    _getTemplate() {
        const cardElement = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
        return cardElement;
    }


    setLike = (_id) => {
  //    this._likes.length = `${this._likes.length}`
      this._element.querySelector('.element__number-of-likes').textContent = this._likes.length + 1;
      this._element.querySelector('.element__like-button').classList.add("element__like-button_active");
    }

    deleteLike = (_id) => {
      this._element.querySelector('.element__number-of-likes').textContent = `${this._likes.length}` - 1;
      this._element.querySelector('.element__like-button').classList.remove("element__like-button_active");
    }

    _setEventListeners() {
      this._element.querySelector('.element__like-button').addEventListener('click', (evt) => {
        this._handleCardLike();
      });
  
      this._element.querySelector('.element__image').addEventListener('click', () => {
        this._handleCardClick();
      });

      this._element.querySelector('.element__delete-button').addEventListener('click', () => {
        this._deletePopup();
      });

    }

    delClickHandler = (_id) => {
      this._api.deleteTask(_id).then(() => {
        this._element.remove();
      }).catch((err) => console.log(err));
    }

    _removeDeleteButton = (_id) => {
     if (_id != this._myId) {
       this._element.querySelector('.element__delete-button').classList.add('element__delete-button_remove');
     }
    }
    
    _numberOfLikes = (likes) => {
       console.log(likes)
       this._element.querySelector('.element__number-of-likes').textContent = likes.length;
    }

    _likeToggle = (likes) => {
      if (likes.find(likes => likes._id === this._myId)) {
        this._element.querySelector('.element__like-button').classList.add('element__like-button_active');
       }
    }

    renderCard(_id, likes) {
        this._element = this._getTemplate();
        this._removeDeleteButton(_id);
        this._numberOfLikes(likes);
        this._likeToggle(likes)
        this._setEventListeners();
        const elementImage = this._element.querySelector('.element__image');
        elementImage.style.backgroundImage =  `url(${this._link})`;
        this._element.querySelector('.element__title').textContent = this._name;
        elementImage.setAttribute("alt", `${this._name}`);
        return this._element;

    }
  }