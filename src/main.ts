import Phaser from 'phaser'

// import HelloWorldScene from './scenes/HelloWorldScene'
import Solo from './scenes/Solo'
import Menu from './scenes/Menu'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 }
		}
	},
	scene: [Menu, Solo]
}

export default new Phaser.Game(config)
