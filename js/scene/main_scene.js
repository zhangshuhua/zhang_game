/**
 * Created by zsh7040 on 2017-9-6.
 */
class MainScene extends Scene{
    constructor(context){
        super(context);
        this.backgroud;
        this.livingBrick = 0;
    }

    update(){
        if(this.livingBrick <=0 ){
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
        this.resetState();

        this.game.level ++;
        $('#game-level').text(this.game.level);

        for(var i = 0;i<3;i++){
            var x = random(0,550);
            var y = random(0,200);
            var index = parseInt(random(0,17));
            var path = 'img/brick' + index + '.png';
            var brick = new Brick(this,path,x,y);

            this.addElement(brick);
        }

    }

    //noinspection JSAnnotator
    resetState(){
        if(this.elements.brick.length > 0){
            this.elements.brick.length = 0;
        }
        //ball归位，应当在paddle中央
        var ball = this.elements.ball[0];
        var paddle = this.elements.paddle[0];
        ball.x = paddle.x+ paddle.width/2 -ball.width/2;
        ball.y = paddle.y - ball.height-1;
        ball.speedX = -3;
        ball.speedY = -3;

        //加快小球速度
        window.fps -= 2;
    }
}
