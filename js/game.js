let canvas
let world
let keyboard = new Keyboard()





function startGame() {
    document.getElementById('body').innerHTML = ''
    document.getElementById('body').innerHTML += `

    <h1 class="headline">El Pollo Loco</h1>

    <div id="fullscreen">

        <canvas id="canvas" width="720" height="480">
            
            
        </canvas>

    </div>
    
    

    <div class="play-info">

        <div class="move-info">
            <p>move left</p>
            <p class="move-button"><</p>
        </div>

        <div class="move-info">
            <p>throw bottle</p>
            <p class="move-button">D</p>
        </div>

        <div class="move-info">
            <p>jump</p>
            <p class="move-button">^</p>
        </div>

        <div class="move-info">
            <p>move right</p>
            <p class="move-button">></p>
        </div>
        
    </div>

    <div class="play-info-mobile">

        <div class="move-info-mobile">
            <img id="touch-move-left" src="img/11_mobile_bar/mobile-left.png">
        </div>

        <div class="move-info-mobile">
            <img src="img/11_mobile_bar/mobile-bottle.png">
        </div>

        <div class="move-info-mobile">
            <img src="img/11_mobile_bar/mobile-up.png">
        </div>

        <div class="move-info-mobile">
            <img src="img/11_mobile_bar/mobile-right.png">
        </div>

    </div>
    `

    canvas = document.getElementById('canvas')
    world = new World(canvas, keyboard)
    

    console.log("My character is", world.character)

}


window.addEventListener('keydown', (event) => {
    
    if(event.keyCode == 39) {
        keyboard.RIGHT = true
    }

    if(event.keyCode == 37) {
        keyboard.LEFT = true
    }

    if(event.keyCode == 38) {
        keyboard.UP = true
    }

    if(event.keyCode == 40) {
        keyboard.DOWN = true
    }

    if(event.keyCode == 32) {
        keyboard.SPACE = true
    }

    if(event.keyCode == 68) {
        keyboard.D = true
    }
    
})


document.getElementById('touch-move-left').addEventListener('touchstart', (e) => {
    e.preventDefault()
    keyboard.LEFT = true
})

document.getElementById('touch-move-left').addEventListener('touchend', (e) => {
    e.preventDefault()
    keyboard.LEFT = false
})



window.addEventListener('keyup', (event) => {

    if(event.keyCode == 39) {
        keyboard.RIGHT = false
    }

    if(event.keyCode == 37) {
        keyboard.LEFT = false
    }

    if(event.keyCode == 38) {
        keyboard.UP = false
    }

    if(event.keyCode == 40) {
        keyboard.DOWN = false
    }

    if(event.keyCode == 32) {
        keyboard.SPACE = false
    }

    if(event.keyCode == 68) {
        keyboard.D = false
    }
    
})