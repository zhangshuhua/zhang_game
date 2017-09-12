$(function () {
    window.fps = 30;
    window.debug = false;

    var _main = function () {

        var context = $('canvas')[0].getContext('2d');
        var mainScene = new MainScene(context);

        var game = new Game(mainScene);

        var paddle = new Paddle(mainScene,'img/paddle.png',250,383);

        var ball = new Ball(mainScene,'img/ball.png',0,380);
        mainScene.addElement(paddle).addElement(ball);
        var item = new Item(mainScene,'img/item_gun.png',0,0);
        for(var i = 0;i<30;i++){
            var x = random(0,550);
            var y = random(0,200);
            var index = parseInt(random(0,17));
            var path = 'img/brick' + index + '.png';
            var brick = new Brick(mainScene,path,x,y);

            mainScene.addElement(brick);
        }
        var item_gun = new ItemGun(mainScene,null,0,0);
        var item_long = new ItemLong(mainScene,null,0,0);
        var item_short = new ItemShort(mainScene,null,0,0);
        mainScene.elements.brick[10].setItem(item_gun);
        mainScene.elements.brick[11].setItem(item_long);
        mainScene.elements.brick[12].setItem(item_short);

        var bg = new Image();
        bg.src = 'img/backgroud.jpg';
        bg.onload = function () {
            mainScene.background = this;
            start(game);
        }

    };



    var start = function (game) {
        if(!game.pause){
            if(game.scene.background){
                //TODO 不需要每次都去重新画
                game.context.drawImage(game.scene.background,0,0);
            }else {
                game.context.clearRect(0,0,600,400);
            }
            game.scene.draw();

        }
        setTimeout(function () {
            start(game);
        },window.fps)
    };
    _main();

});
