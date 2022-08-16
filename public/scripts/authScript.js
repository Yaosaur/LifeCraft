const signIn = document.querySelector('#signIn');
const overlay = document.querySelector('#overlay');
const logIn = document.querySelector('#logIn');
const register = document.querySelector('#register');
const closeBtns = document.querySelectorAll('.close');
const registerBtn = document.querySelector('#registerBtn');

const showDisplay = element => {
  element.style.display = 'flex';
};

const removeDisplay = element => {
  element.style.display = 'none';
};

if (signIn) {
  signIn.addEventListener('click', () => {
    showDisplay(overlay);
    showDisplay(logIn);
  });
}

overlay.addEventListener('click', () => {
  removeDisplay(overlay);
  removeDisplay(register);
  removeDisplay(logIn);
});

closeBtns.forEach(element => {
  return element.addEventListener('click', () => {
    removeDisplay(overlay);
    removeDisplay(register);
    removeDisplay(logIn);
  });
});

registerBtn.addEventListener('click', () => {
  removeDisplay(logIn);
  showDisplay(register);
});
