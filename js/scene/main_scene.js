/**
 * Created by zsh7040 on 2017-9-6.
 */
class MainScene extends Scene{
    constructor(context){
        super(context);
        this.livingPaddle = 0;
    }

    update(){
        if(this.livingPaddle <=0 ){
            this.nextLevel();
        }
    }


    draw(){
        this.update();
        var types = Object.keys(this.elements);
        for(var type of types){
            for (var e of this.elements[type]){
                e.draw();
            }
        }
    }

    //TODO 能否用观察者模式，全部通知
    nextLevel(){
        for(var i = 0;i<3;i++){
            var x = random(0,550);
            var y = random(0,100);
            var brick = new Brick(this,'img/brick.png',x,y);
            this.addElement(brick);
        }
        window.fps -= 5;
        var paddle = this.elements['paddle'][0];

        var offset = -10;
        paddle.y +=offset;
        paddle.leftGun.y += offset;
        paddle.rightGun.y += offset;
    }
}
