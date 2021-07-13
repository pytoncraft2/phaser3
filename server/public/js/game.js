"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Phaser = __importStar(require("phaser"));
const Menu_js_1 = __importDefault(require("./Menu.js"));
const Selection_js_1 = __importDefault(require("./Selection.js"));
const Solo_js_1 = __importDefault(require("./modes/Solo.js"));
const Multijoueur_js_1 = __importDefault(require("./modes/Multijoueur.js"));
var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    scale: {
        mode: Phaser.Scale.CENTER_BOTH,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    backgroundColor: '#4488aa',
    width: 1500,
    height: 720,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [Menu_js_1.default, Multijoueur_js_1.default, Solo_js_1.default, Selection_js_1.default]
};
module.exports = config;
//# sourceMappingURL=game.js.map
