window.addEventListener('scroll', function() {
  var header = document.querySelector('.header');
  header.classList.toggle('scrolled', window.scrollY > 0);
});


// MENU BAR ACTIVE
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('.nav__link');
  
    links.forEach(link => {
      link.addEventListener('click', function() {
        links.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
      });
    });
  });


  // SHOW MENU

const navMenu = document.getElementById('nav-links'),
navToggle = document.getElementById('nav-toggle'),
navClose = document.getElementById('nav-close'),
loginButton = document.getElementById('login-button'),
login__link = document.getElementById('login__link');

// MENU SHOW
if (navToggle) {
navToggle.addEventListener('click',()=>{
  navMenu.classList.remove('show');
  navToggle.style.display= 'none';
})

}
  navClose.addEventListener('click', ()=>{
    navMenu.classList.add('show');
    navToggle.style.display='block'
  }) 
  loginButton.addEventListener('click',()=>{
    loginButton.classList.add('login__active')
  })

const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'ri-sun-line'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})
  

const sr = ScrollReveal({
  origin:'top',
  distance:"60px",
  duration:2500,
  delay:400,
  // reset:true // Animation repeat
})
sr.reveal(`.main__img, .about__image, .contact__mail`,{origin:'right'})
sr.reveal(`.home__name, .home__info,
          .about__comtainer ,.section__title-1, .about__info,
          .contact__social, .contact__data`,{origin:'left'})
sr.reveal(`.services__card, .project__card`,{interval:100})