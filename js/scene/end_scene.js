/**
 * Created by zsh7040 on 2017-9-6.
 */
class EndScene extends Scene{
    constructor(context){
        super(context);
    }

    draw(){
        this.context.font="30px Verdana";
        var gradient=this.context.createLinearGradient(0,0,this.width,0);
        gradient.addColorStop("0","magenta");
        gradient.addColorStop("0.5","blue");
        gradient.addColorStop("1.0","red");
        this.context.fillStyle=gradient;
        var score = this.game.score;
        this.context.fillText("游戏结束，您最终的得分为"+score,90,200);
    }

}
