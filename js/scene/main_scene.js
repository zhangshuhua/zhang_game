/**
 * Created by zsh7040 on 2017-9-6.
 */
class MainScene extends Scene{
    constructor(context){
        super(context);
        // this.livingBrick = 0;
    }

    update(){
        if(this.elements.brick.length <=0 ){
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
        window.fps -= 1;

        for(var i = 0;i<30;i++){
            var x = random(0,550);
            var y = random(0,200);
            var index = parseInt(random(0,17));
            var path = 'img/brick' + index + '.png';
            var brick = new Brick(this,path,x,y);

            this.addElement(brick);
        }

    }
}
