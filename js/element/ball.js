/**
 * Created by zsh7040 on 2017-8-31.
 */
class Ball extends Element {

    constructor(scene, img, x, y) {
        super(scene, img, x, y);
        this.speedX = 4;
        this.speedY = 4;
        this.init();
    }

    init() {
    }

    move() {
        this.x += this.speedX;
        this.y += this.speedY;
    }


    update() {
        this.move();
        if (this.isTouchBottom()) {
            // this.scene.game.over();
            this.bounceY();
        } else {
            if (this.isTouchTop()) {
                this.resetEdgeY();
                this.bounceY();
            }
            if (this.isCollidXWall()) {
                this.resetEdgeX();
                this.bounceX();
            } else {
                this.collidBrick(this.scene.elements.brick);
                this.collidPaddle(this.scene.elements.paddle[0]);
            }
        }
    }

    bounceY() {
        this.speedY *= -1;
    }

    bounceX() {
        this.speedX *= -1;
    }
    bounceXY(normal){
       var inVec = new Victor(this.speedX,this.speedY);
       var result = reflectVec(inVec,normal);
       this.speedX = result.x;
       this.speedY = result.y;
    }

    resetEdgeX() {
        if (this.x > this.scene.width / 2) {
            this.x = this.scene.width - this.width;
        } else {
            this.x = 0;
        }
    }

    resetEdgeY() {
        this.y = 0;
    }

    isCollidXWall() {
        return this.x <= 0 || this.x + this.width >= this.scene.width;
    }

    isTouchTop() {
        return this.y <= 0;
    }

    isTouchBottom() {
        return this.y + this.height >= this.scene.height;
    }

    collidBrick(bricks) {
        for (let b of bricks) {
            if (b.alive) {
                var angle = this.rectCollided(b);
                if(angle){
                    this.bounceXY(angle);
                    b.die();
                    break;
                }
            }
        }
    }

    collidPaddle(paddles) {
            var angle = this.rectCollided(paddles);
            if (angle) {
                this.bounceXY(angle);
        }
    }

    rectCollided(rect) {
        var center = {
            x: this.x + this.width / 2,
            y: this.y + this.height / 2
        };

        var centerOfRect = {
            x: rect.x + rect.width / 2,
            y: rect.y + rect.height / 2,
        };

        var rightTopOfRect = {
            x: rect.x + rect.width,
            y: rect.y,
        };

        var r = this.width / 2;

        return circleInRect(centerOfRect, rightTopOfRect, center, r);
    }

}

