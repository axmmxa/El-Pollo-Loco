class Endboss extends MovableObject {

    height = 400
    width = 250
   

    endbossEnergy = 100

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

            setStoppableInteral( () => {
                if(this.endbossEnergy == 100) {
                    this.playAnimation(this.IMAGES_NORMAL)
                }

                if(this.endbossEnergy < 100) {
                    this.playAnimation(this.IMAGES_HURT)
                }


                if(this.endbossEnergy < 60) {
                    setStoppableInteral( () => {
            
                        this.playAnimation(this.IMAGES_WALKING)
                    }, 100)

                    setStoppableInteral( () => {
                        this.x -= this.speed
                    }, 1000 / 60)
                }

                if(this.endbossEnergy < 0) {
                    this.playAnimation(this.IMAGES_DEAD)
                }
                
         }, 200)
    }

}