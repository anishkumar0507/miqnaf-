document.addEventListener('DOMContentLoaded', () => {
    // Navbar Scroll & Scroll Spy
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
        // Scrolled Class
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        // Update active link
        updateActiveLink();
    });

    // Mobile Menu
    menuToggle?.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle?.classList.remove('active');
            navMenu?.classList.remove('active');
        });
    });

    // Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2 // Trigger when 20% of element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                // Optional: stop observing once it has faded in
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in-on-scroll');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Interactivity for Doctor Dropdown
    const docOptions = document.querySelectorAll('.doc-option');
    const selectedText = document.getElementById('doctor-selected-text');
    const displayName = document.getElementById('display-name');
    const displaySpec = document.getElementById('display-spec');
    const displayImg = document.getElementById('display-img');
    const cityOptions = document.querySelectorAll('.city-option');
    const selectedCity = document.getElementById('city-selected-text');

    // Toggle Dropdown logic via css classes for complex border-radius handling
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

    document.addEventListener('click', () => {
        document.querySelectorAll('.filter-table').forEach(t => t.classList.remove('is-open'));
    });

    if (docOptions.length > 0 && selectedText) {
        docOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                e.stopPropagation();
                docOptions.forEach(opt => opt.style.display = 'block');
                e.target.style.display = 'none';

                const newName = e.target.getAttribute('data-name');
                const newSpec = e.target.getAttribute('data-spec');
                const newImg = e.target.getAttribute('data-img');

                selectedText.textContent = newName;
                if(displayName) displayName.textContent = newName;
                if(displaySpec) displaySpec.textContent = newSpec;
                
                if (displayImg) {
                    displayImg.style.opacity = 0;
                    setTimeout(() => {
                        displayImg.src = newImg;
                        displayImg.style.opacity = 1;
                    }, 200);
                }

                e.target.closest('.filter-table').classList.remove('is-open');
            });
        });
    }

    if (cityOptions.length > 0 && selectedCity) {
        cityOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                e.stopPropagation();
                cityOptions.forEach(opt => opt.style.display = 'block');
                e.target.style.display = 'none';
                selectedCity.textContent = e.target.getAttribute('data-city');
                e.target.closest('.filter-table').classList.remove('is-open');
            });
        });
    }
});
