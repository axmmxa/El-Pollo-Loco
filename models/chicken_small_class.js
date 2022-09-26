class ChickenSmall extends MovableObject {

    y = 370
    height = 50
    width = 70
    dead = false
    move
    animationWalking

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ]

    IMAGES_DEAD = ['img/3_enemies_chicken/chicken_small/2_dead/dead.png']
    
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png')
        this.loadImages(this.IMAGES_WALKING)
        this.loadImages(this.IMAGES_DEAD)
        this.x = 300 + Math.random() * 2000;
        this.speed = 0.15 + Math.random() * 0.25
        this.animate()
    }

    animate() {
        this.move = setInterval( () => {
            this.x -= this.speed
        }, 1000 / 60)

        this.animationWalking = setInterval( () => {
            
            this.playAnimation(this.IMAGES_WALKING)
        }, 100)
        
    }

    stopAnimation() {
        clearInterval(this.move)
        clearInterval(this.animationWalking)
    }
}