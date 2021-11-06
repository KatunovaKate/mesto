import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImage = this._popup.querySelector('.popup__image');
        this._popupName = this._popup.querySelector('.popup__image-text');
    }

    openPopup(link, name) {
        this._popupImage.src = link;
        this._popupName.textContent = name;
        this._popupImage.alt = name;

        super.openPopup();
    }
}