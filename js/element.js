/**
 * Created by zsh7040 on 2017-8-31.
 */
class Element {
    constructor(context, img, x, y) {
        this.context = context;
        this.img = img;
        this.x = x || 100;
        this.y = y || 200;
        this.width = img.width;
        this.height = img.height;
        context.drawImage(this.img, this.x, this.y);
    }

    move_left() {
        log('move-left',this.x);
        this.x -= 2;
    };

    move_right() {
        this.x += 2;
    };

    registerAction(type,key,call){
        var self = this;
        document.addEventListener(type,function (event) {
            if(event.key == key){
                call.apply(self);
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
        this.context.drawImage(this.img, this.x, this.y);
    }

    /**
     * 该方法适合做final函数
     */
    rectCollided(other) {
        return this.rectAinB(other)||other.rectAinB(this);
    }

    /**
     * private 方法,判断矩形相交的一种情况
     * @param other
     * @returns {boolean}
     */
    rectAinB(other) {
        var x = other.x;
        var y = other.y;
        var width = other.width;
        var height = other.height;

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
