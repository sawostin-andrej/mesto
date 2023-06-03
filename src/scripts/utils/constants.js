const editButton = document.querySelector(".profile__edit-button");
const popupAddButton = document.querySelector(".profile__add-button");
const buttonEditAvatar = document.querySelector(".profile__avatar-button");

const formEdit = document.querySelector(".popup__form_edit");
const formNew = document.querySelector(".popup__form_new");
const formAvatar = document.querySelector(".popup__form_avatar");

const selectorTemplate = ".card-template";
const elementContainer = ".elements";

const popupProfile = ".popup_type_profile";
const popupWrapImage = ".popup_type_image";
const popupAdd = ".popup_type_add";
const popupAvatarSelector = ".popup_type_avatar";
const popupDeleteCardSelector = ".popup_type_delete";

const setupValidation = {
  inputSelector: ".popup__input", //поля ввода
  submitButtonSelector: ".popup__button", //кнопка сохранить
  inactiveButtonClass: "popup__button_invalid", //неактивная кнопка сохранить
  inputErrorClass: "popup__input_type_error", //поле ввода с ошибкой
  errorClass: "popup__error_visible", //span с ошибкой
};

export default setupValidation;

const configInfo = {
  profileTitleSelector: ".profile__title",
  profileSubtitleSelector: ".profile__subtitle",
  profileAvatar: ".profile__avatar",
};

export {
  editButton,
  popupAddButton,
  buttonEditAvatar,
  formEdit,
  formNew,
  formAvatar,
  selectorTemplate,
  elementContainer,
  popupProfile,
  popupWrapImage,
  popupAdd,
  popupAvatarSelector,
  popupDeleteCardSelector,
  setupValidation,
  configInfo,
};