import { config } from '../utils/constants.js'

//Принимать в конструктор объект настроек с классами формы;
export default class FormValidator {
    constructor(config, formElement) {
        this._formElement = formElement;
        this._formSelector = config.formSelector;
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;

        this._inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
        this._buttonElement = formElement.querySelector(this._submitButtonSelector);
        
        this._errorElement = this._formElement.querySelector(`${this._inputSelector}-error`);
    }

    _hasInvalidInput = () => {
        return this._inputList.some(inputElement => !inputElement.validity.valid);
    }
    
    changeButtonState = () => {
        if (this._hasInvalidInput()) {
            this._buttonElement.classList.add(this._inactiveButtonClass);
            this._buttonElement.setAttribute("disabled", "disabled");
        } else {
            this._buttonElement.classList.remove(this._inactiveButtonClass);
            this._buttonElement.removeAttribute("disabled");
        }
    }
    
    _showError = (formElement, inputElement) => {
        this._errorElement.textContent = inputElement.validationMessage;
        this._errorElement.classList.add(this._errorClass);
        inputElement.classList.add(this._inputErrorClass);
    }
    
    
    _hideError = (formElement, inputElement) => {
        this._errorElement.textContent = '';
        this._errorElement.classList.remove(this._errorClass);
        inputElement.classList.remove(this._inputErrorClass);
    }
    
    _checkValidity = (formElement, inputElement,) => {
        if(!inputElement.validity.valid) {
            this._showError(formElement, inputElement);
        } else {
            this._hideError(formElement, inputElement);
        }
    }
    
    _setIventListerners = (formElement) => {
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        })
    
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkValidity(formElement, inputElement);
                this.changeButtonState();
            })
        })
        this.changeButtonState();
    }
    
    enableValidation = () => {
        this._setIventListerners(this._formElement);
    }
}