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
    this.i = 0;
  }

  preload() {}

  /**
   * Affiche texte menu
   * @return {String} [description]
   */
  create() {
    console.log(this.width);
    const self = this;
    this.goSelection = this.add.text(75, 550, ['Choisir un personnages']).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff');
    this.goSelection.setInteractive().on('pointerdown', function(pointer, localX, localY, event) {
      // self.scene.scale.toggleFullscreen();
      self.scene.start('Multijoueur', {
        character: this.selectedKey
      });
      // console.log(pointer);
    });
    this.hsv = Phaser.Display.Color.HSVColorWheel();

    //  Rainbow Text
    this.text1 = this.add.text(50, 100, 'Steam-Fighter', { font: "74px Arial Black", fill: "#fff" });
    this.text1.setStroke('#00f', 16);
    this.text1.setShadow(2, 2, "#333333", 2, true, true);

  }

  update() {



    const top = this.hsv[this.i].color;
    const bottom = this.hsv[359 - this.i].color;

    this.text1.setTint(top, top, bottom, bottom);

    this.i++;

    if (this.i === 360) {
      this.i = 0;
    }

  }
}
