// Mobile Drawer Functionality
const hamburger = document.querySelector('.ham');
const mobileDrawer = document.querySelector('.index__mobi-navbar');
const closeBtn = document.querySelector('
          index__mobi-navbar__close-btn');
const navList = document.querySelector('.index__mobi-navbar__nav-list');
const navLinks = document.querySelectorAll('.index__mobi-navbar__nav-link');

hamburger.addEventListener('click', () => {  
    mobileDrawer.classList.toggle('index__mobi-navbar--active');
});

closeBtn.addEventListener('click', () => {
    mobileDrawer.classList.remove('index__mobi-navbar--active');
});

navLinks.forEach((link) => {
    link.addEventListener('click', () => {
        mobileDrawer.classList.remove('index__mobi-navbar--active');
    });
});

// Scrolling Functionality

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navList.classList.add('index__mobi-navbar__nav-list--active');
    } else {
        navList.classList.remove('index__mobi-navbar__nav-list--active');
    }
});
