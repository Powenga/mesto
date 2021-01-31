export default class FormValidator {
  constructor(validationData, form) {
    this._formNode = form;
    this._inputSelector = validationData.inputSelector;
    this._submitButtonSelector = validationData.submitButtonSelector;
    this._inactiveButtonClass = validationData.inactiveButtonClass;
    this._inputErrorClass = validationData.inputErrorClass;
    this._errorClass = validationData.errorClass;

    this._inputs = [...this._formNode.querySelectorAll(this._inputSelector)];
    this._submitBttn = this._formNode.querySelector(this._submitButtonSelector);
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disableSubmit();
    } else {
      this._enableSubmit();
    }
  }

  _disableSubmit() {
    this._submitBttn.classList.add(this._inactiveButtonClass);
    this._submitBttn.disabled = true;
  }

  _enableSubmit() {
    this._submitBttn.classList.remove(this._inactiveButtonClass);
    this._submitBttn.disabled = false;
  }

  _hasInvalidInput() {
    return this._inputs.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _checkInputValidity(input) {
    if (!input.validity.valid) {
      this._showInputError(input);
    } else {
      this._hideInputError(input);
    }
  }

  _showInputError(input) {
    //Находим span конктетного input по id и создаваемому классу ${inputElement.id}-error
    const errorElement = this._formNode.querySelector(`.${input.id}-error`);
    //Добавляем классы ошибки инпута и показа span с текстом ошибки
    input.classList.add(this._inputErrorClass);
    //Текст ошибки
    errorElement.textContent = input.validationMessage;
    //Показываем span
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(input) {
    //Находим span конктетного input по id и создаваемому классу ${inputElement.id}-error
    const errorElement = this._formNode.querySelector(`.${input.id}-error`);
    //Убираем классы ошибки инпута и показа span с текстом ошибки
    input.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    //Очищаем тест ошибки
    errorElement.textContent = '';
  }

  _setEventListeners() {
    this._formNode.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._inputs.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      });
    });
  }

  resetValidation() {
    this._inputs.forEach((input) => {
      this._hideInputError(input)
    });
      this._toggleButtonState();
  }

  enableValidation() {
    this._setEventListeners();
  }
}
