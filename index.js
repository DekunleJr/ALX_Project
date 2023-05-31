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
const signinTab = document.querySelector('.index__sign-in-body');
const signupTab = document.querySelector('.index__sign-up-body');
const signinOption = document.querySelector('#signin-option');
const signupOption = document.querySelector('#signup-option');
const allInput = document.querySelectorAll('input');
const signupBtn = document.querySelector('.index__sign-up-btn');
const signinErrortext = document.querySelector('.index__error-text');
const signinSuccesstext = document.querySelector('.index__success-text');
let user = {
  email: '',
  password: '',
};
const emailRegex = /^\w+([\.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const clearAllInput = () =>
  document.querySelectorAll('input').forEach((el) => (el.value = ''));
const openSignup = () => {
  signupModal.classList.add('index__sign-in-wrapper-shown');
  body.classList.add('no-overflow');
};

const closeSignup = () => {
  signupModal.classList.remove('index__sign-in-wrapper-shown');
  body.classList.remove('no-overflow');
};

const openSignupTab = () => {
  signinTab.classList.remove('d-block');
  signupTab.classList.add('d-block');
  signupOption.classList.add('index__active');
  signinOption.classList.remove('index__active');
  clearAllInput();
  user = {
    email: '',
    password: '',
  };
};
const openSigninTab = () => {
  signupTab.classList.remove('d-block');
  signinTab.classList.add('d-block');
  signinOption.classList.add('index__active');
  signupOption.classList.remove('index__active');
  clearAllInput();
  user = {
    email: '',
    password: '',
  };
};

const handleChange = (e) => {
  user = {
    ...user,
    [e.target.name]: e.target.value,
  };
  if (user.email && emailRegex.test(user.email) && user.password.length >= 8) {
    signupBtn.classList.remove('index__sign-up-btn--disabled');
  } else {
    signupBtn.classList.add('index__sign-up-btn--disabled');
  }
};

allInput.forEach((el) => el.addEventListener('input', (e) => handleChange(e)));

const handleSignup = () => {
  console.log('got here');
  if (user.email && emailRegex.test(user.email) && user.password.length >= 8) {
    console.log('got here too');
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    openSuccessPopup('Account creation successful');
    clearAllInput();
  }
};

const openErrorPopup = () => {
  signinErrortext.classList.add('d-block');
  setTimeout(() => {
    signinErrortext.classList.remove('d-block');
  }, 2000);
};
const openSuccessPopup = (text) => {
  signinSuccesstext.innerHTML = text;
  signinSuccesstext.classList.add('d-block');
  setTimeout(() => {
    signinSuccesstext.classList.remove('d-block');
  }, 2000);
};
const handleSignin = () => {
  const registeredUsers = JSON.parse(localStorage.getItem('users') || '[]');
  const registeredUser = registeredUsers.find(
    ({ email, password }) => email === user.email && password === user.password
  );
  if (!registeredUser) {
    openErrorPopup();
    return;
  }
  openSuccessPopup('Sign in successful');
  clearAllInput();
  setTimeout(() => {
    closeSignup();
  }, 3000);
};
