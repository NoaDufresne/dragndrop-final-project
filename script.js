var draggableElems = document.querySelectorAll('.draggable');
var draggies = [];
for (var i = 0; i < draggableElems.length; i++) {
    var draggableElem = draggableElems[i];
    var draggie = new Draggabilly(draggableElem, {containment: '#s1'});
    draggies.push(draggie);
}

const toggleButton = document.getElementById('toggleButton');
const contentArea = document.getElementById('contentArea');
const draggableWindow = document.getElementById('draggableWindow');

toggleButton.addEventListener('click', function () {
    const headerHeight = draggableWindow.querySelector('.header').offsetHeight;

    if (contentArea.style.display === 'none') {
        contentArea.style.display = 'block';
        toggleButton.textContent = '−'; 
        draggableWindow.style.height = 'auto'; 
        draggableWindow.style.top = '100px'; 
    } else {
        draggableWindow.style.height = `${headerHeight}px`; 
        draggableWindow.style.top = `${parseInt(draggableWindow.style.top || 100) - (draggableWindow.offsetHeight - headerHeight)}px`; // Move up
        toggleButton.textContent = '+'; 
        setTimeout(() => {
            contentArea.style.display = 'none'; 
        }, 300);
    }
});

const darkButton = document.querySelector('.theme-button.dark');
const body = document.body;

darkButton.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
});


let lastScrollY = 0; // Track the last scroll position

document.addEventListener('scroll', () => {
    const coverPage = document.getElementById('cover-page');
    const mainContent = document.querySelector('.main-content');
    const currentScrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // Calculate the scroll percentage
    const scrollPercent = currentScrollY / (documentHeight - windowHeight);

    // Scroll Down: Fade out the cover page gradually based on scroll position
    coverPage.style.transition = 'opacity 0.5s ease'; // Smooth transition for opacity
    coverPage.style.opacity = 1 - scrollPercent; // Fade out based on the scroll percentage

    // If the user has scrolled past the cover, make it fully hidden
    if (currentScrollY > 150) {
        coverPage.style.pointerEvents = 'none'; // Prevent interactions when hidden
        mainContent.style.transition = 'opacity 1s ease, transform 1s ease';
        mainContent.style.opacity = '1';
        mainContent.style.transform = 'translateY(0)';
    } else {
        // Scroll Up: Fade in the cover page smoothly
        coverPage.style.pointerEvents = 'all'; // Reactivate interactions
        mainContent.style.transition = 'opacity 1s ease, transform 1s ease';
        mainContent.style.opacity = '0';
        mainContent.style.transform = 'translateY(50px)';
    }

    // Update last scroll position
    lastScrollY = currentScrollY;
});
