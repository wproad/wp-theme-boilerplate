export function showToast(message, type = "info", timeout = 3000) {

  // Create toast element
  const toast = document.createElement("div");
  toast.className = `toast-base toast-${type}`;
  toast.innerHTML = `
      <span>${message}</span>
      <button class="toast-close">&times;</button>
    `;

  // Close handler
  const closeBtn = toast.querySelector("button");
  const handleClose = () => {
    toast.classList.remove("toast-show");
    toast.addEventListener(
      "transitionend",
      () => {
        closeBtn.removeEventListener("click", handleClose);
        toast.remove();
      },
      { once: true }
    );
  };
  closeBtn.addEventListener("click", handleClose);

  // Append toast to end of body
  document.body.appendChild(toast);

  // Trigger ENTER transition
  requestAnimationFrame(() => toast.classList.add("toast-show"));

  // Auto remove
  if (timeout) {
    setTimeout(handleClose, timeout);
  }
}
// Example
// showToast("Saved successfully!", "success", 50000)
