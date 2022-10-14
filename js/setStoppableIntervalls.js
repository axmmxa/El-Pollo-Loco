
let intervalIDS = []


function setStoppableInteral(fn, time) {
   let id =  setInterval(fn, time)
   intervalIDS.push(id)
}

function stopInterval() {
    intervalIDS.forEach(clearInterval)
}

