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

  preload() {

    this.load.image('bg', 'assets/fond/bg.png');
  }

  /**
   * Affiche texte menu
   * @return {String} [description]
   */
  create() {
    var bg = this.add.image(750, 350, 'bg');
    console.log(this.width);
    const self = this;
    this.goSelectionS = this.add.text(695, 300, ['Solo']).setFontSize(38).setFontFamily('Trebuchet MS').setColor('#00ffff').setShadow(2, 2, "#333333", 2, true, true);
    this.goSelectionM = this.add.text(650, 400, ['Multijoueur']).setFontSize(38).setFontFamily('Trebuchet MS').setColor('#00ffff').setShadow(2, 2, "#333333", 2, true, true);
    this.fullscreen = this.add.text(640, 500, ['Pleine Ecran']).setFontSize(38).setFontFamily('Trebuchet MS').setColor('#00ffff').setShadow(2, 2, "#333333", 2, true, true);
    // this.fullscreen.setShadow(2, 2, "#333333", 2, true, true);

    this.fullscreen.setInteractive().on('pointerup', function () {

        this.scale.isFullscreen ? this.scale.stopFullscreen() : this.scale.startFullscreen()

    }, this);


    this.goSelectionM.setInteractive().on('pointerdown', function(pointer, localX, localY, event) {
      // self.scene.scale.toggleFullscreen();
      self.scene.start('Selection', {
        mode: 'Multijoueur'
      });
      // console.log(pointer);
    });


  this.goSelectionS.setInteractive().on('pointerdown', function(pointer, localX, localY, event) {
      // self.scene.scale.toggleFullscreen();
      self.scene.start('Selection', {
        mode: 'Solo'
      });
      // console.log(pointer);
    });

    this.hsv = Phaser.Display.Color.HSVColorWheel();

    //  Rainbow Text
    this.logo = this.add.text(530, 30, 'Steam-Fighter', { font: "74px Arial Black", fill: "#fff" });
    this.logo.setStroke('#00f', 16);
    this.logo.setShadow(2, 2, "#333333", 2, true, true);

  }

  update() {



    const top = this.hsv[this.i].color;
    const bottom = this.hsv[359 - this.i].color;

    this.logo.setTint(top, top, bottom, bottom);

    this.i++;

    if (this.i === 360) {
      this.i = 0;
    }

  }
}
