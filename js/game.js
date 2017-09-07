/**
 * Created by zhang on 2017/9/3.
 */
class Game{
    constructor(scene){
        this.scene = scene;
        this.score = 0;
        this.scene.game = this;
        this.context = scene.context;
        this.pause = false;
        this.level = 1;
        this.init();
    }

    init(){
        this.initKeyEvent();

        $('#game-score').text(this.score);
        $('#game-level').text(this.level);
    }

    initKeyEvent(){
        var _this = this;
        document.addEventListener('keydown',function (event) {
            if(event.key === 'p'){
                _this.pause = !_this.pause;
            }
        });
    }

    _replaceScene(scene){
        var game = this.scene.game;
        scene.context.clearRect(0,0,600,400);
        this.scene = scene;
        this.scene.game = game;
    }

    over(){
        var endScene = new EndScene(this.context);
        this._replaceScene(endScene);
    }

}
