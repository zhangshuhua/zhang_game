/**
 * Created by zhang on 2017/9/3.
 */
class Scene{
    constructor(context){
        this.context = context;
        this.elements = [];
    }

    draw(){
        for (var e of this.elements){
            e.draw();
        }
    }
}
