//функция ошибки
//показываем
const showInputError = (formSelector, inputSelector, errorMessage, object) => {
  const errorElement = formSelector.querySelector(`#${inputSelector.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(object.errorClass);
}
//скрываем
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

//функция поиска невалидного поля
const hasInvalidInput = inputList => {
  return inputList.some((inputSelector) => {
    return !inputSelector.validity.valid;
  });
}

//функция переключения кнопки
const toggleButtonState = (inputList, buttonElement, object) => {
  if (hasInvalidInput(inputList, object)) {
    buttonElement.classList.add(object.inactiveButtonClass);
    buttonElement.setAttribute('disabled', '');
  } else {
    buttonElement.classList.remove(object.inactiveButtonClass);
    buttonElement.removeAttribute('disabled', '');
  }
};

//слушатель
const setEventListeners = (formElement, object) => {
  const inputList = Array.from(formElement.querySelectorAll(object.inputSelector));
  const buttonElement = formElement.querySelector(object.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, object);

  inputList.forEach((input) => {
    input.addEventListener('input', function () {
      checkInputValidity(formElement, input, object)
      toggleButtonState(inputList, buttonElement, object);
    })
  })
}

//функция валидации
const enableValidation = (object) => {
  //собираем все формочки в массив
  const formList = Array.from(document.querySelectorAll(object.formSelector));
  //проходимся по массиву и навешиваем слушатели
  formList.forEach((item) => {
      setEventListeners(item, object);
  });
}

//подключаем валидацию
enableValidation({
  formSelector: '.popup__form', //формы
  inputSelector: '.popup__input', //поля ввода
  submitButtonSelector: '.popup__button', //кнопка сохранить
  inactiveButtonClass: 'popup__button_invalid', //неактивная кнопка сохранить
  inputErrorClass: 'popup__input_type_error', //поле ввода с ошибкой
  errorClass: 'popup__error_visible' //span с ошибкой
});
