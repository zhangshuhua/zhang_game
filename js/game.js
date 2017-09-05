/**
 * Created by zhang on 2017/9/3.
 */
class Game{
    constructor(scene){
        this.scene = scene;
    }

    replaceScene(scene){
        scene.context.clearRect(0,0,600,400);
        this.scene = scene;
    }



}
