/**
 * Created by zsh7040 on 2017-8-31.
 */
class Element {
    constructor(scene, imgPath,x, y ,callback) {
        this.scene = scene;
        this.x = x || 0;
        this.y = y || 0;
        this.width = 0;
        this.height = 0;
        this.callback = callback;
        this.loadImg(imgPath);
    }

    loadImg(imgPath){
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

    callbackFunc(img){
        if(typeof this.callback !== 'undefined'){
            this.callback.call(this,img);
        }
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
     * 父类的draw方法，实现最普通的显示功能，子类按需求覆盖
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
