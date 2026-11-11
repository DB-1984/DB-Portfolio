import projects from "../assets/data/projects.json";

export default function initProjectModal() {
  const grid = document.querySelector(".work-index");
  const modal = document.querySelector("#project-modal");

  if (!grid || !modal) return;

  const title = modal.querySelector("#project-modal-title");
  const summary = modal.querySelector(".project-modal__summary");
  const stack = modal.querySelector(".project-modal__stack");
  const video = modal.querySelector(".project-modal__video");
  const description = modal.querySelector(".project-modal__description");
  const links = modal.querySelector(".project-modal__links");
  const note = modal.querySelector(".project-modal__note");
  const closeButton = modal.querySelector(".project-modal__close");

  let trigger = null;

  function createTextElement(tag, text) {
    const element = document.createElement(tag);
    element.textContent = text;
    return element;
  }

  function addLink(label, url) {
    if (!url) return;

    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.append(document.createTextNode(label));

    const arrow = createTextElement("span", "↗");
    arrow.setAttribute("aria-hidden", "true");

    link.append(arrow);
    links.append(link);
  }

  function openProject(project, button) {
    trigger = button;

    title.textContent = project.title;
    summary.textContent = project.summary;

    stack.replaceChildren(
      ...project.stack.map((technology) => createTextElement("li", technology))
    );

    description.replaceChildren(
      ...project.description.map((paragraph) =>
        createTextElement("p", paragraph)
      )
    );

    links.replaceChildren();
    video.replaceChildren();
    video.hidden = !project.youtube;

    if (project.youtube) {
      const iframe = document.createElement("iframe");

      iframe.src = project.youtube;
      iframe.title = `${project.title} — video demonstration`;
      iframe.allow =
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      iframe.allowFullscreen = true;
      iframe.referrerPolicy = "strict-origin-when-cross-origin";

      video.append(iframe);
    }

    addLink("Visit site", project.liveDemo);
    addLink("View GitHub", project.github);

    links.hidden = !project.liveDemo && !project.github;

    note.textContent = project.demoNote || "";
    note.hidden = !project.demoNote;

    modal.showModal();
    modal.scrollTop = 0;

    document.documentElement.classList.add("project-modal-open");
  }

  // Generate the grid from the JSON.
  const tiles = projects.map((project) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "work-tile";
    button.dataset.project = project.id;
    button.dataset.aos = "fade-up";
    button.setAttribute("aria-haspopup", "dialog");
    button.setAttribute("aria-controls", "project-modal");

    const image = document.createElement("img");
    image.className = "work-tile__image";
    image.src = project.img;
    image.alt = "";
    image.loading = "lazy";

    const caption = document.createElement("span");
    caption.className = "work-tile__caption";

    caption.append(
      createTextElement("span", project.title),
      createTextElement("span", project.stack.slice(0, 2).join(" / "))
    );

    button.append(image, caption);

    button.addEventListener("click", () => {
      openProject(project, button);
    });

    return button;
  });

  grid.replaceChildren(...tiles);

  closeButton.addEventListener("click", () => {
    modal.close();
  });

  // Close when clicking the backdrop.
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

  // Also runs when closed using Escape.
  modal.addEventListener("close", () => {
    video.replaceChildren();

    if (!document.querySelector("dialog[open]")) {
      document.documentElement.classList.remove("project-modal-open");
    }

    if (trigger?.isConnected) {
      trigger.focus({ preventScroll: true });
    }
  });
}
