const imageInput = document.getElementById('image');
const imagePreview = document.getElementById('imagePreview');
imageInput.addEventListener('blur', event => {
  if (event.target.value.trim().length > 0) {
    const newImage = document.createElement('img');
    newImage.src = `${event.target.value.trim()}`;
    imagePreview.removeChild(imagePreview.firstChild);
    imagePreview.appendChild(newImage);
  } else {
    return;
  }
});
