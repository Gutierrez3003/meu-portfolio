// Menu Hamburguer Responsivo
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

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

// Scroll suave (usado no botão "Saiba Mais")
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}

// ==== EMAILJS (já está funcionando com seus IDs) ====
emailjs.init("u6gG1jLxDiorwM3vQ");

document.getElementById('form-contato').addEventListener('submit', function (e) {
    e.preventDefault();

    emailjs.sendForm('service_v4bdd8i', 'template_lz3ppbb', this)
        .then(() => {
            alert('Mensagem enviada com sucesso! Entrarei em contato em breve ✅');
            this.reset();
        }, (error) => {
            alert('Erro ao enviar: ' + (error.text || 'Tente novamente mais tarde'));
        });
});

// Animação dos cards ao entrar na tela
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

/* ---------- DARK MODE ---------- */
const darkBtn = document.getElementById('dark-mode');

darkBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    darkBtn.textContent = isDark ? '☀️' : '🌙';   // emoji bonito
});

// Carrega o tema salvo ao abrir a página
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    darkBtn.textContent = '☀️';
} else {
    darkBtn.textContent = '🌙';
}