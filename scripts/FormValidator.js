import { config } from './index.js'

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
        
        this._idError = `${this._inputSelector}-error`;
        this._errorElement = this._formElement.querySelector(this._idError);
    }

    _hasInvalidInput = (inputList) => {
        return inputList.some(inputElement => !inputElement.validity.valid);
    }
    
    _changeButtonState = (buttonElement, inputList) => {
        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(this._inactiveButtonClass);
        } else {
            buttonElement.classList.remove(this._inactiveButtonClass);
        }
    }
    
    _showError = (formElement, inputElement, config) => {
        this._errorElement.textContent = inputElement.validationMessage;
        this._errorElement.classList.add(this._errorClass);
        inputElement.classList.add(this._inputErrorClass);
    }
    
    _hideError = (formElement, inputElement, config) => {
        this._errorElement.textContent = '';
        this._errorElement.classList.remove(this._errorClass);
        inputElement.classList.remove(this._inputErrorClass);
    }
    
    _checkValidity = (formElement, inputElement, config) => {
        if(!inputElement.validity.valid) {
            this._showError(formElement, inputElement, config);
        } else {
            this._hideError(formElement, inputElement, config);
        }
    }
    
    _setIventListerners = (formElement, { inputSelector, submitButtonSelector, ...restConfig }) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        })
        const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
    
        const buttonElement = formElement.querySelector(this._submitButtonSelector);
    
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkValidity(formElement, inputElement, restConfig);
                this._changeButtonState(buttonElement, inputList, restConfig);
            })
        })
    
        this._changeButtonState(buttonElement, inputList, restConfig);
    }
    
    enableValidation = ({ formSelector, ...restConfig }) => {
        const formList = Array.from(document.querySelectorAll(this._formSelector));
        formList.forEach((formElement) => {
            this._setIventListerners(formElement, restConfig);
        })
    }
}