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

// Carousel Projects - CONFIGURED FOR FILTERING
const track = document.querySelector('.carousel-track');
const prevButton = document.querySelector('.prev-btn');
const nextButton = document.querySelector('.next-btn');
const filterBtns = document.querySelectorAll('.filter-btn');

if (track && prevButton && nextButton) {
    let currentIndex = 0;

    // Cache all cards initially (save them and remove from DOM)
    const allCards = Array.from(track.children);
    let visibleCards = [...allCards];

    // Function to rebuild the track with only visible cards
    const rebuildTrack = (cardsToShow) => {
        // Remove all children from track
        while (track.firstChild) {
            track.removeChild(track.firstChild);
        }
        // Append only the cards that should be visible
        cardsToShow.forEach(card => {
            track.appendChild(card);
        });
        visibleCards = cardsToShow;
    };

    const setCardDimensions = () => {
        const container = document.querySelector('.carousel-container');
        if (!container) return;

        const containerWidth = container.offsetWidth;
        const style = window.getComputedStyle(track);
        const gap = parseFloat(style.gap) || 0;

        const newCardWidth = containerWidth;

        visibleCards.forEach(card => {
            card.style.width = `${newCardWidth}px`;
        });

        updateCarousel();
    };

    const updateCarousel = () => {
        if (visibleCards.length === 0) {
            track.style.transform = 'translateX(0)';
            return;
        }

        // Clamp index
        if (currentIndex >= visibleCards.length) {
            currentIndex = 0;
        }
        if (currentIndex < 0) {
            currentIndex = visibleCards.length - 1;
        }

        const cardWidth = visibleCards[0].getBoundingClientRect().width;
        const style = window.getComputedStyle(track);
        const gap = parseFloat(style.gap) || 0;
        const amountToMove = cardWidth + gap;

        track.style.transform = `translateX(-${currentIndex * amountToMove}px)`;
    };

    const smoothUpdate = () => {
        track.style.transition = 'transform 0.5s ease-out';
        updateCarousel();
    };

    // Filter Logic
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            // Determine which cards to show
            let cardsToShow;
            if (filter === 'all') {
                cardsToShow = [...allCards];
            } else if (filter === 'ai') {
                cardsToShow = allCards.filter(card => card.classList.contains('ai-project'));
            } else if (filter === 'web') {
                cardsToShow = allCards.filter(card => card.classList.contains('web-project'));
            } else {
                cardsToShow = [...allCards];
            }

            // Reset index and rebuild track
            currentIndex = 0;
            track.style.transition = 'none';
            rebuildTrack(cardsToShow);
            setCardDimensions();
        });
    });

    // Carousel Controls
    document.addEventListener('click', (e) => {
        const isNext = e.target.closest('.next-btn');
        const isPrev = e.target.closest('.prev-btn');

        if (isNext && visibleCards.length > 0) {
            currentIndex = (currentIndex + 1) % visibleCards.length;
            smoothUpdate();
        }

        if (isPrev && visibleCards.length > 0) {
            currentIndex = (currentIndex - 1 + visibleCards.length) % visibleCards.length;
            smoothUpdate();
        }
    });

    // Touch Swipe Logic
    let touchStartX = 0;
    let touchEndX = 0;
    let isDragging = false;
    let startTransform = 0;

    track.addEventListener('touchstart', (e) => {
        if (visibleCards.length <= 1) return;
        touchStartX = e.touches[0].clientX;
        isDragging = true;

        const style = window.getComputedStyle(track);
        const matrix = new WebKitCSSMatrix(style.transform);
        startTransform = matrix.m41;
        track.style.transition = 'none';
    }, { passive: true });

    track.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        const currentX = e.touches[0].clientX;
        const diff = currentX - touchStartX;
        track.style.transform = `translateX(${startTransform + diff}px)`;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        isDragging = false;
        touchEndX = e.changedTouches[0].clientX;

        const threshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                currentIndex = (currentIndex + 1) % visibleCards.length;
            } else {
                currentIndex = (currentIndex - 1 + visibleCards.length) % visibleCards.length;
            }
        }
        smoothUpdate();
    });

    window.addEventListener('resize', setCardDimensions);
    // Delay initial card dimensions to ensure the container is visible
    // (the .button CSS animation takes ~0.6s to complete)
    setTimeout(() => {
        setCardDimensions();
    }, 800);
    // Also set immediately in case animation already completed
    setCardDimensions();
}

/* =============== SCROLL REVEAL ANIMATION =============== */
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 1000,
    delay: 200,
})

sr.reveal(`.home-detail`, { origin: 'left' })
sr.reveal(`.home-img`, { origin: 'right' })
sr.reveal(`.sobre-img`, { origin: 'left' })
sr.reveal(`.sobre-content`, { origin: 'right' })
sr.reveal(`.contato-forms`, { origin: 'left' })
sr.reveal(`.contato-content`, { origin: 'right' })
sr.reveal(`.section-title`, { origin: 'top' })

/* =============== TYPED JS =============== */
const typed = new Typed('.multiple-text', {
    strings: ['Desenvolvedor Fullstack', 'Freelancer'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

/* =============== SCROLL SECTIONS ACTIVE LINK =============== */
const sections = document.querySelectorAll('section[id]')

const scrollActive = () => {
    sections.forEach(current => {
        const sectionId = current.getAttribute('id')
        const sectionsClass = document.querySelector('.nav-menu a[href*=' + sectionId + ']')

        if (!sectionsClass) return;

        const rect = current.getBoundingClientRect()

        // Section is active when its top is near or above viewport top
        // and its bottom is still below that threshold
        if (rect.top <= 150 && rect.bottom > 150) {
            sectionsClass.classList.add('active-link')
        } else {
            sectionsClass.classList.remove('active-link')
        }
    })
}
document.body.addEventListener('scroll', scrollActive)
// Also run once on load to highlight the initial section
scrollActive()

/* =============== SHOW SCROLL UP =============== */
const scrollUp = () => {
    const scrollUp = document.getElementById('scroll-up')
    document.body.scrollTop >= 350 ? scrollUp.classList.add('show-scroll') :
        scrollUp.classList.remove('show-scroll')
}
document.body.addEventListener('scroll', scrollUp)

/* =============== DARK/LIGHT THEME =============== */
const themeButton = document.getElementById('theme-button')
const lightTheme = 'light-theme'
const iconTheme = 'bx-sun'

const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

const getCurrentTheme = () => document.body.classList.contains(lightTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx bx-moon' : 'bx bx-sun'

if (selectedTheme) {
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](lightTheme)
    themeButton.classList[selectedIcon === 'bx bx-moon' ? 'add' : 'remove'](iconTheme)
}

themeButton.addEventListener('click', () => {
    document.body.classList.toggle(lightTheme)
    themeButton.classList.toggle(iconTheme)
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})
