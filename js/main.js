$(function () {
    window.fps = 50;

    var _main = function () {

        var context = $('canvas')[0].getContext('2d');
        var mainScene = new MainScene(context);

        var game = new Game(mainScene);

        var paddle = new Paddle(mainScene,'img/paddle.png',80,383);

        var ball = new Ball(mainScene,'img/ball.png',0,0);
        mainScene.addElement(paddle).addElement(ball);
        for(var i = 0;i<5;i++){
            var x = random(0,550);
            var y = random(0,100);
            var block = new Block(mainScene,'img/block.png',x,y);

            mainScene.addElement(block);
        }
        start(game);
    };

    var start = function (game) {
        if(!game.pause){
            game.context.clearRect(0,0,600,400);
            game.scene.draw();
            $('#game-score').text(game.score);
        }
        setTimeout(function () {
            start(game);
        },window.fps)
    };
    _main();

});
