//Экземпляр класса Card создаётся для каждой карточки. Класс Card должен:
export default class Card {
    constructor(data, cardSelector, handleCardClick) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
    }
  
    _getTemplate() {
        const cardElement = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
        return cardElement;
    }

    _deleteCard() {
      this._element.remove();
    }
  
    _likeToggle(evt) {
      evt.target.classList.toggle("element__like-button_active");
    }
  
    _setEventListeners() {
      this._element.querySelector('.element__like-button').addEventListener('click', (evt) => {
        this._likeToggle(evt);
      });
  
      this._element.querySelector('.element__delete-button').addEventListener('click', (evt) => {
        this._deleteCard(evt);
      });
  
      this._element.querySelector('.element__image').addEventListener('click', () => {
        this._handleCardClick();
      });

    }
  
    renderCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        const elementImage = this._element.querySelector('.element__image');
        elementImage.style.backgroundImage =  `url(${this._link})`;
        this._element.querySelector('.element__title').textContent = this._name;
        elementImage.setAttribute("alt", `${this._name}`);
        return this._element;
    }
  }