const players = {};

const config = {
  type: Phaser.HEADLESS,
  parent: 'phaser-example',
  width: 1500,
  height: 720,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
      gravity: {
        y: 0
      }
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  },
  autoFocus: false
};

function preload() {

  // this.load.atlas('atlas', 'http://localhost/phaser3/server/authoritative_server/assets/personnages/dessinatrice/deuxrow.png', 'http://localhost/phaser3/server/authoritative_server/assets/personnages/dessinatrice/deuxrow_atlas.json');

}

function create() {
  const self = this;

  this.players = this.physics.add.group();

  this.physics.add.collider(this.players);

  // this.physics.add.overlap(this.players, function(star, player) {});

  io.on('connection', function(socket) {
    console.log('a user connected');
    // console.log(socket.atlas);
    // console.log(socket.handshake.headers.atlas);
    // create a new player and add it to our players object
    players[socket.id] = {
      atlas: socket.handshake.headers.atlas,
      texture: 'profil2',
      depth: 30,
      anim: 'profil2',
      scale: 0.38,
      x: /*Math.floor(Math.random() * 700) + 50*/1000,
      y: 447,
      playerId: socket.id,
      input: {
        left: false,
        right: false,
        up: false,
        down: false
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

    // when a player moves, update the player data
    socket.on('playerInput', function(inputData) {
      handlePlayerInput(self, socket.id, inputData);
    });
  });
}

function update() {
  this.players.getChildren().forEach((player) => {
    const input = players[player.playerId].input;
    player.setVelocity(0);
    // player.setDepth(11);
    player.anim = false;

    input.left ? (player.setVelocityX(-300), player.flipX = true, player.anim = 'walk') :
      input.right ? (player.setVelocityX(300), player.flipX = false , player.anim = 'walk') :
      player.setVelocityX(0)

    //smaller
    if (input.up && player.scale >= 0.223) {
      player.scale = player.scale - 0.003;
      player.y -= 2;
      player.depth = player.depth - 1;
      // player.anim = 'goback';
    }

    //bigger
    if (input.down && player.scale <= 2) {
      player.scale = player.scale + 0.003;
      player.y += 2;
      player.depth += 1;
      // player.anim = 'front';
    }
    // console.log(player.depth);

      if (input.a) { 
        console.log(input.a);
        // player.anim = 'attack1';
      }

    players[player.playerId].x = player.x;
    players[player.playerId].y = player.y;
    players[player.playerId].scale = player.scale;
    players[player.playerId].flipX = player.flipX;
    players[player.playerId].anim = player.anim;
    players[player.playerId].depth = player.depth;
  });
  // this.physics.world.wrap(this.players, 5);
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
  const player = self.physics.add.sprite(playerInfo.x, playerInfo.y, 'profil2').setOrigin(0.5).setScale(0.38);
  player.setMaxVelocity(200);
  player.playerId = playerInfo.playerId;
  self.players.add(player);
}

function removePlayer(self, playerId) {
  self.players.getChildren().forEach((player) => {
    if (playerId === player.playerId) player.destroy()
  });
}

const game = new Phaser.Game(config);
window.gameLoaded();
