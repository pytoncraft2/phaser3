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
var Selection = (function (_super) {
    __extends(Selection, _super);
    function Selection() {
        return _super.call(this, {
            key: "Selection"
        }) || this;
    }
    Selection.prototype.init = function (data) {
        this.mode = data.mode;
        this.liste = ['dessinatrice1_', 'dessinatrice2_', 'dessinatrice3_', 'dessinatrice4_', 'naruto_'];
    };
    Selection.prototype.preload = function () {
        var _this = this;
        this.liste.forEach(function (item) {
            _this.load.image(item, 'assets/selection/' + item + '.png');
        });
    };
    Selection.prototype.create = function () {
        var _this = this;
        var self = this;
        var x = 400;
        var y = 400;
        var up = 0;
        this.text = this.add.text(75, 350, ['Selection']).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff');
        this.liste.forEach(function (item, i) {
            _this.player = 'player' + i.toString();
            _this.player = self.add.image(x + up, y, item).setScale(0.38).setOrigin(0.5, 0.5);
            up += 200;
            _this.player.setInteractive().on('pointerdown', function () {
                self.scene.start('Multijoueur', {
                    personnage: this.frame.texture.key
                });
            });
        });
    };
    return Selection;
}(Phaser.Scene));
exports.default = Selection;
//# sourceMappingURL=Selection.js.map