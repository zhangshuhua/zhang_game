/**
 * Created by zsh7040 on 2017-8-31.
 */
class Bullet extends Element{
    constructor(scene, img, x, y) {
        super(scene, img, x, y);
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
        if(this.isTouchTop()){
            this.die();
        }else {
            this.collidBrick(this.scene.elements.brick);
        }
    }

    collidBrick(bricks){
        //倒叙循环,保证重叠的砖块可以看出消失效果
        for (var i = bricks.length - 1; i >= 0; i--) {
            let b = bricks[i];
            if(b.alive && this.collideRect(b)){
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
     * 子弹太多需要remove
     */
    _remove(){
        var bullets = this.scene.elements.bullet;
        var index = bullets.indexOf(this);
        if(index!==-1){
            bullets.splice(index,1);
        }
    }

}
