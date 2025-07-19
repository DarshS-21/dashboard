const backgrounds = [
    'backgrounds/bg.jpg',
    'backgrounds/bg2.jpg',
    'backgrounds/bg3.jpg',
    'backgrounds/bg4.jpg',
];

let currentBackgroundIndex = 0;

function setBackground(index) {
    document.body.classList.remove(`bg${currentBackgroundIndex}`);
    currentBackgroundIndex = index;
    document.body.style.backgroundImage = `url(${backgrounds[currentBackgroundIndex]})`;
    document.body.classList.add(`bg${currentBackgroundIndex}`);
}

function updateClock(){
    const now = new Date();
    let hours = now.getHours();
    const meridian = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    const minutes = now.getMinutes().toString().padStart(2, '0');
    document.getElementById("clock").textContent = `${hours}:${minutes} ${meridian}`;
}

document.addEventListener('DOMContentLoaded', () => {
    setBackground(0);
    updateClock();
    setInterval(updateClock, 1000);

    // Sidebar toggle logic
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });

    // Set up the background shuffle button
    const BgShuffle = document.getElementById('BgShuffle');
    const bgFadeOverlay = document.getElementById('bg-fade-overlay');
    const clockContainer = document.getElementById('clockContainer');

    BgShuffle.addEventListener('click', () => {
        let nextIndex;
        do {
            nextIndex = Math.floor(Math.random() * backgrounds.length);
        } while (nextIndex === currentBackgroundIndex && backgrounds.length > 1);

        // Set overlay to new background and fade in
        bgFadeOverlay.style.backgroundImage = `url(${backgrounds[nextIndex]})`;
        bgFadeOverlay.style.opacity = '1';
        clockContainer.style.opacity = '0';

        setTimeout(() => {
            setBackground(nextIndex);
            bgFadeOverlay.style.opacity = '0';
            clockContainer.style.opacity = '1';
        }, 1500); // Match the CSS transition
    });

    // Fade in the body after setup (keep this last)
    document.body.classList.add('loaded');
});