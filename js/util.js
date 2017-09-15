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
    var vec1 = inVec.clone();
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
        // log('法线',u);
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

/**
 * 根据法线和交点求镜面
 * @param normal
 * @param point
 * @return {*} 一元一次方程标准式参数对象;  Ax+By+c=0;
 */
function mirror(normal, point) {
    // log('normal',normal);
    var result ={};
    if(normal.x===0 && normal.y!==0){
        result.A = 0;
        result.B = 1;
        result.C = -point.y;
    }
    if(normal.x!==0 && normal.y===0 ){
        result.A = 1;
        result.B = 0;
        result.C = -point.x;
    }
    if(normal.x!==0&&normal.y!==0){
        // var k = -normal.x/normal.y;
        // result.A = k;
        // result.B = -1;
        // result.C = point.y-k*point.x;
        result.A = -normal.x;
        result.B = -normal.y;
        result.C = point.y*normal.y+normal.x*point.x;
    }
    // log('result',result);
    return result;
}

function pointSlopeToNormal(k,point) {
    var result ={};
    result.A = k;
    result.B = -1;
    result.C = point.y-k*point.x;
    return result;
}

function twoPointToNormal(x1,y1,x2,y2) {
    var result = {};
    result.A = y2-y1;
    result.B = x1-x2;
    result.C = y1*(x2-x1)-x1*(y2-y1);
    return result;
}

function twoLineInterPoint(arg1,arg2) {
    var result = {};
    result.x = (arg1.B*arg2.C-arg2.B*arg1.C)/(arg1.A*arg2.B-arg2.A*arg1.B);
    result.y = (arg2.A*arg1.C-arg1.A*arg2.C)/(arg1.A*arg2.B-arg2.A*arg1.B);
    return result;
}

function symmetryPoint(lineArgs,point) {
    var result = {};
    var tmp = (lineArgs.A*point.x+lineArgs.B*point.y+lineArgs.C)/(lineArgs.A*lineArgs.A+lineArgs.B*lineArgs.B);
    result.x = point.x - 2*lineArgs.A*tmp;
    result.y = point.y - 2*lineArgs.B*tmp;
    return result;

}

function segmentsIntr(a, b, c, d){

    // 三角形abc 面积的2倍
    var area_abc = (a.x - c.x) * (b.y - c.y) - (a.y - c.y) * (b.x - c.x);

    // 三角形abd 面积的2倍
    var area_abd = (a.x - d.x) * (b.y - d.y) - (a.y - d.y) * (b.x - d.x);

    // 面积符号相同则两点在线段同侧,不相交 (对点在线段上的情况,本例当作不相交处理);
    if ( area_abc*area_abd>=0 ) {
        return false;
    }

    // 三角形cda 面积的2倍
    var area_cda = (c.x - a.x) * (d.y - a.y) - (c.y - a.y) * (d.x - a.x);
    // 三角形cdb 面积的2倍
    // 注意: 这里有一个小优化.不需要再用公式计算面积,而是通过已知的三个面积加减得出.
    var area_cdb = area_cda + area_abc - area_abd ;
    if (  area_cda * area_cdb >= 0 ) {
        return false;
    }

    //计算交点坐标
    var t = area_cda / ( area_abd- area_abc );
    var dx= t*(b.x - a.x),
        dy= t*(b.y - a.y);
    return { x: a.x + dx , y: a.y + dy };

}