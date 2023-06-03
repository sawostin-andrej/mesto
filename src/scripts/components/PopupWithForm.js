import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._form = this._popup.querySelector(".popup__form");
    this._inputList = this._form.querySelectorAll(".popup__input");
    this._submitButtonSelector = this._form.querySelector(".popup__button");
    this.defaultButtonText = this._submitButtonSelector.textContent;
  }

  getInputValues() {
    this._values = {};
    this._inputList.forEach((input) => {
      this._values[input.name] = input.value;
    });
    return this._values;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitButtonSelector.textContent = `${this._submitButtonSelector.textContent}...`;
      const values = this.getInputValues();
      this._submitForm(values);
    });
  }

  settingsText() {
    this._submitButtonSelector.textContent = this.defaultButtonText;
  }

  close() {
    super.close();
    this._form.reset();
  }
}