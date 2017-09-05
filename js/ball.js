/**
 * Created by zsh7040 on 2017-8-31.
 */
class Ball extends Element{
    constructor(scene, img, x, y) {
        super(scene, img, x, y);
        this.speedX = 5;
        this.speedY  = 5;
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
        this.collidElements(this.scene.elements)
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

    collidElements(elements){
        for (var e of elements){
            //这里虽然block已经在scene中的element是没有了，但是block这个元素还是存在的，因此block需要加入属性alive
            if(this.rectCollided(e)){
                if(e instanceof Block && e.alive){
                    this.bounceY();
                    e.die();
                }
                else if(e instanceof Paddle){
                    this.bounceY();
                }
            }
        }
    }



}
