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
var random = function(min,max){
    var base = Math.random();
    return min+(max-min)*base;
};
