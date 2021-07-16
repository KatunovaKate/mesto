//Экземпляр класса Card создаётся для каждой карточки. Класс Card должен:
import  { closePopup, openPopup, closeButtonShow, popupImage, popupName, popupShow } from './utils.js'
export default class Card {
    //Принимать в конструктор ссылки на изображение и текст;
    //Принимать в конструктор селектор для template-элемента с шаблоном разметки;
    constructor(data, cardSelector) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
    }
  
    //Принимаем разметку для карточки
    _getTemplate() {
        const cardElement = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
        return cardElement;
    }
    
    //функция открытия карточки
    _openImagePopup() {
      popupImage.src = this._link;
      popupName.textContent = this._name;
      popupImage.alt = this._name;
      openPopup(popupShow);
    }
  
    //функция удаления карточки
    _deleteCard(evt) {
      const target = evt.target;
      this._element = target.closest(".element");
      this._element.remove()
    }
  
    //функция лайка
    _likeToggle(evt) {
      evt.target.classList.toggle("element__like-button_active");
    }
  
    //навешиваем слушатели
    _setEventListeners() {
      this._element.querySelector('.element__like-button').addEventListener('click', (evt) => {
        this._likeToggle(evt);
      });
  
      this._element.querySelector('.element__delete-button').addEventListener('click', (evt) => {
        this._deleteCard(evt);
      });
  
      this._element.querySelector('.element__image').addEventListener('click', () => {
        this._openImagePopup();
      });
  
      closeButtonShow.addEventListener('click', () => {
       closePopup(popupShow);
      });
    }
  
    //Рендер карточки
    renderCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        this._element.querySelector('.element__image').style.backgroundImage =  `url(${this._link})`;
        this._element.querySelector('.element__title').textContent = this._name;
        this._element.querySelector('.element__image').setAttribute("alt", `${this._name}`);
        return this._element;
    }
  }