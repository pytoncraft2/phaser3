// import Menu from './Menu.js'
// import Selection from './Selection.js'
// import Solo from './modes/Solo.js'
// import Multijoueur from './modes/Multijoueur.js'
import * as Phaser from 'phaser';

var config: Phaser.Types.Core.GameConfig = {
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
        gravity: { y: 0 },
        debug: false
    }
},
  scene: {
  preload: preload,
  create: create
},

};

var game = new Phaser.Game(config);


function preload() {
    this.load.image('bgMenu', 'assets/fond/bgMenu.png');
  }

  /**
   * Affiche textes menu et les rends cliquable
   * Lors du clique , changement de scene avec le mode en parametre
   * @return {String}
   */
function create() {
    var bgMenu = this.add.image(750, 350, 'bgMenu');
    const self = this;
    this.goSelectionS = this.add.text(695, 300, ['Solo']).setFontSize(42).setFontFamily('Trebuchet MS').setColor('#6badce').setShadow(2, 2, "white", 2, true, true);
    this.goSelectionM = this.add.text(650, 400, ['Multijoueur']).setFontSize(42).setFontFamily('Trebuchet MS').setColor('#6badce').setShadow(2, 2, "white", 2, true, true);
    this.fullscreen = this.add.text(640, 500, ['Pleine Ecran']).setFontSize(42).setFontFamily('Trebuchet MS').setColor('#6badce').setShadow(2, 2, "white", 2, true, true);

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
      font: "74px Arial Black",
      fill: "#009286"
    });
    this.logo.setShadow(2, 2, "#333333", 2, true, true);
  }

/*
function preload() {
  var progress = this.add.graphics();

  this.load.on('progress', function(value) {

    progress.clear();
    progress.fillStyle(0xffffff, 1);
    progress.fillRect(0, 200, 1400 * value, 60);

  });

  this.load.on('complete', function() {

    progress.destroy();

  });

  this.liste.forEach((item, i) => {
    this.load.atlas(item, 'assets/personnages/' + item + '/' + item + '.png', 'assets/personnages/' + item + '/' + item + '_atlas.json');
  });
  this.load.image('bg', 'assets/fond/bgGrand.png');
  this.load.image('doors', 'assets/fond/doors.png');
  this.load.image('bg2', 'assets/fond/bgMenu.png');
}



function create() {


    var self = this;
    console.log(self.scene.scene.physics.scene);

    this.cameras.main.setBounds(-2074, 0, 3574, 666);
    this.physics.world.setBounds(-2074, 0, 3574, 666);
    this.cameras.main.fadeIn(4000);

    this.anims.create({
      key: "attack1_dessinatrice1",
      frames: this.anims.generateFrameNumbers('dessinatrice1', {
        frames: ['profil', 'position_a1', 'position_a2', 'position_a3', 'profil','pas_jkd']
      }),
      frameRate: 6,
      repeat: 0
    });

    this.anims.create({
      key: "run_dessinatrice1",
      frames: this.anims.generateFrameNumbers('dessinatrice1', {
        frames: ['pas_jkd','pas_jkd2', 'pas_jkd4','pas_jkd3']
      }),
      frameRate: 6,
      repeat: 0
    });


    this.anims.create({
      key: "goback_dessinatrice1",
      frames: this.anims.generateFrameNumbers('dessinatrice1', {
        frames: ['dos5', 'dos7.8', 'dos8', 'dos9', 'dos10', 'dos11', 'dos3']
      }),
      frameRate: 7,
      repeat: 0
    });


    this.anims.create({
      key: "jump_dessinatrice1",
      frames: this.anims.generateFrameNumbers('dessinatrice1', {
        frames: ['jump0', 'jump1', 'jump2', 'jump3', 'jump4', 'jump5', 'jump0']
      }),
      frameRate: 8,
      repeat: 0
    });


    this.anims.create({
      key: "front_dessinatrice1",
      frames: this.anims.generateFrameNumbers('dessinatrice1', {
        frames: ['face5', 'face2', 'face3', 'face4', 'face1']
      }),
      frameRate: 6,
      repeat: 0
    });
    this.anims.create({
      key: "walk_dessinatrice1",
      frames: this.anims.generateFrameNumbers('dessinatrice1', {
        frames: ['profil_jkd11', 'profil_jkd13', 'profil_jkd14', 'profil_jkd15','profil_jkd8']
      }),
      frameRate: 5,
      repeat: 0
    });

    this.anims.create({
      key: "attack1_naruto",
      frames: this.anims.generateFrameNumbers('naruto', {
        frames: ['profil', 'position_a1', 'position_a2', 'position_a3', 'profil']
      }),
      frameRate: 6,
      repeat: 0
    });

    this.anims.create({
      key: "goback_naruto",
      frames: this.anims.generateFrameNumbers('naruto', {
        frames: ['dos5', 'dos7.8', 'dos8', 'dos9', 'dos10', 'dos11', 'dos3']
      }),
      frameRate: 7,
      repeat: 0
    });

    this.anims.create({
      key: "front_naruto",
      frames: this.anims.generateFrameNumbers('naruto', {
        frames: ['face1', 'face2', 'face3', 'face4', 'face5', 'face7']
      }),
      frameRate: 6,
      repeat: 0
    });
    this.anims.create({
      key: "walk_naruto",
      frames: this.anims.generateFrameNumbers('naruto', {
        frames: ['profil3', 'profil4', 'profil5', 'profil6']
      }),
      frameRate: 5,
      repeat: 0
    });
    this.socket = io({
      extraHeaders: {
        "atlas": this.personnage
      }
    });

    this.players = this.add.group();

    this.add.image(-300, 350, 'bg').setDepth(-54);
    this.doors = this.physics.add.image(-300, 280, 'doors').setDepth(-20);
    this.socket.on('currentPlayers', function(players) {
      Object.keys(players).forEach(function(id) {
        if (players[id].playerId === self.socket.id) {
          self.displayPlayers(self, players[id], true);
        } else {
          self.displayPlayers(self, players[id], false);
        }
      });
    });

    this.socket.on('newPlayer', function(playerInfo) {
      self.displayPlayers(self, playerInfo);
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
            player.flipX = (players[id].flipX);
            player.setScale(players[id].scale);
            player.setPosition(players[id].x, players[id].y);
            player.setDepth(players[id].depth);
            player.setAlpha(players[id].alpha);

            if (players[id].anim && players[id].anim !== false) {
              player.play('' + players[id].anim + '_' + players[id].atlas + '', 5);
            }
          }
        });
      });
    });

    this.aKeyPressed = this.input.keyboard.addKey('A');
    this.tKeyPressed = this.input.keyboard.addKey('T');
    this.cKeyPressed = this.input.keyboard.addKey('CTRL');
    this.cursors = this.input.keyboard.createCursorKeys();
    this.leftKeyPressed = false;
    this.rightKeyPressed = false;
    this.upKeyPressed = false;
    this.downKeyPressed = false;
    this.spaceKeyPressed = false;
    this.cKey = false;
    this.aKey = false;
    this.tKey = false;


  }


function update() {
  const left = this.leftKeyPressed,
    right = this.rightKeyPressed,
    up = this.upKeyPressed,
    down = this.downKeyPressed,
    space = this.spaceKeyPressed,
    ak = this.aKey,
    tk = this.tKey,
    ck = this.cKey;

  this.cursors.left.isDown ? this.leftKeyPressed = true :
    this.cursors.right.isDown ? this.rightKeyPressed = true :
    (this.leftKeyPressed = false, this.rightKeyPressed = false)

  this.cursors.up.isDown ? this.upKeyPressed = true :
    this.cursors.down.isDown ? this.downKeyPressed = true :
    (this.upKeyPressed = false, this.downKeyPressed = false)

  this.aKeyPressed.isDown ? this.aKey = true : this.aKey = false
  this.tKeyPressed.isDown ? this.tKey = true : this.tKey = false

  this.cKeyPressed.isDown ? this.cKey = true : this.cKey = false

  this.cursors.space.isDown ? this.spaceKeyPressed = true : this.spaceKeyPressed = false


  if (left !== this.leftKeyPressed ||
    right !== this.rightKeyPressed ||
    up !== this.upKeyPressed ||
    down !== this.downKeyPressed ||
    ak !== this.aKey ||
    tk !== this.tKey ||
    ck !== this.cKey ||
    space !== this.spaceKeyPressed) {
    this.socket.emit('playerInput', {
      left: this.leftKeyPressed,
      right: this.rightKeyPressed,
      up: this.upKeyPressed,
      down: this.downKeyPressed,
      a: this.aKey,
      t: this.tKey,
      space: this.spaceKeyPressed,
      c: this.cKey,
    });
  }
}

function displayPlayers(self, playerInfo, iscurrent) {
    self.player = self.physics.add.sprite(playerInfo.x, playerInfo.y, playerInfo.atlas, 'face1').setOrigin(0.5, 0.5).setDisplaySize(200, 200).setSize(200);
    self.player.playerId = playerInfo.playerId;
    self.players.add(self.player);
    if (iscurrent) {
      self.cameras.main.startFollow(self.player);
      self.player.setCollideWorldBounds(true);
      self.physics.add.overlap(self.player, self.doors, function(player, doors) {
        player.y < 399 ? doors.alpha = 0.5 : doors.alpha = 1
      });
    }
  }
  */
