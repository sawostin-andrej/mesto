export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._popupCloseButton = this._popup.querySelector(".popup__close");
    this._form = this._popup.querySelector(".popup__form");
  }
  //закрытие на Esc
  _handleCloseEsc = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };
  //закрытие на крестик
  _handleCloseButton = () => {
    this.close();
  };
  //закрытие рядом с попап
  _handleClickOverlay = (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      this.close();
    }
  };

  setEventListeners() {
    this._popupCloseButton.addEventListener("click", this._handleCloseButton);
    this._popup.addEventListener("mousedown", this._handleClickOverlay);
  }

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleCloseEsc);
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleCloseEsc);
  }
}