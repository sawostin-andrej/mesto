class Card {
  constructor(data, selectorTemplate, openImage, openDeletePopup, changeLike) {
    this._data = data;
    this._ownerId = data.owner._id;
    this._myid = data.myid;
    this.likes = data.likes;
    this._likesLength = data.likes.length;
    this._changeLike = changeLike;
    this._cardId = data._id;
    this._selectorTemplate = selectorTemplate;
    this._openImage = openImage;
    this._openDeletePopup = openDeletePopup;
  }

  _getTemplateCard() {
    return document
      .querySelector(this._selectorTemplate)
      .content.querySelector(".elements__item")
      .cloneNode(true);
  }

  _actionLike = () => {
    this._changeLike(this._likeButton, this._cardId);
  };

  _actionPopupWrapImage = () => {
    this._openImage(this._data);
  };

  _actionDelete = () => {
    this._openDeletePopup({ card: this, cardId: this._cardId });
  };

  _setEventListener() {
    this._likeButton.addEventListener("click", this._actionLike);
    this._deleteIcon.addEventListener("click", this._actionDelete);
    this._imageElement.addEventListener("click", this._actionPopupWrapImage);
  }

  _changeVisibleForIconDelete() {
    this._myid === this._ownerId
      ? (this._deleteIcon.style.display = "block")
      : (this._deleteIcon.style.display = "none");
  }

  _checkLikeAvilability() {
    this.likes.forEach((item) => {
      if (item._id === this._myid) {
        this._likeButton.classList.add("element__like_active");
        return;
      }
    });
    this._numberLikes.textContent = this._likesLength;
  }

  toggleLike(likes) {
    this._likeButton.classList.toggle("element__like_active");
    this._numberLikes.textContent = likes.length;
  }

  removeCard() {
    this._cloneCard.remove();
    this._cloneCard = null;
  }

  createCard() {
    this._cloneCard = this._getTemplateCard();
    this._likeButton = this._cloneCard.querySelector(".element__like");
    this._deleteIcon = this._cloneCard.querySelector(".elements__delete-btn");
    this._imageElement = this._cloneCard.querySelector(".element__image");
    this._nameCard = this._cloneCard.querySelector(".element__title");
    this._numberLikes = this._cloneCard.querySelector(".element__number-likes");
    this._setEventListener();

    this._imageElement.src = this._data.link;
    this._imageElement.alt = this._data.name;
    this._nameCard.textContent = this._data.name;
    this._changeVisibleForIconDelete();
    this._checkLikeAvilability();

    return this._cloneCard;
  }
}

export default Card;