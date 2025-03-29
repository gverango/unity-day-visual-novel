import GameModel from './model.js';
import GameView from './view.js';

document.addEventListener('DOMContentLoaded', async () => {
    await GameModel.loadScenes();  // Load scenes before interactions
    GameView.showTitleScreen();
    let transitioning = false;
/*
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
        GameModel.playBgm('assets/sounds/bgm.mp3')
        GameView.renderScene();
    });
    */

    document.getElementById('title-button').addEventListener('click', () => {
        console.log('Title clicked!');
        GameModel.setState('playing');
        GameView.closeMenu();
        GameModel.playBgm('assets/sounds/bgm.mp3')
        GameView.renderScene();
        document.getElementById('title-button').style.display = 'none';
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
        const currentScene = GameModel.getCurrentScene();

        if (transitioning) return;
        transitioning = true;
        if(GameView.typingEffect) {
            GameView.finishTyping();
            transitioning = false;
            return;
        }
        
        if (currentScene.choices) {
            transitioning = false;
            return;
        }

        if (currentScene.next && currentScene.next.length !== 0) {
            const nextSceneId = currentScene.next[0];
            const nextSceneIndex = GameModel.scenes.findIndex(scene => scene.id === nextSceneId);
            if (nextSceneIndex !== -1) {
                GameModel.currentSceneIndex = nextSceneIndex;
                GameView.renderScene();
            }
        }
        
        setTimeout(() => {
            transitioning = false;
        }, 700); 
    });

//Storing player name
document.getElementById('save-name').addEventListener('click', () => {
    const input = document.getElementById('player-name').value.trim();
    if (input) {
        GameModel.setPlayerName(input);
        document.getElementById('name-input-scene').style.display = 'none';
        GameView.renderScene(); // Resume story with name inserted
    }
});


    //Keyboard interface to progees scenes
    document.addEventListener('keydown', (event) => {
        const currentScene = GameModel.getCurrentScene();
        if (transitioning) return;
        transitioning = true;
        if (event.key === ' ' || event.key === 'Enter') {
            if (GameView.typingEffect) {
                GameView.finishTyping();
                transitioning = false;
                return;
            }
    
            if (currentScene.choices) {
                transitioning = false;
                return;
            }
    
            if (currentScene.next && currentScene.next.length !== 0) {
                const nextSceneId = currentScene.next[0]; //findIndex soo that scene progression aren't necessarily sequential
                const nextSceneIndex = GameModel.scenes.findIndex(scene => scene.id === nextSceneId);
                if (nextSceneIndex !== -1) {
                    GameModel.currentSceneIndex = nextSceneIndex;
                    GameView.renderScene();
                } else {
                    console.error('next scene id not found:', nextSceneId);
                }
            }
        }
        setTimeout(() => {
            transitioning = false;
        }, 700); 
    });
});

