const backgrounds = [
    'backgrounds/bg.jpg',
    'backgrounds/bg2.jpg',
    'backgrounds/bg3.jpg',
    'backgrounds/bg4.jpg',
];

let currentBackgroundIndex = 0; 

function setRandomBackground() {
    currentBackgroundIndex = Math.floor(Math.random() * backgrounds.length);
    document.body.style.backgroundImage = `url(${backgrounds[currentBackgroundIndex]})`;
}

function setClockPosition() {
    const clock = document.getElementById('clockContainer');
    const clockText = document.getElementById('clock');
    
    // Reset all positions first
    clock.style.top = '';
    clock.style.bottom = '';
    clock.style.left = '';
    clock.style.transform = '';
    
    switch(currentBackgroundIndex) {
        case 0:
            clock.style.bottom = '193px';
            clock.style.left = '50%';
            clock.style.transform = 'translateX(-50%)';
            clockText.style.webkitBoxReflect = 'below 2px linear-gradient(to bottom, rgba(0,0,0,0.0), rgba(0,0,0,0.5))';
            break;
        case 1:
            clock.style.bottom = '150px';
            clock.style.left = '230px';
            clockText.style.webkitBoxReflect = 'below 1px linear-gradient(to bottom, rgba(0,0,0,0.0), rgba(0,0,0,0.4))';
            break;
        case 2:
            clock.style.bottom = '45px';
            clock.style.left = '50%';
            clock.style.transform = 'translateX(-50%)';
            clockText.style.webkitBoxReflect = 'below 0.5px linear-gradient(to bottom, rgba(0,0,0,0.0), rgba(0,0,0,0.4))';
            break;
        case 3:
            clock.style.top = '252px';
            clock.style.left = '100px';
            clockText.style.webkitBoxReflect = 'below 12px linear-gradient(to bottom, rgba(0,0,0,0.0), rgba(0,0,0,0.8))';
            break;
    }
}

function updateClock(){
    const now = new Date();
    let hours = now.getHours()
    const meridian = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    hours = hours.toString();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes} ${meridian}`;
    document.getElementById("clock").textContent = timeString;
}

document.addEventListener('DOMContentLoaded', () => {
    setRandomBackground();
    setClockPosition();
    updateClock();
    setInterval(updateClock, 1000);

    // Sidebar toggle logic
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });

    // Fade in the body after setup
    document.body.classList.add('loaded');
    
    // Set up the background shuffle button
    const BgShuffle = document.getElementById('BgShuffle');
    const bgFadeOverlay = document.getElementById('bg-fade-overlay');

    BgShuffle.addEventListener('click', () => {
    // Pick a new background index that's different from the current one
    let nextIndex;
    do {
        nextIndex = Math.floor(Math.random() * backgrounds.length);
    } while (nextIndex === currentBackgroundIndex && backgrounds.length > 1);

    // Set overlay to new background and fade in
    bgFadeOverlay.style.backgroundImage = `url(${backgrounds[nextIndex]})`;
    bgFadeOverlay.style.opacity = '1';

    // Fade out clock
    const clockContainer = document.getElementById('clockContainer');
    clockContainer.style.opacity = '0';

    setTimeout(() => {
        // Change background and move clock (with reflection) while invisible
        currentBackgroundIndex = nextIndex;
        document.body.style.backgroundImage = `url(${backgrounds[currentBackgroundIndex]})`;
        setClockPosition();

        // Fade out overlay and fade in clock at new position
        bgFadeOverlay.style.opacity = '0';
        clockContainer.style.opacity = '1';
    }, 1500); // Match the CSS transition
});
});