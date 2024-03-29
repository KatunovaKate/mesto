import Popup from "./Popup.js";

export default class PopupWithForm extends Popup{
    constructor( {popupSelector, submitForm} ) {
        super(popupSelector);
        this._submitForm = submitForm;
        this._inputList = Array.from(this._popup.querySelectorAll('.popup__input'));
        this._formElement = this._popup.querySelector('.popup__form');
        this._button = this._popup.querySelector('button[type="submit"]');
        this._buttonText = this._button.textContent;
    }

    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach((input) => {
            this._formValues[input.name] = input.value; 
        })
        return this._formValues;
    }

    setEventListeners() {
        this._formElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._submitForm(this._getInputValues());
        });
        super.setEventListeners();
    }

    close() {
        this._formElement.reset();
        super.close();
    }

    renderLoading(isSending) {
        this._button.textContent = isSending ? 'Сохранение...' : this._buttonText;
      }
    
}