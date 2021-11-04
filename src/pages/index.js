import './index.css'
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js'
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithImage from '../components/PopupWithImage.js'
import UserInfo from '../components/UserInfo.js'
import Api from '../components/API.js'
import { formPopupEdit, editButton, formUserName, formDescription, closeButtonEdit,
         addSaveButton, addForm, addButton, formImageTitle, formLink, saveButtonAvatar,
         popupFormProfile, popupProfileButton, userAvatar, userName, description,
         container, config} from '../utils/constants.js'


//ссылка на сервер
const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-29/",
  headers: {
    "Content-Type": 'application/json',
    authorization: '599d58cc-8009-4c2f-8eaa-205713197ccb',
  },
})

//открытие попапа профиля 
const changeProfile = new PopupWithForm({
  popupSelector: '.popup_class_change-photo',
  submitForm: (data) => {
    saveButtonAvatar.textContent = 'Сохранение...'
    api.setAvatar({
      avatar: data.image,
    })
      .then((data) => {
        userAvatar.src =  `${data.avatar}`
      }).finally(() => {
        saveButtonAvatar.textContent = 'Сохранить'
      })
    saveButtonAvatar.classList.add('popup__save-button_type_disable');
    cardValidate.changeButtonState();
    changeProfile.closePopup();
  }
});
popupProfileButton.addEventListener("click", () => {
  cardValidate.changeButtonState();
  changeProfile.openPopup();
});
changeProfile.setEventListeners();


let myId = null;

api.getInfo()
.then(({name, about, avatar, _id}) => {
  const profileInfo = infoProfile.getUserInfo({name, about});
    userName.textContent = profileInfo.nameSelector;
    description.textContent = profileInfo.subSelector;
    userAvatar.src = `${avatar}`;
    myId = `${_id}`;
})



const infoProfile = new UserInfo('.profile__username', '.profile__user-description', api);
const formProfile = new PopupWithForm({
  popupSelector: '.popup_class_edit',
  submitForm: (data) => {
    closeButtonEdit.textContent = 'Сохранение...'
    api.setUserInfo({
      name: data.username,
      about: data.description
    })
      .then((data) => {
        infoProfile.setUserInfo({
          formUserName: data.name,
          formDescription: data.about,
        })
        formProfile.closePopup();
      }).finally(() => {
        closeButtonEdit.textContent = 'Сохранить'
        })
  }
});

formProfile.setEventListeners();
editButton.addEventListener("click", () => {
  formProfile.openPopup();
  api.getInfo().then(({name, about}) => {
    const profileInfo = infoProfile.getUserInfo({name, about});
    formUserName.value = profileInfo.nameSelector;
    formDescription.value = profileInfo.subSelector;
  })

});

//получение информации о карточках с сервера
api.getCards().then(data => {

  const createCard = (item) => {
    const card = new Card( item, ".template", 
      () => { popupWithImage.openPopup(item.link, item.name); },
      () => { const popupDelete = new PopupWithForm({
             popupSelector: '.popup_class_remove',
             submitForm: () => {
               data.map((item) => ({ id: item.id }))
               card.delClickHandler(item._id);
               popupDelete.closePopup();
              }
            });
            popupDelete.setEventListeners();
            popupDelete.openPopup();
          },
      () => {
        if(item.likes.find(likes => likes._id === myId)) {
          api.deletelike(item._id).then(() => {
            card.deleteLike(item._id)
          })
        } else{
          api.setLike(item._id).then(() => {
            card.setLike(item._id)
         })
        }
      },
      api, myId);
      
  const cardElement = card.renderCard(item.owner._id, item.likes);
  return cardElement;
  }

  const renderElements = new Section ({
      items: data,
      renderer: (item) => {
        container.append(createCard(item));
        },
      }, container, api)

  renderElements.renderItems();


  const addProfile = new PopupWithForm({
     popupSelector: '.popup_class_add',
      submitForm: () => {
        addSaveButton.textContent = 'Создание...'
        api.addCard({
          name: formImageTitle.value,
          link: formLink.value
        }).then((data) => {
          console.log(data);
          renderElements.setItem(createCard(data));
        })
        
      addSaveButton.classList.add('popup__save-button_type_disable');
      cardValidate.changeButtonState();
      addProfile.closePopup();
      addSaveButton.textContent = 'Создать'
    }
  });

  addButton.addEventListener("click", () => {
      cardValidate.changeButtonState();
      addProfile.openPopup();
     });
  addProfile.setEventListeners();
})


const popupWithImage = new PopupWithImage('.popup_class_image-show');
popupWithImage.setEventListeners();



const userValidate = new FormValidator(config, formPopupEdit)
userValidate.enableValidation();
const cardValidate = new FormValidator(config, addForm)
cardValidate.enableValidation();
const profileValidate = new FormValidator(config, popupFormProfile)
profileValidate.enableValidation();

