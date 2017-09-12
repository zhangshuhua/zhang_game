/**
 * Created by zsh7040 on 2017-9-12.
 */
class ItemGun extends Item{
    constructor(scene, img, x, y) {
        super(scene, 'img/item_gun.png', x, y, callback);
        this.init();
    }

    die(){
        if(this.utility){
            this.scene.elements.paddle[0].addGuns();
        }
        this.afterDie();
    }
}
