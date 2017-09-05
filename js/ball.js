/**
 * Created by zsh7040 on 2017-8-31.
 */
class Ball extends Element{
    constructor(scene, img, x, y) {
        super(scene, img, x, y);
        this.speedX = 5;
        this.speedY  = 5;
        this.init();
    }

    init(){
    }

    move(){
        this.x += this.speedX;
        this.y += this.speedY;
    }


    update(){
        this.move();
        if(this.YwallCollided()){
            this.bounceY();
        }
        if(this.XwallCollided()){
            this.bounceX();
        }
        this.collidBlock(this.scene.elements.block);
        this.collidPaddle(this.scene.elements.paddle);
    }

    bounceY(){
        this.speedY *= -1;
    }

    bounceX(){
        this.speedX *= -1;
    }

    XwallCollided(){
        return this.x<0 || this.x >this.scene.width;
    }
    YwallCollided(){
        return this.y<0 || this.y >this.scene.height;
    }

    collidBlock(blocks){
        for (var e of blocks){
            //这里虽然block已经在scene中的element是没有了，但是block这个元素还是存在的，因此block需要加入属性alive
            if(this.rectCollided(e)&& e.alive){
                this.bounceY();
                e.die();
            }
        }
    }

    collidPaddle(paddles){
        for (var e of paddles){
            //这里虽然block已经在scene中的element是没有了，但是block这个元素还是存在的，因此block需要加入属性alive
            if(this.rectCollided(e)){
                this.bounceY();
            }
        }
    }



}
