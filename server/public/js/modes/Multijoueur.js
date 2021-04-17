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

  init(data) {
    this.personnage = data.personnage
    console.log(this.personnage);
  }

  preload() {
    this.load.atlas('atlas', `assets/personnages/${this.personnage}/${this.personnage}.png`, `assets/personnages/${this.personnage}/${this.personnage}_atlas.json`);
    this.load.image('bg', 'assets/fond/bg.png');

  }

  /**
   * Affiche texte menu
   * @return {String} [description]
   */
  create() {
    const self = this;
    var bg = this.add.image(750, 350, 'bg');
    self.player = self.add.sprite(400, 400, 'atlas', 'profil2').setScale(0.38).setOrigin(0.5, 0.5).setInteractive();
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
