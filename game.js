// UI Elements!!! Title Page, Game Menu, Play Layout, Pause/Settings Panel

window.onload = () => {
    // This ensures nothing flashes during page load.
    document.querySelector('.menu-buttons').style.display = 'none';
    document.querySelector('.settings-icon').style.display = 'none';
    document.querySelector('.settings-panel').style.display = 'none';
};

const titleButton = document.getElementById('title-button');
const continueButton = document.querySelector('.continue-button');
const exitButton = document.querySelector('.exit-button');
const menuButtons = document.querySelector('.menu-buttons');
const settingsIcon = document.querySelector('.settings-icon');
const settingsPanel = document.querySelector('.settings-panel');
const closeButton = document.querySelector('.close-button');


// Title Page -> Game Menu
titleButton.addEventListener('click', () => {
    titleButton.style.display = 'none'; // Hide the title button
    menuButtons.style.display = 'flex'; // Show the menu buttons
    settingsIcon.style.display = 'block'; //Show the settings icon
});

// Game Menu -> Exit -> Title Page 
exitButton.addEventListener('click', () => {
    titleButton.style.display = 'block'; // Hide the title button
    menuButtons.style.display = 'none'; // Hide the menu buttons
    settingsIcon.style.display = 'none'; //Hide settings icon
});

// Game Menu -> Continue -> Play Layout
continueButton.addEventListener('click', () => {
    titleButton.style.display = 'none'; // Hide the title button
    menuButtons.style.display = 'none'; // Hide the menu buttons
    settingsIcon.style.display = 'block'; //Show the settings icon
});


// Open Settings Panel
settingsIcon.addEventListener('click', () => {
    settingsPanel.style.display = 'block';

});
// Close Settings Panel
closeButton.addEventListener('click', () => {
    settingsPanel.style.display = 'none';
});


// Tab switching logic
document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', () => {

        document.querySelectorAll('.tab-button').forEach(tab => tab.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.style.display='none');

        button.classList.add('active');
        document.getElementById(button.getAttribute('data-tab')).style.display = 'block';
    });
});