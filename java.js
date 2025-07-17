// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Header background change on scroll
window.addEventListener("scroll", function () {
  const header = document.querySelector(".header");
  if (window.scrollY > 50) {
    header.style.background = "rgba(255, 255, 255, 0.98)";
    header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.15)";
  } else {
    header.style.background = "rgba(255, 255, 255, 0.95)";
    header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
  }
});

// Fullscreen image functionality
const overlay = document.getElementById("fullscreen-overlay");
const fullscreenImage = document.getElementById("fullscreen-image");
const closeButton = document.querySelector(".close-button");

// Add click event to all images
document.querySelectorAll(".home-foto img, .gambar-bersama").forEach((img) => {
  img.addEventListener("click", function () {
    fullscreenImage.src = this.src;
    fullscreenImage.alt = this.alt;
    overlay.style.display = "flex";
    document.body.style.overflow = "hidden";

    // Add fade in animation
    setTimeout(() => {
      overlay.style.opacity = "1";
    }, 10);
  });
});

// Close fullscreen on close button click
closeButton.addEventListener("click", closeFullscreen);

// Close fullscreen on overlay click
overlay.addEventListener("click", function (e) {
  if (e.target === overlay) {
    closeFullscreen();
  }
});

// Close fullscreen on escape key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && overlay.style.display === "flex") {
    closeFullscreen();
  }
});

function closeFullscreen() {
  overlay.style.opacity = "0";
  setTimeout(() => {
    overlay.style.display = "none";
    document.body.style.overflow = "";
  }, 300);
}

// Scroll animation observer
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, observerOptions);

// Add scroll animation to elements
document.querySelectorAll(".loading").forEach((el) => {
  el.classList.add("scroll-animate");
  observer.observe(el);
});

// Add loading animation delay
document.addEventListener("DOMContentLoaded", function () {
  const loadingElements = document.querySelectorAll(".loading");
  loadingElements.forEach((el, index) => {
    el.style.animationDelay = `${index * 0.2}s`;
  });
});

// Add hover effect to navigation
document.querySelectorAll(".listmenu a").forEach((link) => {
  link.addEventListener("mouseenter", function () {
    this.style.color = "#667eea";
  });

  link.addEventListener("mouseleave", function () {
    this.style.color = "#333";
  });
});

// Add click animation to contact items
document.querySelectorAll(".contact-item").forEach((item) => {
  item.addEventListener("click", function () {
    this.style.transform = "scale(0.95)";
    setTimeout(() => {
      this.style.transform = "translateY(-5px)";
    }, 150);
  });
});

// Copy to clipboard function
function copyToClipboard(button) {
  const addressElement = button
    .closest(".crypto-wallet")
    .querySelector(".crypto-address");
  const text = addressElement?.textContent.trim();

  if (!text) {
    console.error("Alamat tidak ditemukan.");
    button.textContent = "Error";
    setTimeout(() => {
      button.textContent = "Copy";
    }, 2000);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed"; // Agar tidak menggangu layout
  textarea.style.opacity = "0"; // Tak terlihat
  document.body.appendChild(textarea);
  textarea.select();

  try {
    document.execCommand("copy");
    button.textContent = "Copied!";
    button.classList.add("copied");
  } catch (err) {
    console.error("Gagal menyalin: ", err);
    button.textContent = "Error";
  }

  document.body.removeChild(textarea);

  setTimeout(() => {
    button.textContent = "Copy";
    button.classList.remove("copied");
  }, 2000);
}

// Add click event to social links
document.querySelectorAll(".social-link").forEach((link) => {
  link.addEventListener("click", function (e) {
    this.style.transform = "scale(0.95)";
    setTimeout(() => {
      this.style.transform = "translateY(-3px)";
    }, 100);
  });
});
