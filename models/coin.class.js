class Coin extends CollactableItem {

    
    height = 200
    width = 200

    img = 'img/8_coin/coin_1.png'

    constructor() {
        super().loadImage(this.img)
        this.x = 200 + Math.random() * 2000;
        this.y = 280 - Math.random() * 100
    }

}    