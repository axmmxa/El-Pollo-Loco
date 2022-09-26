class World {

    character = new Character()
    level = level1
    canvas
    ctx
    keyboard
    camera_x = 0
    statusBar = new StatusBar()
    throwableObjects = []
    coin = [new Coin(), new Coin(), new Coin(), new Coin(), new Coin(),]
    chicken = new Chicken()
    ChickenSmall = new ChickenSmall()


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d')
        this.canvas = canvas
        this.keyboard = keyboard
        this.draw()
        this.setWorld()
        this.run()
        this.checkThrowObejects()
    }

    setWorld() {
        this.character.world = this

    }

    run() {
        setInterval( () => {

            // check Collisions
            this.checkCollisions()
            this.checkThrowObejects()
        }, 100)
    }

    checkCollisions() {
        this.level.enemies.forEach( (enemy) => {

            if(this.character.isColliding(enemy) && !this.character.isAboveGround() && !enemy.dead) {
                console.log("fail fail")
                this.character.hit() 
                console.log(this.character.energy)
                this.statusBar.setPercentage(this.character.energy)
            }

            if(this.character.isColliding(enemy) && this.character.isAboveGround() && (enemy instanceof Chicken || enemy instanceof ChickenSmall)) {
                console.log("VON OBEN")
                if( enemy instanceof Chicken) {
                    enemy.playAnimation(this.chicken.IMAGES_DEAD)
                    enemy.stopAnimation()
                    enemy.dead = true
                }

                if( enemy instanceof ChickenSmall) {
                    enemy.playAnimation(this.ChickenSmall.IMAGES_DEAD)
                    enemy.stopAnimation()
                    enemy.dead = true
                }
                
            }

        })
    }

    checkThrowObejects() {
        if(this.keyboard.D) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100)
            this.throwableObjects.push(bottle)
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        this.ctx.translate(this.camera_x, 0)

        this.addObjectsToMap(this.level.backgroundObjects)

        this.ctx.translate(-this.camera_x, 0) //back
        this.addToMap(this.statusBar)
        this.ctx.translate(this.camera_x, 0) //forward

        this.addObjectsToMap(this.coin)
        this.addToMap(this.character)
        this.addObjectsToMap(this.level.enemies)
        this.addObjectsToMap(this.level.clouds)
        this.addObjectsToMap(this.throwableObjects)
        this.ctx.translate(-this.camera_x, 0)
      
        // Draw wird immer wieder aufgerufen
        let self = this
        requestAnimationFrame(function(){
            self.draw();
        })
    }

    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object)
        })
    }

    addToMap(mo) {
        if(mo.otherDirection) {
            this.flipImage(mo)
        }

        ;

        mo.draw(this.ctx)

        mo.drawFrame(this.ctx)

        if (mo.otherDirection) {
            this.flipImageBack(mo)
        }
    }

    flipImage(mo) {
            this.ctx.save()
            this.ctx.translate(mo.width, 0)
            this.ctx.scale(-1, 1)
            mo.x = mo.x * -1
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1
        this.ctx.restore()
    }
}