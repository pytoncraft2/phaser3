/**
 * Jeu en ligne
 * Identifiant de la class Solo
 * @type {String}
 */

export default class Selection extends Phaser.Scene {
  constructor() {
    super({
      key: "Selection"
    });
  }

/**
 * Recupere le mode Multijoueur | Solo passé en paramètre de la class menu
 * @param {{ mode: string }} data
 */

init(data)
{
  this.mode = data.mode
  console.log(this.mode);
}

  preload() {
    this.load.image('perso', 'assets/selection/dessinatrice.png');
    this.load.image('perso', 'assets/selection/dessinatrice.png');
  }

  /**
   * Affiche texte menu
   * @return {String} [description]
   */
  create() {
    const self = this;
    this.text = this.add.text(75, 350, ['Selection']).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff');
    // this.fullscreen = this.add.text(95, 350, ['Fullscreen']).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff');
    self.player = self.add.image(400, 400,'perso').setScale(0.38).setOrigin(0.5, 0.5).setInteractive();

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
