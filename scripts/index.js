const popup = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.popup_class_edit');
const formPopupEdit = document.querySelector('.popup__form_class_edit');
const editButton = document.querySelector('.profile__edit-button');
const closeButtonEdit = document.querySelector('.popup__close-button_class_edit');
const formUserName = document.querySelector('.popup__form-name_class_edit');
const formDescription = document.querySelector('.popup__form-description_class_edit');

const userName = document.querySelector('.profile__user-name');
const description = document.querySelector('.profile__user-description');

const popupAdd = document.querySelector('.popup_class_add');
const addForm = document.querySelector('.popup__form_class_add');
const addButton = document.querySelector('.profile__add-button');
const closeButtonAdd = document.querySelector('.popup__close-button_class_add');

const popupShow = document.querySelector('.popup_class_image-show');
const closeButtonShow = document.querySelector('.popup__close-button_class_image-show');

const templateElement = document.querySelector('.template');
const container = document.querySelector('.elements__list');
const deleteButton = document.querySelector('.element__delete-button');

function togglePopup(popup) {
    if (!popup.classList.contains('popup_opened')) {
    formUserName.value = userName.textContent;
    formDescription.value = description.textContent;
    }
    popup.classList.toggle('popup_opened');
}

editButton.addEventListener('click', () => { togglePopup(popupEdit); });
addButton.addEventListener('click', () => { togglePopup(popupAdd); });
closeButtonEdit.addEventListener('click', () => { togglePopup(popupEdit); });
closeButtonAdd.addEventListener('click', () => { togglePopup(popupAdd); });
closeButtonShow.addEventListener('click', () => { togglePopup(popupShow); });

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    userName.textContent = formUserName.value;
    description.textContent = formDescription.value;
    togglePopup(popupEdit);
}
formPopupEdit.addEventListener('submit', formSubmitHandler);

function formAddElement(evt) {
	evt.preventDefault();
const formImageTitle = document.querySelector('.popup__form-name_class_add');
const formTitle = formImageTitle.value;
const formLink = document.querySelector('.popup__form-description_class_add');
const formImage = formLink.value;
const newElement = createElement({ name: formTitle, link: formImage});
addListener(newElement);
container.prepend(newElement);

formImageTitle.value = '';
formLink.value = '';
  togglePopup(popupAdd);
}

addForm.addEventListener('submit', formAddElement);


const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

  function renderList() {
	const Elements = initialCards.map(function(item) {
		const newElement = createElement(item);
		addListener(newElement);
		return newElement;
	});
	container.append(...Elements);
}

function createElement(item){
	const newElement = templateElement.content.cloneNode(true);
	const elementTitle = newElement.querySelector('.element__title');
  const elementImage = newElement.querySelector('.element__image');
  elementImage.addEventListener('click',() => {
    popupShow.classList.toggle('popup_opened');
    document.querySelector('.popup__image-text').textContent = elementTitle.textContent;
    document.querySelector('.popup__image').src = item.link;
  });
  const likeButton = newElement.querySelector('.element__like-button');
	elementTitle.textContent = item.name;
  elementImage.style.backgroundImage = 'url(' + item.link + ')';
  likeButton.addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__like-button_active');
    })
	return newElement;
}

function deleteElement(evt) {
	const target = evt.target;
	const currentElement = target.closest('.element');
	currentElement.remove();
}

function addListener(item) {
	const deleteButton = item.querySelector('.element__delete-button');
	deleteButton.addEventListener('click', deleteElement);
}

renderList();

