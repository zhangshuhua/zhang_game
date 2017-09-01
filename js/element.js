/**
 * Created by zsh7040 on 2017-8-31.
 */
class img_element {
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

}
