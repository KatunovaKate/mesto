let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');
let saveButton = document.querySelector('.popup__save-button');
let userName = document.querySelector('.profile__user-name');
let description = document.querySelector('.profile__user-description');
let formUserName = document.querySelector('.popup__form-name');
let formDescription = document.querySelector('.popup__form-description');

function addPopup() {
    popup.classList.add('popup_opened');
}
editButton.addEventListener('click', addPopup);

function closePopup() {
    popup.classList.remove('popup_opened');
}
closeButton.addEventListener('click', closePopup);

saveButton.addEventListener('click', closePopup);
saveButton.addEventListener('click', function() {
    userName.textContent = formUserName.value;
    description.textContent = formDescription.value;
})


