/**
 * Created by zhang on 2017/9/3.
 */
class Brick extends Element{
    constructor(scene, img, x, y){
        super(scene,img,x,y,initShow);
        this.alive = true;
        // this.scene.livingBrick++;
        this.init();
    }

    init(){

    }

    update(){

    }

    /*draw(){
        this.update();
        if(this.alive){
            this.scene.context.drawImage(this.img, this.x, this.y);
        }
    }*/

    /**
     * 被击中
     */
    die(){
        this.alive = false;
        // this.scene.livingBrick--;
        this.scene.game.score += 100;
        $('#game-score').text(this.scene.game.score);
        this._remove();
    }

    /**
     * 在scene的元素中移除
     */
    _remove(){
        var bricks = this.scene.elements.brick;
        var index = bricks.indexOf(this);
        if(index!==-1){
            bricks.splice(index,1);
        }
    }

}

/**
 * brick 回调函数
 * 网格对齐显示
 * @param img brick.png
 */
function initShow(img){
    this.x = (Math.floor(this.x/img.width))*img.width;
    this.y = (Math.floor(this.y/img.height))*img.height;
}
