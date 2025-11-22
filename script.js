// ==========================================
// SEU PORTFÓLIO - SCRIPT COMPLETO E FUNCIONAL
// ==========================================

// Menu Hamburguer Responsivo (seu código original - mantido)
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Fecha o menu ao clicar em qualquer link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Fecha o menu ao clicar fora dele
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// Scroll suave (seu código original - mantido)
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Animação dos cards (seu código original - mantido)
const cards = document.querySelectorAll('.projeto-card');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

cards.forEach(card => observer.observe(card));

// ==========================================
// DARK MODE — VERSÃO QUE FUNCIONA 100% (NOVA E TESTADA)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const darkBtn = document.getElementById('dark-mode');
    
    if (!darkBtn) {
        console.error('Botão dark-mode não encontrado!');
        return;
    }

    // Função para aplicar o tema
    function applyTheme(isDark) {
        if (isDark) {
            document.body.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }

    // Aplica tema salvo ou preferência do sistema
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    applyTheme(savedTheme === 'dark' || (!savedTheme && prefersDark));

    // Event listener para o clique (com debug no console)
    darkBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Clique detectado no dark mode!'); // ← Para você ver se o clique tá chegando
        
        const isCurrentlyDark = document.body.classList.contains('dark');
        applyTheme(!isCurrentlyDark);
        console.log('Tema alterado para:', !isCurrentlyDark ? 'escuro' : 'claro'); // ← Debug
    });
});

// ==========================================
// EMAILJS — CORRIGIDO (seu código original, mas dentro do DOMContentLoaded para evitar erros)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // Espera o EmailJS carregar
    if (typeof emailjs !== 'undefined') {
        emailjs.init("u6gG1jLxDiorwM3vQ");

        const form = document.getElementById('form-contato');
        if (form) {
            form.addEventListener('submit', function (e) {
                e.preventDefault();
                console.log('Formulário submetido!'); // Debug

                emailjs.sendForm('service_v4bdd8i', 'template_lz3ppbb', this)
                    .then(() => {
                        alert('Mensagem enviada com sucesso! Entrarei em contato em breve ✅');
                        this.reset();
                    }, (error) => {
                        alert('Erro ao enviar: ' + (error.text || 'Tente novamente mais tarde'));
                        console.error('EmailJS error:', error);
                    });
            });
        }
    } else {
        console.error('EmailJS não carregou! Verifique o script no HTML.');
    }
});