function setup() {
    let canvas = createCanvas(windowWidth, windowHeight*0.9);
    canvas.id('p5-splash'); // Give the canvas the same ID as in the HTML
    canvas.style('position', 'absolute');
    canvas.style('top', '0');
    canvas.style('left', '0');
    canvas.style('z-index', '-1'); // Send to back
}

function draw() {
    background("#212529"); 
    text("Hello World", mouseX, mouseY);
        textAlign(CENTER, CENTER);
        fill(255);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight*0.9);
}
