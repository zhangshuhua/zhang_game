/**
 * 所有道具类的父类
 * Created by zsh7040 on 2017-9-6.
 */
class Item extends Element{
    constructor(scene, img, x, y) {
        super(scene, img, x, y, function (img) {
            this.x = (Math.floor(this.x / img.width)) * img.width;
            this.y = (Math.floor(this.y / img.height)) * img.height;
        });
        this.speed = 2;
        this.utility = true;
        this.init();
    }

    init(){

    }

    move(){
        this.y += this.speed;
    }

    update(){
        this.move();
        if(this.collideRect(this.scene.elements.paddle[0])){
            this.effect();
        }
    }

    show(){
        this.scene.addElement(this);
    }

    draw() {
        this.update();
        if (this.utility) {
            this.scene.context.drawImage(this.img, this.x, this.y);
        }
    }

    /**
     * 加上道具之后
     */
    afterEffect() {
        this.utility = false;
        //如果有失效的话,延迟6s实现
        if(this.loseEffect){
            this.loseEffect();
        }
    }

}
