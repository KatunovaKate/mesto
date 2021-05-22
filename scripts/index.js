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

const closeEsc = (evt) => {
  if (evt.keyCode === 27) {    
    popups.forEach((popupElement) => {
      popupElement.classList.remove("popup_opened")
    })
  }
}

function openPopup(popups) {
  popups.classList.add("popup_opened");
  document.addEventListener("keydown", closeEsc);
}

function closePopup(popups) {
  popups.classList.remove("popup_opened");
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
closeButtonShow.addEventListener("click", () => closePopup(popupShow));

popups.forEach((popupElement) => {
  popupElement.addEventListener("click", function (evt) {
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
}

formPopupEdit.addEventListener("submit", handleProfileSubmit);

function handleCardSubmit(evt) {
  evt.preventDefault();
  const formTitle = formImageTitle.value;
  const formImage = formLink.value;
  const newElement = createElement({ name: formTitle, link: formImage });
  container.prepend(newElement);
  formImageTitle.value = '';
  formLink.value ='';
  closePopup(popupAdd);
}

addForm.addEventListener("submit", handleCardSubmit);

function renderList() {
  const elements = initialCards.map(function (item) {
    const newElement = createElement(item);
    return newElement;
  });
  container.append(...elements);
}

function createElement(item) {
  const newElement = templateElement.content.cloneNode(true);
  const elementTitle = newElement.querySelector(".element__title");
  const elementImage = newElement.querySelector(".element__image");
  const deleteButton = newElement.querySelector(".element__delete-button");

  deleteButton.addEventListener("click", (evt) => {
    const target = evt.target;
    const currentElement = target.closest(".element");
    currentElement.remove();
  });

  elementImage.addEventListener("click", () => {
    openPopup(popupShow);
    document.querySelector(".popup__image-text").textContent =
      elementTitle.textContent;
    document.querySelector(".popup__image").src = item.link;
    document.querySelector(".popup__image").alt = elementTitle.textContent;
  });

  const likeButton = newElement.querySelector(".element__like-button");
  elementTitle.textContent = item.name;
  elementImage.style.backgroundImage = "url(" + item.link + ")";

  likeButton.addEventListener("click", function (evt) {
    evt.target.classList.toggle("element__like-button_active");
  });

  return newElement;
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_type_disable',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_type_active'
});

renderList();