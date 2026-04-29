import './style.css'

const titleContainer = document.getElementById('ransom-title');
const text = "CLICKS MARKETING";

const fonts = ['Permanent Marker', 'Courier Prime', 'Special Elite', 'Bebas Neue', 'Rock Salt', 'Playfair Display', 'Inter'];
const colors = ['#facc15', '#ef4444', '#22c55e', '#ffffff', '#fb923c', '#7c3aed', '#1e3a8a'];
const bgColors = ['#000000', '#ffffff', '#18181b', 'transparent'];

// 1. Ransom Note Generator
function generateRansomTitle() {
    if (!titleContainer) return;
    const words = text.split(' ');
    titleContainer.innerHTML = '';

    words.forEach(word => {
        const wordDiv = document.createElement('div');
        wordDiv.className = 'flex flex-nowrap justify-center gap-2 md:gap-4';

        word.split('').forEach(char => {
            const span = document.createElement('span');
            span.innerText = char;
            
            const randomFont = fonts[Math.floor(Math.random() * fonts.length)];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            const randomBg = bgColors[Math.floor(Math.random() * bgColors.length)];
            const randomRot = Math.floor(Math.random() * 10) - 5;

            span.style.fontFamily = randomFont;
            span.style.color = randomColor;
            span.style.backgroundColor = randomBg;
            span.style.transform = `rotate(${randomRot}deg)`;
            span.className = 'char inline-block px-2 py-1 md:px-4 md:py-2 shadow-2xl border border-white/10 transition-all duration-500 hover:scale-110';
            
            wordDiv.appendChild(span);
        });
        titleContainer.appendChild(wordDiv);
    });
}

// 2. Smart Slider (Zoom Proof)
const track = document.getElementById('infinite-track');
const images = [
    'https://picsum.photos/seed/c1/400/500',
    'https://picsum.photos/seed/c2/400/500',
    'https://picsum.photos/seed/c3/400/500',
    'https://picsum.photos/seed/c4/400/500'
];

function fillSlider() {
    if (!track) return;
    // Vul 4x de schermbreedte om zoom-gaten te voorkomen
    const fillLimit = window.innerWidth * 4;
    let currentWidth = 0;
    
    while (currentWidth < fillLimit) {
        images.forEach(src => {
            const div = document.createElement('div');
            div.className = 'w-[300px] h-[400px] flex-shrink-0 px-2';
            div.innerHTML = `<img src="${src}" class="w-full h-full object-cover grayscale hover:grayscale-0 transition-all">`;
            track.appendChild(div);
            currentWidth += 300;
        });
    }
}

// Start
generateRansomTitle();
fillSlider();

// Bij resize opnieuw vullen
window.addEventListener('resize', () => {
    track.innerHTML = '';
    fillSlider();
});
