"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Menu_js_1 = require("./Menu.js");
var Selection_js_1 = require("./Selection.js");
var Solo_js_1 = require("./modes/Solo.js");
var Multijoueur_js_1 = require("./modes/Multijoueur.js");
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
var game = new Phaser.Game(config);
//# sourceMappingURL=game.js.map