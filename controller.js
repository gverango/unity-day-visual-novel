import GameModel from './model.js';
import GameView from './view.js';

document.addEventListener('DOMContentLoaded', async () => {
    await GameModel.loadScenes();  // Load scenes before interactions
    GameView.showTitleScreen();
    let transitioning = false;

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
        GameModel.setState('menu');
        GameView.closeSettings();
    });


    // Exit Button → Return to Title
    document.querySelectorAll('.exit-button').forEach(button => {
        button.addEventListener('click', () => {
            GameModel.setState('title');
            GameView.closeSettings();
            GameView.showTitleScreen();
        });
    });
    //Text Container disguised as continue button for next scene and text
    document.querySelector('.text-container').addEventListener('click', () => {
        if (transitioning) return;
        transitioning = true;
        if(GameView.typingEffect) {
            GameView.finishTyping();
            transitioning = false;
            return;
        }
        
        const currentScene = GameModel.getCurrentScene();
        if (currentScene.choices) {
            transitioning = false;
            return;
        }

        if (currentScene.next && currentScene.next.length != 0) {
            GameModel.currentSceneIndex = currentScene.next[0];
            GameView.renderScene();
        }
        
        setTimeout(() => {
            transitioning = false;
        }, 700); 
    });
    //Keyboard interface to progees scenes
    document.addEventListener('keydown', (event) => {
        if (transitioning) return;
        transitioning = true;
        if (event.key === ' ' || event.key === 'Enter') {
            if (GameView.typingEffect) {
                GameView.finishTyping();
                transitioning = false;
                return;
            }
    
            const currentScene = GameModel.getCurrentScene();
            if (currentScene.choices) {
                transitioning = false;
                return;
            }
    
            if (currentScene.next && currentScene.next.length != 0) {
                GameModel.currentSceneIndex = currentScene.next[0];
                GameView.renderScene();
            }
        }
        setTimeout(() => {
            transitioning = false;
        }, 700); 
    });
});

