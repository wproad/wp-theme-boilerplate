import { addGlobalEventListener, onClickOutside } from "../../utils/helpers";

document.addEventListener("DOMContentLoaded", () => {
  addGlobalEventListener("click", ".dropdown-toggler", (e) => {
    const toggler = e.target;
    const wrapper = e.target.closest(".dropdown-wrapper");
    if (!wrapper) return;

    // Skip playlist dropdowns - let the playlist handler deal with them
    if (wrapper.classList.contains("add-to-playlist-dropdown")) {
      return;
    }

    e.stopPropagation();

    const dropdown = wrapper.querySelector(".dropdown");
    if (!dropdown) return;

    const openDropdowns = document.querySelectorAll(".dropdown.show");
    if (openDropdowns) {
      openDropdowns.forEach((d) => {
        if (d !== dropdown) d.classList.remove("show");
      });
    }

    dropdown.style.display = "";
    dropdown.classList.toggle("show");
    if (toggler) {
      toggler.classList.toggle("active");
    }
  });

  document.querySelectorAll(".dropdown-wrapper").forEach((wrapper) => {
    const dropdown = wrapper.querySelector(".dropdown");
    if (!dropdown) return;

    onClickOutside(wrapper, () => {
      dropdown.classList.remove("show");
      const toggler = wrapper.querySelector(".dropdown-toggler");
      if (toggler) {
        toggler.classList.remove("active");
      }
    });
  });
});
