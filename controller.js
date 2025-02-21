import GameModel from './model.js';
import GameView from './view.js';

document.addEventListener('DOMContentLoaded', async () => {
    await GameModel.loadScenes();  // Load scenes before interactions
    GameView.showTitleScreen();

    // Title Button → Show Menu
    document.getElementById('title-button').addEventListener('click', () => {
        GameModel.setState('menu');
        GameView.showMenu();
    });

    // Continue Button → Start Game
    document.querySelector('.continue-button').addEventListener('click', () => {
        console.log('Continue clicked!');
        GameModel.setState('playing');
        GameView.closeMenu();
        GameView.renderScene();
    });

    // Close Button!
    document.querySelector('.close-button').addEventListener('click', () => {
        gameModel.setState('menu');
        GameView.closeSettings();
    });


    // Exit Button → Return to Title
    document.querySelectorAll('.exit-button').forEach(button => {
        button.addEventListener('click', () => {
            gameModel.setState('title');
            GameView.closeSettings();
            GameView.showTitleScreen();
        });
    });
});

