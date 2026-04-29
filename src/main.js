import './style.css'

/**
 * CONFIGURATIE & DATA
 */
const text = "CLICKS MARKETING";
const fonts = ['Permanent Marker', 'Courier Prime', 'Special Elite', 'Bebas Neue', 'Rock Salt', 'Playfair Display', 'Inter'];
const colors = ['#facc15', '#ef4444', '#22c55e', '#ffffff', '#fb923c', '#7c3aed', '#1e3a8a'];
const bgColors = ['#000000', '#ffffff', '#18181b', 'transparent'];

const images = [
    'https://picsum.photos/seed/c1/400/500',
    'https://picsum.photos/seed/c2/400/500',
    'https://picsum.photos/seed/c3/400/500',
    'https://picsum.photos/seed/c4/400/500',
    'https://picsum.photos/seed/c5/400/500'
];

/**
 * 1. RANSOM NOTE GENERATOR
 * Maakt elke letter uniek en random bij elke refresh.
 */
function generateRansomTitle() {
    const titleContainer = document.getElementById('ransom-title');
    if (!titleContainer) return;
    
    const words = text.split(' ');
    titleContainer.innerHTML = ''; 

    words.forEach(word => {
        const wordDiv = document.createElement('div');
        wordDiv.className = 'flex flex-nowrap justify-center gap-2 md:gap-4 mb-4';

        word.split('').forEach(char => {
            const span = document.createElement('span');
            span.innerText = char;
            
            // Random stijlen kiezen
            const randomFont = fonts[Math.floor(Math.random() * fonts.length)];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            const randomBg = bgColors[Math.floor(Math.random() * bgColors.length)];
            const randomRot = Math.floor(Math.random() * 10) - 5; 

            // Inline styles toepassen voor maximale variatie
            span.style.fontFamily = randomFont;
            span.style.color = randomColor;
            span.style.backgroundColor = randomBg;
            span.style.transform = `rotate(${randomRot}deg)`;
            
            // Tailwind classes voor de basis look & feel
            span.className = 'char inline-block px-3 py-1 md:px-5 md:py-2 shadow-2xl border border-white/10 transition-all duration-500 hover:scale-110 cursor-pointer select-none';
            
            wordDiv.appendChild(span);
        });
        titleContainer.appendChild(wordDiv);
    });
}

/**
 * 2. INFINITE SMART SLIDER
 * Vult de track op basis van schermbreedte om gaten bij 25% zoom te voorkomen.
 */
function fillSlider() {
    const track = document.getElementById('infinite-track');
    if (!track) return;
    
    track.innerHTML = ''; // Reset track
    track.classList.add('animate-scroll');
    
    // Bereken hoeveel we moeten vullen (5x schermbreedte voor extreme zoom-levels)
    const fillLimit = window.innerWidth * 5; 
    let currentWidth = 0;
    
    while (currentWidth < fillLimit) {
        images.forEach(src => {
            const div = document.createElement('div');
            div.className = 'w-[300px] h-[400px] flex-shrink-0 px-2 group overflow-hidden';
            div.innerHTML = `
                <img src="${src}" 
                     alt="Clicks Portfolio" 
                     class="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-in-out"
                >
            `;
            track.appendChild(div);
            currentWidth += 300; 
        });
    }
}

/**
 * 3. TAAL TOGGLE LOGICA
 * Simpele switch tussen NL en EN.
 */
let currentLang = 'nl';
const content = {
    nl: { services: "Diensten", concept: "Nieuw Concept", sub: "Wij schalen merken door de perfecte balans tussen video en code." },
    en: { services: "Services", concept: "New Concept", sub: "Scaling brands through the perfect balance between video and code." }
};

function setupLangToggle() {
    const langBtn = document.getElementById('lang-display');
    if (!langBtn) return;

    langBtn.addEventListener('click', () => {
        currentLang = currentLang === 'nl' ? 'en' : 'nl';
        langBtn.innerText = currentLang.toUpperCase();
        updateLanguage();
    });
}

function updateLanguage() {
    // Hier kun je specifieke elementen updaten als je IDs toevoegt in index.html
    const subText = document.querySelector('header p');
    if (subText) subText.innerText = content[currentLang].sub;
}

/**
 * INITIALISATIE
 */
document.addEventListener('DOMContentLoaded', () => {
    generateRansomTitle();
    fillSlider();
    setupLangToggle();
});

// Event listener voor resizing (vult slider aan bij uitzoomen)
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        fillSlider();
    }, 250);
});
