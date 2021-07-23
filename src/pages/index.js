import './index.css'
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js'
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithImage from '../components/PopupWithImage.js'
import UserInfo from '../components/UserInfo.js'
import { initialCards } from '../utils/initial-сards.js'
import { formPopupEdit, editButton, formUserName, formDescription,
         addSaveButton, addForm, addButton, formImageTitle, formLink,
         container, config} from '../utils/constants.js'

const infoProfile = new UserInfo('.profile__user-name', '.profile__user-description');

const formProfile = new PopupWithForm({
  popupSelector: '.popup_class_edit',
  submitForm: () => {
    infoProfile.setUserInfo({formUserName, formDescription});
    formProfile.closePopup();
  }
});

formProfile.setEventListeners();

editButton.addEventListener("click", () => {
  formProfile.openPopup();
  const profileInfo = infoProfile.getUserInfo();
  formUserName.value = profileInfo.nameSelector;
  formDescription.value = profileInfo.subSelector;
});

const addProfile = new PopupWithForm({
  popupSelector: '.popup_class_add',
  submitForm: () => {
    const elementData = {
      name: formImageTitle.value,
      link: formLink.value,
    }
    renderElements.setItem(createCard(elementData));
    addSaveButton.classList.add('popup__save-button_type_disable');
    cardValidate.changeButtonState();
    addProfile.closePopup();
  }
});

addButton.addEventListener("click", () => {
  cardValidate.changeButtonState();
  addProfile.openPopup();
});

addProfile.setEventListeners();

const popupWithImage = new PopupWithImage('.popup_class_image-show');
popupWithImage.setEventListeners();

const createCard = (item) => {
        const card = new Card(item, ".template", () => {
          popupWithImage.openPopup(item.link, item.name);
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
