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
  checkUserLogin();
});

// SHOW MENU

const navMenu = document.getElementById("nav-links"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close"),
  projectLink = document.getElementById("project-link"),
  loginButton = document.getElementById("login-button");

  const loaderDiv = document.getElementById('loading-spinner');
  function showLoader() {
      loaderDiv.style.display = 'block';
  }

  function hideLoader() {
      loaderDiv.style.display = 'none';
  }



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

function showToast(message, type) {
  const toast = document.createElement("div");
  toast.classList.add("toast");
  toast.innerHTML = message;

  if (type === "error") {
    toast.classList.add("error");
  } else if (type === "success") {
    toast.classList.add("success");
  } else if (type === 'info') {
    toast.classList.add("info");
  }
  else {
    console.error("Unknown toast type:", type);
    return;
  }

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}



const nameContact = document.getElementById("name"),
  emailContact = document.getElementById("email"),
  subjectContact = document.getElementById("subject"),
  messageContact = document.getElementById("message");
sms = document.getElementById('.sms');

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





const resetErrors = () => {
  const errorElements = document.querySelectorAll('.error');
  const successElements = document.querySelectorAll('.success');

  errorElements.forEach((e) => {
    e.innerText = ''

  });
  successElements.forEach((e) => {
    e.classList.remove('success');
  });
};

const resetErrorss = () => {
  const errorElements = document.querySelectorAll('.errors');
  const successElements = document.querySelectorAll('.successs');

  errorElements.forEach((e) => {
    e.innerText = ''

  });
  successElements.forEach((e) => {
    e.classList.remove('successs');
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


const handleSubmit = async () => {
  const isValid = validateInputs();
  if (!isValid) { return }
  let contactData = {
    userName: nameContact.value,
    email: emailContact.value,
    subject: subjectContact.value,
    message: messageContact.value
  }
  try {
    showLoader();
    const respond = await fetch("https://backend-mybrand-xea6.onrender.com/api/v1/contact/send-message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contactData)
    })
    if (!respond.ok) {
      const data = await respond.json();
      showToast("❌ " + data.message, "error");
    } else {
      hideLoader();
      const sendEmail = await fetch("https://backend-mybrand-xea6.onrender.com/api/v1/email/send-email",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactData)
      })
      if (!sendEmail.ok) {
        const data = await sendEmail.json();
        showToast("❌ " + data.message, "error");
      } else {
      const data = await sendEmail.json();
      showToast(data.message, "success");
      setTimeout(() => {
        nameContact.value = ''
        emailContact.value = ''
        subjectContact.value = ''
        messageContact.value = ''
        resetErrors()
      }, 300);
    }
  }
 } catch (error) {
    showToast(error.message, "error");
  }

}

function checkUserLogin() {
  const navbar = document.querySelector('.navbar');
  const projectLink = document.querySelector('#project-link');
  const UserToken = localStorage.getItem('token');
  const loginLink = document.getElementById("login__link");
  const loginButton = document.getElementById("login-button");

  let isLoggedIn = false; // replace false with your logic to check if the user is logged in

  if (!UserToken) {
    projectLink.style.display = "none";
  }
   else {
    projectLink.style.display = "block";
    isLoggedIn = true;
    if (isLoggedIn) {
      loginButton.textContent = "logout";
      loginLink.href = "#";
      loginButton.addEventListener("click",()=>{
        localStorage.removeItem('token');
        window.location.href = "./index.html";
      })
    }
  }
};