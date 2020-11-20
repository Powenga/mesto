const popupSubmitBtnNode = document.querySelector('.popup__submit-btn');


popupSubmitBtnNode.addEventListener('click', changeProfileInfo);
popupSubmitBtnNode.addEventListener('click', togglePopup);

function changeProfileInfo (event) {
  event.preventDefault();
  profileInfo.forEach((elem, i = 0, text) => {
    text = popupInputNodes[i].value;
    elem.textContent = text;
  })
}
