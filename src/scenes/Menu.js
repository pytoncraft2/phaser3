"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Menu = (function (_super) {
    __extends(Menu, _super);
    function Menu() {
        return _super.call(this, {
            key: "Menu"
        }) || this;
    }
    Menu.prototype.preload = function () {
        this.load.image('bgMenu', 'assets/fond/bgMenu.png');
    };
    Menu.prototype.create = function () {
        var bgMenu = this.add.image(750, 350, 'bgMenu');
        var self = this;
        this.goSelectionS = this.add.text(695, 300, ['Solo']).setFontSize(42).setFontFamily('Trebuchet MS').setColor('#6badce').setShadow(2, 2, "white", 2, true, true);
        this.goSelectionM = this.add.text(650, 400, ['Multijoueur']).setFontSize(42).setFontFamily('Trebuchet MS').setColor('#6badce').setShadow(2, 2, "white", 2, true, true);
        this.fullscreen = this.add.text(640, 500, ['Pleine Ecran']).setFontSize(42).setFontFamily('Trebuchet MS').setColor('#6badce').setShadow(2, 2, "white", 2, true, true);
        this.fullscreen.setInteractive().on('pointerup', function () {
            this.scale.isFullscreen ? this.scale.stopFullscreen() : this.scale.startFullscreen();
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
            font: "74px Arial Black",
            fill: "#009286"
        });
        this.logo.setShadow(2, 2, "#333333", 2, true, true);
    };
    return Menu;
}(Phaser.Scene));
exports.default = Menu;
//# sourceMappingURL=Menu.js.map