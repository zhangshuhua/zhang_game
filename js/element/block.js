/**
 * Created by zhang on 2017/9/3.
 */
class Block extends Element{
    /**
     * width 40 ; height 20;
     */
    constructor(scene, img, x, y){
        super(scene,img,x,y);
        this.alive = true;
        this.init();
    }

    init(){
        this.initShow();
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

    /**
     * 将block可以网格化显示,对齐显示
     */
    initShow(){
        var tile = {
            width : 40,
            height : 20,
        };
        //对齐显示
        this.x = (Math.floor(this.x/tile.width))*tile.width;
        this.y = (Math.floor(this.y/tile.height))*tile.height;
    }
}
