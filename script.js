document.addEventListener('DOMContentLoaded', () => {
    const $ = (selector) => document.querySelector(selector);
    const $$ = (selector) => document.querySelectorAll(selector);

    // Dark Mode
    const darkBtn = $('#dark-mode');
    const applyTheme = (isDark) => {
        document.body.classList.toggle('dark', isDark);
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    };

    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(saved === 'dark' || (!saved && prefersDark));

    darkBtn.addEventListener('click', () => applyTheme(!document.body.classList.contains('dark')));

    // Menu Mobile
    const hamburger = $('.hamburger');
    const navMenu = $('.nav-menu');
    let clickOutsideListener;

    const openMenu = () => {
        hamburger.classList.add('active');
        navMenu.classList.add('active');
        document.body.style.overflow = 'hidden';

        clickOutsideListener = (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) closeMenu();
        };
        document.addEventListener('click', clickOutsideListener);
    };

    const closeMenu = () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
        if (clickOutsideListener) document.removeEventListener('click', clickOutsideListener);
    };

    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        navMenu.classList.contains('active') ? closeMenu() : openMenu();
    });

    // Animação dos cards
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.1 });

    $$('.projeto-card').forEach(card => observer.observe(card));

    // EmailJS
    emailjs.init("u6gG1jLxDiorwM3vQ");
    const form = $('#form-contato');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            emailjs.sendForm('service_v4bdd8i', 'template_lz3ppbb', form)
                .then(() => {
                    alert('Mensagem enviada com sucesso!');
                    form.reset();
                })
                .catch(() => alert('Erro ao enviar. Tente o WhatsApp!'));
        });
    }
});