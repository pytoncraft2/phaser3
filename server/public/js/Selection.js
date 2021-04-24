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
   * // TODO: implementer automatisation ajout nouveau joueur selon les dossier
   */

  init(data) {
    this.mode = data.mode
    this.liste = ['dessinatrice1_', 'dessinatrice2_', 'dessinatrice3_', 'dessinatrice4_'];
  }

  /**
   * Charge image du dossier selection
   * @return {[type]} [description]
   */

  preload() {
    this.liste.forEach((item) => {
      this.load.image(item, 'assets/selection/' + item + '.png');
    });
  }


  /**
   * Affiche les joueurs
   * Selectionne la clé de l'image lors du clique et l'envoie dans la class Multijoueur pour afficher le bon skin dans le jeu
   * @return {void}
   */

  create() {

    const self = this;
    var x = 400;
    var y = 400;
    var up = 0;
    this.text = this.add.text(75, 350, ['Selection']).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff');
    this.liste.forEach((item, i) => {
      this.player = 'player' + i.toString();
      this.player = self.add.image(x + up, y, item).setScale(0.38).setOrigin(0.5, 0.5);
      up += 200;

      this.player.setInteractive().on('pointerdown', function() {
        self.scene.start('Multijoueur', {
          personnage: this.frame.texture.key
        });
      });
    });
  }
}
