class GameEnd extends DrawableObject{

    IMAGE_LOST = 'img/9_intro_outro_screens/game_over/oh no you lost!.png'

    IMAGE_WON = 'img/9_intro_outro_screens/game_over/game over!.png'

    

    constructor() {

        super().loadImage(this.IMAGE_LOST)
        this.loadImage(this.IMAGE_WON)
    }

    wonGame() {
        document.getElementById('body').innerHTML =''
        document.getElementById('body').innerHTML += `
        <img class="game-over-img" src="img/9_intro_outro_screens/game_over/game over!.png">
        `
    }

    lostGame() {
        document.getElementById('body').innerHTML =''
        document.getElementById('body').innerHTML += `
        <img class="game-over-img" src="img/9_intro_outro_screens/game_over/you lost.png">
        `
    }


    
}