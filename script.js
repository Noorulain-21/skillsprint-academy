// SkillSprint Academy — portfolio sample.
// Pure vanilla JS. No network calls, no accounts, no payments.
// Cart is kept in memory for the demo session; lesson progress is
// saved in localStorage so it survives a page reload in the same browser.

const courses = [
  {
    id: "html-css",
    title: "HTML & CSS Fundamentals",
    category: "Web Development",
    level: "Beginner",
    duration: "6 weeks",
    price: 4500,
    lessons: 24,
    description: "Learn semantic HTML, modern CSS layout, and responsive design by building sample pages from scratch.",
    gradient: "linear-gradient(135deg, #5b3df5, #00b8a9)",
    initials: "HC"
  },
  {
    id: "js-basics",
    title: "JavaScript for Beginners",
    category: "Web Development",
    level: "Beginner",
    duration: "8 weeks",
    price: 5500,
    lessons: 32,
    description: "A gentle, practical introduction to JavaScript: variables, functions, DOM interaction, and small sample projects.",
    gradient: "linear-gradient(135deg, #f59e0b, #ef4444)",
    initials: "JS"
  },
  {
    id: "python-data",
    title: "Python for Data Analysis",
    category: "AI & Data",
    level: "Beginner",
    duration: "8 weeks",
    price: 6500,
    lessons: 30,
    description: "Use Python and sample datasets to clean data, explore patterns, and create simple charts and summaries.",
    gradient: "linear-gradient(135deg, #0ea5e9, #6366f1)",
    initials: "PY"
  },
  {
    id: "ml-intro",
    title: "Introduction to Machine Learning",
    category: "AI & Data",
    level: "Intermediate",
    duration: "10 weeks",
    price: 8500,
    lessons: 36,
    description: "Understand the core ideas behind machine learning with sample problems, simple models, and honest limitations.",
    gradient: "linear-gradient(135deg, #7c3aed, #db2777)",
    initials: "ML"
  },
  {
    id: "ui-design",
    title: "UI Design Basics",
    category: "Design",
    level: "Beginner",
    duration: "5 weeks",
    price: 5000,
    lessons: 20,
    description: "Learn layout, colour, typography, and spacing, and practise by redesigning sample screens.",
    gradient: "linear-gradient(135deg, #ec4899, #f97316)",
    initials: "UI"
  },
  {
    id: "figma-proto",
    title: "Prototyping with Figma (Sample Workflow)",
    category: "Design",
    level: "Intermediate",
    duration: "4 weeks",
    price: 4500,
    lessons: 18,
    description: "Turn a sample brief into wireframes and a clickable prototype, and learn how to present design decisions.",
    gradient: "linear-gradient(135deg, #14b8a6, #2563eb)",
    initials: "FG"
  },
  {
    id: "excel-business",
    title: "Excel for Business Decisions",
    category: "Business",
    level: "Beginner",
    duration: "4 weeks",
    price: 4000,
    lessons: 16,
    description: "Build clean spreadsheets, use formulas and pivot-style summaries, and present sample business data clearly.",
    gradient: "linear-gradient(135deg, #16a34a, #0d9488)",
    initials: "XL"
  },
  {
    id: "freelance-basics",
    title: "Freelancing Basics for Beginners",
    category: "Business",
    level: "Beginner",
    duration: "3 weeks",
    price: 3500,
    lessons: 12,
    description: "Learn how to package a service, write a clear proposal, price sample work, and communicate professionally.",
    gradient: "linear-gradient(135deg, #475569, #7c3aed)",
    initials: "FL"
  }
];

const sampleLessons = [
  { id: "l1", title: "What is the web?", detail: "How pages, browsers, and servers fit together." },
  { id: "l2", title: "Your first HTML page", detail: "Headings, paragraphs, links, and images." },
  { id: "l3", title: "CSS layout basics", detail: "Box model, flexbox, and simple responsive grids." },
  { id: "l4", title: "Forms and buttons", detail: "Inputs, labels, and accessible sample forms." },
  { id: "l5", title: "Build a sample landing page", detail: "Combine everything into one finished page." }
];

const PROGRESS_KEY = "skillsprint-progress-v1";
let activeFilter = "All";
let searchTerm = "";
let cart = [];

function formatPKR(amount) {
  return "PKR " + amount.toLocaleString("en-PK");
}

function courseById(id) {
  return courses.find(function (course) { return course.id === id; });
}

// ---------- Course catalogue ----------
function filteredCourses() {
  const term = searchTerm.trim().toLowerCase();
  return courses.filter(function (course) {
    const matchesCategory = activeFilter === "All" || course.category === activeFilter;
    const haystack = (course.title + " " + course.category + " " + course.description).toLowerCase();
    const matchesSearch = term === "" || haystack.indexOf(term) !== -1;
    return matchesCategory && matchesSearch;
  });
}

function renderCourses() {
  const grid = document.getElementById("courseGrid");
  const countEl = document.getElementById("resultsCount");
  const emptyEl = document.getElementById("emptyState");
  const list = filteredCourses();

  countEl.textContent = list.length + " sample course" + (list.length === 1 ? "" : "s") + " shown";
  emptyEl.classList.toggle("hidden", list.length !== 0);

  grid.innerHTML = list.map(function (course) {
    const inCart = cart.some(function (item) { return item.id === course.id; });
    return (
      '<article class="course-card">' +
        '<div class="course-cover" style="background:' + course.gradient + '" aria-hidden="true">' + course.initials + "</div>" +
        '<span class="pill">' + course.category + "</span>" +
        "<h3>" + course.title + "</h3>" +
        "<p>" + course.description + "</p>" +
        '<div class="course-meta"><span>' + course.level + "</span><span>" + course.duration + "</span><span>" + course.lessons + " lessons</span></div>" +
        '<div class="course-foot"><span class="price">' + formatPKR(course.price) + "</span>" +
        '<button class="add-btn" type="button" data-add="' + course.id + '"' + (inCart ? " disabled" : "") + ">" +
          (inCart ? "In cart ✓" : "Add to cart") +
        "</button></div>" +
      "</article>"
    );
  }).join("");

  grid.querySelectorAll("[data-add]").forEach(function (button) {
    button.addEventListener("click", function () {
      addToCart(button.getAttribute("data-add"));
    });
  });
}

function setFilter(category) {
  activeFilter = category;
  document.querySelectorAll(".filter-btn").forEach(function (button) {
    button.classList.toggle("active", button.getAttribute("data-filter") === category);
  });
  renderCourses();
}

// ---------- Cart ----------
function renderCart() {
  const countEl = document.getElementById("cartCount");
  const itemsEl = document.getElementById("cartItems");
  const totalEl = document.getElementById("cartTotal");
  const checkoutButton = document.getElementById("checkoutButton");

  const total = cart.reduce(function (sum, item) { return sum + item.price; }, 0);
  countEl.textContent = String(cart.length);
  totalEl.textContent = formatPKR(total);
  checkoutButton.disabled = cart.length === 0;

  if (cart.length === 0) {
    itemsEl.innerHTML = "<li><span>Your demo cart is empty. Add a sample course from the catalogue.</span></li>";
    return;
  }

  itemsEl.innerHTML = cart.map(function (item) {
    return (
      "<li><div><strong>" + item.title + "</strong><small>" + item.category + " · " + item.duration + "</small></div>" +
      '<div><strong>' + formatPKR(item.price) + '</strong> ' +
      '<button class="remove-btn" type="button" data-remove="' + item.id + '">Remove</button></div></li>'
    );
  }).join("");

  itemsEl.querySelectorAll("[data-remove]").forEach(function (button) {
    button.addEventListener("click", function () {
      cart = cart.filter(function (item) { return item.id !== button.getAttribute("data-remove"); });
      hideCheckoutMessage();
      renderCart();
      renderCourses();
    });
  });
}

function addToCart(courseId) {
  const course = courseById(courseId);
  if (!course) { return; }
  if (cart.some(function (item) { return item.id === courseId; })) { return; }
  cart.push(course);
  hideCheckoutMessage();
  renderCart();
  renderCourses();
  openCart();
}

function openCart() {
  document.getElementById("cartDrawer").classList.remove("hidden");
  document.getElementById("cartOverlay").classList.remove("hidden");
}

function closeCart() {
  document.getElementById("cartDrawer").classList.add("hidden");
  document.getElementById("cartOverlay").classList.add("hidden");
}

function hideCheckoutMessage() {
  const message = document.getElementById("checkoutMessage");
  message.classList.add("hidden");
  message.textContent = "";
}

function checkout() {
  if (cart.length === 0) { return; }
  const total = cart.reduce(function (sum, item) { return sum + item.price; }, 0);
  const reference = "SS-DEMO-" + Math.floor(1000 + Math.random() * 9000);
  const message = document.getElementById("checkoutMessage");
  message.classList.remove("hidden");
  message.textContent =
    "Demo checkout complete! Reference " + reference + " for " + cart.length +
    " sample course(s), total " + formatPKR(total) +
    ". No payment was taken and no real enrolment was created.";
  cart = [];
  renderCart();
  renderCourses();
}

// ---------- Progress tracker ----------
function loadProgress() {
  try {
    const stored = JSON.parse(localStorage.getItem(PROGRESS_KEY) || "[]");
    return Array.isArray(stored) ? stored : [];
  } catch (error) {
    return [];
  }
}

function saveProgress(doneIds) {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(doneIds));
  } catch (error) {
    // Private browsing may block localStorage; the tracker still works in-session.
  }
}

function renderProgress() {
  const doneIds = loadProgress();
  const list = document.getElementById("lessonList");
  const bar = document.getElementById("progressBar");
  const wrap = document.getElementById("progressBarWrap");
  const label = document.getElementById("progressLabel");
  const percent = Math.round((doneIds.length / sampleLessons.length) * 100);

  bar.style.width = percent + "%";
  wrap.setAttribute("aria-valuenow", String(percent));
  label.textContent = doneIds.length + " of " + sampleLessons.length + " sample lessons complete (" + percent + "%)";

  list.innerHTML = sampleLessons.map(function (lesson) {
    const done = doneIds.indexOf(lesson.id) !== -1;
    return (
      '<li class="' + (done ? "done" : "") + '">' +
        '<input type="checkbox" id="lesson-' + lesson.id + '" data-lesson="' + lesson.id + '"' + (done ? " checked" : "") + " />" +
        '<label for="lesson-' + lesson.id + '"><strong>' + lesson.title + "</strong><small>" + lesson.detail + "</small></label>" +
      "</li>"
    );
  }).join("");

  list.querySelectorAll("[data-lesson]").forEach(function (checkbox) {
    checkbox.addEventListener("change", function () {
      let done = loadProgress();
      const id = checkbox.getAttribute("data-lesson");
      if (checkbox.checked) {
        if (done.indexOf(id) === -1) { done.push(id); }
      } else {
        done = done.filter(function (item) { return item !== id; });
      }
      saveProgress(done);
      renderProgress();
    });
  });
}

// ---------- Wire up ----------
document.getElementById("searchInput").addEventListener("input", function (event) {
  searchTerm = event.target.value;
  renderCourses();
});

document.querySelectorAll(".filter-btn").forEach(function (button) {
  button.addEventListener("click", function () {
    setFilter(button.getAttribute("data-filter"));
  });
});

document.getElementById("cartButton").addEventListener("click", openCart);
document.getElementById("closeCart").addEventListener("click", closeCart);
document.getElementById("cartOverlay").addEventListener("click", closeCart);
document.getElementById("checkoutButton").addEventListener("click", checkout);
document.getElementById("resetProgress").addEventListener("click", function () {
  saveProgress([]);
  renderProgress();
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") { closeCart(); }
});

renderCourses();
renderCart();
renderProgress();
