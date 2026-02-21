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
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

window.dispatchEvent(new Event("scroll"));

// Fullscreen image functionality
const overlay = document.getElementById("fullscreen-overlay");
const fullscreenImage = document.getElementById("fullscreen-image");
const closeButton = document.querySelector(".close-button");
let imageScale = 1;
let initialPinchDistance = 0;
let initialScale = 1;

if (overlay && overlay.parentElement !== document.body) {
  document.body.appendChild(overlay);
}

function applyImageScale() {
  fullscreenImage.style.transform = `scale(${imageScale})`;
}

function resetImageScale() {
  imageScale = 1;
  applyImageScale();
}

function clampScale(value) {
  return Math.min(4, Math.max(1, value));
}

function getTouchDistance(touches) {
  const deltaX = touches[0].clientX - touches[1].clientX;
  const deltaY = touches[0].clientY - touches[1].clientY;
  return Math.hypot(deltaX, deltaY);
}

// Add click event to all images
document.querySelectorAll(".home-foto img, .gambar-bersama").forEach((img) => {
  img.addEventListener("click", function () {
    resetImageScale();
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
    resetImageScale();
  }, 300);
}

fullscreenImage.addEventListener(
  "wheel",
  function (event) {
    if (overlay.style.display !== "flex") {
      return;
    }

    event.preventDefault();
    const delta = event.deltaY < 0 ? 0.2 : -0.2;
    imageScale = clampScale(imageScale + delta);
    applyImageScale();
  },
  { passive: false },
);

fullscreenImage.addEventListener("dblclick", function () {
  imageScale = imageScale > 1 ? 1 : 2;
  applyImageScale();
});

fullscreenImage.addEventListener(
  "touchstart",
  function (event) {
    if (event.touches.length === 2) {
      initialPinchDistance = getTouchDistance(event.touches);
      initialScale = imageScale;
    }
  },
  { passive: true },
);

fullscreenImage.addEventListener(
  "touchmove",
  function (event) {
    if (event.touches.length !== 2 || initialPinchDistance === 0) {
      return;
    }

    event.preventDefault();
    const currentDistance = getTouchDistance(event.touches);
    const pinchRatio = currentDistance / initialPinchDistance;
    imageScale = clampScale(initialScale * pinchRatio);
    applyImageScale();
  },
  { passive: false },
);

fullscreenImage.addEventListener("touchend", function (event) {
  if (event.touches.length < 2) {
    initialPinchDistance = 0;
    initialScale = imageScale;
  }
});

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
