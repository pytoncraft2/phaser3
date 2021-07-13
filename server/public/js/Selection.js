"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Selection extends Phaser.Scene {
    liste = ['dessinatrice1_', 'dessinatrice2_', 'dessinatrice3_', 'dessinatrice4_', 'naruto_'];
    player = '';
    frame = '';
    constructor() {
        super({
            key: "Selection"
        });
    }
    init(data) {
        let mode = data.mode;
        this.liste = ['dessinatrice1_', 'dessinatrice2_', 'dessinatrice3_', 'dessinatrice4_', 'naruto_'];
    }
    preload() {
        this.liste.forEach((item) => {
            this.load.image(item, 'assets/selection/' + item + '.png');
        });
    }
    create() {
        const self = this;
        var x = 400;
        var y = 400;
        var up = 0;
        this.liste.forEach((item, i) => {
            this.player = 'player' + i.toString();
            this.player = self.add.image(x + up, y, item).setScale(0.38).setOrigin(0.5, 0.5);
            up += 200;
            this.player.setInteractive().on('pointerdown', function () {
                self.scene.start('Multijoueur', {
                    personnage: 4
                });
            });
        });
    }
}
exports.default = Selection;
//# sourceMappingURL=Selection.js.map