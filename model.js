class GameModel {
    constructor() {
        this.state = 'title';
        this.scenes = [];
        this.currentSceneIndex = 0;
        this.bgm = new Audio()
        this.bgm.loop = true;
    }

    async loadScenes() {
        const response = await fetch('scenes.json');
        this.scenes = await response.json();
        console.log('Scenes loaded:', this.scenes);
    }

    getCurrentScene() {
        return this.scenes[this.currentSceneIndex];
    }

    nextScene() {
        if (this.currentSceneIndex < this.scenes.length - 1) {
            this.currentSceneIndex++;
        }
    }

    getPlayerName(){
        return localStorage.getItem('playerName') || '';
    }
    setPlayerName(name) {
            localStorage.setItem('playerName', name);
    }



    setState(newState) {
        this.state = newState;
        console.log(`Game state changed to: ${this.state}`);
    }

    playBgm(song) {
        this.bgm.src = song
        this.bgm.play();
        this.bgm.loop = true;
    }
}

export default new GameModel();
