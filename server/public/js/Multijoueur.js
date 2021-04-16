/**
 * Jeu en ligne
 * Identifiant de la class Multijoueur
 * @type {String}
 */

export default class Multijoueur extends Phaser.Scene {
  constructor() {
    super({
      key: "Multijoueur"
    });
  }

  preload() {
    // this.load.atlas('atlas', 'assets/personnages/dessinatrice/deuxrow.png', 'assets/personnages/dessinatrice/deuxrow_atlas.json');
    this.load.image('bg', 'assets/fond/bg.png');
  }

  /**
   * Affiche texte menu
   * @return {String} [description]
   */
  create() {
    const self = this;
    var bg = this.add.image(750, 350, 'bg').setOrigin(0,1);
    this.text = this.add.text(75, 350, ['Multijoueur']).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff');
    // this.fullscreen = this.add.text(95, 350, ['Fullscreen']).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff');

    this.text.setInteractive().on('pointerdown', function(pointer, localX, localY, event) {
      self.scene.start('Menu', {
        character: this.selectedKey
      });
    });

    // this.fullscreen.setInteractive().on('pointerdown', function(pointer, localX, localY, event) {

      // TODO: fullscreen mode

    // });

  }

  update() {

  }
}
