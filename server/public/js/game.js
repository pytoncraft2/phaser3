import Menu from './Menu.js'
import Selection from './Selection.js'
import Solo from './modes/Solo.js'
import Multijoueur from './modes/Multijoueur.js'

var config = {
  // autoCenter: Phaser.Scale.CENTER_BOTH,
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 1500,
  height: 720,
  // active:true,
  // mode: Phaser.Scale.FIT,
  // backgroundColor: '#11a0d4',

  physics: {
    default: 'arcade',
    arcade: {
        gravity: { y: 0 },
        debug: false
    }
},
  scene: [ Menu, Multijoueur, Solo, Selection ]
    // preload: preload,
    // create: create,
    // update: update
  // }
};

var game = new Phaser.Game(config);
/*
function preload() {

  this.load.atlas('atlas', 'http://localhost/phaser3/server/authoritative_server/assets/personnages/dessinatrice/deuxrow.png', 'http://localhost/phaser3/server/authoritative_server/assets/personnages/dessinatrice/deuxrow_atlas.json');
  this.load.image('bg', 'http://localhost/phaser3/server/authoritative_server/assets/fond/bg.png');

}

function create() {

  var self = this;

    this.anims.create({
    key: "attack1",
    frames: this.anims.generateFrameNumbers('atlas', {frames: ['profil2','position_a1','position_a2','position_a3','profil2']}),
    frameRate: 6,
    repeat: 0
  });

  this.anims.create({
    key: "goback",
    frames: this.anims.generateFrameNumbers('atlas', {frames: ['dos5','dos7.8','dos8','dos9','dos10','dos11','dos3']}),
    frameRate: 7,
    repeat: 0
  });

    this.anims.create({
    key: "front",
    frames: this.anims.generateFrameNumbers('atlas', {frames: ['face5','face2','face3','face4','face1']}),
    frameRate: 6,
    repeat: 0
  });

    this.anims.create({
    key: "walk",
    frames: this.anims.generateFrameNumbers('atlas', {frames: ['profil_jkd15','profil_jkd14','profil_jkd13','profil_jkd14','profil_jkd8']}),
    frameRate: 5,
    repeat: 0
  });

  this.add.image(750, 350, 'bg');


  this.socket = io();
  this.players = this.add.group();

  this.socket.on('currentPlayers', function(players) {
    Object.keys(players).forEach(function(id) {
      players[id].playerId === self.socket.id ? displayPlayers(self, players[id], 'atlas', 'profil2') :
        displayPlayers(self, players[id], 'atlas','profil2')
        // FIXME: meme skin pour touts les joueurs
    });
  });

  this.socket.on('newPlayer', function(playerInfo) {
    displayPlayers(self, playerInfo, 'atlas','profil2');
  });

  this.socket.on('disconnection', function(playerId) {
    self.players.getChildren().forEach(function(player) {
      if (playerId === player.playerId) player.destroy();
    });
  });

  this.socket.on('playerUpdates', function(players) {
    Object.keys(players).forEach(function(id) {
      self.players.getChildren().forEach(function(player) {
        if (players[id].playerId === player.playerId) {

          //modifie sprite
          player.flipX = (players[id].flipX);
          player.setScale(players[id].scale);
          player.setPosition(players[id].x, players[id].y);
          if (players[id].anim && players[id].anim !== false) {
            player.play('' + players[id].anim + '', 5);
          }
        }
      });
    });
  });

  this.aKeyPressed = this.input.keyboard.addKey('A'); // Get key object
  this.cursors = this.input.keyboard.createCursorKeys();
  this.leftKeyPressed = false;
  this.rightKeyPressed = false;
  this.upKeyPressed = false;
  this.downKeyPressed = false;
  this.aKey = false;

}


function update() {
  const left = this.leftKeyPressed,
    right = this.rightKeyPressed,
    up = this.upKeyPressed,
    down = this.downKeyPressed;
  ak = this.aKey;

  this.cursors.left.isDown ? this.leftKeyPressed = true :
    this.cursors.right.isDown ? this.rightKeyPressed = true :
    (this.leftKeyPressed = false, this.rightKeyPressed = false)

  this.cursors.up.isDown ? this.upKeyPressed = true :
    this.cursors.down.isDown ? this.downKeyPressed = true :
    (this.upKeyPressed = false, this.downKeyPressed = false)

  if (this.aKeyPressed.isDown) {
    this.aKey = true;
  } else {
    this.aKey = false;
  }

  if (left !== this.leftKeyPressed || right !== this.rightKeyPressed || up !== this.upKeyPressed || down !== this.downKeyPressed || ak !== this.aKey) {
    this.socket.emit('playerInput', {
      left: this.leftKeyPressed,
      right: this.rightKeyPressed,
      up: this.upKeyPressed,
      down: this.downKeyPressed,
      a: this.aKey
    });
  }
}

function displayPlayers(self, playerInfo, atlas, nom) {
  self.player = self.add.sprite(playerInfo.x, playerInfo.y, atlas, nom).setScale(0.38).setOrigin(0.5, 0.5) ;
  // self.player.playerId = playerInfo.playerId;
  // self.players.add(self.player);
// }
// NOTES
// image3.setDepth(1);
*/
