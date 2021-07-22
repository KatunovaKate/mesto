import Popup from "./Popup.js";
import  { popupImage, popupName } from '../utils/constants.js'

export default class PopupWithImage extends Popup {
    constructor(data, popupSelector) {
        super(popupSelector);
        this._name = data.name;
        this._link = data.link;
    }

    openPopup() {
        popupImage.src = this._link;
        popupName.textContent = this._name;
        popupImage.alt = this._name;

        super.openPopup();
    }
}