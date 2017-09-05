/**
 * Created by zhang on 2017/9/3.
 */
class Game{
    constructor(scene){
        this.scene = scene;
        this.score = 0;
        this.scene.game = this;
    }

    replaceScene(scene){
        scene.context.clearRect(0,0,600,400);
        this.scene = scene;
    }



}
