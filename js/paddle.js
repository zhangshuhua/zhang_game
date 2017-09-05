/**
 * Created by zhang on 2017/9/3.
 */
class Paddle extends Element{
    constructor(scene, img, x, y) {
        super(scene, img, x, y);
        this.speed = 15;
        this.init();
    }

    init(){
        this.registerAction('keydown','a',this.move_left);
        this.registerAction('keydown','d',this.move_right);
    }

    move_left() {
        this.x -= this.speed;
        if(this.x<0){
            this.x = 0;
        }
    };

    move_right() {
        this.x += this.speed;
        if((this.x+this.width)>=this.scene.width){
            this.x = this.scene.width-this.width;
        }
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
