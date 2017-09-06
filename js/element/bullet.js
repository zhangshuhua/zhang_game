/**
 * Created by zsh7040 on 2017-8-31.
 */
class Bullet extends Element{
    constructor(scene, img, x, y,callback) {
        super(scene, img, x, y,callback);
        this.speed  = 15;
        this.init();
    }

    init(){
    }

    move(){
        this.y -= this.speed;
    }


    update(){
        this.move();
        if(this.isCollidTop()){
            this.die();
        }else {
            this.collidBlock(this.scene.elements.block);
        }
    }

    isCollidTop(){
        return this.y<=0;
    }

    collidBlock(blocks){
        for (var e of blocks){
            //这里虽然block已经在scene中的element是没有了，但是block这个元素还是存在的，因此block需要加入属性alive
            if(this.rectCollided(e)&& e.alive){
                e.die();
                this.die();
            }
        }
    }

    die(){
        this._remove();
    }

    /**
     * 在scene的元素中移除
     */
    _remove(){
        var bullets = this.scene.elements.bullet;
        var index = bullets.indexOf(this);
        if(index!==-1){
            bullets.splice(index,1);
        }
    }

}
