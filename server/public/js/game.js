import Menu from './Menu.js'
import Selection from './Selection.js'
import Solo from './modes/Solo.js'
import Multijoueur from './modes/Multijoueur.js'

var config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  scale: {
  mode: Phaser.Scale.CENTER_BOTH,
  autoCenter: Phaser.Scale.CENTER_BOTH
},
  backgroundColor: '#4488aa',
  width: 1500,
  height: 720,
  physics: {
    default: 'arcade',
    arcade: {
        gravity: { y: 100 },
        debug: false
    }
},
  scene: [ Menu, Selection, Solo, Multijoueur],
  pack: {
  files: [
    { type: 'scenePlugin', key: 'SpinePlugin', url: 'SpinePlugin.min.js', sceneKey: 'spine' }
  ]
}


};

var game = new Phaser.Game(config);
