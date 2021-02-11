export default class Section {
  constructor({data, renderer}, contaiterSelector){
    this._initialArray = data;
    this._renderer = renderer;
    this._container = document.querySelector(contaiterSelector);
  }
  addItem(element){
    this._container.prepend(element);
  }
  renderItems(){
    this._initialArray.forEach(item => {
      this._renderer(item);
    });
  }
  clearContainer(){
    this._container.innerHTML = '';
  }
}
