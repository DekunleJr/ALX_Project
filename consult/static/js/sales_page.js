// Mobile Drawer Functionality
const hamburger = document.querySelector('.ham');
const mobileDrawer = document.querySelector('.index__mobi-navbar');
const closeBtn = document.querySelector('.index__mobi-navbar__head-close');
const body = document.querySelector('body');
hamburger.addEventListener('click', () => {
  mobileDrawer.classList.add('index__mobi-navbar--open');
  body.classList.add('no-overflow');
});
closeBtn.addEventListener('click', () => {
  mobileDrawer.classList.remove('index__mobi-navbar--open');
  body.classList.remove('no-overflow');
});

/* 
 SIGNUP AND LOGIN CODE
*/

const signupModal = document.querySelector('.index__sign-in-wrapper');
