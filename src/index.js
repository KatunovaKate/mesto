import './pages/index.css'
import Card from './components/Card.js'
import FormValidator from './components/FormValidator.js'
import Section from './components/Section.js'
import PopupWithForm from './components/PopupWithForm.js'
import PopupWithImage from './components/PopupWithImage.js'
import UserInfo from './components/UserInfo.js'
import { initialCards } from './utils/initial-сards.js'
import { popupEdit, formPopupEdit, editButton, formUserName, formDescription, userName, description, 
         popupAdd, popupShow, addSaveButton, addForm, addButton, formImageTitle, formLink,
         container, config} from './utils/constants.js'

const infoProfile = new UserInfo({userName, description});

const formProfile = new PopupWithForm({
  popupSelector: popupEdit,
  submitForm: () => {
    infoProfile.setUserInfo({formUserName, formDescription});
    formProfile.closePopup();
  }
});

formProfile.setEventListeners();

editButton.addEventListener("click", () => {
  formProfile.openPopup();
  const profileInfo = infoProfile.getUserInfo();
  formUserName.value = profileInfo.userName;
  formDescription.value = profileInfo.description;
});

const addProfile = new PopupWithForm({
  popupSelector: popupAdd,
  submitForm: () => {
    const elementData = {
      name: formImageTitle.value,
      link: formLink.value,
    }
    const element = new Card(elementData, ".template", () => {
      const popupImageElement = new PopupWithImage(elementData, popupShow);
      popupImageElement.openPopup();
      popupImageElement.setEventListeners();
    })
    const cardElement = element.renderCard();
    container.prepend(cardElement);
    formImageTitle.value = '';
    formLink.value ='';
    addSaveButton.classList.add('popup__save-button_type_disable');
    addSaveButton.setAttribute("disabled", "disabled");
    addProfile.closePopup();
  }
});

addButton.addEventListener("click", () => {
  addProfile.openPopup();
});

addProfile.setEventListeners();

const createCard = (item) => {
        const card = new Card(item, ".template", () => {
          const popupImageElement = new PopupWithImage(item, popupShow);
          popupImageElement.openPopup();
          popupImageElement.setEventListeners();
        });
        const cardElement = card.renderCard();
        return cardElement;
}

const renderElements = new Section ({
  items: initialCards,
  renderer: (item) => {
    container.append(createCard(item));
  }
}, container)

const userValidate = new FormValidator(config, formPopupEdit)
userValidate.enableValidation();
const cardValidate = new FormValidator(config, addForm)
cardValidate.enableValidation();

renderElements.renderItems();
