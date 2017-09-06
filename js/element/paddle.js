/**
 * Created by zhang on 2017/9/3.
 */
class Paddle extends Element{

    constructor(scene, img, x, y,callback) {
        super(scene, img, x, y,callback);
        this.speed = 15;
        this.leftGun = null;
        this.rightGun = null;
        this.init();
    }

    init(){
        this.initKeyEvent();
    }

    initKeyEvent(){
        this.registerAction('keydown','a',this.move_left);
        this.registerAction('keydown','d',this.move_right);
        this.registerAction('keydown','+',this.speedUp);
        this.registerAction('keydown','-',this.speedDown);
    }

    move_left() {
        this.x -= this.speed;
        this.leftGun.x -= this.speed;
        this.rightGun.x -= this.speed;
        if(this.x<0){
            this.x = 0;
            this.leftGun.x = this.x + this.leftGun.offset ;
            this.rightGun.x = this.x + this.width + this.rightGun.offset;
        }
    };

    move_right() {
        this.x += this.speed;
        this.leftGun.x +=this.speed;
        this.rightGun.x +=this.speed;
        if((this.x+this.width)>=this.scene.width){
            this.x = this.scene.width-this.width;
            this.leftGun.x = this.x + this.leftGun.offset ;
            this.rightGun.x = this.x + this.width + this.rightGun.offset;
        }
    };

    stop(){

    }

    speedUp(){
        this.speed++;
    }

    speedDown(){
        this.speed--;
    }

    addLeftGun(){
        var _this = this;
        var offset = 3;
        var callback = function (img) {
            this.x = _this.x+offset;
            this.y = _this.y - img.height;
        };
        var gun = new Gun(this.scene,'img/gun.png',0,0,callback);
        gun.offset = offset;
        gun.paddle = _this;
        _this.leftGun = gun;
        _this.scene.addElement(gun);
        return _this;
    };
    addRightGun(){
        var _this = this;
        var offset = -8;
        var callback = function (img) {
            this.x = _this.x+_this.width+ offset;
            this.y = _this.y - img.height;
        };
        var gun = new Gun(this.scene,'img/gun.png',0,0,callback);
        gun.offset = offset;
        gun.paddle = _this;
        _this.rightGun = gun;
        _this.scene.addElement(gun);
        return _this;
    };

    addGuns(){
        this.leftGun = null;
        this.rightGun = null;
        this.addLeftGun();
        this.addRightGun();
    }



}
