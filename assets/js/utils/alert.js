
// Add alert to a specific element: element.addAlert('message', 'type')
export function addAlert(element, message, type = "info", timeout = null) {
  const alert = document.createElement("div");
  alert.className = `alert-base alert-${type}`;
  alert.innerHTML = `
      <span>${message}</span>
      <button class="ml-3 text-3xl">&times;</button>
    `;

  const closeBtn = alert.querySelector("button");

  const handleClose = () => {
    alert.classList.remove("alert-show");
    alert.addEventListener(
      "transitionend",
      () => {
        closeBtn.removeEventListener("click", handleClose);
        alert.remove();
      },
      { once: true }
    );
  };

  closeBtn.addEventListener("click", handleClose);

  element.appendChild(alert);

  requestAnimationFrame(() => {
    alert.classList.add("alert-show");
  });

  if (timeout) {
    setTimeout(handleClose, timeout);
  }

  return alert;
}

// Prototype helper so you can call: myElement.addAlert('we have a problem', 'error')
if (!Element.prototype.addAlert) {
  // eslint-disable-next-line no-extend-native
  Element.prototype.addAlert = function (message, type = "info", timeout = null) {
    return addAlert(this, message, type, timeout);
  };
}
// Example
// showAlert("یه مشکلی پیش اومد!", "error")
