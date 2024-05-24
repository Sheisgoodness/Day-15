document.addEventListener("DOMContentLoaded", function () {
    const checkbox = document.getElementById("checkbox");
    const scrollUpBtn = document.querySelector(".scroll-up-btn");
    const form = document.getElementById("contact-form");
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');

    // Dark mode toggle
    checkbox.addEventListener("change", () => {
        document.body.classList.toggle("dark-mode");
    });

    // Typed text animation
    new Typed(".typing", {
        strings: ["Web Developer", "Designer"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    // Sticky Navigation
    window.addEventListener("scroll", () => {
        const navbar = document.querySelector(".navbar");
        const scrollPosition = window.scrollY;

        if (scrollPosition > 50) {
            navbar.classList.add("sticky");
        } else {
            navbar.classList.remove("sticky");
        }
    });

    // Menu toggle
    menuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        menuBtn.classList.toggle('active');
    });
    

    // Skill progress bars animation
    const skillSection = document.querySelector(".skills");
    const skillBars = document.querySelectorAll(".bars .line");

    function animateSkills() {
        const scrollPosition = window.scrollY;
        const skillSectionTop = skillSection.offsetTop;
        const windowHeight = window.innerHeight;

        if (scrollPosition > skillSectionTop - windowHeight + 200) {
            skillBars.forEach(bar => {
                const barWidth = bar.getAttribute('data-skill-level');
                bar.style.width = barWidth + '%';
            });
            window.removeEventListener("scroll", animateSkills); 
        }
    }

    window.addEventListener("scroll", animateSkills);

    // Scroll-up button
    window.addEventListener("scroll", () => {
        const scrollPosition = window.scrollY;

        if (scrollPosition > 300) {
            scrollUpBtn.classList.add("show");
        } else {
            scrollUpBtn.classList.remove("show");
        }
    });

    scrollUpBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Get form data
        const formData = new FormData(form);

        // Optional: Perform client-side validation
        const name = formData.get("name");
        const email = formData.get("email");
        const message = formData.get("message");

        if (!name || !email || !message) {
            alert("Please fill in all fields.");
            return;
        }

        // Construct the email body
        const emailBody = `Name: ${name}\nEmail: ${email}\nMessage: ${message}`;

        // Optional: Send the form data to a server using fetch or XMLHttpRequest
        // Replace 'your-server-url' with your actual server endpoint
        fetch("your-server-url", {
            method: "POST",
            body: emailBody,
            headers: {
                "Content-Type": "text/plain"
            }
        })
        .then(response => {
            if (response.ok) {
                alert("Message sent successfully!");
                form.reset(); // Reset the form after successful submission
            } else {
                throw new Error("Failed to send message.");
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Failed to send message. Please try again later.");
        });
    });

});
