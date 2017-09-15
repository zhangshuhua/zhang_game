/**
 * Created by zsh7040 on 2017-8-31.
 */
class Ball extends Element {

    constructor(scene, img, x, y) {
        super(scene, img, x, y);
        this.speedX = 3;
        this.speedY = 3;
        this.trailPoints ={};
        this.lastCollid ={};
        this.colliding = false;
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
        this.colliding = true;
    }

    bounceX() {
        this.speedX *= -1;
        this.colliding = true;
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

        //小球重定位
        this.reLocation(rect,outVec.clone().subtract(inVec));
        //调整小球速度
        this.speedX = outVec.x;
        this.speedY = outVec.y;
        //轨迹变形
        // this.changeTrailPoint();
    }

    resetEdgeX() {
        if (this.x > this.scene.width / 2) {
            this.x = this.scene.width - this.width;
            this.lastCollid.x = this.scene.width;
            this.lastCollid.y = this.y + this.height/2;
            var normal = {
                x :1,
                y:0
            };

        } else {
            this.x = 0;
            this.lastCollid.x = 0;
            this.lastCollid.y = this.y + this.height/2;
            var normal = {
                x :-1,
                y:0
            };
        }
        this.lastCollid.normal=normal;
    }

    resetEdgeY() {
        this.y = 0;
        this.lastCollid.x = this.x +this.width/2;
        this.lastCollid.y = this.y ;
        var normal = {
            x :0,
            y:-1
        };
        this.lastCollid.normal=normal;
    }

    /**
     * 反弹时重新定位
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
                    this.colliding = true;
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
            this.colliding = true;
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
        var r = this.width/2;
        var k = -(this.speedX/this.speedY);
        this.trailPoints = circleIntersection(k,this.x+r,this.y+r,r);
        // log('圆的顶点',this.trailPoints);
        this.changeTrailPoint();
        if(this.colliding){
            // log(this.lastCollid.normal);


            var mirrorArgs = mirror(this.lastCollid.normal,this.lastCollid);
            var line1Args = twoPointToNormal(this.trailPoints.x1,this.trailPoints.y1,this.trailPoints.linePointX,this.trailPoints.linePointY);
            var line2Args = twoPointToNormal(this.trailPoints.x2,this.trailPoints.y2,this.trailPoints.linePointX,this.trailPoints.linePointY);
            // log('反射面',mirrorArgs);
            // log('直线1=',line1Args);
            // log('直线2=',line2Args);

            var point1 = twoLineInterPoint(line1Args,mirrorArgs);
            var point2 = twoLineInterPoint(line2Args,mirrorArgs);
            // log('交点1=',point1);
            // log('交点2=',point2);
            var a = {
                x:this.x + r,
                y:this.y + r
            };
            var b = {
                x:this.trailPoints.linePointX,
                y:this.trailPoints.linePointY
                // x:this.trailPoints.curvePointX,
                // y:this.trailPoints.curvePointY
            };
            // log('b',b);
            if(segmentsIntr(a,b,point1,point2)){
                // log('小球圆心=',a);
                // log('尾巴顶点=',b);
                // log('交点1=',point1);
                // log('交点2=',point2);
                this.showBounceTrail(mirrorArgs,point1,point2);
            }else {
                this.colliding = false;
                this.showFollowTrail();
            }
        }else {
            this.showFollowTrail();
        }

    }




    showFollowTrail(){
        var ctx = this.scene.context;
        ctx.save();

        ctx.globalAlpha = 0.3;
        ctx.shadowColor = '#55cdfb';
        ctx.shadowBlur = 5;
        ctx.fillStyle = '#55cdfb';

        ctx.beginPath();
        ctx.moveTo(this.trailPoints.x1, this.trailPoints.y1);
        ctx.quadraticCurveTo(this.trailPoints.curvePointX,  this.trailPoints.curvePointY, this.trailPoints.x2, this.trailPoints.y2);

        ctx.fill();
        ctx.restore();

    }

    showBounceTrail(mirrorArgs,point1,point2){

        var ctx = this.scene.context;
        ctx.save();

        ctx.globalAlpha = 0.3;
        ctx.shadowColor = '#55cdfb';
        ctx.shadowBlur = 5;
        ctx.fillStyle = '#55cdfb';

        ctx.beginPath();
        ctx.moveTo(this.trailPoints.x1, this.trailPoints.y1);
        ctx.lineTo(point1.x,point1.y);
        ctx.lineTo(point2.x,point2.y);
        ctx.lineTo(this.trailPoints.x2,this.trailPoints.y2);

        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(point1.x,point1.y);
        var originPoint = {
            x:this.trailPoints.linePointX,
            y:this.trailPoints.linePointY
        };
        var mirrorPoint = symmetryPoint(mirrorArgs,originPoint);
        ctx.quadraticCurveTo(mirrorPoint.x,  mirrorPoint.y, point2.x,point2.y);
        ctx.fill();
        ctx.restore();
    }

    changeTrailPoint(){
        //生成曲线,曲线顶点为控制点的中点;
        var r = this.width/2;
        this.trailPoints.linePointX = this.x+r-15*this.speedX;
        this.trailPoints.linePointY = this.y+r-15*this.speedY;
        this.trailPoints.curvePointX = this.x+r-30*this.speedX;
        this.trailPoints.curvePointY = this.y+r-30*this.speedY;
    }
}

