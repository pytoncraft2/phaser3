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
var phaser_1 = require("phaser");
var BouncingLogo_1 = require("./BouncingLogo");
var ImageNames;
(function (ImageNames) {
    ImageNames["Sky"] = "sky";
    ImageNames["Logo"] = "logo";
    ImageNames["RedParticle"] = "red_particle";
})(ImageNames || (ImageNames = {}));
var HelloWorldScene = (function (_super) {
    __extends(HelloWorldScene, _super);
    function HelloWorldScene() {
        return _super.call(this, 'hello-world') || this;
    }
    HelloWorldScene.prototype.preload = function () {
        this.load.setBaseURL('http://labs.phaser.io');
        this.load.image(ImageNames.Sky, 'assets/skies/space3.png');
        this.load.image(ImageNames.Logo, 'assets/sprites/phaser3-logo.png');
        this.load.image(ImageNames.RedParticle, 'assets/particles/red.png');
    };
    HelloWorldScene.prototype.create = function () {
        this.add.image(400, 300, ImageNames.Sky);
        var emitter = this.createEmitter(ImageNames.RedParticle);
        var logo = new BouncingLogo_1.default(this, 400, 100, ImageNames.Logo);
        emitter.startFollow(logo.display);
    };
    HelloWorldScene.prototype.createEmitter = function (textureName) {
        var particles = this.add.particles(textureName);
        var emitter = particles.createEmitter({
            speed: 100,
            scale: { start: 1, end: 0 },
            blendMode: 'ADD'
        });
        return emitter;
    };
    return HelloWorldScene;
}(phaser_1.default.Scene));
exports.default = HelloWorldScene;
//# sourceMappingURL=HelloWorldScene.js.map