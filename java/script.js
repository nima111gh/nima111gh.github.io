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


    // Load saved language + section
    const savedLang = localStorage.getItem("preferredLang") || "en";

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
        home: "Home",
        bio: "Biography",
        contact: "Form",
        linkedin: "LinkedIn"
    },
    fa: {
        home: "خانه",
        bio: "بیوگرافی",
        contact: "فرم",
        linkedin: "لینکدین"
    }
};

document.addEventListener("DOMContentLoaded", () => {
    const banners = document.querySelectorAll("[data-animate]");
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, { threshold: 0.3 });

    banners.forEach(el => observer.observe(el));
});



document.addEventListener("DOMContentLoaded", () => {

    function handleFormSubmit(form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            const formData = new FormData(form);

            try {
                const response = await fetch("https://formspree.io/f/xyzdgder", {
                    method: "POST",
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    // Always redirect to English thank-you page
                    window.location.href = "/html/thankyou.html";
                } else {
                    alert("Oops! There was a problem submitting your form.");
                }
            } catch (error) {
                alert("Error submitting form. Please try again.");
            }
        });
    }

    // Attach handler to currently visible form
    const forms = document.querySelectorAll("#contact-form");
    forms.forEach(form => handleFormSubmit(form));

    // Optional: if you dynamically switch forms, reattach listener
    // Example: observe language changes
    const langButtons = document.querySelectorAll(".lang-btn");
    langButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            // Reattach listener to current form after language switch
            const currentForm = document.querySelector("#contact-form");
            if (currentForm) handleFormSubmit(currentForm);
        });
    });

});
