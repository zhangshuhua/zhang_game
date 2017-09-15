/**
 * Created by zsh7040 on 2017-8-31.
 */
class Ball extends Element {

    constructor(scene, img, x, y) {
        super(scene, img, x, y,function (img) {
            this.r = img.width/2;
        });
        this.speedX = 3;
        this.speedY = 3;

        //最后一次的碰撞点
        this.lastCollid ={};

        this.init();
    }

    init() {
        //轨迹对象
        this.trail = new Trail(this);
    }

    move() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.trail.show();
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
        this.trail.colliding = true;
    }

    bounceX() {
        this.speedX *= -1;
        this.trail.colliding = true;
    }

    /**
     * 反弹函数 
     * @param rect 被碰撞物
     * @param normal 碰撞时的法线
     */
    bounce(rect,normal) {

        this.lastCollid.normal = normal;

        var inVec = new Victor(this.speedX, this.speedY);
        var outVec = reflectVec(inVec, normal);

        //反射速度向量-入射速度向量=受力方向
        var forceVec = outVec.clone().subtract(inVec);
        //小球重定位
        this.reLocation(rect,forceVec);
        //调整小球速度
        this.speedX = outVec.x;
        this.speedY = outVec.y;
    }

    resetEdgeX() {
        var normal ={};
        if (this.x > this.scene.width / 2) {
            this.x = this.scene.width - this.width;
            this.lastCollid.x = this.scene.width;
            this.lastCollid.y = this.y + this.r;

            normal.x = 1;
            normal.y = 0;

        } else {
            this.x = 0;
            this.lastCollid.x = 0;
            this.lastCollid.y = this.y + this.r;

            normal.x = -1;
            normal.y = 0;
        }
        this.lastCollid.normal=normal;
    }

    resetEdgeY() {
        this.y = 0;
        this.lastCollid.x = this.x +this.r;
        this.lastCollid.y = this.y ;
        this.lastCollid.normal={
            x: 0,
            y: -1
        };
    }

    /**
     * 反弹时重新定位,防止进入太多出现bug
     * @param rect 反弹物
     * @param stressDirection 受力方向=加速度方向=碰撞前后速度差
     */
    reLocation(rect,stressDirection){
        if(stressDirection.x<0){
            this.x = rect.x - this.width;
            this.lastCollid.x = rect.x;
            this.lastCollid.y = this.y + this.height/2;
        }
        if(stressDirection.x>0){
            this.x = rect.x+ rect.width;
            this.lastCollid.x = rect.x + rect.width;
            this.lastCollid.y = this.y + this.height/2;
        }
        if(stressDirection.y<0){
            this.y = rect.y - this.height;
            this.lastCollid.x = this.x + this.width/2;
            this.lastCollid.y = rect.y;
        }
        if(stressDirection.y>0){
            this.y = rect.y + rect.height;
            this.lastCollid.x = this.x+ this.width/2;
            this.lastCollid.y = rect.y + rect.height;
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
                    this.trail.colliding = true;
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
            this.trail.colliding = true;
        }
    }

    collideRect(rect) {
        var w = rect.width;
        var h = rect.height;
        var rx = (this.x + this.r) - (rect.x + w / 2);
        var ry = (this.y + this.r) - (rect.y + h / 2);
        return ComputeCollision(w, h, this.r, rx, ry);
    }
}

