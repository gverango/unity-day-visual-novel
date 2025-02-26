import GameModel from './model.js';

class GameView {

    static typingEffect = true;
    static typeInterval = null;

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

    static finishTyping() {
       
        if(!this.typingEffect) return; 

        if(this.typeInterval) {
            clearInterval(this.typeInterval);
            this.typeInterval = null;
        }
        this.typingEffect = false;
        const scene = GameModel.getCurrentScene();
        const finishText = scene.text;
        const textElement = document.querySelector('.text-container p')
        textElement.textContent = finishText;


        const textContainer = document.querySelector('.text-container');
        if (scene.choices && scene.choices.length > 0) {
            const existingChoices = textContainer.querySelector('.choices-container');
            if (existingChoices) existingChoices.remove();

            const choicesContainer = document.createElement('div');
            choicesContainer.classList.add('choices-container');
            textContainer.appendChild(choicesContainer);

            scene.choices.forEach((choice, i) => {
                const choiceButton = document.createElement('button');
                choiceButton.classList.add('choice-button');
                choiceButton.textContent = `${i+1}) ${choice.text}`;
                
                choiceButton.addEventListener('click', () => {
                    const nextSceneIndex = GameModel.scenes.findIndex(s => s.id === choice.next);
                    if (nextSceneIndex !== -1) {
                        GameModel.currentSceneIndex = nextSceneIndex;
                        GameView.renderScene();
                    } else {
                        console.error("Next scene not found:", choice.next);
                    }
                });
                
                choicesContainer.appendChild(choiceButton);
            });
        }
    }

    static renderScene() {
        const scene = GameModel.getCurrentScene();
        const textContainer = document.querySelector('.text-container');
        const container = document.querySelector('.container');




        //Choices for MC moments 
        const showChoices = () => {
            if (scene.choices && scene.choices.length > 0) {
                // Remove any existing choices container first to prevent duplicates
                const existingChoices = textContainer.querySelector('.choices-container');
                if (existingChoices) existingChoices.remove();
                
                //create choices cotainer
                const choicesContainer = document.createElement('div');
                choicesContainer.classList.add('choices-container');
                textContainer.appendChild(choicesContainer);
                
                scene.choices.forEach((choice, i) => {
                    const choiceButton = document.createElement('button');
                    choiceButton.classList.add('choice-button');
                    choiceButton.textContent = `${i+1}) ${choice.text}`;
                    
                    choiceButton.addEventListener('click', () => {
                        event.stopPropagation()
                        const nextSceneId = choice.next;
                        document.querySelectorAll('.choice-button').forEach(btn => {
                            btn.disabled = true;
                        });
                        const nextSceneIndex = GameModel.scenes.findIndex(s => s.id === nextSceneId);
                        GameModel.currentSceneIndex = nextSceneIndex;
                        if (GameView.typeInterval) {
                            clearInterval(GameView.typeInterval);
                            GameView.typeInterval = null;
                        }
                        setTimeout(() => {
                            GameView.renderScene();
                        }, 700);
                    });
                    choicesContainer.appendChild(choiceButton);
                });
            }
        };


        // Clear prev scene
        textContainer.innerHTML = '';
        container.querySelectorAll('.character-sprite').forEach(element => element.remove());

        // Set background
        if (scene.background) {
            const bg = new Image();
            bg.src = scene.background;
            bg.onload = () => { //preloads image before displaying
                container.style.backgroundImage = `url('${scene.background}')`;
                container.style.backgroundSize = 'cover';
                container.style.backgroundPosition = 'center';
            };
        } else {
            container.style.backgroundImage = 'none';
        }

        // Display scene text
        textContainer.style.display = 'block';

        //For transition to new scene and text
        textContainer.style.opacity = '0'; 

        const textElement = document.createElement('p');
        textContainer.appendChild(textElement);

        
// DYNAMICALLY add Speaker Container
const oldSpeaker = document.querySelector('.speaker-container');
if (oldSpeaker) oldSpeaker.remove();

if (scene.speaker !== "") {
    const speakerContainer = document.createElement('div');
    speakerContainer.classList.add('speaker-container'); 
    speakerContainer.textContent = scene.speaker;
    
    speakerContainer.style.opacity = '0';
    speakerContainer.style.transition = 'opacity 0.5s ease';

    textContainer.appendChild(speakerContainer);

    setTimeout(() => {
        speakerContainer.style.transition = 'opacity 0.5s ease';
        speakerContainer.style.opacity = '1';
    }, 700);
}


    

        //Flag to check for typing effect 
        if(scene.text && scene.text.length > 0) {
            this.typingEffect = true;
            //Typing effect interval
            setTimeout(() => {
                if (!this.typingEffect) return;
                textContainer.style.transition = 'opacity 0.5s ease';
                textContainer.style.opacity = '1';
                let index = 0;
                const text = scene.text;
                this.typeInterval = setInterval(() => {
                    if (index < text.length) {
                        textElement.textContent += text.charAt(index);
                        index++;
                    } else {
                        clearInterval(this.typeInterval);
                        this.typingEffect = false
                        showChoices()
                    }
                }, 20);
            }, 700);
        }
        else {
            this.typingEffect = false;
            textContainer.style.transition = 'opacity 0.5s ease';
            textContainer.style.opacity = '1';
            showChoices();
        }

        // Display character sprity
        if (scene.character) {
            const characterImg = document.createElement('img');
            characterImg.src = scene.character;
            characterImg.alt = 'Character';
            characterImg.classList.add('character-sprite');
            characterImg.style.position = 'absolute';
            characterImg.style.bottom = '34%'; // position Y of sprite is not in relation to the container
            characterImg.style.left = '50%';
            characterImg.style.transform = 'translateX(-50%)';
            characterImg.style.height = '1280px';
            characterImg.style.width = '425px';
            container.appendChild(characterImg);
        }   
    }
}

export default GameView;
