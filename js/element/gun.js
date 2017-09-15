/**
 * Created by zhang on 2017/9/3.
 */
class Gun extends Element {
    constructor(scene, img, x, y) {
        super(scene, img, x, y);
        this.CDTime = this.CDTime||15;
        this.show = false;
        this.auto = true;
        this.bullet = {};
        this.init();
    }

    init() {
        //new Gun的时候,在bullet对象
        this.bullet = new Bullet(this.scene, 'img/bullet.png');
        this.resetCDtime();
    }

    resetCDtime(){
        this.CDTime = 15;
    }

    shoot() {
        this.bullet.x = this.x + (this.width-this.bullet.width)/2;
        this.bullet.y = this.y;
        this.scene.addElement(this.bullet);
    }

    // 自动射击
    fire(){
        this.CDTime--;
        if(this.CDTime<=0){
            this.shoot();
            this.resetCDtime();
        }
    }

    //自动开火
    /*setAuto(){
        this.auto = true;
    }*/
}
