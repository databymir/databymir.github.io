'use strict';

// Smooth scrolling and URL update for navigation links
document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('[data-nav-link]');
  const select = document.querySelector("[data-select]");
  const filterBtn = document.querySelectorAll("[data-filter-btn]");

  // Smooth scroll and URL update for nav links
  links.forEach(link => {
      link.addEventListener('click', (e) => {
          e.preventDefault(); // Prevent default behavior

          const targetId = link.getAttribute('href'); // Get the target section ID

          // Call toggleActiveSection to show the target section
          toggleActiveSection(targetId);

          // Update the URL without reloading the page
          window.history.pushState(null, '', targetId);
      });
  });

  // Check if the page is loaded with a hash in the URL (like #portfolio) and activate the correct section
  const initialHash = window.location.hash;
  if (initialHash) {
      toggleActiveSection(initialHash);
  }

  // Dropdown functionality for filtering
  if (select) {
      select.addEventListener("click", function () {
          elementToggleFunc(this); // Function to toggle the dropdown
      });
  }

  // Add event listeners to filter buttons
  filterBtn.forEach(btn => {
      btn.addEventListener('click', () => {
          const category = btn.dataset.category;
          filterProjects(category); // Call function to filter projects
      });
  });
});

// Function to toggle visibility of sections based on the URL hash
function toggleActiveSection(sectionId) {
  // Remove 'active' class from all sections
  document.querySelectorAll('article').forEach(section => {
      section.classList.remove('active');
  });

  // Add 'active' class to the target section
  const targetSection = document.querySelector(sectionId);
  if (targetSection) {
      targetSection.classList.add('active');
  }

  // Update active link in the navbar
  document.querySelectorAll('.navbar-link').forEach(link => {
      link.classList.remove('active');
  });

  const activeLink = document.querySelector(`a[href="${sectionId}"]`);
  if (activeLink) {
      activeLink.classList.add('active');
  }
}

// Function to filter projects based on the selected category
function filterProjects(category) {
    const allProjects = document.querySelectorAll('.project-item'); // Get all project items
    allProjects.forEach(project => {
        if (category === 'all' || project.dataset.category === category) {
            project.style.display = 'block'; // Show project
        } else {
            project.style.display = 'none'; // Hide project
        }
    });
}




// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () {
  sidebar.classList.toggle("active"); // Update this to directly toggle the sidebar's class
});

// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");
const projectItems = document.querySelectorAll("[data-filter-item]"); // Select all project items

// Add event listener for opening the dropdown
select.addEventListener("click", function () {
  this.classList.toggle("active"); // Directly toggle the dropdown's class
});

// Add event listeners for each select item to filter projects
selectItems.forEach(item => {
    item.addEventListener('click', () => {
        const selectedCategory = item.dataset.category;
        selectValue.textContent = item.textContent; // Update the displayed value
       
        // Trigger the filter function
        filterProjects(selectedCategory);
    });
});


// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
      let selectedValue = this.innerText.toLowerCase();
      selectValue.innerText = this.innerText;
      select.classList.toggle("active"); // Directly toggle the dropdown's class
      filterFunc(selectedValue); // Make sure this function is defined somewhere
  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}