"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Menu extends Phaser.Scene {
    goSelectionM = '';
    goSelectionS = '';
    fullscreen = '';
    logo = '';
    constructor() {
        super({
            key: "Menu"
        });
    }
    preload() {
        this.load.image('bgMenu', 'assets/fond/bgMenu.png');
    }
    create() {
        var bgMenu = this.add.image(750, 350, 'bgMenu');
        const self = this;
        this.goSelectionS = this.add.text(695, 300, ['Solo']).setFontSize(42).setFontFamily('Trebuchet MS').setColor('#6badce').setShadow(2, 2, "white", 2, true, true);
        this.goSelectionM = this.add.text(650, 400, ['Multijoueur']).setFontSize(42).setFontFamily('Trebuchet MS').setColor('#6badce').setShadow(2, 2, "white", 2, true, true);
        this.fullscreen = this.add.text(640, 500, ['Pleine Ecran']).setFontSize(42).setFontFamily('Trebuchet MS').setColor('#6badce').setShadow(2, 2, "white", 2, true, true);
        this.fullscreen.setInteractive().on('pointerup', function () {
        }, this);
        this.goSelectionM.setInteractive().on('pointerdown', function () {
            self.scene.start('Selection', {
                mode: 'Multijoueur'
            });
        });
        this.goSelectionS.setInteractive().on('pointerdown', function () {
            self.scene.start('Selection', {
                mode: 'Solo'
            });
        });
        this.logo = this.add.text(530, 30, 'Steam-Fighter', {
            font: "74px Arial Black"
        });
        this.logo.setShadow(2, 2, "#333333", 2, true, true);
    }
}
exports.default = Menu;
//# sourceMappingURL=Menu.js.map