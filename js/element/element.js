/**
 * Created by zsh7040 on 2017-8-31.
 */
class Element {
    constructor(scene, imgPath, x, y) {

        this.scene = scene;
        this.x = x || 0;
        this.y = y || 0;
        this.width = 0;
        this.height = 0;
        this.imgFromPath(imgPath);
    }

    imgFromPath(imgPath){
        var _this = this;
        var img = new Image();
        img.src = imgPath;
        img.onload = function () {
            _this.width = img.width;
            _this.height = img.height;
        };
        this.img = img;
    }


    /**
     * 给元素注册事件
     * @param type 事件类型
     * @param key 按键
     * @param func 函数
     */
    registerAction(type,key,func){
        var _this = this;
        document.addEventListener(type,function (event) {
            if(event.key == key){
                func.apply(_this);
            }
        });
    }

    /**
     * 运动状态中的判断事件
     * 抽象函数，子类覆盖
     */
    update(){

    }

    /**
     * 显示元素
     */
    draw() {
        this.update();
        this.scene.context.drawImage(this.img, this.x, this.y);
    }



    /**
     * 该方法适合做final函数
     */
    rectCollided(other) {
        return isCollisionWithRect(this.x,this.y,this.width,this.height,
                    other.x,other.y,other.width,other.height);
    }



}
