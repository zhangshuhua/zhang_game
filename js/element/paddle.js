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
        // this.magnetic = false;
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

    setAutoShoot() {
        this.leftGun.setAuto();
        this.rightGun.setAuto();
    }

    update() {
        this.fellowGun();
        this.autoShoot();
    }

    /**
     * paddle的装备（枪）与paddle同步
     */
    fellowGun() {
        var middleX = this.x + this.width / 2;
        this.leftGun.x = middleX + this.leftGun.offsetX;
        this.rightGun.x = middleX + this.rightGun.offsetX;
        this.leftGun.y = this.rightGun.y = this.y - this.height;
    }

    autoShoot() {
        if (this.leftGun.show && this.leftGun.auto) {
            this.leftGun.autoFire();
        }
        if (this.rightGun.show && this.leftGun.auto) {
            this.rightGun.autoFire();
        }
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
        this.scene.context.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    initKeyEvent() {
        this.registerAction('keydown', 'a', this.move_left);
        this.registerAction('keydown', 'd', this.move_right);
        this.registerAction('keydown', 'ArrowLeft', this.move_left);
        this.registerAction('keydown', 'ArrowRight', this.move_right);
        this.registerAction('keydown', '+', this.speedUp);
        this.registerAction('keydown', '-', this.speedDown);
        this.registerAction('keydown', 'ArrowUp', this.toggleGuns);
        this.registerAction('keydown', 'ArrowDown', this.removeGuns);
        this.registerAction('keydown', 'Enter', this.shoot);
        this.registerAction('keydown', '0', this.enLong);
        this.registerAction('keydown', '9', this.enShort);
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
            this.setAutoShoot();
        } else {
            this.addLeftGun()
        }
        if (this.rightGun.show) {
            this.setAutoShoot();
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

    enLong() {
        if (this.width < this.scene.width) {
            this.width = this.width + 30;
            //保证中心不变
            this.x = this.x - 15;
        }
    }

    enShort() {
        if (this.width > this.img.width / 2) {
            this.width = this.width - 30;
            //保证中心不变
            this.x = this.x + 15;
        }

    }

}
