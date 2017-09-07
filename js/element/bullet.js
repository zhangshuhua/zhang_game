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
            this.collidBrick(this.scene.elements.brick);
        }
    }

    isCollidTop(){
        return this.y<=0;
    }

    collidBrick(bricks){
        for (var b of bricks){
            if(this.rectCollided(b)&& b.alive){
                b.die();
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
