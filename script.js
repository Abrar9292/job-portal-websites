document.addEventListener("DOMContentLoaded", function () {
    const counters = document.querySelectorAll(".counter");
    const applyForm = document.getElementById("applyForm");
    const searchBtn = document.querySelector(".search-box button");
    const navbar = document.querySelector(".portal-navbar");
    const themeToggle = document.getElementById("themeToggle");
    const backTop = document.getElementById("backToTop");
    const jobSearch = document.getElementById("jobSearch");
    const jobCards = document.querySelectorAll(".job-card");

    setTimeout(() => {
        const preloader = document.getElementById("preloader");
        if (preloader) preloader.style.display = "none";
    }, 700);

    function showToast(message) {
        const toastBox = document.getElementById("toastBox");
        if (!toastBox) return;

        const toast = document.createElement("div");
        toast.className = "custom-toast";
        toast.innerText = message;
        toastBox.appendChild(toast);

        setTimeout(() => toast.remove(), 2500);
    }

    counters.forEach((counter) => {
        counter.innerText = "0";
        const target = Number(counter.getAttribute("data-target"));
        const increment = Math.ceil(target / 80);

        function updateCounter() {
            const current = Number(counter.innerText);
            if (current < target) {
                counter.innerText = current + increment;
                setTimeout(updateCounter, 25);
            } else {
                counter.innerText = target + "+";
            }
        }

        updateCounter();
    });

    if (applyForm) {
        applyForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const submitBtn = document.querySelector(".portal-submit-btn");
            submitBtn.innerHTML = "Submitting...";
            submitBtn.style.opacity = "0.8";

            setTimeout(() => {
                showToast("Application submitted successfully!");
                applyForm.reset();
                submitBtn.innerHTML = "Submit Application";
                submitBtn.style.opacity = "1";
            }, 1200);
        });
    }

    if (searchBtn) {
        searchBtn.addEventListener("click", function () {
            showToast("Job search activated successfully!");
        });
    }

    if (jobSearch) {
        jobSearch.addEventListener("keyup", function () {
            const value = jobSearch.value.toLowerCase();

            jobCards.forEach((card) => {
                const text = card.innerText.toLowerCase();
                card.parentElement.style.display = text.includes(value) ? "block" : "none";
            });
        });
    }

    document.querySelectorAll(".job-card").forEach((card) => {
        const saveBtn = document.createElement("button");
        saveBtn.className = "save-job-btn";
        saveBtn.innerHTML = `<i class="fa-regular fa-heart"></i>`;
        card.appendChild(saveBtn);

        saveBtn.addEventListener("click", function () {
            saveBtn.classList.toggle("active");

            if (saveBtn.classList.contains("active")) {
                saveBtn.innerHTML = `<i class="fa-solid fa-heart"></i>`;
                showToast("Job saved successfully");
            } else {
                saveBtn.innerHTML = `<i class="fa-regular fa-heart"></i>`;
                showToast("Job removed");
            }
        });
    });

    document.querySelectorAll(".faq-question").forEach((question) => {
        question.addEventListener("click", function () {
            question.parentElement.classList.toggle("active");
        });
    });

    if (themeToggle) {
        if (localStorage.getItem("portalTheme") === "dark") {
            document.body.classList.add("dark-mode");
            themeToggle.innerHTML = `<i class="fa-solid fa-sun"></i>`;
        }

        themeToggle.addEventListener("click", function () {
            document.body.classList.toggle("dark-mode");

            if (document.body.classList.contains("dark-mode")) {
                localStorage.setItem("portalTheme", "dark");
                themeToggle.innerHTML = `<i class="fa-solid fa-sun"></i>`;
                showToast("Dark Mode Enabled");
            } else {
                localStorage.setItem("portalTheme", "light");
                themeToggle.innerHTML = `<i class="fa-solid fa-moon"></i>`;
                showToast("Light Mode Enabled");
            }
        });
    }

    window.addEventListener("scroll", function () {
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.style.padding = "14px 0";
                navbar.style.background = "rgba(15,23,42,0.98)";
            } else {
                navbar.style.padding = "18px 0";
                navbar.style.background = "rgba(15,23,42,0.92)";
            }
        }

        if (backTop) {
            backTop.classList.toggle("show", window.scrollY > 300);
        }
    });

    if (backTop) {
        backTop.addEventListener("click", function () {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }
    
});
