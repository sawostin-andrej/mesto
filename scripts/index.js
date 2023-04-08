const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

// переменные попап создание профиля
const popupProfile = document.querySelector(".popup_type_profile");
const inputname = popupProfile.querySelector("input[name='title']");
const inputabout = popupProfile.querySelector("input[name='subtitle']");
const profile = document.querySelector(".profile");
const profiletitle = profile.querySelector(".profile__title");
const profilesubtitle = profile.querySelector(".profile__subtitle");
const editButton = profile.querySelector(".profile__edit-button");
const popupbutton = document.querySelector(".popup__button");

// переменные для pop-up добавления карточки
const popupCloseButtonAll = document.querySelectorAll(".popup__close");
const popupAdd = document.querySelector(".popup_type_add");
const popupAddButton = document.querySelector(".profile__add-button");
const formElementAdd = popupAdd.querySelector("form[name='addCard']");
const nameCardInput = popupAdd.querySelector("input[name='card-title']");
const urlCardInput = popupAdd.querySelector("input[name='card-link']");

// переменные для pop-up картинки в большом масштабе
const popupWrapImage = document.querySelector(".popup_type_image");
const popupImage = popupWrapImage.querySelector(".popup__image");
const popupImageTitle = popupWrapImage.querySelector(".popup__image-title");

// переменные карточек
const cardItemTemplate = document.querySelector(".card-template").content;
const elementContainer = document.querySelector(".elements");

function openPopup(popup) {
  popup.classList.toggle("popup_opened");
}

const closePopup = () => {
  document.querySelector(".popup_opened").classList.remove("popup_opened");
};

function openProfilePopup() {
  inputname.value = profiletitle.textContent;
  inputabout.value = profilesubtitle.textContent;
  openPopup(popupProfile);
}

const openAddPopup = () => {
  openPopup(popupAdd);
};

function formProfileSubmit(event) {
  event.preventDefault();
  profiletitle.textContent = inputname.value;
  profilesubtitle.textContent = inputabout.value;
  closePopup();
}

// создаём карточку
const createCard = (nameCard, urlCard) => {
  const cardElement = cardItemTemplate.cloneNode(true);
  const likeButton = cardElement.querySelector(".element__like");
  const imageElement = cardElement.querySelector(".element__image");
  const deleteIcon = cardElement.querySelector(".elements__delete-btn");

  imageElement.src = urlCard;
  imageElement.alt = nameCard;

  cardElement.querySelector(".element__title").textContent = nameCard;

  //слушатели
  imageElement.addEventListener("click", function () {
    openPopup(popupWrapImage);
    popupImage.src = imageElement.src;
    popupImageTitle.textContent = imageElement.alt;
  });

  deleteIcon.addEventListener("click", function () {
    deleteIcon.closest(".elements__item").remove();
  });

  likeButton.addEventListener("click", function () {
    likeButton.classList.toggle("element__like_active");
  });

  return cardElement;
};

const addCardToContainer = (elementContainer, cardElement) => {
  elementContainer.prepend(cardElement);
};

// отрисовываем карточки из массива
initialCards.forEach((card) => {
  const cardElement = createCard(card.name, card.link);

  addCardToContainer(elementContainer, cardElement);
});

// обработчик формы окна добавления карточки

const handleAddCardFormSubmit = (event) => {
  event.preventDefault();

  const nameCard = nameCardInput.value;
  const urlCard = urlCardInput.value;
  const elementItem = createCard(nameCard, urlCard);

  addCardToContainer(elementContainer, elementItem);
  formElementAdd.reset();
  closePopup();
};
formElementAdd.addEventListener("submit", handleAddCardFormSubmit);

popupAddButton.addEventListener("click", openAddPopup);
popupCloseButtonAll.forEach((button) => {
  button.addEventListener("click", closePopup);
});
popupProfile.addEventListener("submit", formProfileSubmit);

editButton.addEventListener("click", openProfilePopup);