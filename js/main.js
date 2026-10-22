// preloader
const preloader = document.getElementById('preloader');

window.addEventListener('load', function () {
    if (preloader) {
        preloader.classList.add('hide');
        setTimeout(function () { preloader.remove(); }, 500);
    }
});


// hero : typing animation
document.querySelectorAll('.typed').forEach(function (el) {
    const items = el.dataset.typedItems.split(',').map(function (s) { return s.trim(); });
    let i = 0;
    let j = 0;
    let deleting = false;

    function type() {
        const word = items[i];
        el.textContent = word.substring(0, j);

        let delay = deleting ? 50 : 100;

        if (!deleting && j === word.length) {
            deleting = true;
            delay = 2000;
        } else if (deleting && j === 0) {
            deleting = false;
            i = (i + 1) % items.length;
            delay = 500;
        } else {
            j += deleting ? -1 : 1;
        }

        setTimeout(type, delay);
    }

    type();
});


// navbar : highlight the active link while scrolling
const navLinks = document.querySelectorAll('.navbar-nav > .nav-item > .nav-link[href^="#"]:not([href="#"])');

function setActiveLink() {
    let current = 'hero';

    document.querySelectorAll('header[id], section[id]').forEach(function (sec) {
        if (window.scrollY >= sec.offsetTop - 150) {
            current = sec.id;
        }
    });

    navLinks.forEach(function (link) {
        link.parentElement.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
}


// navbar : close the mobile menu after clicking a link
const navbarMenu = document.getElementById('navbarSupportedContent');

document.querySelectorAll('.navbar-nav > .nav-item > .nav-link:not(.dropdown-toggle)').forEach(function (link) {
    link.addEventListener('click', function () {
        if (navbarMenu.classList.contains('show')) {
            bootstrap.Collapse.getOrCreateInstance(navbarMenu).hide();
        }
    });
});


// back to top button
const backToTop = document.querySelector('.back-to-top');

function toggleBackToTop() {
    backToTop.classList.toggle('show', window.scrollY > 300);
}

window.addEventListener('scroll', function () {
    setActiveLink();
    toggleBackToTop();
});

setActiveLink();
toggleBackToTop();


// counters : count up when the section appears
const countersSection = document.getElementById('counters');

if (countersSection) {
    const counters = countersSection.querySelectorAll('.counter');

    function runCounter(el) {
        const target = +el.dataset.target;
        const duration = 2000;
        const start = performance.now();

        function update(now) {
            const progress = Math.min((now - start) / duration, 1);
            el.textContent = Math.floor(progress * target);

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }

    const countersObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                counters.forEach(runCounter);
                observer.disconnect();
            }
        });
    }, { threshold: 0.4 });

    countersObserver.observe(countersSection);
}


// about : skills bars fill when they appear
const bars = document.querySelectorAll('.progress-bar');

if (bars.length) {
    bars.forEach(function (bar) {
        bar.dataset.width = bar.style.width;
        bar.style.width = '0';
    });

    const barsObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                const bar = entry.target.querySelector('.progress-bar');
                bar.style.width = bar.dataset.width;
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.progress').forEach(function (p) {
        barsObserver.observe(p);
    });
}


// scroll animations : fade up when the element appears
const revealItems = document.querySelectorAll(
    '.section-title, #about .container, #services .card, #counters .col-lg-3, #work .work-box, #blog .post, #contact .container, #portfolio-details .col-lg-8, #portfolio-details .col-lg-4, #blog-single .col-lg-8 > div, #blog-single .col-lg-8 > article, #blog-single .col-lg-4 > div'
);

const revealObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('in');
            observer.unobserve(entry.target);

            // remove the delay after the animation so hover effects stay instant
            setTimeout(function () {
                entry.target.style.transitionDelay = '';
            }, 1500);
        }
    });
}, { threshold: 0.1 });

revealItems.forEach(function (el, index) {
    el.classList.add('reveal');
    el.style.transitionDelay = (index % 3) * 0.15 + 's';
    revealObserver.observe(el);
});


// contact form (demo only : no backend, so it just shows the messages)
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    const formLoading = document.getElementById('formLoading');
    const formSent = document.getElementById('formSent');

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        formSent.classList.add('d-none');
        formLoading.classList.remove('d-none');

        setTimeout(function () {
            formLoading.classList.add('d-none');
            formSent.classList.remove('d-none');
            contactForm.reset();
        }, 1000);
    });
}


// other demo forms (blog reply + search)
document.querySelectorAll('form[data-demo]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        form.reset();
    });
});
