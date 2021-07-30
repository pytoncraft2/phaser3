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
   * Affiche textes menu et les rends cliquable
   * Lors du clique , changement de scene avec le mode en parametre
   * @return {String}
   */
  create() {
    const self = this;
    this.goSelectionS = this.add.text(695, 300, ['Solo']).setFontSize(42).setFontFamily('Trebuchet MS').setColor('#6badce');
    this.goSelectionM = this.add.text(650, 400, ['Multijoueur']).setFontSize(42).setFontFamily('Trebuchet MS').setColor('#6badce');
    this.fullscreen = this.add.text(640, 500, ['Pleine Ecran']).setFontSize(42).setFontFamily('Trebuchet MS').setColor('#6badce');

    // Pleine ecran
    this.fullscreen.setInteractive().on('pointerup', function() {
      this.scale.isFullscreen ? this.scale.stopFullscreen() : this.scale.startFullscreen()
    }, this);

    // Multijoueur
    this.goSelectionM.setInteractive().on('pointerdown', function() {
      self.scene.start('Selection', {
        mode: 'Multijoueur'
      });
    });
    // Solo
    this.goSelectionS.setInteractive().on('pointerdown', function() {
      self.scene.start('Selection', {
        mode: 'Solo'
      });
    });

    //Logo
    this.logo = this.add.text(530, 30, 'Steam-Fighter', {
      font: "74px Arial Black"
    });
    this.logo.setShadow(2, 2, "#333333", 2, true, true);
  }
}
