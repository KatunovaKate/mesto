import Card from './Card.js'
import FormValidator from './FormValidator.js'
import { initialCards } from './initial-сards.js'
import { popups, popupEdit, formPopupEdit, editButton, closeButtonEdit, formUserName, formDescription, userName, description, 
         popupAdd, addSaveButton, addForm, addButton, closeButtonAdd, formImageTitle, formLink,
         container, openPopup, closePopup, config} from './utils.js'

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
}

formPopupEdit.addEventListener("submit", handleProfileSubmit);

function handleCardSubmit(evt) {
  evt.preventDefault();
  const elementData = {
    name: formImageTitle.value,
    link: formLink.value,
  }
  const element = new Card(elementData, ".template")
  const cardElement = element.renderCard();
  container.prepend(cardElement);
  formImageTitle.value = '';
  formLink.value ='';
  addSaveButton.classList.add('popup__save-button_type_disable');
  addSaveButton.setAttribute("disabled", "disabled");
  closePopup(popupAdd);
}

addForm.addEventListener("submit", handleCardSubmit);

const createCard = (item) => {
        const card = new Card(item, ".template");
        const cardElement = card.renderCard();
        return cardElement;
}

const renderList = () => {
  initialCards.forEach((item) => {
        container.append(createCard(item));
  });
};

const userValidate = new FormValidator(config, formPopupEdit)
userValidate.enableValidation();
const cardValidate = new FormValidator(config, addForm)
cardValidate.enableValidation();

renderList();
