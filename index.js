window.addEventListener("scroll", function () {
  var header = document.querySelector(".header");
  header.classList.toggle("scrolled", window.scrollY > 0);
});

// MENU BAR ACTIVE
document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll(".nav__link");

  links.forEach((link) => {
    link.addEventListener("click", function () {
      links.forEach((l) => l.classList.remove("active"));
      this.classList.add("active");
    });
  });
});

// SHOW MENU

const navMenu = document.getElementById("nav-links"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close"),
  loginButton = document.getElementById("login-button"),
  login__link = document.getElementById("login__link");

// MENU SHOW
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.remove("show");
    navToggle.style.display = "none";
  });
}
navClose.addEventListener("click", () => {
  navMenu.classList.add("show");
  navToggle.style.display = "block";
});
loginButton.addEventListener("click", () => {
  loginButton.classList.add("login__active");
});

const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "ri-sun-line";

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "ri-moon-line" : "ri-sun-line";

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.classList[selectedIcon === "ri-moon-line" ? "add" : "remove"](
    iconTheme
  );
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener("click", () => {
  // Add or remove the dark / icon theme
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  // We save the theme and the current icon that the user chose
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});




const nameContact = document.getElementById("name"),
  emailContact = document.getElementById("email"),
  subjectContact = document.getElementById("subject"),
  messageContact = document.getElementById("message");

const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = message;
  inputControl.classList.add("error");
  inputControl.classList.remove("success");
};

const setSuccess = (element) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = "";
  inputControl.classList.add("success");
  inputControl.classList.remove("error");
};

const isValidEmail = (email) => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(String(email).toLowerCase());
};





// function validateName(input) {
//   const names = input.split(/\s+/);
//   const numNames = names.length;
//   for (const name of names) {
//     if (!/^[a-zA-Z]+$/.test(name)) {
//       return "Numbers are not allowed in names"; 
//     }
//     if (name.length < 4) {
//       return "Each name should have at least 4 characters"; // Return specific error message
//     }
//   }
//   return numNames === 2 || numNames === 3;
// }
const resetErrors = () => {
  const errorElements = document.querySelectorAll('.error');
  const successElements = document.querySelectorAll('.success');

  errorElements.forEach((e) => {
    e.innerText =''
    
});
  successElements.forEach((e) =>{ 
    e.classList.remove('success');
  });
};



const validateInputs = () => {
  const emailValue = emailContact.value.trim();
  const nameValue = nameContact.value.trim();
  const subjectValue = subjectContact.value.trim();
  const messageValue = messageContact.value.trim();


  let isValid = true;

  // Validate email
  if (!isValidEmail(emailValue)) {
    setError(emailContact, "Provide a valid email address");
    isValid = false;
  } else if (emailValue === "") {
    setError(emailContact, "Email is required");
    isValid = false;
  } else {
    setSuccess(emailContact)
  }

  // Validate name
  if (nameValue === "") {
    setError(nameContact, "Name is required");
    isValid = false;
  } else {
    //     const nameValidationResult = validateName(nameValue);
    //     if (typeof nameValidationResult === "string") {
    //         setError(nameContact, nameValidationResult); // Display specific error message
    //         isValid = false;
    //     } else if (!nameValidationResult) {
    //         setError(nameContact, "The name should be at least 2 or 3 names");
    //         isValid = false;
    //     } else {
    setSuccess(nameContact);
  }

  // Validate subject
  if (subjectValue === "") {
    setError(subjectContact, "Subject is required");
    isValid = false;
  } else {
    setSuccess(subjectContact);
  }

  // Validate message
  if (messageValue === "") {
    setError(messageContact, "Message / Comment is required");
    isValid = false;
  } else {
    setSuccess(messageContact);
  }
  return isValid;
};


let messageData = [];

const handleSubmit = () => {
  const isValid = validateInputs();
  if (!isValid) { return }
  const existingUserData = JSON.parse(localStorage.getItem("LoginUser")) || [];
  const foundUser = existingUserData.find(user => user.email === emailContact.value);
  if (foundUser) {
    let user = { username: nameContact.value, email: emailContact.value, subject: subjectContact.value, message: messageContact.value }
    messageData.push(user);
    console.log(messageData);
    localStorage.setItem('contactInfo', JSON.stringify(messageData));
    alert("Your Message has been sent successfully!");
    nameContact.value = ''
    emailContact.value = ''
    subjectContact.value = ''
    messageContact.value = ''
    resetErrors()
  } else {
    setError(emailContact, "User not logged in");
  }

}


