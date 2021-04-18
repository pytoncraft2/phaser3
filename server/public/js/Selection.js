/**
 * Selection des personnage
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
   * Recupere le mode passé en paramètre (Multijoueur | Solo) de la class menu
   * @param {{ mode: string }} data
   */

  init(data) {
    this.mode = data.mode
    console.log(this.mode);
    this.liste = ['dessinatrice1', 'dessinatrice2', 'dessinatrice3', 'dessinatrice4'];
    // TODO: implémenter automatisation l'ajout d'un nouveau joueur
  }

  preload() {
    this.liste.forEach((item, i) => {
      this.load.image(item, 'assets/selection/' + item + '.png');
    });
  }


  /**
   * Selectionne la clé de l'image lors du clique et l'envoie dans la class Multijoueur pour afficher le bon skin dans le jeu
   * @return {[type]} [description]
   */
  create() {

    const self = this;
    var x = 400;
    var y = 400;
    var up = 0;
    this.text = this.add.text(75, 350, ['Selection']).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff');
    // this.fullscreen = this.add.text(95, 350, ['Fullscreen']).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff');
    this.liste.forEach((item,i) => {
    this.player = 'player' + i.toString();
    console.log(this.player);
    this.player = self.add.image(x + up, y, item).setScale(0.38).setOrigin(0.5, 0.5);
    up += 200;

    this.player.setInteractive().on('pointerdown', function(pointer, localX, localY, event) {
      self.scene.start('Multijoueur', {
        personnage: this.frame.texture.key
      });
    });

  });

    // this.fullscreen.setInteractive().on('pointerdown', function(pointer, localX, localY, event) {

    // TODO: fullscreen mode

    // });

  }
}
