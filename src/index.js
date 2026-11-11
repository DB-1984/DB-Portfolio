import Typed from "typed.js";
import AOS from "aos";
import "aos/dist/aos.css";
import initProjectModal from "./modal.js";
import initAboutModal from "./about-modal.js";

document.addEventListener("DOMContentLoaded", function () {
  // MODAL INIT
  initProjectModal();
  initAboutModal();

  // AOS TARGETS
  const hero = document.querySelector(".studio-hero");

  if (hero) {
    hero.setAttribute("data-aos", "fade-up");
  }

  const footer = document.querySelector(".studio-footer");

  if (footer) {
    footer.setAttribute("data-aos", "fade-down");
  }

  const stack = document.querySelector(".studio-stack");

  if (stack) {
    stack.setAttribute("data-aos", "fade-up");
  }

  const contact = document.querySelector(".studio-contact");

  if (contact) {
    contact.setAttribute("data-aos", "fade-in");
    contact.setAttribute("data-aos-duration", "1200");
  }

  document.querySelectorAll(".work-tile").forEach((tile) => {
    tile.setAttribute("data-aos", "fade-up");
    tile.setAttribute("data-aos-duration", "800");
  });

  const workIntro = document.querySelector(".studio-work__intro");

  if (workIntro) {
    workIntro.setAttribute("data-aos", "fade-right");
  }

  const contactIntro = document.querySelector(".studio-contact__intro");

  if (contactIntro) {
    contactIntro.setAttribute("data-aos", "fade-up");
  }

  // AOS INIT
  requestAnimationFrame(function () {
    AOS.init({
      duration: 700,
      once: true,
      offset: 60,
    });
  });
});

// TYPED.JS
const element = document.querySelector("#typed");

if (element) {
  new Typed(element, {
    strings: [
      "WordPress Developer.",
      "Full-stack Developer.",
      "App Developer.",
    ],
    typeSpeed: 50,
    backSpeed: 30,
    backDelay: 1500,
    loop: true,
  });
}
