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
  

const contactForm = document.getElementById("contact-form");
const sendEmail = (e)=>{
  e.preventDefault();
  emailjs.sendForm('service_kzutdjf', 'template_h8w87eq', '#contact-form', 'mbdQfTjlWxjvdh2ij').then(() => {
    Toastify({
      text: 'Message sent successfully ✅',
      position: 'right',
      duration: 3000, // milliseconds
      style: {
          width:"200px",
          background: '#fff',
          color: '#06ba18',
      }
  }).showToast();
      contactForm.reset();
  }).catch(() => {
    Toastify({
      text: 'Message not sent (service error) ❌',
      position: 'top-right',
      duration: 3000, // milliseconds
      style: {
        width:"200px",
          background: '#fff',
          color: '#eb4034',
          
      }
  }).showToast();
      contactForm.reset();
  });

}
contactForm.addEventListener('submit', sendEmail);
