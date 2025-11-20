// Menu Hamburguer Responsivo
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-menu a').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Scroll suave para seções
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({
        behavior: 'smooth'
    });
}

// Formulário de Contato

document.querySelector('.form-contato').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    if (!email.includes('@')) {
        alert('Por favor, insira um e-mail válido!');
        return;
    }
    alert('Mensagem enviada com sucesso! ✅');
    this.reset();
});

// Animação dos cards de projeto ao fazer scroll
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

    // troca ícone (opcional)
    darkBtn.textContent = isDark ? 'Sun' : 'Moon';
});

// Carrega tema salvo ao abrir a página
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
    darkBtn.textContent = 'Sun';
} 
document.body.classList.add('dark');
darkBtn.textContent = isDark ? '☀️' : '🌙';