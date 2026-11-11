export default function initAboutModal() {
  const modal = document.querySelector("#about-modal");
  const buttons = document.querySelectorAll("[data-open-about]");

  if (!modal || !buttons.length) return;

  const closeButton = modal.querySelector("[data-close-about]");
  let trigger = null;

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      trigger = button;

      modal.showModal();
      modal.scrollTop = 0;

      document.documentElement.classList.add("project-modal-open");
    });
  });

  closeButton.addEventListener("click", () => {
    modal.close();
  });

  modal.addEventListener("click", (event) => {
    if (event.target !== modal) return;

    const bounds = modal.getBoundingClientRect();

    const outside =
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom;

    if (outside) modal.close();
  });

  modal.addEventListener("close", () => {
    if (!document.querySelector("dialog[open]")) {
      document.documentElement.classList.remove("project-modal-open");
    }

    if (trigger?.isConnected) {
      trigger.focus({ preventScroll: true });
    }
  });
}
