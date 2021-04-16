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

  preload() {
  }

  /**
   * Affiche texte menu
   * @return {String} [description]
   */
  create() {
    const self = this;
    this.text = this.add.text(75, 350, ['MENU']).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff');
    this.goSelection = this.add.text(75, 350, ['MENU']).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff');
    this.goSelection.setInteractive().on('pointerdown', function(pointer, localX, localY, event) {
    // self.scene.scale.toggleFullscreen();
      self.scene.start('Multijoueur', { character: this.selectedKey });
      // console.log(pointer);
    });
  }

  update() {

  }
}
