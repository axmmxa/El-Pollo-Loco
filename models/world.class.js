class World {

    character = new Character()
    level = level1
    canvas
    ctx
    keyboard
    camera_x = 0
    statusBar = new StatusBar()
    coinbar = new CoinBar()
    bottlebar = new BottleBar()
    coinAmount = 0
    coins = [new Coin(), new Coin(), new Coin(), new Coin(), new Coin(),]
    bottleAmount = 0
    bottles = [new Bottle(), new Bottle(), new Bottle(), new Bottle(), new Bottle()]
    throwableObjects = [new ThrowableObject(), new ThrowableObject(), new ThrowableObject(), new ThrowableObject(), new ThrowableObject(),]
    chicken = new Chicken()
    ChickenSmall = new ChickenSmall()
    endBoss = level1.enemies[level1.enemies.length -1]
    gameEnd = new GameEnd()
    item_sound = new Audio('audio/item.mp3')
    win_sound = new Audio('audio/win.mp3')
    lose_sound = new Audio('audio/lose.mp3')
    chicken_sound = new Audio('audio/chicken.mp3')
    bottle_break_sound = new Audio('audio/bottle_breaking.mp3')

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
        setStoppableInterval( () => {
            // check Collisions
            this.checkCollisions()
            this.checkThrowObejects()
            this.checkGameEnd()
        }, 100)
    }

    // Collision Character with enemies
    checkCollisions() {

        this.level.enemies.forEach( (enemy) => {

            if(this.character.isColliding(enemy) && !this.character.isAboveGround() && !enemy.dead) {
                this.character.hit() 
                this.statusBar.setPercentage(this.character.energy)
            }

            if(this.character.isColliding(enemy) && this.character.isAboveGround() && (enemy instanceof Chicken || enemy instanceof ChickenSmall)) {
                if( enemy instanceof Chicken) {
                    enemy.playAnimation(this.chicken.IMAGES_DEAD)
                    enemy.stopAnimation()
                    enemy.dead = true
                    this.chicken_sound.play()
                }

                if( enemy instanceof ChickenSmall) {
                    enemy.playAnimation(this.ChickenSmall.IMAGES_DEAD)
                    enemy.stopAnimation()
                    enemy.dead = true
                    this.chicken_sound.play()
                }
            }
        })
       //Collision  character with coin
        this.coins.forEach(coin => {
            if(this.character.isColliding(coin) && (coin.heigth !=0 && coin.width !=0)) {
                coin.height = 0
                coin.width = 0
                this.coinAmount ++
                this.coinbar.setPercentage(this.coinAmount*20)
                this.item_sound.play()
            }
        })

        // Collision Bottle with character
        this.bottles.forEach(bottle => {
            if(this.character.isColliding(bottle) && (bottle.heigth !=0 && bottle.width !=0)) {
              bottle.height = 0
              bottle.width = 0
              this.bottleAmount ++
              this.bottlebar.setPercentage(this.bottleAmount*20)
              this.item_sound.play()
            }
        })

        //Collision Bottle with ground

       

        // Collision Bottle with endboss
        this.throwableObjects.forEach(throwableObject => {

            if(this.endBoss.isColliding(throwableObject) && !throwableObject.isBroken && (throwableObject.heigth !=0 && throwableObject.width !=0 && throwableObject.y > 90)) {
                this.endBoss.energy -= 40
                this.bottle_break_sound.play()
                console.log("endboss energy", this.endBoss.energy)
                throwableObject.isBroken = true
                throwableObject.splash()
                //throwableObject.groundPosition =  throwableObject.y
                
                
                setTimeout( () => {
                    throwableObject.height = 0
                }, 500)
                
                }
        }) 

        //Collision Endboss with Character 
        if(this.endBoss.isColliding(this.character)) {
            this.character.energy = 0
            console.log("endboss colliding")
        }
    }


    checkGameEnd() {
        if(this.endBoss.energy < 0){
            setTimeout( () => {
                this.gameEnd.wonGame()
                this.win_sound.play()
                this.restartGame()
            },4000)
        }

        if(this.character.energy <= 0) {
            setTimeout(() => {
                this.gameEnd.lostGame()
                this.lose_sound.play()
            },4000)
        }
    }

    checkThrowObejects() {
        if(this.keyboard.D) {
            if(this.bottleAmount != 0) {
                let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100)
            this.throwableObjects.push(bottle)
            this.bottleAmount --
            this.bottlebar.setPercentage(this.bottleAmount*20)
            }
            
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        this.ctx.translate(this.camera_x, 0)

        this.addObjectsToMap(this.level.backgroundObjects)

        this.ctx.translate(-this.camera_x, 0) //back
        this.addToMap(this.statusBar)
        this.addToMap(this.coinbar)
        this.addToMap(this.bottlebar)
        this.ctx.translate(this.camera_x, 0) //forward

        this.addObjectsToMap(this.coins)
        this.addObjectsToMap(this.bottles)
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
        mo.draw(this.ctx)

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