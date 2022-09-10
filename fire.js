const firePixelsArray = []
const fireWidth = 100
const fireHeight = 50
const lightnessColorsPalette = [0, 5.40, 8.10, 10.80, 13.50, 16.20, 18.90, 21.60, 24.30, 27, 29.70, 32.40, 35.10, 37.80, 40.50, 43.20, 45.90, 48.60, 51.30, 54, 56.70, 59.40, 62.10, 64.80, 67.50, 70.20, 72.90, 75.60, 78.30, 81, 83.70, 86.40, 89.10, 91.80, 94.50, 97.20, 100]

function start() {
    
    createFireDataStructure()
    createFireSouce()
    renderFire()
    changeWindDirection(1)
    setInterval(calculateFirePropagation, 10)
}

function createFireDataStructure(){
    const numberOfPixels = fireWidth * fireHeight

    for (let i = 0; i < numberOfPixels; i++){
        firePixelsArray[i] = 0
    }
}

function calculateFirePropagation(){
    for (let column = 0; column < fireWidth; column++){
        for (let row = 0; row < fireHeight; row++){
            const pixelIndex = column + (fireWidth * row)
            updateFireIntesityPerPixel(pixelIndex)
        }         
    }
    renderFire()
}

function changeWindDirection(value) {
    windDirection = value
}

function updateFireIntesityPerPixel(currentPixelIndex){
    const belowPixelIndex = currentPixelIndex + fireWidth

    if (belowPixelIndex >= fireWidth * fireHeight) {
        return
    }

    const decay = Math.floor(Math.random() * 3)
    const belowPixelFireIntensity = firePixelsArray[belowPixelIndex]
    const newFireIntensity = 
        belowPixelFireIntensity - decay >= 0 ? belowPixelFireIntensity - decay : 0

        switch(windDirection) {
            case 0: firePixelsArray[currentPixelIndex - decay] = newFireIntensity; break; //wind comes to the left
            case 1: firePixelsArray[currentPixelIndex] = newFireIntensity; break; //no wind (fire set to up)
            case 2: firePixelsArray[currentPixelIndex + decay] = newFireIntensity; break; //wind comes to the right
    }
}

function renderFire(){
    let html = '<table cellpadding=0 cellspacing=0>'

    for (let row = 0; row < fireHeight; row++) {
        html += '<tr>'

        for (let column = 0; column < fireWidth; column++) { 
            const pixelIndex = column + ( fireWidth * row )
            const fireIntensity = firePixelsArray[pixelIndex]
                function toHslString() {          
                    const hue = Number(document.getElementById('hueInput').value)
                    const lightness = lightnessColorsPalette[fireIntensity]

                    return "hsl(" + hue + ", 80%, " + lightness + "%)"
                }

            if (debug === true) {
                html += '<td>'
                html += `<div class="pixel-Index">${pixelIndex}</div>`
                html += `<div id="pixelColor" style="color: ${toHslString()}">${fireIntensity}</div>`
                html += '</td>'

            } else {
                html += `<td class="pixel" style="background-color: ${toHslString()}">`
                html += '</td>'
                }
        }

        html += '</tr>'
    }

    html += '</table>'

    document.querySelector('#fireCanvas').innerHTML = html
}

function createFireSouce() {
    for (let column = 0; column <= fireWidth; column++){
        const overflowPixelIndex = fireWidth * fireHeight
        const pixelIndex = (overflowPixelIndex - fireWidth) + column

        firePixelsArray[pixelIndex] = 36
    }
}

function destroyFireSource() {
    for (let column = 0; column <= fireWidth; column++) {
        const overflowPixelIndex = fireWidth * fireHeight
        const pixelIndex = (overflowPixelIndex - fireWidth) + column 

        firePixelsArray[pixelIndex] = 0
    }
}

function increaseFireSource() {
    for (let column = 0; column <= fireWidth; column++) {
        const overflowPixelIndex = fireWidth * fireHeight
        const pixelIndex = (overflowPixelIndex - fireWidth) + column

        const currentFireIntensity = firePixelsArray[pixelIndex]

        if (currentFireIntensity < 36) {
            const increase = Math.floor(Math.random() * 14)
            const newFireIntensity =
            currentFireIntensity + increase >= 36 ? 36 : currentFireIntensity + increase

            firePixelsArray[pixelIndex] = newFireIntensity
        }
    }
}

function decreaseFireSource() {
    for (let column = 0; column <= fireWidth; column++) {
        const overflowPixelIndex = fireWidth * fireHeight
        const pixelIndex = (overflowPixelIndex - fireWidth) + column

        const currentFireIntensity = firePixelsArray[pixelIndex]

        if (currentFireIntensity > 0) {
            const decay = Math.floor(Math.random() * 14)
            const newFireIntensity =
            currentFireIntensity - decay >= 0 ? currentFireIntensity - decay : 0

            firePixelsArray[pixelIndex] = newFireIntensity
        }
    }
}

function toggleDebugMode() {
    if (debug === false) {        
        debug = true
    } else {       
        debug = false
    }

    createFireDataStructure()
    
}

start()