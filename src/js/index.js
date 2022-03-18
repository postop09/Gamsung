const secSplash = document.querySelector('.sec_splash');

function splash() {
  secSplash.style.display = 'none';
}
window.onload = setTimeout(splash, 2000);