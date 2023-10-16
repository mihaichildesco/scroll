// Element.getBoundingClientRect() method returns the size of an element and its position relative to the viewport.
// pageYOffset is a read - only window property that returns the number of pixels the document has been scrolled vertically.
// slice extracts a section of a string without modifying original string
//offsetTop - A Number, representing the top position of the element, in pixels

// Get the current year and set it as the content of the element with the ID 'date'
const date = document.getElementById('date');
date.innerHTML = new Date().getFullYear();

// Toggle navigation links visibility
const navToggle = document.querySelector('.nav-toggle');
const linksContainer = document.querySelector('.links-container');
const links = document.querySelector('.links');

navToggle.addEventListener('click', function () {
  // Get the height of the links container and the height of the links themselves
  const containerHeight = linksContainer.getBoundingClientRect().height;
  const linksHeight = links.getBoundingClientRect().height;

  // If the container's height is 0, set it to the height of the links; otherwise, set it to 0
  if (containerHeight === 0) {
    linksContainer.style.height = `${linksHeight}px `;
  } else {
    linksContainer.style.height = 0;
  }
});

// Get the navbar and the top link elements
const navbar = document.getElementById('nav');
const topLink = document.querySelector('.top-link');

// Handle fixed navbar on scroll
window.addEventListener('scroll', function () {
  // Get the current scroll position
  const scrollHeight = window.scrollY;
  // Get the height of the navbar
  const navHeight = navbar.getBoundingClientRect().height;

  // Add or remove 'fixed-nav' class based on scroll position
  if (scrollHeight > navHeight) {
    navbar.classList.add('fixed-nav');
  } else {
    navbar.classList.remove('fixed-nav');
  }

  // Show or hide top link based on scroll position
  if (scrollHeight > 600) {
    topLink.classList.add('show-link');
  } else {
    topLink.classList.remove('show-link');
  }
});

// Handle smooth scrolling for links
const scrollLinks = document.querySelectorAll('.scroll-link');

scrollLinks.forEach(function (link) {
  link.addEventListener('click', function (e) {
    e.preventDefault();

    // Extract the ID of the target section from the clicked link
    const id = e.currentTarget.getAttribute('href').slice(1);
    // Find the corresponding element using the ID
    const element = document.getElementById(id);

    // Get the height of the navbar and the container holding the links
    const navHeight = navbar.getBoundingClientRect().height;
    const containerHeight = linksContainer.getBoundingClientRect().height;
    // Check if the navbar is fixed
    const fixedNav = navbar.classList.contains('fixed-nav');
    // Calculate the scroll position considering navbar and container height
    let position = element.offsetTop - navHeight;

    // Adjust position for fixed navbar and container height
    if (!fixedNav) {
      position = position - navHeight;
    }

    if (navHeight > 82) {
      position = position + containerHeight;
    }

    // Scroll to the calculated position smoothly
    window.scrollTo({
      left: 0,
      top: position,
      behavior: 'smooth',
    });

    // Collapse the menu when a link is clicked (for smaller screens)
    linksContainer.style.height = 0;
  });
});
