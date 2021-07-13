"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var phaser_1 = require("phaser");
var Solo_1 = require("./scenes/Solo");
var Menu_1 = require("./scenes/Menu");
var Multijoueur_1 = require("./scenes/Multijoueur");
var Selection_1 = require("./scenes/Selection");
var config = {
    type: phaser_1.default.AUTO,
    scale: {
        mode: phaser_1.default.Scale.CENTER_BOTH,
        autoCenter: phaser_1.default.Scale.CENTER_BOTH
    },
    backgroundColor: 'black',
    width: 1500,
    height: 720,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [Menu_1.default, Selection_1.default, Solo_1.default, Multijoueur_1.default]
};
exports.default = new phaser_1.default.Game(config);
//# sourceMappingURL=main.js.map