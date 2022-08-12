const imageInput = document.getElementById('image');
const image = document.querySelector('#img img');
imageInput.addEventListener('blur', event => {
  if (event.target.value.trim().length > 0) {
    image.src = `${event.target.value.trim()}`;
  } else {
    return;
  }
});
