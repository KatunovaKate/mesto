import PopupWithForm from './PopupWithForm';

export default class PopupWithFormDelete extends PopupWithForm {
  confirm(func) {
    this._submitForm = func;
  }
}
