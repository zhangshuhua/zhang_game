/**
 * Created by zhang on 2017/9/3.
 */
class Paddle extends Element {

    constructor(scene, img, x, y, callback) {
        super(scene, img, x, y, callback);
        this.speed = 15;

        //枪其实就是装备
        this.leftGun;
        this.rightGun;

        //TODO paddle 的3种状态,磁性吸附ball,伸长，缩短
        this.magnetic = false;
        this.long = false;
        this.short = false;

        this.init();
    }

    init() {
        this.initKeyEvent();
        this.initGun();
    }

    initGun() {
        this.leftGun = new Gun(this.scene, 'img/gun.png', 0, 0);
        this.rightGun = new Gun(this.scene, 'img/gun.png', 0, 0);
    }

    /**
     * paddle的装备（枪）与paddle同步
     */
    update() {
        var middleX = this.x + this.width / 2;
        this.leftGun.x = middleX + this.leftGun.offsetX;
        this.rightGun.x = middleX + this.rightGun.offsetX;
        this.leftGun.y = this.rightGun.y = this.y - this.height;
    }

    /**
     * paddle的draw方法，需要让装备跟随
     */
    draw() {
        this.update();
        if (this.leftGun.show) {
            this.scene.context.drawImage(this.leftGun.img, this.leftGun.x, this.leftGun.y);
        }
        if (this.rightGun.show) {
            this.scene.context.drawImage(this.rightGun.img, this.rightGun.x, this.rightGun.y);
        }
        this.scene.context.drawImage(this.img, this.x, this.y);
    }

    initKeyEvent() {
        this.registerAction('keydown', 'a', this.move_left);
        this.registerAction('keydown', 'd', this.move_right);
        this.registerAction('keydown', 'ArrowLeft', this.move_left);
        this.registerAction('keydown', 'ArrowRight', this.move_right);
        this.registerAction('keydown', '+', this.speedUp);
        this.registerAction('keydown', '-', this.speedDown);
        this.registerAction('keydown', 'j', this.toggleGuns);
        this.registerAction('keydown', 'k', this.shoot);
        this.registerAction('keydown', 'ArrowUp', this.toggleGuns);
        this.registerAction('keydown', 'Enter', this.shoot);
    }

    move_left() {
        this.x -= this.speed;
        if (this.x < 0) {
            this.x = 0;
        }
    };

    move_right() {
        this.x += this.speed;
        if ((this.x + this.width) >= this.scene.width) {
            this.x = this.scene.width - this.width;
        }
    };

    speedUp() {
        this.speed++;
    }

    speedDown() {
        this.speed--;
    }

    addLeftGun() {
        this.leftGun.offsetX = -49;
        // this.leftGun.offsetY = 2;
        this.leftGun.show = true;
    };

    addRightGun() {
        this.rightGun.offsetX = 35;
        // this.rightGun.offsetY = 2;
        this.rightGun.show = true;
    };

    removeLeftGun() {
        this.leftGun.show = false;
    };

    removeRightGun() {
        this.rightGun.show = false;
    };


    addGuns() {
        this.addLeftGun();
        this.addRightGun();
    }

    removeGuns() {
        this.removeLeftGun();
        this.removeRightGun();
    }

    toggleGuns() {
        if (this.leftGun.show) {
            this.removeLeftGun();
        } else {
            this.addLeftGun()
        }
        if (this.rightGun.show) {
            this.removeRightGun();
        } else {
            this.addRightGun();
        }
    }

    shoot() {
        if (this.leftGun.show) {
            this.leftGun.fire();
        }
        if (this.rightGun.show) {
            this.rightGun.fire();
        }
    }


}
