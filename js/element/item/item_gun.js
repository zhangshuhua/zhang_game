/**
 * Created by zsh7040 on 2017-9-12.
 */
class ItemGun extends Item{
    constructor(scene, img, x, y) {
        super(scene, 'img/item_gun.png', x, y);
        this.init();
    }

    effect(){
        if(this.utility){
            this.scene.elements.paddle[0].addGuns();
        }
        this.afterEffect();
    }

    loseEffect(){
        var _this = this;
        setTimeout(function () {
            _this.scene.elements.paddle[0].removeGuns();
        },6*1000);
    }
}
