class GameModel {
    constructor() {
        this.state = 'title';
        this.scenes = [];
        this.currentSceneIndex = 0;
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



    setState(newState) {
        this.state = newState;
        console.log(`Game state changed to: ${this.state}`);
    }
}

export default new GameModel();
