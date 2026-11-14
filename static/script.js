const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".nav");

menuButton?.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.textContent = isOpen ? "✕" : "☰";
});

navigation?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navigation.classList.remove("open");
    menuButton?.setAttribute("aria-expanded", "false");
    if (menuButton) menuButton.textContent = "☰";
  });
});

// Service cards preselect the relevant enquiry option.
document.querySelectorAll("[data-service]").forEach((link) => {
  link.addEventListener("click", () => {
    const select = document.querySelector('select[name="service"]');
    if (!select) return;
    const target = link.dataset.service;
    const option = [...select.options].find((item) =>
      item.text.toLowerCase().includes(target.toLowerCase())
    );
    if (option) select.value = option.value;
  });
});

const form = document.querySelector("#trip-form");
const status = document.querySelector("#form-status");
form?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;

  const data = new FormData(form);
  const lines = [
    "Hello Marinthal Miles Holidays! I'd like to enquire about a trip.",
    "",
    `Name: ${data.get("name")}`,
    `Service: ${data.get("service")}`,
    `Destination: ${data.get("destination") || "Not decided"}`,
    `Departure date: ${data.get("date") || "Not decided"}`,
    `Travellers: ${data.get("travellers") || "Not specified"}`,
    `Approximate budget: ${data.get("budget") || "Not specified"}`,
    `Additional details: ${data.get("details") || "None"}`,
    "",
    "Please share the available options and next steps."
  ];
  const message = encodeURIComponent(lines.join("\n"));
  const whatsappUrl = `https://wa.me/917039222334?text=${message}`;
  if (status) status.textContent = "Opening WhatsApp with your enquiry. Please review and send the message there.";
  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
});

document.querySelector("#year").textContent = new Date().getFullYear();
