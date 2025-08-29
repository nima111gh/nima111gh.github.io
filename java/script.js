let slideIndex = 0;
showSlides();

function showSlides() {
    let slides = document.querySelectorAll(".slides");
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1 }
    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 3000); // Change image every 4 seconds
}

// Responsive Navbar Toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

document.addEventListener("DOMContentLoaded", () => {
    const backToTop = document.getElementById("backToTop");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 200) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }
    });

    backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const enBtn = document.getElementById("lang-en");
    const faBtn = document.getElementById("lang-fa");

    const enContent = document.querySelectorAll(".lang-en");
    const faContent = document.querySelectorAll(".lang-fa");

    function showLang(lang) {
        const navLinks = document.querySelectorAll(".nav-links a");
        const langSwitch = document.querySelector(".lang-switch");

        // Update page text
        if (lang === "en") {
            document.querySelectorAll(".lang-en").forEach(el => el.style.display = "block");
            document.querySelectorAll(".lang-fa").forEach(el => el.style.display = "none");
            document.body.setAttribute("dir", "ltr");
            document.getElementById("lang-en").classList.add("active");
            document.getElementById("lang-fa").classList.remove("active");
            localStorage.setItem("preferredLang", "en");
            langSwitch.classList.add("right");
            langSwitch.classList.remove("left");
        } else {
            document.querySelectorAll(".lang-en").forEach(el => el.style.display = "none");
            document.querySelectorAll(".lang-fa").forEach(el => el.style.display = "block");
            document.body.setAttribute("dir", "rtl");
            document.getElementById("lang-fa").classList.add("active");
            document.getElementById("lang-en").classList.remove("active");
            localStorage.setItem("preferredLang", "fa");
            langSwitch.classList.add("left");
            langSwitch.classList.remove("right");
        }

        // Update navbar labels
        navLinks.forEach(link => {
            const key = link.getAttribute("data-key");
            link.textContent = translations[lang][key];
        });
    }


    // Event listeners for language switch
    enBtn.addEventListener("click", () => {
        showLang("en");
        saveSection();
    });
    faBtn.addEventListener("click", () => {
        showLang("fa");
        saveSection();
    });

    // Save current section (hash) to localStorage
    function saveSection() {
        localStorage.setItem("lastSection", window.location.hash);
    }

    // Track when user navigates
    window.addEventListener("hashchange", saveSection);

    // Load saved language + section
    const savedLang = localStorage.getItem("preferredLang") || "en";
    const savedSection = localStorage.getItem("lastSection") || "";

    showLang(savedLang);

    // Jump to last visited section after content loads
    if (savedSection) {
        setTimeout(() => {
            window.location.hash = savedSection;
        }, 100); // tiny delay to ensure layout is ready
    }
});
const translations = {
    en: {
        bio: "Biography",
        contact: "Contact",
        linkedin: "LinkedIn"
    },
    fa: {
        bio: "بیوگرافی",
        contact: "تماس",
        linkedin: "لینکدین"
    }
};
