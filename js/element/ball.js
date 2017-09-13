/**
 * Created by zsh7040 on 2017-8-31.
 */
class Ball extends Element {

    constructor(scene, img, x, y) {
        super(scene, img, x, y);
        this.speedX = 3;
        this.speedY = 3;
        this.init();
    }

    init() {
    }

    move() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.showTrail();
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

    /**
     * 反弹函数 
     * @param rect 被碰撞物
     * @param normal 碰撞时的法线
     */
    bounce(rect,normal) {
        var inVec = new Victor(this.speedX, this.speedY);
        var outVec = reflectVec(inVec, normal);
        this.reLocation(rect,outVec.clone().subtract(inVec));

        this.speedX = outVec.x;
        this.speedY = outVec.y;
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

    /**
     * 反弹时重新定位
     * @param rect 反弹物
     * @param stressDirection 受力方向=加速度方向=碰撞前后速度差
     */
    reLocation(rect,stressDirection){
        if(stressDirection.x<0){
            this.x = rect.x - this.width;
        }
        if(stressDirection.x>0){
            this.x = rect.x+ rect.width;
        }
        if(stressDirection.y<0){
            this.y = rect.y - this.height;
        }
        if(stressDirection.y>0){
            this.y = rect.y + rect.y;
        }
    }


    collidBrick(bricks) {
        //倒叙循环,保证重叠的砖块可以看出消失效果
        for (var i = bricks.length - 1; i >= 0; i--) {
            var b = bricks[i];
            if (b.alive) {
                var normal = this.collideRect(b);
                if (normal) {
                    this.bounce(b,normal);
                    b.die();
                    break;
                }
            }
        }
    }

    collidPaddle(paddle) {
        var normal = this.collideRect(paddle);
        if (normal) {
            this.bounce(paddle,normal);
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

    /**
     * 小球的运动轨迹特效
     */
    showTrail(){
        /*var ctx = this.scene.context;
        ctx.save();

        ctx.globalAlpha = 0.4;
        ctx.shadowColor = 'blue';
        ctx.shadowBlur = 50;
        ctx.fillStyle = 'blue';

        var r = this.width/2;
        //垂直的斜率的积为-1；
        var k = -(this.speedX/this.speedY);
        var points = circleIntersection(k,this.x+r,this.y+r,r);

        ctx.beginPath();
        ctx.moveTo(points.x1, points.y1);
        ctx.lineTo(points.x2, points.y2);
        ctx.lineTo(this.x+r-15*this.speedX, this.y+r-15*this.speedY);
        ctx.closePath();
        ctx.fill();

        ctx.restore();*/

    }


}

