const players = {};

const config = {
  type: Phaser.HEADLESS,
  parent: 'phaser-example',
  width: 1500,
  height: 720,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: {
        y: 100
      }
    }
  },
  scene: {
    create: create,
    update: update
  },
  autoFocus: false
};


function create() {
  const self = this;
  let count = 0;
  this.players = this.physics.add.group();
  this.physics.add.collider(this.players, this.players, col, (player, player2) => {
/*
    if (players[player.playerId].anim == 'attack1') {
      count++;
      // console.log(count);
      // console.log(player2.body);
      player2.body.x = player2.body.x + (player2.flipX !== player.flipX ? 100 : -100);
      if (count == 20) {
      player2.alpha = player2.alpha - 0.2;
      console.log(player2.flipX);
      console.log(player.flipX);
      // flipx ? +100 : -100;
      // player2.body.allowGravity = true;
      // player2.setVelocityY(300);
      count = 0;
      }
    }
    */

    if (players[player.playerId].anim == 'heal') {
      player2.alpha = player2.alpha + 0.2;
    }
  }, this);

  function col(e) {}

  io.on('connection', function(socket) {

    console.log('a user connected');
    // create a new player and add it to our players object
    players[socket.id] = {
      atlas: socket.handshake.headers.atlas,
      wall: false,
      attack: false,
      alpha: 1,
      depth: 30,
      anim: 'profil',
      scale: 0.38,
      size: 200,
      x: /*Math.floor(Math.random() * 700) + 50*/ 1000,
      y: 447,
      playerId: socket.id,
      input: {
        left: false,
        right: false,
        up: false,
        down: false,
        a: false
      }
    };
    // add player to server
    addPlayer(self, players[socket.id]);
    // send the players object to the new player
    socket.emit('currentPlayers', players);
    // update all other players of the new player
    socket.broadcast.emit('newPlayer', players[socket.id]);
    // send the star object to the new player
    socket.emit('updateScore', self.scores);

    socket.on('disconnect', function() {
      console.log('user disconnected');
      // remove player from server
      removePlayer(self, socket.id);
      // remove this player from our players object
      delete players[socket.id];
      // emit a message to all players to remove this player
      io.emit('disconnection', socket.id);
    });

    // console.log(socket.id);
    // when a player moves, update the player data
    socket.on('playerInput', function(inputData) {
      handlePlayerInput(self, socket.id, inputData);
    });
  });
}

function update() {
  this.players.getChildren().forEach((player) => {
    const input = players[player.playerId].input;
    let walk2 = false;
    player.setVelocity(0);
    // player.setSize(200);
    player.anim = false;
    player.attack = false;
    player.wall = false;

    if (input.a && player.anim !== 'shoot') {
      player.anim = 'shoot'
    }

    // if (input.c && startAnim !== 'run') {
      // this.spineBoy.play('run')
    // }

    if (input.right) {

      if (player.anim !== 'walk' && walk2 === false) {
          // player.setSize(280, 680)
      if (input.c) {
          player.setVelocityX(600)
          if (player.anim !== 'run') {
          player.anim = 'run'
          }
        } else {
          player.setVelocityX(300)
          if (player.anim !== 'walk') {
          player.anim = 'walk'
          }
        }
          player.scaleX = 0.5;
          player.setOffset(0 , 0)
          // player.on('complete', (spine) => {
          // player.play('idle');
          // player.setVelocityX(0)
        // })
      }
    }

    if (input.left) {
      walk2 = true;
      if (player.anim !== 'walk' && walk2 === true) {
      if (input.c) {
          player.setVelocityX(-600)
          if (player.anim !== 'run') {
          player.anim = 'run'
          }
        } else {
          player.setVelocityX(-300)
          if (player.anim !== 'walk') {
          player.anim = 'walk'
          }
        }
          player.scaleX = -0.5;
          player.setOffset(280 , 0)
          // player.on('complete', (spine) => {
          // player.play('idle');
          // player.setVelocityX(0)
          // walk2 = false;
        // })
      }
    }

    if (input.space) {
      if (player.anim !== 'jump') {
        player.anim = 'jump';
        // this.player.on('complete', (spine) => {
          // this.player.play('idle');
        // })
      }
    }
    // console.log(player.body.velocity);

    players[player.playerId].x = player.x;
    players[player.playerId].y = player.y;
    players[player.playerId].velocityX = player.body.velocity.x;
    players[player.playerId].scale = player.scale;
    players[player.playerId].anim = player.anim;
    players[player.playerId].depth = player.depth;
    players[player.playerId].size = player.size;
    players[player.playerId].alpha = player.alpha;
    players[player.playerId].attack = player.attack;
    players[player.playerId].wall = player.wall;
    players[player.playerId].offsetX = player.body.offset.x;
    players[player.playerId].offsetY = player.body.offset.y;
    players[player.playerId].scaleX = player.scaleX;
    players[player.playerId].scaleY = player.scaleY;
  });
  //envoi mise à jour de tout les players
  io.emit('playerUpdates', players);
}

function randomPosition(max) {
  return Math.floor(Math.random() * max) + 50;
}

function handlePlayerInput(self, playerId, input) {
  self.players.getChildren().forEach((player) => {
    if (playerId === player.playerId) players[player.playerId].input = input
  });
}

function addPlayer(self, playerInfo) {
  const player = self.physics.add.sprite(playerInfo.x, playerInfo.y, 'profil').setOrigin(0.5).setScale(0.38).setSize(280, 180);
  player.setMaxVelocity(200);

  player.playerId = playerInfo.playerId;
  player.alpha = playerInfo.alpha;
  self.players.add(player);
  player.body.allowGravity = false
}

function removePlayer(self, playerId) {
  self.players.getChildren().forEach((player) => {
    if (playerId === player.playerId) player.destroy()
  });
}

const game = new Phaser.Game(config);
window.gameLoaded();
