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
    this.load.image('dessinatrice1', 'assets/selection/dessinatrice1.png');
    this.load.image('dessinatrice2', 'assets/selection/dessinatrice2.png');
    this.load.image('dessinatrice3', 'assets/selection/dessinatrice3.png');
    this.load.image('dessinatrice4', 'assets/selection/dessinatrice4.png');
  }

  /**
   * Affiche texte menu
   * @return {String} [description]
   */
  create() {
    const self = this;
    this.text = this.add.text(75, 350, ['Selection']).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff');
    // this.fullscreen = this.add.text(95, 350, ['Fullscreen']).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff');
    self.player1 = self.add.image(400, 400,'dessinatrice1').setScale(0.38).setOrigin(0.5, 0.5).setInteractive();
    self.player2 = self.add.image(600, 400,'dessinatrice2').setScale(0.38).setOrigin(0.5, 0.5).setInteractive();
    self.player3 = self.add.image(800, 400,'dessinatrice3').setScale(0.38).setOrigin(0.5, 0.5).setInteractive();
    self.player4 = self.add.image(1000, 400,'dessinatrice4').setScale(0.38).setOrigin(0.5, 0.5).setInteractive();

    this.player1.setInteractive().on('pointerdown', function(pointer, localX, localY, event) {
      self.scene.start('Multijoueur', {
        character: this.selectedKey
      });
      console.log(this.frame.texture.key);
    });

    this.player2.setInteractive().on('pointerdown', function(pointer, localX, localY, event) {
      // self.scene.start('Menu', {
        // character: this.selectedKey
      // });
      console.log(this.frame.texture.key);
    });

    this.player3.setInteractive().on('pointerdown', function(pointer, localX, localY, event) {
      // self.scene.start('Menu', {
        // character: this.selectedKey
      // });
      console.log(this.frame.texture.key);
    });

    this.player4.setInteractive().on('pointerdown', function(pointer, localX, localY, event) {
      // self.scene.start('Menu', {
        // character: this.selectedKey
      // });
      console.log(this.frame.texture.key);
    });





    // this.fullscreen.setInteractive().on('pointerdown', function(pointer, localX, localY, event) {

      // TODO: fullscreen mode

    // });

  }

  update() {

  }
}
