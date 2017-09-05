/**
 * Created by zhang on 2017/9/3.
 */
class Scene{
    constructor(context){
        this.context = context;
        this.width = this.context.canvas.clientWidth;
        this.height = this.context.canvas.clientHeight;
        this.elements = [];
    }

    draw(){
        for (var e of this.elements){
            e.draw();
        }
    }

    addElement(element){
        this.elements.push(element);
        return this;
    }
}
