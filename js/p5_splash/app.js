let balls = [];

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight*0.9);
    canvas.id('p5-splash'); // Give the canvas the same ID as in the HTML
    canvas.style('position', 'absolute');
    canvas.style('top', '0');
    canvas.style('left', '0');
    canvas.style('z-index', '-1'); // Send to back


    for (let i = 0; i < 15; i++) {
        let r = random(10, 50);
        balls.push(new Ball(random(r, width-r), random(r, height-r), r));
    }
}

function draw() {
    background("#212529"); 
    // text("Hello World", mouseX, mouseY);
    //     textAlign(CENTER, CENTER);
    //     fill(255);
    
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
        let theta = random(0, 6.28);
        let speed = random(0.75, 1.5);
        this.v = [speed*Math.cos(theta), speed*Math.sin(theta)];
        console.log(this.v);
    }

    show() {
        ellipse(this.x, this.y, this.r*2);
        fill(220);
        noStroke();

    }

    update() {
        this.x += this.v[0];
        this.y += this.v[1];
        if (this.x - this.r < 0 || this.x + this.r > width) {
            this.v[0] *= -1;
        }
        if (this.y - this.r< 0 || this.y + this.r > height) {
            this.v[1] *= -1;
        }
    }

}