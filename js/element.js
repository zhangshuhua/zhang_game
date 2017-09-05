/**
 * Created by zsh7040 on 2017-8-31.
 */
class Element {
    constructor(scene, imgPath, x, y) {

        this.scene = scene;
        this.img;
        this.x = x || 0;
        this.y = y || 0;
        this.width;
        this.height;
        this.imgFromPath(imgPath);
    }

    imgFromPath(imgPath){
        var _this = this;
        var img = new Image();
        img.src = imgPath;
        img.onload = function () {
            _this.scene.context.drawImage(img, _this.x, _this.y);
            _this.scene.elements.push(_this);
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
     * 抽象函数，子类覆盖
     */
    update(){

    }

    draw() {
        this.update();
        this.scene.context.drawImage(this.img, this.x, this.y);
    }

    /**
     * 该方法适合做final函数
     */
    rectCollided(other) {
        return this._rectAinB(other)||other._rectAinB(this);
    }

    /**
     * private 方法,判断矩形相交的一种情况
     * @param other
     * @returns {boolean}
     */
    _rectAinB(other) {
        var x = other.x;
        var y = other.y;
        var width = other.width;
        // var height = other.height;

        if (y > this.y && y < (this.y + this.height)) {
            if ((x > this.x && x < this.x + this.width) ||
                (x + width > this.x && x + width < this.x + this.width)) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }

    }



}
