/**
 * Created by zsh7040 on 2017-9-6.
 */
class MainScene extends Scene{
    constructor(context){
        super(context);
    }

    update(){
        var blocks = this.elements.block;
        if(blocks.length===0){
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

    nextLevel(){
        for(var i = 0;i<3;i++){
            var x = random(0,550);
            var y = random(0,100);
            var block = new Block(this,'img/block.png',x,y);
            this.addElement(block);
        }
        window.fps -= 5;
        this.elements['paddle'][0].y -=10;
    }
}
