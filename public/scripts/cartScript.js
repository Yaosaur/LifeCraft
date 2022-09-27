const selectors = document.querySelectorAll('.selector');
const updaters = document.querySelectorAll('.updatebtn');
const purchaseBtn = document.querySelector('#purchaseBtn');
const confirmation = document.querySelector('#confirmation');
const closeConfirmation = document.querySelector('#closeConfirmation');

selectors.forEach((selector, index) =>
  selector.addEventListener('change', event => updaters[index].click())
);

overlay.addEventListener('click', () => {
  removeDisplay(confirmation);
});

purchaseBtn &&
  purchaseBtn.addEventListener('click', event => {
    showDisplay(overlay);
    showDisplay(confirmation);
    axios.delete('http://localhost:3000/api/v1/cart/checkout');
  });

closeConfirmation.addEventListener('click', event => {
  location.reload();
});
