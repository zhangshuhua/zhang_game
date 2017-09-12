/**
 * 所有道具类的父类
 * Created by zsh7040 on 2017-9-6.
 */
class Item extends Element{
    constructor(scene, img, x, y) {
        super(scene, img, x, y, callback);
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
            this.die();
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
     * TODO 名字需要再想,不能为die
     * after die
     */
    afterDie() {
        this.utility = false;
    }
}
/**
 * item 回调函数
 * 网格对齐显示，与brick重叠
 * @param img brick.png
 */
function callback(img) {
    this.x = (Math.floor(this.x / img.width)) * img.width;
    this.y = (Math.floor(this.y / img.height)) * img.height;
}