/**
 * Created by zhang on 2017/9/3.
 */
class Game{
    constructor(scene){
        this.scene = scene;
        log(this.scene);
    }

    replaceScene(scene){
        scene.context.clearRect(0,0,600,400);
        this.scene = scene;
    }

    // start(){
    //     var context = this.scene.context;
    //     context.clearRect(0,0,600,400);
    //     var _this = this;
    //     setInterval(function () {
    //
    //         /*paddle.draw();
    //         ball.draw();
    //         if(ball.rectCollided(paddle)){
    //             ball.bounceY();
    //         }
    //         if(ball.XwallCollided()){
    //             ball.bounceX();
    //         }
    //         if(ball.YwallCollided()){
    //             ball.bounceY();
    //         }*/
    //         // log(_this.scene);
    //         _this.scene.draw();
    //
    //     },50);
    // }

}
