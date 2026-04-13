console.log('🔴 SCRIPT.JS LOADED');

// ========== NAVBAR & SCROLL ==========
function initializeNavbar() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-links');
    const sections = document.querySelectorAll('section[id]');

    function updateActiveLink() {
        let scrollY = window.pageYOffset;
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector('.nav-links a[href*=' + sectionId + ']')?.classList.add('active');
            } else {
                document.querySelector('.nav-links a[href*=' + sectionId + ']')?.classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        updateActiveLink();
        if (window.innerWidth <= 992 && navMenu?.classList.contains('active')) {
            menuToggle?.classList.remove('active');
            navMenu?.classList.remove('active');
        }
    });

    menuToggle?.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle?.classList.remove('active');
            navMenu?.classList.remove('active');
        });
    });
}

// ========== SCROLL ANIMATIONS ==========
function initializeScrollAnimations() {
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.2 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-on-scroll').forEach(el => observer.observe(el));
}

// ========== DROPDOWN TOGGLE ==========
function initializeDropdowns() {
    const toggleList = (table) => {
        const isOpen = table.classList.contains('is-open');
        document.querySelectorAll('.filter-table').forEach(t => t.classList.remove('is-open'));
        if (!isOpen) table.classList.add('is-open');
    };

    document.querySelectorAll('.filter-table').forEach(table => {
        const head = table.querySelector('.filter-head');
        const sel = table.querySelector('.filter-selected');
        if (head) head.addEventListener('click', (e) => { e.stopPropagation(); toggleList(table); });
        if (sel) sel.addEventListener('click', (e) => { e.stopPropagation(); toggleList(table); });
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.filter-table')) {
            document.querySelectorAll('.filter-table').forEach(t => t.classList.remove('is-open'));
        }
    });
}

// ========== DOCTOR SYSTEM ==========
function initializeDoctorSystem() {
    console.log('🔧 Doctor System Initializing');

    // Data
    const data = {
        chennai: {
            doctor: 'Dr Suresh',
            spec: 'General Physician',
            type: 'youtube',
            video: 'https://www.youtube.com/embed/ONF6w-y5JfU?autoplay=1&mute=1&loop=1&playlist=ONF6w-y5JfU'
        },
        delhi: {
            doctor: 'Dr Hemant',
            spec: 'Cardiologist',
            type: 'youtube',
            video: 'https://www.youtube.com/embed/7kR4VzDe5r4?autoplay=1&mute=1&loop=1&playlist=7kR4VzDe5r4'
        },
        mumbai: {
            doctor: 'Sameer',
            spec: 'Chest Specialist',
            type: 'local',
            video: 'mumbai.mp4'
        }
    };

    // Elements
    const cityDropdown = document.getElementById('city-dropdown');
    const docDropdown = document.getElementById('doc-dropdown');
    const cityText = document.getElementById('city-selected-text');
    const docText = document.getElementById('doctor-selected-text');
    const displayName = document.getElementById('display-name');
    const displaySpec = document.getElementById('display-spec');
    const displayIframe = document.getElementById('display-iframe');
    const displayVideo = document.getElementById('display-video');
    const videoSrc = document.getElementById('video-src');
    const videoContainer = document.getElementById('video-container');

    let currentCity = 'chennai';

    console.log('✓ Elements loaded:', { cityDropdown: !!cityDropdown, docDropdown: !!docDropdown, displayName: !!displayName });

    // Update display function
    function updateDisplay(cityKey) {
        console.log('📍 Updating display for:', cityKey);

        if (!data[cityKey]) {
            console.error('❌ Unknown city:', cityKey);
            return;
        }

        const info = data[cityKey];
        currentCity = cityKey;

        // Update text
        displayName.textContent = info.doctor;
        displaySpec.textContent = info.spec;
        docText.textContent = info.doctor;
        cityText.textContent = cityKey.charAt(0).toUpperCase() + cityKey.slice(1);

        console.log('📝 Updated:', info.doctor);

        // Update video
        if (info.type === 'youtube') {
            console.log('🎥 YouTube video');
            displayIframe.src = info.video;
            displayIframe.style.display = 'block';
            displayVideo.style.display = 'none';
        } else {
            console.log('🎬 Local video');
            videoSrc.src = info.video;
            displayVideo.load();
            displayVideo.style.display = 'block';
            displayIframe.style.display = 'none';
            displayVideo.play().catch(() => {});
        }

        // Update dropdown visibility
        document.querySelectorAll('.city-option').forEach(opt => {
            opt.style.display = (opt.getAttribute('data-city') === cityKey) ? 'none' : 'block';
        });

        document.querySelectorAll('.doc-option').forEach(opt => {
            opt.style.display = (opt.getAttribute('data-name') === info.doctor) ? 'none' : 'block';
        });
    }

    // Attach city option clicks
    console.log('📌 Attaching city option clicks');
    document.querySelectorAll('.city-option').forEach((opt, idx) => {
        opt.addEventListener('click', (e) => {
            const cityKey = opt.getAttribute('data-city');
            console.log('🏙️ City clicked:', cityKey);
            e.stopPropagation();
            e.preventDefault();
            updateDisplay(cityKey);
            cityDropdown.classList.remove('is-open');
        }, false);
    });

    // Attach doctor option clicks
    console.log('📌 Attaching doctor option clicks');
    document.querySelectorAll('.doc-option').forEach((opt, idx) => {
        opt.addEventListener('click', (e) => {
            const cityKey = opt.getAttribute('data-city');
            console.log('👨‍⚕️ Doctor clicked, city:', cityKey);
            e.stopPropagation();
            e.preventDefault();
            updateDisplay(cityKey);
            docDropdown.classList.remove('is-open');
        }, false);
    });

    // Initial state
    console.log('🚀 Initializing with Chennai');
    updateDisplay('chennai');
    console.log('✨ Doctor System Ready');
}

// ========== MAIN INIT ==========
let hasInitialized = false;

function initializeAll() {
    if (hasInitialized) {
        return;
    }
    hasInitialized = true;

    console.log('⏳ Initializing all systems');
    initializeNavbar();
    initializeScrollAnimations();
    initializeDropdowns();
    initializeDoctorSystem();
    console.log('✅ ALL SYSTEMS GO');
}

// Run when ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAll);
} else {
    initializeAll();
}

setTimeout(initializeAll, 100);
