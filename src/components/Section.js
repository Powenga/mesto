export default class Section {
  constructor({renderer}, contaiterSelector){
    this._renderer = renderer;
    this._container = document.querySelector(contaiterSelector);
  }
  addItem(element){
    this._container.prepend(element);
  }
  renderItems(initialArray){
    initialArray.forEach(item => {
      this._renderer(item);
    });
  }
  clearContainer(){
    this._container.innerHTML = '';
  }
}
