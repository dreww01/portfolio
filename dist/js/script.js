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

window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  const hero = document.getElementById("about");

  // Set minimum loader display time (e.g., 3 seconds)
  const minDisplayTime = 1500;
  const startTime = performance.now();

  const hideLoader = () => {
    const elapsed = performance.now() - startTime;
    const remainingTime = Math.max(0, minDisplayTime - elapsed);

    setTimeout(() => {
      loader.classList.add("opacity-0", "transition-opacity", "duration-700");
      setTimeout(() => {
        loader.style.display = "none";
        document.body.classList.remove("overflow-hidden");

        // Show hero animation
        hero.classList.remove("opacity-0", "translate-y-6");
        hero.classList.add("opacity-100", "translate-y-0");
      }, 700); // wait for fade-out
    }, remainingTime);
  };

  hideLoader();
  document
    .querySelector("#about")
    .classList.remove("opacity-0", "translate-y-5");
  document
    .querySelector("#about")
    .classList.add("opacity-100", "translate-y-0");
});

// Auto-scroll reviews
// Auto-scroll reviews (guarded)
const reviewsContainer = document.getElementById("reviewsContainer");
if (reviewsContainer) {
  let autoScrollInterval = setInterval(() => {
    try {
      if (
        reviewsContainer.scrollLeft >=
        reviewsContainer.scrollWidth - reviewsContainer.clientWidth
      ) {
        reviewsContainer.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        reviewsContainer.scrollBy({ left: 320, behavior: "smooth" });
      }
    } catch (err) {
      console.warn("Auto-scroll error:", err);
    }
  }, 4000);

  // Pause auto-scroll on hover
  reviewsContainer.addEventListener("mouseenter", () => {
    clearInterval(autoScrollInterval);
  });

  reviewsContainer.addEventListener("mouseleave", () => {
    autoScrollInterval = setInterval(() => {
      try {
        if (
          reviewsContainer.scrollLeft >=
          reviewsContainer.scrollWidth - reviewsContainer.clientWidth
        ) {
          reviewsContainer.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          reviewsContainer.scrollBy({ left: 320, behavior: "smooth" });
        }
      } catch (err) {
        console.warn("Auto-scroll error:", err);
      }
    }, 4000);
  });
} else {
  console.warn("reviewsContainer element not found - skipping auto-scroll");
}

// Counter Animation
function animateCounter(element) {
  const target = parseFloat(element.getAttribute("data-target"));
  const suffix = element.getAttribute("data-suffix") || "";
  const duration = 2000;
  const steps = 60;
  const increment = target / steps;
  const stepDuration = duration / steps;
  let current = 0;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target + suffix;
      clearInterval(timer);
    } else {
      if (target > 100) {
        element.textContent = Math.floor(current) + suffix;
      } else {
        element.textContent = current.toFixed(1) + suffix;
      }
    }
  }, stepDuration);
}

// Trigger animation when stats section is visible
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counters = entry.target.querySelectorAll(".counter");
        counters.forEach((counter) => animateCounter(counter));
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

// Observe stats section
const statsSection = document.querySelector(".stats-section");
if (statsSection) {
  observer.observe(statsSection);
}

// Dark mode toggle (optional)
function toggleDarkMode() {
  document.documentElement.classList.toggle("dark");
  localStorage.setItem(
    "darkMode",
    document.documentElement.classList.contains("dark")
  );
}

// Load dark mode preference
if (localStorage.getItem("darkMode") === "true") {
  document.documentElement.classList.add("dark");
}
