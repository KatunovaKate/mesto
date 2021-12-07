//Класс UserInfo отвечает за управление отображением информации о пользователе на странице.
export default class UserInfo {
    //Принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе.
    constructor(nameSelector, subSelector, avatarSelector) {
        this._nameSelector = document.querySelector(nameSelector);
        this._subSelector = document.querySelector(subSelector);
        this._avatarSelector = document.querySelector(avatarSelector);
    }

    //Содержит публичный метод getUserInfo, который возвращает объект с данными пользователя. 
    //Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
    getUserInfo() {
        return {
          userName: this._nameSelector.textContent,
          userDescription: this._subSelector.textContent,
          userAvatar: this._avatarSelector.src
        }
      }

    //Содержит публичный метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу.
    setUserInfo({ formUserName, formDescription, userAvatar }) {
        if (formUserName) {
            this._nameSelector.textContent = formUserName; 
        }
        if (formDescription) {
            this._subSelector.textContent = formDescription;
        }
        if (userAvatar) {
            this._avatarSelector.src = userAvatar;
        }
    }
}