$(function () {
    window.fps = 50;
    window.debug = false;

    var _main = function () {

        var context = $('canvas')[0].getContext('2d');
        var mainScene = new MainScene(context);

        var game = new Game(mainScene);

        var paddle = new Paddle(mainScene,'img/paddle.png',250,383);

        var ball = new Ball(mainScene,'img/ball.png',0,0);
        mainScene.addElement(paddle).addElement(ball);

        for(var i = 0;i<30;i++){
            var x = random(0,550);
            var y = random(0,200);
            var index = parseInt(random(0,17));
            var path = 'img/brick' + index + '.png';
            var brick = new Brick(mainScene,path,x,y);

            mainScene.addElement(brick);
        }


        start(game);
    };

    var start = function (game) {
        if(!game.pause){
            game.context.clearRect(0,0,600,400);
            game.scene.draw();
            // log(game.scene.elements);

        }
        setTimeout(function () {
            start(game);
        },window.fps)
    };
    _main();

});
