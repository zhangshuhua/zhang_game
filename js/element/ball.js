/**
 * Created by zsh7040 on 2017-8-31.
 */
class Ball extends Element {

    constructor(scene, img, x, y) {
        super(scene, img, x, y);
        this.speedX = -3;
        this.speedY = -3;
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
            this.scene.game.over();
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

    bounce(normal) {
        var inVec = new Victor(this.speedX, this.speedY);
        var result = reflectVec(inVec, normal);
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



    collidBrick(bricks) {
        //倒叙循环,保证重叠的砖块可以看出消失效果
        for (var i = bricks.length - 1; i >= 0; i--) {
            var b = bricks[i];
            if (b.alive) {
                var normal = this.collideRect(b);
                if (normal) {
                    this.bounce(normal);
                    b.die();
                    break;
                }
            }
        }
    }

    collidPaddle(paddles) {
        var normal = this.collideRect(paddles);
        if (normal) {
            this.bounce(normal);
        }
    }

    collideRect(rect) {
        var w = rect.width;
        var h = rect.height;
        var r = this.width / 2;
        var rx = (this.x + r) - (rect.x + w / 2);
        var ry = (this.y + r) - (rect.y + h / 2);
        return ComputeCollision(w, h, r, rx, ry);
    }

}

