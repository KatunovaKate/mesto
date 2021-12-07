export const popups = Array.from(document.querySelectorAll(".popup"));
export const popupEdit = document.querySelector(".popup_class_edit");
export const formPopupEdit = document.querySelector(".popup__form_class_edit");
export const editButton = document.querySelector(".profile__edit-button");
export const saveButtonEdit = document.querySelector(".popup__save-button_class_edit");
export const formUserName = document.querySelector(".popup__form-name_class_edit");
export const formDescription = document.querySelector(".popup__form-description_class_edit");

export const userName = document.querySelector(".profile__username");
export const description = document.querySelector(".profile__user-description");
export const userAvatar = document.querySelector(".profile__avatar");

export const saveButtonAvatar = document.querySelector(".popup__save-button_change-photo");


export const popupAdd = document.querySelector(".popup_class_add");
export const addSaveButton = document.querySelector('.popup__save-button_class_add');
export const addForm = document.querySelector(".popup__form_class_add");
export const addButton = document.querySelector(".profile__add-button");
export const closeButtonAdd = document.querySelector(".popup__close-button_class_add");
export const formImageTitle = document.querySelector(".popup__form-name_class_add");
export const formLink = document.querySelector(".popup__form-description_class_add");

export const popupShow = document.querySelector(".popup_class_image-show");
export const closeButtonShow = document.querySelector(".popup__close-button_class_image-show");

export const popupFormProfile = document.querySelector(".popup__form_class_change-photo");
export const popupProfileCloseButton = document.querySelector(".popup__close-button_class_change-photo");
export const popupProfileSaveButton = document.querySelector(".popup__save-button_change-photo");
export const popupProfileButton = document.querySelector(".profile__edit-photo");

export const deleteImage = document.querySelector(".popup__save-button_class_remove");

export const templateElement = document.querySelector(".template");
export const container = document.querySelector(".elements__list");
export const imageElement = document.querySelector(".element__image")
export const imageSubtitleElement = document.querySelector(".element__title")
export const deleteButton = document.querySelector(".element__delete-button");

export const popupImage = document.querySelector('.popup__image');
export const popupName = document.querySelector('.popup__image-text');

export const Escape = "Escape";

export const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_type_disable',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_type_active',
  };
  