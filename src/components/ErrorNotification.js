export default class ErrorNotification {
  constructor({data, handleClick}, templateSelector) {
    this._title = data.title;
    this._handleClick = handleClick;
    this._templateSelector = templateSelector;
    this._generate();
  }

  _getTemplate() {
    const node = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.error-notification')
      .cloneNode(true);
    return node;
  }

  setErrorType (errorType) {
    this._errorType = errorType;
  }

  show() {
    this._element.classList.add('error-notification_visible');
  }

  hide() {
    this._element.classList.remove('error-notification_visible');
  }

  _render() {
    this._container.append(this._element);
  }

  _setEventListener() {
    this._element.addEventListener('click', (evt) => {
      this._handleClick(evt, {title: this._title, text: this._errorType})
    })
  }

  setContainer(container) {
    this._container = container;
    this._setContainerPosition();
    this._render();
  }

  _setContainerPosition() {
    let position = this._container.style.position;
    if(position !== 'absolute' ||
      position !== 'relative' ||
      position !== 'fixed') {
        this._container.style.position = 'relative';
    }
  }

  _generate() {
    this._element = this._getTemplate();
    this._setEventListener();
  }

}
