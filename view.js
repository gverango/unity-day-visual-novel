import GameModel from './model.js';

class GameView {
    static showTitleScreen() {
        document.getElementById('title-button').style.display = 'block';
        document.querySelector('.menu-buttons').style.display = 'none';
        document.querySelector('.settings-icon').style.display = 'none';
        document.querySelector('.text-container').style.display = 'none';
        document.querySelector('.container').style.backgroundImage = 'none'; // FOR NOW: RESET BACKGROUND bc we don't have a title screen background!!!
    }

    static showMenu() {
        document.getElementById('title-button').style.display = 'none';
        document.querySelector('.menu-buttons').style.display = 'flex';
        document.querySelector('.settings-icon').style.display = 'block';
        document.querySelector('.text-container').style.display = 'none';
    }

    static closeMenu() {
        document.querySelector('.menu-buttons').style.display = 'none';
    }

    static renderScene() {
        const scene = GameModel.getCurrentScene();
        const textContainer = document.querySelector('.text-container');
        const container = document.querySelector('.container');

        // Clear prev scene
        textContainer.innerHTML = '';
        container.querySelectorAll('.character-sprite').forEach(element => element.remove());

        // Set background
        if (scene.background) {
            container.style.backgroundImage = `url('${scene.background}')`;
            container.style.backgroundSize = 'cover';
            container.style.backgroundPosition = 'center';
        } else {
            container.style.backgroundImage = 'none';
        }

        // Display scene text

        textContainer.style.display = 'block';

        //For transition to new scene and text
        textContainer.style.opacity = '0'; 

        //Typing effect ||||| Need to find a way so the container doesnt expand upwards.
        const textElement = document.createElement('p');
        textContainer.appendChild(textElement);
        setTimeout(() => {
            textContainer.style.transition = 'opacity 0.5s ease';
            textContainer.style.opacity = '1';
            let index = 0;
            const text = scene.text;
            const typeInterval = setInterval(() => {
                if (index < text.length) {
                    textElement.textContent += text.charAt(index);
                    index++;
                } else {
                    clearInterval(typeInterval);
                }
            }, 30); // Adjust speed by changing this value
        }, 500);

        // Display character sprity
        if (scene.character) {
            const characterImg = document.createElement('img');
            characterImg.src = scene.character;
            characterImg.alt = 'Character';
            characterImg.classList.add('character-sprite');
            characterImg.style.position = 'absolute';
            characterImg.style.bottom = '10px';
            characterImg.style.left = '50%';
            characterImg.style.transform = 'translateX(-50%)';
            characterImg.style.height = '60%';
            container.appendChild(characterImg);
        }
    }
}

export default GameView;
