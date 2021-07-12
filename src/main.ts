import Phaser from 'phaser'

// import HelloWorldScene from './scenes/HelloWorldScene'
import Solo from './scenes/Solo'
import Menu from './scenes/Menu'
import Multijoueur from './scenes/Multijoueur'
import Selection from './scenes/Selection'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
  scale: {
  mode: Phaser.Scale.CENTER_BOTH,
  autoCenter: Phaser.Scale.CENTER_BOTH
},
  backgroundColor: 'black',
  width: 1500,
  height: 720,
  physics: {
    default: 'arcade',
    arcade: {
        gravity: { y: 0 },
        debug: false
    }
	},
	scene: [Menu, Selection, Solo, Multijoueur]
}

export default new Phaser.Game(config)
