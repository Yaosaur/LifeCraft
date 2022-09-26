const selectors = document.querySelectorAll('.selector');
const updaters = document.querySelectorAll('.updatebtn');
const purchaseBtn = document.querySelector('#purchaseBtn');

selectors.forEach((selector, index) =>
  selector.addEventListener('change', event => updaters[index].click())
);

purchaseBtn.addEventListener('click', event => {
  axios.delete('http://localhost:3000/api/v1/cart/checkout');
});
