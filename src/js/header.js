const mobileMenu = document.querySelector(".header-mobile-menu");
const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");

const toggleMobileMenu = () => {
  mobileMenu.classList.toggle("header-mobile-menu--hidden");
  mobileMenuToggle.classList.toggle("mobile-menu-toggle--close");
};

mobileMenuToggle.addEventListener("click", toggleMobileMenu, true);
