/**
 * Created by zsh7040 on 2017-8-31.
 */
/**
 * 绑定log
 * @type {*}
 */
var log = console.log.bind(console);

/**
 * 产生随机指定范围数
 */
var random = function (min, max) {
    var base = Math.random();
    return min + (max - min) * base;
};

/**
 * 检测两个矩形是否碰撞
 * @return
 */
var isCollisionWithRect = function (x1, y1, w1, h1,
                                    x2, y2, w2, h2) {
    if (x1 >= x2 && x1 >= x2 + w2) {
        return false;
    } else if (x1 <= x2 && x1 + w1 <= x2) {
        return false;
    } else if (y1 >= y2 && y1 >= y2 + h2) {
        return false;
    } else if (y1 <= y2 && y1 + h1 <= y2) {
        return false;
    }
    return true;
};

/**
 * 预加载图片
 */
var imagePreLoader = function(imagePaths,callback){
    let imgLoads = [];
    for(let imgPath of imagePaths){
        let img = new Image();
        img.src = imgPath;
        img.onload = function () {
            imgLoads.push(img);
            if(imgLoads.length === imagePaths.length){
                callback;
            }
            return imgLoads;
        }
    }
};
