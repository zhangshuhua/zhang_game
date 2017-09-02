/**
 * Created by zsh7040 on 2017-8-31.
 */
class Ball extends Element{
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

    bounceY(){
        this.speedY *= -1;
    }

    bounceX(){
        this.speedX *= -1;
    }

    XwallCollided(){
        return this.x<0 || this.x >600;
    }
    YwallCollided(){
        return this.y<0 || this.y >400;
    }


}
