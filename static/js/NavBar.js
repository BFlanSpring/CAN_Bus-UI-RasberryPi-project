// const links = document.querySelectorAll(".nav__link");
// const light = document.querySelector(".nav__light");

// function calculateInitialPosition() {
//   const activeLink = document.querySelector(".nav__link.active");
//   return activeLink ? activeLink.offsetLeft + activeLink.offsetWidth / 2 - light.offsetWidth / 2 : 0;
// }

// // Calculate the initial position when the page loads
// light.style.left = `${calculateInitialPosition()}px`;

// function moveLight(event) {
//   const target = event.target;
//   const { offsetLeft, offsetWidth } = target;
//   const newPosition = offsetLeft + offsetWidth / 2 - light.offsetWidth / 2;
//   light.style.left = `${newPosition}px`;
// }

// function activeLink(linkActive) {
//   links.forEach((link) => {
//     link.classList.remove("active");
//     linkActive.classList.add("active");
//   });
// }

// links.forEach((link) => {
//   link.addEventListener("click", (event) => {
//     moveLight(event);
//     activeLink(link);
//   });
// });
