
export function addGlobalEventListener(type, selector, callback, parent = document) {
  parent.addEventListener(type, (e) => {
    // Ensure we only work with Elements (not text nodes, etc.)
    const origin = e.target instanceof Element ? e.target : null;
    const matched = origin ? origin.closest(selector) : null;

    // Make sure the matched element is inside the delegated parent
    if (matched && parent.contains(matched)) {
      // Pass the matched element to the callback for convenience
      callback(e, matched);
    }
  });
}



export function onClickOutside(targetElement, callback) {
  function handler(e) {
    if (!targetElement.contains(e.target)) {
      callback(e);
    }
  }

  document.addEventListener("click", handler);

  // optional: return a cleanup function
  return () => document.removeEventListener("click", handler);
}

/**
 * Attaches auto-resize behavior to a textarea element.
 * @param {HTMLTextAreaElement} textarea
 * @param {number} maxHeight
 */
export function attachAutoResize(textarea, maxHeight = 500) {
  function autoResize() {
    this.style.height = "auto";
    if (this.scrollHeight <= maxHeight) {
      this.style.overflowY = "hidden";
      this.style.height = this.scrollHeight + "px";
    } else {
      this.style.height = maxHeight + "px";
      this.style.overflowY = "auto";
    }
  }
  textarea.addEventListener("input", autoResize);

  // Initial resize if textarea has content
  if (textarea.value) {
    textarea.style.height = "auto";
    if (textarea.scrollHeight <= maxHeight) {
      textarea.style.overflowY = "hidden";
      textarea.style.height = textarea.scrollHeight + "px";
    } else {
      textarea.style.height = maxHeight + "px";
      textarea.style.overflowY = "auto";
    }
  }
}




