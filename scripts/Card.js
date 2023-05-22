class Card {
  constructor(data, openImage, selectorTemplate) {
    this._data = data;
    this._openImage = openImage;
    this._selectorTemplate = selectorTemplate;
  }

  _getTemplateCard() {
    return document
      .querySelector(this._selectorTemplate)
      .content.querySelector(".elements__item")
      .cloneNode(true);
  }

  _actionLike = () => {
    this._likeButton.classList.toggle("element__like_active");
  };

  _actionPopupWrapImage = () => {
    this._openImage(this._data);
  };

  _actionDelete = () => {
    this._cloneCard.remove();
    this._cloneCard = null;
  };

  _setEventListener() {
    this._likeButton.addEventListener("click", this._actionLike);
    this._deleteIcon.addEventListener("click", this._actionDelete);
    this._imageElement.addEventListener("click", this._actionPopupWrapImage);
  }

  createCard() {
    this._cloneCard = this._getTemplateCard();
    this._likeButton = this._cloneCard.querySelector(".element__like");
    this._deleteIcon = this._cloneCard.querySelector(".elements__delete-btn");
    this._imageElement = this._cloneCard.querySelector(".element__image");
    this._nameCard = this._cloneCard.querySelector(".element__title");
    this._setEventListener();

    this._imageElement.src = this._data.link;
    this._imageElement.alt = this._data.name;
    this._nameCard.textContent = this._data.name;

    return this._cloneCard;
  }
}

export default Card;
