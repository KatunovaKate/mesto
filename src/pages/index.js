import './index.css'
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js'
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithFormDelete from '../components/PopupWithFormDelete'
import PopupWithImage from '../components/PopupWithImage.js'
import UserInfo from '../components/UserInfo.js'
import Api from '../components/API.js'
import { formPopupEdit, editButton, formUserName, formDescription,
        addForm, addButton, formImageTitle, formLink,
         popupFormProfile, popupProfileButton, userAvatar,
         container, config} from '../utils/constants.js'

let myId = null;

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-29/",
  headers: {
    "Content-Type": 'application/json',
    authorization: '599d58cc-8009-4c2f-8eaa-205713197ccb',
  },
})

const popupUpdateAvatar = new PopupWithForm({
  popupSelector: '.popup_class_change-photo',
  submitForm: (data) => {
    popupUpdateAvatar.renderLoading(true);
    api.setAvatar({
      avatar: data.photo,
    })
      .then((data) => {
        userAvatar.src =  `${data.avatar}`
        popupUpdateAvatar.close();
      }).catch((err) => console.log(err))
        .finally(() => {
          popupUpdateAvatar.renderLoading(false);
      }) 
  }
});
popupProfileButton.addEventListener("click", () => {
  profileValidate.disabledButton();
  cardValidate.changeButtonState();
  popupUpdateAvatar.open();
});
popupUpdateAvatar.setEventListeners();

const infoProfile = new UserInfo('.profile__username', '.profile__user-description', '.profile__avatar');
const formEditProfile = new PopupWithForm({
  popupSelector: '.popup_class_edit',
  submitForm: (data) => {
    formEditProfile.renderLoading(true);
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
      }).catch((err) => console.log(err))
        .finally(() => {
          formEditProfile.renderLoading(false);
        })
  }
});

formEditProfile.setEventListeners();
editButton.addEventListener("click", () => {
    userValidate.disabledButton();
    formEditProfile.open();
    const currentInfo = infoProfile.getUserInfo()
    formUserName.value = currentInfo.userName;
    formDescription.value = currentInfo.userDescription;
});


const cardInfoSubmit = new PopupWithFormDelete({
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
    popupAddCard.renderLoading(true)
     api.addCard({
       name: formImageTitle.value,
       link: formLink.value
     }).then((data) => {
       cardList.setItem(createCard(data));
       popupAddCard.close();
     }).catch((err) => console.log(err))
       .finally(() => {
        popupAddCard.renderLoading(false);
    })
 }
});

addButton.addEventListener("click", () => {
  cardValidate.disabledButton();
  popupAddCard.open();
 });
 popupAddCard.setEventListeners();


const popupWithImage = new PopupWithImage('.popup_class_image-show');
popupWithImage.setEventListeners();

const createCard = (item) => {
  const card = new Card(item, ".template", 
    () => { popupWithImage.open(item.link, item.name); },
    (item) => {
      cardInfoSubmit.confirm(() => {
        cardInfoSubmit.renderLoading(true);
        api.deleteTask(item._id)
          .then(() => {
            card.delClickHandler();
            cardInfoSubmit.close();
          })
          .catch(err => console.log(`При удалении карточки: ${err}`))
          .finally(() => cardInfoSubmit.renderLoading(false));
      });
      cardInfoSubmit.open();
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


const userValidate = new FormValidator(config, formPopupEdit)
userValidate.enableValidation();
const cardValidate = new FormValidator(config, addForm)
cardValidate.enableValidation();
const profileValidate = new FormValidator(config, popupFormProfile)
profileValidate.enableValidation();

Promise.all([api.getCards(), api.getInfo()])
  .then(([cards, userData]) => {
    myId = userData._id;

    infoProfile.setUserInfo({
      formUserName: userData.name,
      formDescription: userData.about,
      userAvatar: userData.avatar
    });

    cardList.renderItems(cards.reverse());
  })
  .catch(err => console.log(`Ошибка загрузки данных: ${err}`))

