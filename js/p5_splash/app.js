let balls = [];

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight*0.9);
    canvas.id('p5-splash'); // Give the canvas the same ID as in the HTML
    canvas.style('position', 'absolute');
    canvas.style('top', '0');
    canvas.style('left', '0');
    canvas.style('z-index', '-1'); // Send to back


    for (let i = 0; i < 10; i++) {
        balls.push(new Ball(random(width), random(height), random(10, 50)));
    }
}

function draw() {
    background("#212529"); 
    text("Hello World", mouseX, mouseY);
        textAlign(CENTER, CENTER);
        fill(255);
    
    for (let ball of balls) {
        ball.show();
        ball.update();
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight*0.9);
}

class Ball {
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.v = [random(-1, 1), random(-1, 1)];
    }

    show() {
        ellipse(this.x, this.y, this.r*2);
    }

    update() {
        this.x += this.v[0];
        this.y += this.v[1];
        if (this.x < 0 || this.x > width) {
            this.v[0] *= -1;
        }
        if (this.y < 0 || this.y > height) {
            this.v[1] *= -1;
        }
    }

}