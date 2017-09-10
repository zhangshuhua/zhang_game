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
/*var imagePreLoader = function(imagePaths,callback){
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
 };*/

/**
 * 判断矩形与球形相撞，并计算法线
 * @param rectCenter    矩形中心 {array}
 * @param rectHalfD     矩形对角线的一半 {array}
 * @param circleCenter      圆形的圆心 {array}
 * @param r   园的半径 {float}
 */
var circleInRect = function (rectCenter, rectRightTop, circleCenter, r) {
    var rectCenterVec = Victor.fromObject(rectCenter);
    var rectHalfDVec = Victor.fromObject(rectRightTop).subtract(rectCenterVec).abs();
    var circleCenterVec = Victor.fromObject(circleCenter);
    var v = circleCenterVec.subtract(rectCenterVec).abs();
    var u = v.subtract(rectHalfDVec).shadow();
    if (u.length() <= r) {
        log('u角度为', u.angleDeg());
        return u;
    } else {
        return false;
    }
}


/**
 * 通过入射向量和法线向量，求出反射向量
 * @param inVec 入射角
 * @param normal  法线
 */
var reflectVec = function (inVec, normal) {

    var vec1 = inVec;
    var vec2 = normal.normalize();
    var a = vec1.dot(vec2)
    var c = vec2.clone().multiplyScalar(2 * a);
    return vec1.clone().subtract(c)

}

// var vec1 = new Victor(Math.sqrt(2) / 2, -Math.sqrt(2) / 2);
// var vec2 = new Victor(0, 1).normalize();
// var a = vec1.dot(vec2)
// var c = vec2.clone().multiplyScalar(2 * a);
// var d = vec1.clone().subtract(c)

// var a = new Vic