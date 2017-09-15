/**
 * Created by zsh7040 on 2017-9-15.
 */
class Trail{
    constructor(ball,){
        this.ball = ball;
        //小球尾巴开始的两个端点
        this.circlePoint1 = {};
        this.circlePoint2 = {};
        //小球屏幕上实际显示的端点
        this.lineEndPoint = {};
        //小球尾巴的控制点
        this.curveEndPoint = {};
        this.colliding = false;
    }

    show(){
        this.calCirclePoints();
        this.refreshEndPoints();
        if(this.colliding){
            var normal = this.ball.lastCollid.normal;
            var k = -normal.x/normal.y;

            var mirrorArgs = pointSlopeToNormal(k,this.ball.lastCollid);
            var line1Args = twoPointToNormal(this.circlePoint1.x,this.circlePoint1.y,this.lineEndPoint.x,this.lineEndPoint.y);
            var line2Args = twoPointToNormal(this.circlePoint2.x,this.circlePoint2.y,this.lineEndPoint.x,this.lineEndPoint.y);

            var point1 = twoLineInterPoint(line1Args,mirrorArgs);
            var point2 = twoLineInterPoint(line2Args,mirrorArgs);

            var r = this.ball.r;
            var a = {
                x:this.ball.x + r,
                y:this.ball.y + r
            };
            var b = {
                x:this.lineEndPoint.x,
                y:this.lineEndPoint.y
            };

            //判断线段ab和12是否相交
            if(segmentsIntr(a,b,point1,point2)){
                this.bounceTrail(mirrorArgs,point1,point2);
            }else {
                this.colliding = false;
                this.normalTrail();
            }
        }else {
            this.normalTrail();
        }
    }

    /**
     * 实时刷新尾巴短点,一个是实际控制点，一个是屏幕显示端点
     */
    refreshEndPoints(){
        var r = this.ball.r;
        this.lineEndPoint.x = this.ball.x+r-15*this.ball.speedX;
        this.lineEndPoint.y = this.ball.y+r-15*this.ball.speedY;
        this.curveEndPoint.x = this.ball.x+r-30*this.ball.speedX;
        this.curveEndPoint.y = this.ball.y+r-30*this.ball.speedY;
    }

    normalTrail(){
        var ctx = this.ball.scene.context;
        ctx.save();

        this.style(ctx);

        ctx.beginPath();
        ctx.moveTo(this.circlePoint1.x, this.circlePoint1.y);
        ctx.quadraticCurveTo(this.curveEndPoint.x,  this.curveEndPoint.y, this.circlePoint2.x, this.circlePoint2.y);

        ctx.fill();
        ctx.restore();

    }

    /**
     * 反弹轨迹显示
     * @param mirrorArgs 反弹面的直线方程参数
     * @param point1 反弹时交点1
     * @param point2 反弹时交点2
     */
    bounceTrail(mirrorArgs, point1, point2){

        var ctx = this.ball.scene.context;
        ctx.save();
        this.style(ctx);

        ctx.beginPath();
        ctx.moveTo(this.circlePoint1.x, this.circlePoint1.y);
        ctx.lineTo(point1.x,point1.y);
        ctx.lineTo(point2.x,point2.y);
        ctx.lineTo(this.circlePoint2.x, this.circlePoint2.y);
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(point1.x,point1.y);
        var originPoint = {
            x:this.lineEndPoint.x,
            y:this.lineEndPoint.y
        };
        var mirrorPoint = symmetryPoint(mirrorArgs,originPoint);
        ctx.quadraticCurveTo(mirrorPoint.x,  mirrorPoint.y, point2.x,point2.y);
        ctx.fill();
        ctx.restore();
    }

    calCirclePoints(){
        var r = this.ball.r;
        var k = -(this.ball.speedX/this.ball.speedY);

        this.circlePoint1 = circleIntersection(k,this.ball.x+r,this.ball.y+r,r).point1;
        this.circlePoint2 = circleIntersection(k,this.ball.x+r,this.ball.y+r,r).point2;
    }

    //尾巴样式
    style(ctx){
        ctx.globalAlpha = 0.3;
        ctx.shadowColor = '#55cdfb';
        ctx.shadowBlur = 5;
        ctx.fillStyle = '#55cdfb';
    }
}
