/**
 * Created by zhang on 2017/9/3.
 */
class Gun extends Element {


    constructor(scene, img, x, y, callback) {
        super(scene, img, x, y, callback);
        this.time = cdTime;
        this.show = false;
        this.bullet;
        this.init();
    }

    init() {
        this.bullet = new Bullet(this.scene, 'img/bullet.png', 0, 0);
    }

    fire() {
        this.bullet.x = this.x + this.width/2;
        this.bullet.y = this.y;
        this.scene.addElement(this.bullet);
    }

    // update() {
    //     if (this.time === 0) {
    //         this.fire();
    //         this.time = cdTime;
    //     } else {
    //         this.time--
    //     }
    // }
}


var cdTime = 10;
