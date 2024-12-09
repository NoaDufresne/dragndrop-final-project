// Initialize Draggabilly
var draggableElems = document.querySelectorAll('.draggable');
var draggies = [];
for (var i = 0; i < draggableElems.length; i++) {
    var draggableElem = draggableElems[i];
    var draggie = new Draggabilly(draggableElem, {});
    draggies.push(draggie);
}

// Toggle minimize/maximize functionality
const toggleButton = document.getElementById('toggleButton');
const contentArea = document.getElementById('contentArea');
const draggableWindow = document.getElementById('draggableWindow');

toggleButton.addEventListener('click', function () {
    const headerHeight = draggableWindow.querySelector('.header').offsetHeight;

    if (contentArea.style.display === 'none') {
        contentArea.style.display = 'block';
        toggleButton.textContent = '−'; // Change to minimize icon
        draggableWindow.style.height = 'auto'; // Reset height
        draggableWindow.style.top = '100px'; // Move back to original top
    } else {
        draggableWindow.style.height = `${headerHeight}px`; // Reduce to header height
        draggableWindow.style.top = `${parseInt(draggableWindow.style.top || 100) - (draggableWindow.offsetHeight - headerHeight)}px`; // Move up
        toggleButton.textContent = '+'; // Change to maximize icon
        setTimeout(() => {
            contentArea.style.display = 'none'; // Hide content after transition
        }, 300); // Match the CSS transition duration
    }
});
