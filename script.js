var draggableElems = document.querySelectorAll('.draggable');
var draggies = [];

for (var i = 0; i < draggableElems.length; i++) {
    var draggableElem = draggableElems[i];

    if (draggableElem.classList.contains('note')) {
        var draggie = new Draggabilly(draggableElem, { containment: '#s2' });
        draggies.push(draggie);
    } else {
        var containmentElement = (draggableElem.classList.contains('social')) ? '#s2' : '#s1';
        var draggie = new Draggabilly(draggableElem, { containment: containmentElement });
        draggies.push(draggie);
    }

    draggie.on('dragStart', function() {
        this.element.style.zIndex = 9999;
    });

    draggie.on('dragEnd', function() {
        this.element.style.zIndex = '';
    });
}



document.querySelectorAll('.icon').forEach(toggleButton => {
    toggleButton.addEventListener('click', function () {
        const draggableWindow = this.closest('.window'); 
        const contentArea = draggableWindow.querySelector('.content'); 
        const headerHeight = draggableWindow.querySelector('.header').offsetHeight;


        if (contentArea.style.display === 'none' || contentArea.style.display === '') {
            contentArea.style.display = 'block';
            this.textContent = '−';
            draggableWindow.style.height = 'auto';
        } else {
            draggableWindow.style.height = `${headerHeight}px`;
            draggableWindow.style.top = `${parseInt(draggableWindow.style.top) - (draggableWindow.offsetHeight - headerHeight)}px`; // Move up
            this.textContent = '+';
            setTimeout(() => {
                contentArea.style.display = 'none';
            }, 300);
        }
    });
});

// themes
const themeButtons = document.querySelectorAll('.theme-button');
const body = document.body;

themeButtons.forEach(button => {
    button.addEventListener('click', () => {
        body.classList.remove('light-mode', 'dark-mode', 'pink-mode', 'green-mode');

        if (button.classList.contains('light')) {
            body.classList.add('light-mode');
        } else if (button.classList.contains('dark')) {
            body.classList.add('dark-mode');
        } else if (button.classList.contains('pink')) {
            body.classList.add('pink-mode');
        } else if (button.classList.contains('green')) {
            body.classList.add('green-mode');
        }
    });
});

let lastScrollY = 0; 

document.addEventListener('scroll', () => {
    const coverPage = document.getElementById('cover-page');
    const mainContent = document.querySelector('.main-content');
    const currentScrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    const scrollPercent = currentScrollY / (documentHeight - windowHeight);

    coverPage.style.transition = 'opacity 0.5s ease'; 
    coverPage.style.opacity = 1 - scrollPercent; 

    if (currentScrollY > 150) {
        coverPage.style.pointerEvents = 'none'; 
        mainContent.style.transition = 'opacity 1s ease, transform 1s ease';
        mainContent.style.opacity = '1';
        mainContent.style.transform = 'translateY(0)';
    } else {
        coverPage.style.pointerEvents = 'all'; 
        mainContent.style.transition = 'opacity 1s ease, transform 1s ease';
        mainContent.style.opacity = '0';
        mainContent.style.transform = 'translateY(50px)';
    }

    lastScrollY = currentScrollY;
});

const folders = document.querySelectorAll('.folder'); 
const modal = document.getElementById('popupModal');
const closeButton = modal.querySelector('.close');

folders.forEach(folder => {
    folder.addEventListener('click', () => {
        modal.classList.remove('hidden');
        modal.style.display = 'flex';  
    });
});

closeButton.addEventListener('click', () => {
    modal.classList.add('hidden');
    modal.style.display = 'none';  
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.classList.add('hidden');
        modal.style.display = 'none';  
    }
});

