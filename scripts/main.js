document.addEventListener("DOMContentLoaded", function() {
    // Mobile Menu Toggle
    const mobileMenuButton = document.getElementById("mobile-menu-button");
    const mobileMenu = document.getElementById("mobile-menu");

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener("click", function() {
            mobileMenu.classList.toggle("hidden");
        });
    }

    // Testimonial Carousel
    const testimonials = document.querySelectorAll(".testimonial");
    const prevButton = document.getElementById("testimonial-prev");
    const nextButton = document.getElementById("testimonial-next");
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.classList.add("hidden");
            if (i === index) {
                testimonial.classList.remove("hidden");
            }
        });
    }

    if (testimonials.length > 0 && prevButton && nextButton) {
        showTestimonial(currentTestimonial);

        nextButton.addEventListener("click", function() {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        });

        prevButton.addEventListener("click", function() {
            currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
            showTestimonial(currentTestimonial);
        });

        // Auto-rotate testimonials every 7 seconds
        setInterval(function() {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }, 7000);
    }

    // Project Filter 
    const filterButtons = document.querySelectorAll("[data-filter]");
    const projectItems = document.querySelectorAll(".project-item");

    if (filterButtons.length > 0 && projectItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener("click", function() {
                const filterValue = this.getAttribute("data-filter");
                
                // Update active button style
                filterButtons.forEach(btn => btn.classList.remove("active"));
                this.classList.add("active");
                
                // Filter projects
                projectItems.forEach(item => {
                    if (filterValue === "all") {
                        item.style.display = "block";
                    } else if (item.getAttribute("data-category") === filterValue) {
                        item.style.display = "block";
                    } else {
                        item.style.display = "none";
                    }
                });
            });
        });
    }

    // Form Validation
    const contactForm = document.getElementById("contact-form");
    
    if (contactForm) {
        contactForm.addEventListener("submit", function(e) {
            let isValid = true;
            const nameInput = document.getElementById("name");
            const emailInput = document.getElementById("email");
            const messageInput = document.getElementById("message");
            
            // Reset error states
            document.querySelectorAll(".error-message").forEach(el => el.textContent = "");
            document.querySelectorAll(".error-border").forEach(el => el.classList.remove("error-border"));
            
            // Validate name
            if (!nameInput.value.trim()) {
                displayError(nameInput, "Please enter your name");
                isValid = false;
            }
            
            // Validate email
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(emailInput.value.trim())) {
                displayError(emailInput, "Please enter a valid email address");
                isValid = false;
            }
            
            // Validate message
            if (!messageInput.value.trim()) {
                displayError(messageInput, "Please enter your message");
                isValid = false;
            }
            
            if (!isValid) {
                e.preventDefault();
            } else {
                // Typically would send data via AJAX here instead of form submit
                // For now, simulate successful submission
                e.preventDefault();
                submitFormSuccess();
            }
        });
    }
    
    function displayError(inputElement, message) {
        inputElement.classList.add("error-border");
        const errorElement = inputElement.nextElementSibling;
        if (errorElement && errorElement.classList.contains("error-message")) {
            errorElement.textContent = message;
        }
    }
    
    function submitFormSuccess() {
        const contactForm = document.getElementById("contact-form");
        const successMessage = document.getElementById("form-success");
        
        if (contactForm && successMessage) {
            contactForm.reset();
            contactForm.classList.add("hidden");
            successMessage.classList.remove("hidden");
            
            // Reset form after 5 seconds
            setTimeout(() => {
                contactForm.classList.remove("hidden");
                successMessage.classList.add("hidden");
            }, 5000);
        }
    }

    // Sticky Header on Scroll
    const header = document.querySelector("header");
    let lastScrollPosition = 0;

    window.addEventListener("scroll", function() {
        const scrollPosition = window.scrollY;
        
        if (scrollPosition > 100) {
            header.classList.add("sticky-header");
        } else {
            header.classList.remove("sticky-header");
        }
        
        lastScrollPosition = scrollPosition;
    });

    // Smooth Scroll for Navigation Links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            const href = this.getAttribute("href");
            
            if (href !== "#") {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                
                if (targetSection) {
                    // Close mobile menu if it's open
                    if (mobileMenu && !mobileMenu.classList.contains("hidden")) {
                        mobileMenu.classList.add("hidden");
                    }
                    
                    // Smooth scroll to section
                    window.scrollTo({
                        top: targetSection.offsetTop - 80, // Offset for header
                        behavior: "smooth"
                    });
                }
            }
        });
    });
});