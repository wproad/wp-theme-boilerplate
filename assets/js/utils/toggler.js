/**
 * Adds toggle behavior to elements.
 * @param {string} selector - CSS selector for the elements to toggle
 * @param {string} toggleClass - The class to toggle
 * @param {boolean} single - If true, only one element can have the class at a time
 */
export function toggleClassOnClick(selector, toggleClass, single = true) {
  document.querySelectorAll(selector).forEach((el) => {
    el.addEventListener("click", () => {
      if (el.classList.contains(toggleClass)) {
        el.classList.remove(toggleClass);
      } else {
        if (single) {
          document.querySelectorAll(selector + "." + toggleClass).forEach((other) => {
            other.classList.remove(toggleClass);
          });
        }
        el.classList.add(toggleClass);
      }
    });
  });
}
