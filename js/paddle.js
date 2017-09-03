/**
 * Created by zhang on 2017/9/3.
 */
class Paddle extends Element{
    constructor(scene, img, x, y) {
        super(scene, img, x, y);
        this.speed = 5;
    }

    move_left() {
        this.x -= this.speed;
    };

    move_right() {
        this.x += this.speed;
    };

    setSpeed(speed){
        this.speed = speed;
    }

    speedUp(){
        this.speed++;
    }

    speedDown(){
        this.speed--;
    }
}
