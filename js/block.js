/**
 * Created by zhang on 2017/9/3.
 */
class Block extends Element{
    constructor(scene, img, x, y){
        super(scene,img,x,y);
        this.alive = true;
    }

    update(){
        var elements = this.scene.elements;
        for(var e of elements){
            if(e instanceof Block){

            }
        }
    }

    /**
     * 消失
     */
    die(){
        this.alive = false;
        this._remove();
    }

    /**
     * 在scene的元素中移除
     */
    _remove(){
        var elements = this.scene.elements;
        var index = elements.indexOf(this);
        if(index!==-1){
            elements.splice(index,1);
        }
    }
}
