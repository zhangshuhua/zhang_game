/**
 * Created by zsh7040 on 2017-8-31.
 */
class Element {
    constructor(scene, imgPath, x, y, callback) {
        this.scene = scene;
        this.x = x || 0;
        this.y = y || 0;
        this.width = 0;
        this.height = 0;
        this.callback = callback;
        this.loadImg(imgPath);
    }

    loadImg(imgPath) {
        var _this = this;
        var img = new Image();
        img.src = imgPath;
        img.onload = function () {
            _this.width = img.width;
            _this.height = img.height;
            _this.callbackFunc(img);
        };
        this.img = img;
    }

    callbackFunc(img) {
        if (typeof this.callback !== 'undefined') {
            this.callback.call(this, img);
        }
    }


    /**
     * 给元素注册事件
     * @param type 事件类型
     * @param key 按键
     * @param func 函数
     */
    registerAction(type, key, func) {
        var _this = this;
        document.addEventListener(type, function (event) {
            if (event.key == key) {
                func.apply(_this);
            }
        });
    }

    /**
     * 需要自动运动的元素的运行方法
     * 抽象函数，子类覆盖
     */
    update() {

    }

    /**
     * 父类的draw方法，实现最普通的显示功能，子类按需求覆盖
     * 显示元素
     */
    draw() {
        this.update();
        this.scene.context.drawImage(this.img, this.x, this.y);
    }

    isCollidXWall() {
        return this.x <= 0 || this.x + this.width >= this.scene.width;
    }

    isTouchTop() {
        return this.y <= 0;
    }

    isTouchBottom() {
        return this.y + this.height >= this.scene.height;
    }

    /**
     * 默认element为矩形
     * @param other 另外一个矩形
     */
    collideRect(other) {
        return isRectInRect(this.x, this.y, this.width, this.height,
            other.x, other.y, other.width, other.height);
    }


}
