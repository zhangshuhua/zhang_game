/**
 * Created by zhang on 2017/9/3.
 */
class Scene{
    constructor(context){
        this.context = context;
        this.width = this.context.canvas.clientWidth;
        this.height = this.context.canvas.clientHeight;
        this.elements = {
            paddle:[],
            ball:[],
            block:[],
        };
    }

    update(){
        var blocks = this.elements.block;
        if(blocks.length===0){
            for(var i = 0;i<10;i++){
                var x = random(0,550);
                var y = random(0,100);
                var block = new Block(this,'img/block.png',x,y);
                this.addElement(block);
            }
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

    addElement(element){
        var type = element.constructor.name.toLowerCase();
        this.elements[type].push(element);
        return this;
    }
}
