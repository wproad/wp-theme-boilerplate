export function showToast(message, type = "info", timeout = 3000) {
  const container = document.getElementById("spd-toast-container") || document.body;

  const toast = document.createElement("div");
  toast.className = `toast-base toast-${type}`;
  toast.innerHTML = `
      <span>${message}</span>
      <button class="toast-close">&times;</button>
    `;

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

  container.appendChild(toast);

  requestAnimationFrame(() => toast.classList.add("toast-show"));

  if (timeout) {
    setTimeout(handleClose, timeout);
  }
}
