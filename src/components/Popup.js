import { Escape } from  '../utils/constants.js'

export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._closeButton = this._popup.querySelector('.popup__close-button');
    }

    openPopup() {
        this._popup.classList.add("popup_opened");
        document.addEventListener('keydown', this._handleEscClose); 
    }

    closePopup() {
        this._popup.classList.remove("popup_opened");
        document.removeEventListener("keydown", this._handleEscClose);
    }

    setEventListeners() {
        this._closeButton.addEventListener("click", () => this.closePopup());
        this._popup.addEventListener("mousedown", (evt) => {
              if (evt.target === evt.currentTarget) {
                    this.closePopup();
              }
            })
        }

    _handleEscClose = (evt) => { 
        if (evt.key === Escape) { 
          this.closePopup();
        }
    }
}