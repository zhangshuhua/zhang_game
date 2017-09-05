/**
 * Created by zhang on 2017/9/3.
 */
class Block extends Element{
    constructor(scene, img, x, y){
        super(scene,img,x,y);
        this.alive = true;
        this.init();
    }

    init(){
    }

    update(){
    }

    draw(){
        this.update();
        if(this.alive){
            this.scene.context.drawImage(this.img, this.x, this.y);
        }
    }

    /**
     * 被击中
     */
    die(){
        this.alive = false;
        this.scene.game.score += 100;
        this._remove();
    }

    add(){
        new Block(this.scene,this.imgPath,this.x,this.y);
    }

    /**
     * 在scene的元素中移除
     */
    _remove(){
        var blocks = this.scene.elements.block;
        var index = blocks.indexOf(this);
        if(index!==-1){
            blocks.splice(index,1);
        }
    }
}
