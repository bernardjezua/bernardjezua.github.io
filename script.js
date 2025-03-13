// Function to toggle the mobile menu
function toggleMenu() {
    const menuLinks = document.querySelector('.menu-links');
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    menuLinks.classList.toggle('open');
    hamburgerIcon.classList.toggle('open');
    console.log('Menu toggled');
    
}

function sendMail(event) {
    event.preventDefault();
    
    var params = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        subject: document.getElementById("subject").value,
        message: document.getElementById("message").value,
    };

    const serviceID = "service_yfbfgik";
    const templateID = "template_nq46314";

    const submitButton = event.target.querySelector('button');
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';

    emailjs.send(serviceID, templateID, params)
        .then(res => {
            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
            document.getElementById("message").value = "";
            console.log(res);
            alert("Your message sent successfully!!");
            submitButton.disabled = false;
            submitButton.textContent = 'Submit';
        })
        .catch(err => {
            console.log(err);
            alert("Error sending message. Please try again.");
            submitButton.disabled = false;
            submitButton.textContent = 'Submit';
        });

    return false; 
}

// Function to handle responsiveness for navigation
function handleMobileNav() {
    const desktopNav = document.getElementById('desktop-nav');
    const hamburgerNav = document.getElementById('hamburger-nav');
}

// Function to handle sliders (Projects and Blogs)
function handleSlider(sliderId, direction) {
    const slider = document.getElementById(sliderId);
    if (!slider) return;

    const card = slider.querySelector('.project-card');
    if (!card) return;

    const cardWidth = card.offsetWidth + 32; // Card width + gap
    const maxScroll = slider.scrollWidth - slider.clientWidth;

    let newScroll = slider.scrollLeft + (cardWidth * direction);

    // Disable next button if at the end
    const nextButton = document.querySelector('.next-arrow');
    if (newScroll >= maxScroll) {
        newScroll = maxScroll;
        if (nextButton) nextButton.disabled = true;
    } else {
        if (nextButton) nextButton.disabled = false;
    }

    // Disable prev button if at the start
    const prevButton = document.querySelector('.prev-arrow');
    if (newScroll <= 0) {
        newScroll = 0;
        if (prevButton) prevButton.disabled = true;
    } else {
        if (prevButton) prevButton.disabled = false;
    }

    slider.scrollTo({
        left: newScroll,
        behavior: 'smooth',
    });
}

// Initialize everything when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initial mobile nav setup
    handleMobileNav();
    window.addEventListener('resize', handleMobileNav);

    // Set up menu toggle
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    if (hamburgerIcon) {
        hamburgerIcon.addEventListener('click', toggleMenu);
    }

    // Set up project slider controls
    document.querySelectorAll('#projects .slide-arrow').forEach((arrow) => {
        arrow.addEventListener('click', () => {
            const direction = arrow.classList.contains('prev-arrow') ? -1 : 1;
            handleSlider('projectsSlider', direction);
        });
    });

    // Set up blog slider controls
    document.querySelectorAll('#blogs .slide-arrow').forEach((arrow) => {
        arrow.addEventListener('click', () => {
            const direction = arrow.classList.contains('prev-arrow') ? -1 : 1;
            handleSlider('blogsSlider', direction);
        });
    });
});
