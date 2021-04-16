/**
 * Menu choix multijoueur / solo
 * Identifiant de la class Menu
 * @type {String}
 */

export default class Menu extends Phaser.Scene {
  constructor() {
    super({
      key: "Menu"
    });
  }

  preload() {}

  /**
   * Affiche texte menu
   * @return {String} [description]
   */
  create() {
    this.text = this.add.text(75, 350, ['MENU']).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff');
    this.text.setInteractive().on('pointerdown', function(pointer, localX, localY, event) {
      // this.scene.start('Multijoueur', { character: this.selectedKey })
      // console.log(pointer);
    });
  }

  update() {

  }
}
