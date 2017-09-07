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
        if(this.isTouchBottom()){
            this.scene.game.over();
        }else {
            if(this.isTouchTop()){
                this.resetEdgeY();
                this.bounceY();
            }
            if(this.isCollidXWall()){
                this.resetEdgeX();
                this.bounceX();
            }else {
                this.collidBrick(this.scene.elements.brick);
                this.collidPaddle(this.scene.elements.paddle);
            }
        }
    }

    bounceY(){
        this.speedY *= -1;
    }

    bounceX(){
        this.speedX *= -1;
    }

    resetEdgeX(){
        if(this.x > this.scene.width/2){
            this.x = this.scene.width - this.width;
        }else {
            this.x = 0;
        }
    }

    resetEdgeY(){
        this.y = 0;
    }

    //TODO 打到角落会有bug
    isCollidXWall(){
        return this.x<=0 || this.x +this.width >=this.scene.width;
    }
    isTouchTop(){
        return this.y<=0;
    }
    isTouchBottom(){
        return this.y +this.height>=this.scene.height;
    }

    collidBrick(bricks){
        for (let b of bricks){
            if(b.alive && this.rectCollided(b)){
                this.bounceY();
                b.die();
                // break;
            }
        }
    }

    collidPaddle(paddles){
        for (let p of paddles){
            if(this.rectCollided(p)){
                this.bounceY();
            }
        }
    }

}
