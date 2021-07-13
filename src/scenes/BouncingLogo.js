"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BouncingLogo = (function () {
    function BouncingLogo(scene, x, y, texture) {
        this.image = scene.physics.add.image(x, y, texture);
        this.initialize();
    }
    Object.defineProperty(BouncingLogo.prototype, "display", {
        get: function () {
            return this.image;
        },
        enumerable: false,
        configurable: true
    });
    BouncingLogo.prototype.initialize = function () {
        this.image.setVelocity(100, 200);
        this.image.setBounce(1, 1);
        this.image.setCollideWorldBounds(true);
    };
    return BouncingLogo;
}());
exports.default = BouncingLogo;
//# sourceMappingURL=BouncingLogo.js.map