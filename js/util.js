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
var isRectInRect = function (x1, y1, w1, h1,
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
 * 通过入射向量和法线向量，求出反射向量
 * @param inVec 入射角
 * @param normal  法线
 */
var reflectVec = function (inVec, normal) {
    var vec1 = inVec;
    //法线转为单位向量
    var vec2 = normal.normalize();
    var a = vec1.dot(vec2);
    var c = vec2.clone().multiplyScalar(2 * a);
    let victor = vec1.subtract(c);
    return victor
};

/**
 * 矩形与圆形的碰撞检测
 * @param w 矩形的宽度
 * @param h 矩形的高度
 * @param r 圆形的半径
 * @param rx 矩形中心与圆形中心的X坐标的差
 * @param ry 矩形中心与圆形中心的Y坐标的差
 * @returns {*} 如果碰撞返回法线向量,如果没有碰撞返回false
 * @constructor
 */
function ComputeCollision(w, h, r, rx, ry) {
    var dx = Math.min(rx, w * 0.5);
    var dx1 = Math.max(dx, -w * 0.5);
    var dy = Math.min(ry, h * 0.5);
    var dy1 = Math.max(dy, -h * 0.5);
    if((dx1 - rx) * (dx1 - rx) + (dy1 - ry) * (dy1 - ry) <= r * r){
        //返回法线向量
        var u = new Victor(dx1 - rx,dy1 - ry);
        return u
    }else {
        return false;
    }
}

/**
 * 根据斜率求出过圆心的直线与圆的两个交点
 * @param k 直线的斜率
 * @param centerX 圆心横坐标
 * @param centerY 圆心纵坐标
 * @param r 圆半径
 */
function circleIntersection(k,centerX,centerY,r) {
    //设直线为斜截式方程
    var b = centerY - k*centerX;
    //带入圆的方程,化为一元二次方程Ax*x + By + C =0;
    var A = k*k+1;
    var B = 2*centerX - 2*k*(b-centerY);
    var C = centerX*centerX + (b-centerY)*(b-centerY) -r*r;

    //通过一般式公式求方程
    var tmp = Math.sqrt(B*B-4*A*C);
    x1 = (B+tmp)/(2*A);
    x2 = (B-tmp)/(2*A);
    y1 = k*x1 + b;
    y2 = k*x2 + b;

    // var result = (x1-centerX)*(x1-centerX) + (y1-centerY)*(y1-centerY);
    var result = {};
    result.x1 = x1;
    result.y1 = y1;
    result.x2 = x2;
    result.y2 = y2;
    return result;
}
