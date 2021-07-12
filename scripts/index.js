import Card from './Card.js'
import FormValidator from './FormValidator.js'
import { initialCards } from './initial-сards.js'

const popups = Array.from(document.querySelectorAll(".popup"));
const popupEdit = document.querySelector(".popup_class_edit");
const formPopupEdit = document.querySelector(".popup__form_class_edit");
const editButton = document.querySelector(".profile__edit-button");
const closeButtonEdit = document.querySelector(
  ".popup__close-button_class_edit"
);
const formUserName = document.querySelector(".popup__form-name_class_edit");
const formDescription = document.querySelector(
  ".popup__form-description_class_edit"
);

const userName = document.querySelector(".profile__user-name");
const description = document.querySelector(".profile__user-description");

const popupAdd = document.querySelector(".popup_class_add");
const addForm = document.querySelector(".popup__form_class_add");
const addButton = document.querySelector(".profile__add-button");
const closeButtonAdd = document.querySelector(".popup__close-button_class_add");
const formImageTitle = document.querySelector(".popup__form-name_class_add");
const formLink = document.querySelector(".popup__form-description_class_add");

const popupShow = document.querySelector(".popup_class_image-show");
const closeButtonShow = document.querySelector(".popup__close-button_class_image-show");

const templateElement = document.querySelector(".template");
const container = document.querySelector(".elements__list");
const deleteButton = document.querySelector(".element__delete-button");

const popupImage = document.querySelector('.popup__image');
const popupName = document.querySelector('.popup__image-text');

const closeEsc = (evt) => { 
  if (evt.key === "Escape") { 
    const popupElement = document.querySelector('.popup_opened');
    closePopup(popupElement);
  } 
} 

function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
  document.addEventListener("keydown", closeEsc);
}

function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeEsc);
}

function openPropfilePopup() {
  formUserName.value = userName.textContent;
  formDescription.value = description.textContent;
  openPopup(popupEdit);
}

editButton.addEventListener("click", () => openPropfilePopup());
addButton.addEventListener("click", () => openPopup(popupAdd));
closeButtonEdit.addEventListener("click", () => closePopup(popupEdit));
closeButtonAdd.addEventListener("click", () => closePopup(popupAdd));

popups.forEach((popupElement) => {
  popupElement.addEventListener("mousedown", function (evt) {
    if (evt.target === evt.currentTarget) {
      closePopup(popupElement)
    }
  })
})

function handleProfileSubmit(evt) {
  evt.preventDefault();
  userName.textContent = formUserName.value;
  description.textContent = formDescription.value;
  closePopup(popupEdit);
  userValidate;
}

formPopupEdit.addEventListener("submit", handleProfileSubmit);

function handleCardSubmit(evt) {
  evt.preventDefault();
  const elementData = {
    name: formLink.value,
    link:  formImageTitle.value,
    alt: formLink.value,
  }
  const element = new Card(elementData, ".template")
  const cardElement = element.renderCard();
  container.prepend(cardElement);
  formImageTitle.value = '';
  formLink.value ='';
  const addButton = document.querySelector('.popup__save-button_class_add');
  addButton.classList.add('popup__save-button_type_disable');
  closePopup(popupAdd);
  cardValidate;
}

addForm.addEventListener("submit", handleCardSubmit);

const renderList = () => {
  initialCards.forEach((item) => {
        const card = new Card(item, ".template");
        const cardElement = card.renderCard();
        container.append(cardElement);
  });
};

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_type_disable',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_type_active',
  modalEditProfile: document.querySelector('.popup_class_edit'),
  modalAddPhoto: document.querySelector('.popup_class_add'),
};

const userValidate = new FormValidator(config, config.modalEditProfile).enableValidation(config);
const cardValidate = new FormValidator(config, config.modalAddPhoto).enableValidation(config);

renderList();

export { closePopup, openPopup, closeButtonShow, popupName, popupImage, popupShow, config }