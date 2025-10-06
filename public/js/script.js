// tiny load probe so we can confirm the script executed on the page
console.log("script loaded: public/js/script.js");

// Dark mode toggle (defensive: check element exists)
const darkModeToggle = document.getElementById("darkModeToggle");
const html = document.documentElement;

// Check for saved theme preference or default to light mode
try {
  const currentTheme = localStorage.getItem("theme") || "light";
  if (currentTheme === "dark") {
    html.classList.add("dark");
  }
} catch (err) {
  // localStorage may be unavailable in some environments; fail silently
  console.warn("Theme load failed:", err);
}

if (darkModeToggle) {
  darkModeToggle.addEventListener("click", () => {
    html.classList.toggle("dark");
    try {
      const theme = html.classList.contains("dark") ? "dark" : "light";
      localStorage.setItem("theme", theme);
    } catch (err) {
      console.warn("Theme save failed:", err);
    }
  });
} else {
  console.warn(
    "darkModeToggle element not found - skipping dark mode listener"
  );
}

// Header scroll effect (defensive)
const header = document.getElementById("header");
if (header) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add(
        "bg-stone-100/95",
        "dark:bg-gray-900/95",
        "backdrop-blur-sm",
        "shadow-md"
      );
    } else {
      header.classList.remove(
        "bg-stone-100/95",
        "dark:bg-gray-900/95",
        "backdrop-blur-sm",
        "shadow-md"
      );
    }
  });
} else {
  console.warn("header element not found - skipping scroll effect");
}

// Smooth scroll for navigation (ignore bare "#" anchors)
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    // ignore anchors that only use "#" or are empty
    if (!href || href === "#") return;
    e.preventDefault();
    try {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } catch (err) {
      // invalid selector could throw; fail gracefully
      console.warn("Smooth scroll failed for", href, err);
    }
  });
});

// Prevent right-click & dragging on the page (or scope to the wrapper)-- to protect images
document.addEventListener("contextmenu", function (e) {
  try {
    // optionally: check e.target.closest('.your-image-wrapper') to scope it
    if (
      e.target &&
      e.target.closest &&
      e.target.closest(".relative.inline-block")
    ) {
      e.preventDefault();
    }
  } catch (err) {
    // defensive - don't break the page
    console.warn("contextmenu handler error:", err);
  }
});


// Loading screen

window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  const page = document.getElementById('about');

  // Step 1: Fade out loader
  loader.classList.add('opacity-0', 'transition-opacity', 'duration-500');

  // Step 2: After fade-out, hide loader completely and reveal main page
  setTimeout(() => {
    loader.style.display = 'none';

    // Reveal page
    page.classList.remove('opacity-0', 'translate-y-5');

    // Animate each section with a stagger
    const sections = document.querySelectorAll('.fade-section');
    sections.forEach((sec, i) => {
      setTimeout(() => {
        sec.classList.add('opacity-100', 'translate-y-0');
        sec.classList.remove('opacity-0', 'translate-y-5');
      }, 150 * i);
    });
  }, 3000);
});

// Disable scroll while loading
document.body.style.overflow = 'hidden';

window.addEventListener('load', () => {
  // Hide loader
  document.getElementById('loader').style.display = 'none';
  
  // Re-enable scroll
  document.body.style.overflow = 'auto';
});
