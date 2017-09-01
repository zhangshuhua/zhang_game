/**
 * Created by zsh7040 on 2017-8-31.
 */
class Ball extends img_element{
    constructor(context, img, x, y) {
        super(context, img, x, y);
        this.speedX = 5;
        this.speedY  = 5;
    }

    move(){
        this.x += this.speedX;
        this.y += this.speedY;
    }

    update(){
        this.move();
    }



}
