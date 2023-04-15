const showInputError = (formSelector, inputSelector, errorMessage, object) => {
  const errorElement = formSelector.querySelector(`#${inputSelector.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(object.errorClass);
}

//функция скрытия ошибки
const hideInputError = (formSelector, inputSelector, object) => {
  const errorElement = formSelector.querySelector(`#${inputSelector.id}-error`);
  errorElement.classList.remove(object.errorClass);
  errorElement.textContent = '';
}

//Функция проверки валидности формы
const checkInputValidity = (formSelector, inputSelector, object) => {
  if(!inputSelector.validity.valid) {
    showInputError(formSelector, inputSelector, inputSelector.validationMessage, object);
  }
  else {
    hideInputError(formSelector, inputSelector, object);
  }
}

//функция проверки валидности поля
const hasInvalidInput = inputList => {
  return inputList.some((inputSelector) => {
    return !inputSelector.validity.valid;
  });
}

//фукнция переключения кнопки в неактивный режим
const toggleButtonState = (inputList, submitButtonSelector, object) => {
  if(hasInvalidInput(inputList)) {
    submitButtonSelector.classList.add(object.inactiveButtonClass);
    submitButtonSelector.setAttribute('disabled', '');
  }
  else {
    submitButtonSelector.classList.remove(object.inactiveButtonClass);
    submitButtonSelector.removeAttribute('disabled', '');
  }
}

//Функция события форм
const setEventListeners = (formElement, object) => {
  const inputList = Array.from(formElement.querySelectorAll(object.inputSelector));
  const buttonElement = formElement.querySelector(object.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, object)

  inputList.forEach((inputSelector) => {
    inputSelector.addEventListener('input', function() {
      checkInputValidity(formElement, inputSelector, object);
      toggleButtonState(inputList, buttonElement, object)
    });
  });
}

//функция валидации
const enableValidation = (object) => {
  const formList = Array.from(document.querySelectorAll(object.formSelector));
  formList.forEach((item) => {
    item.addEventListener('submit', function(evt){
      evt.preventDefault();
    });
    formList.forEach((item) => {
      setEventListeners(item, object);
    });
  });
}

// включение валидации вызовом enableValidation
// все настройки передаются при вызове
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_invalid',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});