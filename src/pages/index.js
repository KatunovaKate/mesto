import './index.css'
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js'
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithImage from '../components/PopupWithImage.js'
import UserInfo from '../components/UserInfo.js'
import Api from '../components/API.js'
import { formPopupEdit, editButton, formUserName, formDescription, saveButtonEdit, renderLoading,
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
const popupUpdateAvatar = new PopupWithForm({
  popupSelector: '.popup_class_change-photo',
  submitForm: (data) => {
    renderLoading();
    profileValidate.disabledButton();
    api.setAvatar({
      avatar: data.photo,
    })
      .then((data) => {
        userAvatar.src =  `${data.avatar}`
        popupUpdateAvatar.close();
      }).finally(() => {
        saveButtonAvatar.textContent = 'Сохранить'
      }).catch((err) => console.log(err)) 
    saveButtonAvatar.classList.add('popup__save-button_type_disable');
    cardValidate.changeButtonState();
  }
});
popupProfileButton.addEventListener("click", () => {
  cardValidate.changeButtonState();
  popupUpdateAvatar.open();
});
popupUpdateAvatar.setEventListeners();


let myId = null;

api.getInfo()
.then(({name, about, avatar, _id}) => {
  const profileInfo = infoProfile.getUserInfo({name, about});
    userName.textContent = profileInfo.nameSelector;
    description.textContent = profileInfo.subSelector;
    userAvatar.src = `${avatar}`;
    myId = `${_id}`;
}).catch((err) => console.log(err)) 

const infoProfile = new UserInfo('.profile__username', '.profile__user-description');
const formEditProfile = new PopupWithForm({
  popupSelector: '.popup_class_edit',
  submitForm: (data) => {
    renderLoading();
    userValidate.disabledButton();
    api.setUserInfo({
      name: data.username,
      about: data.description
    })
      .then((data) => {
        infoProfile.setUserInfo({
          formUserName: data.name,
          formDescription: data.about,
        })
        formEditProfile.close();
      }).finally(() => {
        saveButtonEdit.textContent = 'Сохранить'
        }).catch((err) => console.log(err)) 
  }
});

formEditProfile.setEventListeners();
editButton.addEventListener("click", () => {
    formEditProfile.open();
    const info = {
      name: userName.textContent,
      about: description.textContent
    }
    formUserName.value = info.name;
    formDescription.value = info.about;
});

const createCard = (item) => {
  const card = new Card(item, ".template", 
    () => { popupWithImage.open(item.link, item.name); },
    (item) => {
      cardInfoSubmit.open();
      cardInfoSubmit.confirm(() => {
        api.deleteTask(item._id)
          .then(() => {
            card.delClickHandler();
            cardInfoSubmit.close();
          })
          .catch(err => console.log(`При удалении карточки: ${err}`))
      });
    },
    () => {
   if(item.likes.find(likes => likes._id === myId)) {
        api.deletelike(item._id).then(() => {
          card.deleteLike(item._id, item.likes)
        }).catch((err) => console.log(err)) 
      } else{
        api.setLike(item._id).then(() => {
          console.log(item.name)
          card.setLike(item._id, item.likes)
       }).catch((err) => console.log(err)) 
      }
    }, myId);


    
const cardElement = card.renderCard(item.owner._id, item.likes, item.name, item.link);
return cardElement;
}


const cardInfoSubmit = new PopupWithForm({
  popupSelector: '.popup_class_remove',
  submitForm: () => {}
 });
 cardInfoSubmit.setEventListeners();


 const cardList = new Section ({
    renderer: (item) => {
      container.append(createCard(item));
      },
    }, container)


const popupAddCard = new PopupWithForm({
  popupSelector: '.popup_class_add',
   submitForm: () => {
     renderLoading()
     cardValidate.disabledButton();
     api.addCard({
       name: formImageTitle.value,
       link: formLink.value
     }).then((data) => {
       cardList.setItem(createCard(data));
       popupAddCard.close();
     }).catch((err) => console.log(err)) 
   cardValidate.changeButtonState();  
   addSaveButton.textContent = 'Создать'
 }
});

api.getCards().then(data => {
  cardList.renderItems(data);
}).catch((err) => console.log(err)) 


addButton.addEventListener("click", () => {
  cardValidate.changeButtonState();
  popupAddCard.open();
 });
 popupAddCard.setEventListeners();


const popupWithImage = new PopupWithImage('.popup_class_image-show');
popupWithImage.setEventListeners();



const userValidate = new FormValidator(config, formPopupEdit)
userValidate.enableValidation();
const cardValidate = new FormValidator(config, addForm)
cardValidate.enableValidation();
const profileValidate = new FormValidator(config, popupFormProfile)
profileValidate.enableValidation();

