/**
 * Created by zhang on 2017/9/3.
 */
class Gun extends Element {
    constructor(scene, img, x, y, callback) {
        super(scene, img, x, y, callback);
        this.CDTime = this.CDTime||15;
        this.show = false;
        this.auto = false;
        this.bullet;
        this.init();
    }

    init() {
        //new Gun的时候,创建bullet对象待用
        this.bullet = new Bullet(this.scene, 'img/bullet.png', 0, 0);
        this.scene.addElement(this.bullet);
        this.resetCDtime();
    }

    resetCDtime(){
        this.CDTime = 15;
    }

    fire() {
        this.bullet.x = this.x + this.width/2;
        this.bullet.y = this.y;
        this.scene.addElement(this.bullet);
    }

    // 自动射击
    autoFire(){
        this.CDTime--;
        if(this.CDTime<=0){
            this.fire();
            this.resetCDtime();
        }
    }

    setAuto(){
        this.auto = true;
    }
}
