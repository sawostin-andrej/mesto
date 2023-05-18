import FormValidator from "./FormValidator.js";
import initialCards from "./cardsData.js";
// import Card from "./Сard.js";

const formNew = document.querySelector('.popup__form_new')
const formEdit = document.querySelector('.popup__form_edit')
console.log({formNew, formEdit})
const enableValidation = {
  
  inputSelector: '.popup__input', //поля ввода
  submitButtonSelector: '.popup__button', //кнопка сохранить
  inactiveButtonClass: 'popup__button_invalid', //неактивная кнопка сохранить
  inputErrorClass: 'popup__input_type_error', //поле ввода с ошибкой
  errorClass: 'popup__error_visible' //span с ошибкой
}

const formNewInstance = new FormValidator(formNew, enableValidation)//создаем экземпляр класса
const formEditInstance = new FormValidator(formEdit, enableValidation)//создаем экземпляр класса

formEditInstance.enableValidation()
formNewInstance.enableValidation()

// переменные pop-up создание профиля
const popupProfile = document.querySelector(".popup_type_profile");
const inputName = popupProfile.querySelector("input[name='title']");
const inputAbout = popupProfile.querySelector("input[name='subtitle']");
const profile = document.querySelector(".profile");
const profileTitle = profile.querySelector(".profile__title");
const profileSubtitle = profile.querySelector(".profile__subtitle");
const editButton = profile.querySelector(".profile__edit-button");
const profileCloseBtn = popupProfile.querySelector(".popup__close")
// переменные для pop-up добавления карточки
const popupAdd = document.querySelector(".popup_type_add");
const popupAddButton = document.querySelector(".profile__add-button");
const buttonSubmitAdd = popupAdd.querySelector('.popup__button')
const formElementAdd = popupAdd.querySelector("form[name='addCard']");
const nameCardInput = popupAdd.querySelector("input[name='card-title']");
const urlCardInput = popupAdd.querySelector("input[name='card-link']");
const addCloseBtn = popupAdd.querySelector(".popup__close")
// переменные для pop-up картинки в большом масштабе
const popupWrapImage = document.querySelector(".popup_type_image");
const popupImage = popupWrapImage.querySelector(".popup__image");
const popupImageTitle = popupWrapImage.querySelector(".popup__image-title");
const imageCloseBtn = popupWrapImage.querySelector(".popup__close")
// переменные карточек
const cardItemTemplate = document.querySelector(".card-template").content;
const elementContainer = document.querySelector(".elements");


//Открытие pop-up
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEsc);
  popup.addEventListener('click', closePopupOverlay);
}

//открываем и подставляем значения
function openProfilePopup() {
  inputName.value = profileTitle.textContent;
  inputAbout.value = profileSubtitle.textContent;
  openPopup(popupProfile);
}

const openAddPopup = () => { 
  openPopup(popupAdd); 
  if (!nameCardInput.value && urlCardInput.value) {
    buttonSubmitAdd.classList.add('popup__button_invalid')
    buttonSubmitAdd.setAttribute('disabled', '')
  }
};

//функции закрытия pop-ups
//по клику на кнопку
function closePopup(popup) {
  document.removeEventListener('keydown', handleEsc);
  popup.removeEventListener('click', closePopupOverlay);
  popup.classList.remove('popup_opened');
}

//по нажатию по оверлею
const closePopupOverlay = event => {
  if (event.target !== event.currentTarget)
    return;
  closePopup(event.target);
}

//по нажатию Esc
function handleEsc(evt) {
  const activePopup = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
    closePopup(activePopup);
  }
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
  //клик по карточке
  imageElement.addEventListener("click", function () {
    openPopup(popupWrapImage);
    popupImage.src = imageElement.src;
    popupImageTitle.textContent = imageElement.alt;
    popupImage.alt = imageElement.alt;
  });
  // удаление
  deleteIcon.addEventListener("click", function () {
    deleteIcon.closest(".elements__item").remove();
  });
  // лайк
  likeButton.addEventListener("click", function () {
    likeButton.classList.toggle("element__like_active");
  });

  return cardElement;
};

//добавляем карточки в массив
const addCardToContainer = (elementContainer, cardElement) => {
  elementContainer.prepend(cardElement);
};

// показываем карточки из массива
initialCards.forEach((card) => {
  const cardElement = createCard(card.name, card.link);
  addCardToContainer(elementContainer, cardElement);
});

//обработчики форм
//редактирования профиля
function handleProfileFormSubmit(event) {
  event.preventDefault();
  profileTitle.textContent = inputName.value;
  profileSubtitle.textContent = inputAbout.value;
  closePopup(popupProfile);
}

//добавления карточки
const handleAddCardFormSubmit = (event) => {
  event.preventDefault();
  const nameCard = nameCardInput.value;
  const urlCard = urlCardInput.value;
  const elementItem = createCard(nameCard, urlCard);
  addCardToContainer(elementContainer, elementItem);
  formElementAdd.reset();
  closePopup(popupAdd);
};

//слушатели событий
//обрабатываем
formElementAdd.addEventListener("submit", handleAddCardFormSubmit);
popupProfile.addEventListener("submit", handleProfileFormSubmit);
//открываем
editButton.addEventListener("click", openProfilePopup);
popupAddButton.addEventListener("click", openAddPopup);
//закрываем
profileCloseBtn.addEventListener("click", () => closePopup(popupProfile));
addCloseBtn.addEventListener("click", () => closePopup(popupAdd));
imageCloseBtn.addEventListener("click", () => closePopup(popupWrapImage));
