class FormValidator {
  constructor( //параметры
    form,
    {
      inputSelector,
      submitButtonSelector,
      inactiveButtonClass,
      inputErrorClass,
      errorClass,
    }
  ) {
    //Создаем св-ва созданным элементам
    this._form = form; //формы
    this._inputSelector = inputSelector; //поля ввода
    this._submitButtonSelector = submitButtonSelector; //кнопка сохранить
    this._inactiveButtonClass = inactiveButtonClass; //неактивная кнопка сохранить
    this._inputErrorClass = inputErrorClass; //поле ввода с ошибкой
    this._errorClass = errorClass; //Spin с ошибкой
  }

  enableValidation() {// подключаем валидацию
    this._inputList = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    ); //форм
    this._buttonElement = this._form.querySelector(this._submitButtonSelector); //кнопки
    this._setEventListeners(); //подключаем слушатель
  }

  _setEventListeners() {//слушатель
    this.disableButton();//кнопка выключена
    this._inputList.forEach((input) => {//пройти по полям ввода формы
      input.addEventListener("input", () => {//добавить им слушатель
        this._checkInputValidity(input);//проверяем правильность введенных данных
        if (this._hasInvalidInput()) {
          this.disableButton();//если данные веедены неверно выключить кнопку
        } else {
          this._enableButton();//верно включить кнопку
        }
      });
    });
  }

  _hasInvalidInput() {//поле имеет неверный ввод
    return this._inputList.some((item) => !item.validity.valid);//вернуть невалидные поля
  }

  _checkInputValidity(input) {//проверяем правильность введенных данных
    const inputerrors = this._form.querySelector(`#${input.id}-error`);
    if (input.checkValidity()) {
      input.classList.remove(this._inputErrorClass); 
      inputerrors.classList.remove(this._errorClass);
      inputerrors.textContent = "";
    } else {
      input.classList.add(this._inputErrorClass);
      inputerrors.textContent = input.errorMessage;
      inputerrors.classList.add(this._errorClass);
    }
  }

  _enableButton() {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.removeAttribute("disabled");
  }

  disableButton() {
    console.log('hu')
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.setAttribute("disabled", true);
  }
}

export default FormValidator;
