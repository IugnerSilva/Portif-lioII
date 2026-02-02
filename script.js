const contactform = document.getElementById('contato-form'),
    contactMessage = document.getElementById('contato-message')

const sendEmail = (e) => {
    e.preventDefault()

    emailjs.sendForm('service_a540a1q', 'template_pmat40e', '#contato-form', 'L2s7KrWVCe9g5FMo_')
        .then(() => {
            contactMessage.textContent = 'Mensagem enviada com sucesso✅'

            setTimeout(() => {
                contactMessage.textContent = ''
            }, 5000)

            contactform.reset()
        }, () => {
            contactMessage.textContent = 'Mensagem não enviada (error) !'
        })

}

contactform.addEventListener('submit', sendEmail)


const header = document.querySelector('header')
const navMenu = document.getElementById('nav-menu')
const navToggle = document.getElementById('nav-toggle')
const navClose = document.getElementById('nav-close')

// Abrir menu
navToggle.addEventListener('click', () => {
    navMenu.classList.add('show-menu')
    header.classList.add('menu-open')
})

// Fechar menu
navClose.addEventListener('click', () => {
    navMenu.classList.remove('show-menu')
    header.classList.remove('menu-open')
})

// Fechar ao clicar em link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
        header.classList.remove('menu-open')
    })
})

// Carousel Projects
const track = document.querySelector('.carousel-track');
const prevButton = document.querySelector('.prev-btn');
const nextButton = document.querySelector('.next-btn');

if (track && prevButton && nextButton) {
    const cards = Array.from(track.children);
    let currentIndex = 0;
    let itemsPerPage = 3; // Default

    // Function to calculate and set card widths
    const setCardDimensions = () => {
        const container = document.querySelector('.carousel-container');
        const containerWidth = container.offsetWidth;
        const style = window.getComputedStyle(track);
        const gap = parseFloat(style.gap) || 0;

        // Responsiveness: 3 on desktop, 2 on tablet, 1 on mobile
        if (window.innerWidth < 768) {
            itemsPerPage = 1;
        } else if (window.innerWidth < 991) {
            itemsPerPage = 2;
        } else {
            itemsPerPage = 3;
        }

        // Calculate width: (TotalWidth - (TotalGaps)) / Items
        const totalGapWidth = gap * (itemsPerPage - 1);
        const newCardWidth = (containerWidth - totalGapWidth) / itemsPerPage;

        cards.forEach(card => {
            card.style.width = `${newCardWidth}px`;
        });

        // Re-align carousel after resize
        updateCarousel();
    };

    const updateCarousel = () => {
        // Need to fetch width again in case it changed
        const cardWidth = cards[0].getBoundingClientRect().width;
        const style = window.getComputedStyle(track);
        const gap = parseFloat(style.gap) || 0;
        const amountToMove = cardWidth + gap;

        track.style.transform = `translateX(-${currentIndex * amountToMove}px)`;
    };

    // Touch Swipe Logic
    let touchStartX = 0;
    let touchEndX = 0;
    let isDragging = false;
    let startTransform = 0;

    track.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        isDragging = true;

        // Get current transform value
        const style = window.getComputedStyle(track);
        const matrix = new WebKitCSSMatrix(style.transform);
        startTransform = matrix.m41;

        // Disable transition while dragging for instant feedback
        track.style.transition = 'none';
    }, { passive: true });

    track.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        const currentX = e.touches[0].clientX;
        const diff = currentX - touchStartX;

        // Apply movement to track
        track.style.transform = `translateX(${startTransform + diff}px)`;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        isDragging = false;
        touchEndX = e.changedTouches[0].clientX;

        // Restore transition
        track.style.transition = 'transform 0.5s ease-out';

        handleGesture();
    });

    // Re-set transition on updateCarousel to ensure it's smooth
    const originalUpdate = updateCarousel;
    const smoothUpdate = () => {
        track.style.transition = 'transform 0.5s ease-out';
        originalUpdate();
    };

    const handleGesture = () => {
        const threshold = 50; // pixels to trigger slide
        const diff = touchStartX - touchEndX;
        const maxIndex = cards.length - itemsPerPage;

        if (diff > threshold) {
            // Swipe Left -> Next Slide
            if (currentIndex < maxIndex) {
                currentIndex++;
            }
        } else if (diff < -threshold) {
            // Swipe Right -> Prev Slide
            if (currentIndex > 0) {
                currentIndex--;
            }
        }

        // Final alignment
        smoothUpdate();
    };

    // Keep click delegation for desktop or fallback buttons
    document.addEventListener('click', (e) => {
        const isNext = e.target.closest('.next-btn');
        const isPrev = e.target.closest('.prev-btn');

        if (isNext) {
            const maxIndex = cards.length - itemsPerPage;
            if (currentIndex < maxIndex) {
                currentIndex++;
            } else {
                currentIndex = 0;
            }
            smoothUpdate();
        }

        if (isPrev) {
            const maxIndex = cards.length - itemsPerPage;
            if (currentIndex > 0) {
                currentIndex--;
            } else {
                currentIndex = maxIndex;
            }
            smoothUpdate();
        }
    });

    // Update on resize
    window.addEventListener('resize', setCardDimensions);

    // Initial call
    setCardDimensions();
}

/* =============== SCROLL REVEAL ANIMATION =============== */
/* =============== SCROLL REVEAL ANIMATION =============== */
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 1000, /* Faster duration */
    delay: 200, /* Shorter delay */
    // reset: true // Animations repeat
})

sr.reveal(`.home-detail`, { origin: 'left' })
sr.reveal(`.home-img`, { origin: 'right' })
sr.reveal(`.sobre-img`, { origin: 'left' })
sr.reveal(`.sobre-content`, { origin: 'right' })
sr.reveal(`.carousel-container`, { origin: 'bottom' }) /* Animate container instead of cards */
sr.reveal(`.contato-forms`, { origin: 'left' })
sr.reveal(`.contato-content`, { origin: 'right' })
sr.reveal(`.section-title`, { origin: 'top' })

/* =============== TYPED JS =============== */
const typed = new Typed('.multiple-text', {
    strings: ['Desenvolvedor Fullstack', 'Designer UI/UX', 'Freelancer'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

/* =============== SCROLL SECTIONS ACTIVE LINK =============== */
const sections = document.querySelectorAll('section[id]')

const scrollActive = () => {
    const scrollDown = window.scrollY

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 58,
            sectionId = current.getAttribute('id'),
            sectionsClass = document.querySelector('.nav-menu a[href*=' + sectionId + ']')

        if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
            sectionsClass.classList.add('active-link')
        } else {
            sectionsClass.classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/* =============== SHOW SCROLL UP =============== */
const scrollUp = () => {
    const scrollUp = document.getElementById('scroll-up')
    // When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scrollup class
    this.scrollY >= 350 ? scrollUp.classList.add('show-scroll') :
        scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/* =============== DARK/LIGHT THEME =============== */
const themeButton = document.getElementById('theme-button')
const lightTheme = 'light-theme'
const iconTheme = 'bx-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(lightTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx bx-moon' : 'bx bx-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
    // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](lightTheme)
    themeButton.classList[selectedIcon === 'bx bx-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the light / dark icon
    document.body.classList.toggle(lightTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})
