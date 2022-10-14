class ThrowableObject extends MovableObject {

    groundPosition = 340
    breakbottle

    IMAGES_BOTTLE_ROTATION = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ]

    IMAGES_BOTTLE_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
    ]

    constructor(x, y) {
        super().loadImage(this.IMAGES_BOTTLE_ROTATION[0])
        this.loadImages(this.IMAGES_BOTTLE_ROTATION)
        this.loadImages(this.IMAGES_BOTTLE_SPLASH)
        this.x = x
        this.y = y
        this.height = 60
        this.width = 50
        this.trow()
    }


    isBroken = false

    trow() {
        this.speedY = 30
        this.applyGravity()
        this.rotation()
    }

    rotation() {
        setStoppableInteral( () => {
            
                if(this.isAboveGround() && !this.isBroken){
                    this.playAnimation(this.IMAGES_BOTTLE_ROTATION)
                    this.x += 10
                } 
                   
        }, 25)
    }

    splash() {
         this.breakbottle =setStoppableInteral( () => {
            this.playAnimation(this.IMAGES_BOTTLE_SPLASH)
            console.log('splash')
            this.stopSplash()
        }, 25)
    }

    stopSplash() {

        setTimeout( () => {
            clearInterval(this.breakbottle)
            console.log("stop plash")
        }, 500)
        
    }

   
    
}