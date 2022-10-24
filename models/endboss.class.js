class Endboss extends MovableObject {
   
    height = 400
    width = 250
    moveX
    energy = 25

    IMAGES_NORMAL= [
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',

    ]

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ]


    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ]

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ]



    constructor() {
        super().loadImage(this.IMAGES_NORMAL[0])
        this.loadImages(this.IMAGES_NORMAL)
        
        this.loadImages(this.IMAGES_HURT)
        this.loadImages(this.IMAGES_WALKING)
        this.loadImages(this.IMAGES_DEAD)
        this.y = 55
        this.x = 2500
        this.animate()
    }

    animate() {
        
        setStoppableInterval( () => {

            if(this.energy <= 0) {
                this.playAnimation(this.IMAGES_DEAD)
                clearInterval(this.moveX)
                console.log("endboss is dead")
            }

            else if(this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT)
                console.log("endboss animation hurt")
            }

            else if(this.energy < 20 && this.energy >= 0) {
                this.playAnimation(this.IMAGES_WALKING)
                
                this.moveX =setInterval( () => {
                    this.x -= 0.1
                    console.log("endboss walking animation")
                }, 1000/60)
            }

            else if(this.energy >= 25) {
                this.playAnimation(this.IMAGES_NORMAL)
                console.log("endboss animation normal")
            }
 
        }, 200)
        
    }

}