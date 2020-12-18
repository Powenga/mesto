function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement, object) {
  if(hasInvalidInput(inputList)) {
    buttonElement.classList.add(object.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(object.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

function showInputError(formElement, inputElement, errorMessage, object) {
    //Находим span конктетного input по id и создаваемому классу ${inputElement.id}-error
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
    //Добавляем классы ошибки инпута и показа span с текстом ошибки
    inputElement.classList.add(object.inputErrorClass);
    //Текст ошибки
    errorElement.textContent = errorMessage;
    //Показываем span
    errorElement.classList.add(object.errorClass);

}

function hideInputError(formElement, inputElement, object) {
  //Находим span конктетного input по id и создаваемому классу ${inputElement.id}-error
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  //Убираем классы ошибки инпута и показа span с текстом ошибки
  inputElement.classList.remove(object.inputErrorClass);
  errorElement.classList.remove(object.errorClass);
  //Очищаем тест ошибки
  errorElement.textContent = '';
}

function checkInputValidity(formElement, inputElement, object) {
  //принимаем форму и инпут и проверяем инпут на правильность заполнения
  //Если неправильно запускаем showInputError()
  if(!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, object);
  } else {
    hideInputError(formElement, inputElement, object);
  }

}

function setEventListener(formElement, object) {
  //Получаем форму, находим все элементы формы
  const inputList = Array.from(formElement.querySelectorAll(object.inputSelector));
  //Для формы отключаем кнопку submit
  //Сначала находим ее
  const submitButton = formElement.querySelector(object.submitButtonSelector);
  toggleButtonState(inputList, submitButton, object);
  //Для каждого input в цикле вешаем обработчик события 'input' с функцией проверки checkInputValidity()
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, object);
      toggleButtonState(inputList, submitButton, object);
    })
  })
}

function enableValidation(object) {
  //Найти все формы с классом popup__form
  const formList = Array.from(document.querySelectorAll(object.formSelector));
  //Переберем все формы в цикле и отменим стандартное поведение (уже отменено, но всеже)
  formList.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })
    //Для каждой формы в цикле повесим обработчики функцией setEventListener()
    setEventListener(form, object);
  })

}

const profileNode = document.querySelector('.profile');

profileNode.addEventListener('click', (evt) => {
  if(evt.target.classList.contains('btn')) {
    enableValidation({
      formSelector: '.popup__form',
      inputSelector: '.popup__input',
      submitButtonSelector: '.popup__button',
      inactiveButtonClass: 'popup__button_disabled',
      inputErrorClass: 'popup__input_type_error',
      errorClass: 'popup__error_visible'
    });
  }
})

