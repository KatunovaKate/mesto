import { Escape } from  '../utils/constants.js'

export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        this._closeButton = this._popupSelector.querySelector('.popup__close-button');
    }

    openPopup() {
        this._popupSelector.classList.add("popup_opened");
    }

    closePopup() {
        this._popupSelector.classList.remove("popup_opened");
        document.removeEventListener("keydown", this._handleEscClose);
    }

    setEventListeners() {
        this._closeButton.addEventListener("click", () => this.closePopup());
        this._popupSelector.addEventListener("mousedown", (evt) => {
              if (evt.target === evt.currentTarget) {
                    this.closePopup();
              }
            })
        document.addEventListener("keydown", (evt) => {
            this._handleEscClose(evt);
            })
        }

    _handleEscClose = (evt) => { 
        if (evt.key === Escape) { 
          this.closePopup();
        }
    }
}