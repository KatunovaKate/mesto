let popup = document.querySelector('.popup');
let formPopup = document.querySelector('.popup__form');
let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');
let userName = document.querySelector('.profile__user-name');
let description = document.querySelector('.profile__user-description');
let formUserName = document.querySelector('.popup__form-name');
let formDescription = document.querySelector('.popup__form-description');

function addPopup() {
    formUserName.value = userName.textContent;
    formDescription.value = description.textContent;
    popup.classList.add('popup_opened');
}
editButton.addEventListener('click', addPopup);

function closePopup() {
    popup.classList.remove('popup_opened');
}
closeButton.addEventListener('click', closePopup);

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    userName.textContent = formUserName.value;
    description.textContent = formDescription.value;
    closePopup();
}
formPopup.addEventListener('submit', formSubmitHandler);


