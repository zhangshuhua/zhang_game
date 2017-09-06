/**
 * Created by zhang on 2017/9/3.
 */
class Gun extends Element{

    constructor(scene, img, x, y,callback) {
        super(scene, img, x, y,callback);
        this.cdTime = 5;
        this.init();
    }

    init(){
        var _this = this;
        var callback = function () {
            this.x = _this.x;
            this.y = _this.y;
        };
        var bullet = new Bullet(this.scene,'img/bullet.png',0,0,callback);
        this.scene.addElement(bullet);
    }

    update(){
        if(this.cdTime ===0){
            var bullet = new Bullet(this.scene,'img/bullet.png',this.x,this.y);
            this.scene.addElement(bullet);
            this .cdTime = 5;
        }else {
            this.cdTime --
        }
    }
}
