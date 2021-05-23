const hasInvalidInput = (inputList) => {
    return inputList.some(inputElement => !inputElement.validity.valid);
}

const changeButtonState = (buttonElement, inputList, { inactiveButtonClass }) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(inactiveButtonClass);
    } else {
        buttonElement.classList.remove(inactiveButtonClass);
    }
}

const showError = (formElement, inputElement, { errorClass, inputErrorClass }) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(errorClass);
    inputElement.classList.add(inputErrorClass);
}

const hideError = (formElement, inputElement, { errorClass, inputErrorClass }) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = '';
    errorElement.classList.remove(errorClass);
    inputElement.classList.remove(inputErrorClass);
}

const checkValidity = (formElement, inputElement, config) => {
    if(!inputElement.validity.valid) {
        showError(formElement, inputElement, config);
    } else {
        hideError(formElement, inputElement, config);
    }
}

const setIventListerners = (formElement, { inputSelector, submitButtonSelector, ...restConfig }) => {
    formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
    })
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));

    const buttonElement = formElement.querySelector(submitButtonSelector);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkValidity(formElement, inputElement, restConfig);
            changeButtonState(buttonElement, inputList, restConfig);
        })
    })

    changeButtonState(buttonElement, inputList, restConfig);
}

const enableValidation = ({ formSelector, ...restConfig }) => {
    const formList = Array.from(document.querySelectorAll(formSelector));
    formList.forEach((formElement) => {
        setIventListerners(formElement, restConfig);
    })
}