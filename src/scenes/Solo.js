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
var Solo = (function (_super) {
    __extends(Solo, _super);
    function Solo() {
        return _super.call(this, {
            key: "Solo"
        }) || this;
    }
    Solo.prototype.preload = function () {
        this.load.image('bg', 'assets/fond/bg.png');
    };
    Solo.prototype.create = function () {
        var self = this;
        var bg = this.add.image(750, 350, 'bg');
        this.text = this.add.text(75, 350, ['Solo']).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff');
        this.text.setInteractive().on('pointerdown', function (pointer, localX, localY, event) {
            self.scene.start('Menu', {
                character: this.selectedKey
            });
        });
    };
    Solo.prototype.update = function () {
    };
    return Solo;
}(Phaser.Scene));
exports.default = Solo;
//# sourceMappingURL=Solo.js.map