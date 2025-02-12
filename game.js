// UI Elements!!! Title Page, Game Menu, Play Layout, Pause/Settings Panel

// Ensure UI elements are hidden on load
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.menu-buttons').style.display = 'none';
    document.querySelector('.settings-icon').style.display = 'none';
    document.querySelector('.settings-panel').style.display = 'none';
});

const titleButton = document.getElementById('title-button');
const continueButton = document.querySelector('.continue-button');
const exitButtons = document.querySelectorAll('.exit-button'); // ALL exit buttons
const menuButtons = document.querySelector('.menu-buttons');
const settingsIcon = document.querySelector('.settings-icon');
const settingsPanel = document.querySelector('.settings-panel');
const closeButton = document.querySelector('.close-button');

// Title Page -> Game Menu
titleButton.addEventListener('click', () => {
    titleButton.style.display = 'none'; // Hide title button
    menuButtons.style.display = 'flex'; // Show menu buttons
    settingsIcon.style.display = 'block'; // Show settings icon
});



// Function to return to Title Page (same for both exit buttons)
function returnToTitle() {
    titleButton.style.display = 'block';
    menuButtons.style.display = 'none'; 
    settingsPanel.style.display = 'none'; 
    menuButtons.style.pointerEvents = 'auto'; // Restore clickability
    menuButtons.style.opacity = '1';
}

// Attach event listener to both exit buttons (menu + tab-content)
exitButtons.forEach(button => {
    button.addEventListener('click', returnToTitle);
});



// Game Menu -> Continue -> Play Layout
continueButton.addEventListener('click', () => {
    titleButton.style.display = 'none'; // Hide title button
    menuButtons.style.display = 'none'; // Hide menu buttons
    settingsIcon.style.display = 'block'; // Show settings icon
});



// Open Settings Panel
settingsIcon.addEventListener('click', () => {
    settingsPanel.style.display = 'block';
    menuButtons.style.pointerEvents = 'none'; // Disable menu button clicks
    menuButtons.style.opacity = '0.5';
});

// Close Settings Panel
closeButton.addEventListener('click', () => {
    settingsPanel.style.display = 'none';
    menuButtons.style.pointerEvents = 'auto'; // Eenable menu buttons
    menuButtons.style.opacity = '1.0'; 
});

// Tab switching logic
document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.tab-button').forEach(tab => tab.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.style.display = 'none');

        button.classList.add('active');
        document.getElementById(button.getAttribute('data-tab')).style.display = 'block';
    });
});
