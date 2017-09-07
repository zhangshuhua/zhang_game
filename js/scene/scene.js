/**
 * Created by zhang on 2017/9/3.
 */
class Scene{
    constructor(context){
        this.context = context;
        this.width = this.context.canvas.clientWidth;
        this.height = this.context.canvas.clientHeight;
        this.elements = {
            // paddle:[],
            // ball:[],
            // brick:[],
        };
    }
    //子类覆盖,但是父类有没有存在的必要呢
    draw(){

    }

    addElement(element){
        var type = element.constructor.name.toLowerCase();
        if(this.elements[type]){
            this.elements[type].push(element);

        }else {
            this.elements[type] = [];
            this.elements[type].push(element);
        }
        return this;
    }
}
