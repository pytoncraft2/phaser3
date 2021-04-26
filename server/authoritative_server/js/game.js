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
        y: 0
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

  this.players = this.physics.add.group();

  // this.physics.add.collider(,function () {
    // console.log('collision');
  // });

  function hurted(e) {
    // console.log(e.anim);
    console.log(e.playerId);
    e.alpha = e.alpha - 0.01;
    // console.log(this.anim);
  }
  this.physics.add.collider(this.players, this.players, hurted, null, this);

  io.on('connection', function(socket) {
    console.log('a user connected');
    // create a new player and add it to our players object
    players[socket.id] = {
      atlas: socket.handshake.headers.atlas,
      alpha: 1,
      depth: 30,
      anim: 'profil2',
      scale: 0.38,
      size: 200,
      x: /*Math.floor(Math.random() * 700) + 50*/ 1000,
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
    player.setSize(200);
    player.anim = false;

    input.left ? (player.setVelocityX(-300), player.flipX = true, player.anim = 'walk') :
      input.right ? (player.setVelocityX(300), player.flipX = false, player.anim = 'walk') :
      player.setVelocityX(0)

    //smaller
    /*
    if (input.up && player.x < 605 && player.y > 405) {
      player.scale = player.scale - 0.003;
      player.y -= 2;
      player.depth = player.depth - 1;
      player.anim = 'goback';
      console.log('supp x 605');
    }
    if (input.up && player.x > 605 && player.y > 405) {
      player.scale = player.scale - 0.003;
      player.y -= 2;
      player.depth = player.depth - 1;
      player.anim = 'goback';
      console.log('supp x 605');
    }
    */

    if (input.up) {
      if (player.x < 605 && player.y > 405) {
      player.scale = player.scale - 0.003;
      player.y -= 2;
      player.depth = player.depth - 1;
      player.anim = 'goback';

      }
      if (player.x > 605 && player.scale >= 0.223) {
      player.scale = player.scale - 0.003;
      player.y -= 2;
      player.depth = player.depth - 1;
      player.anim = 'goback';
      }
    }

/*
    if (input.up && player.scale >= 0.223) {

      player.scale = player.scale - 0.003;
      player.y -= 2;
      player.depth = player.depth - 1;
      player.anim = 'goback';

    }
*/
    // if (input.up && player.y < 405 && player.x < 605 && player.y < 405) {
      // console.log('inf x 605');
      // console.log('stop');
      // player.scale = player.scale - 0.003;
      // player.y -= 2;
      // player.depth = player.depth - 1;
      // player.anim = 'goback';
    // }

    //bigger
    if (input.down && player.scale <= 2) {
      player.scale = player.scale + 0.003;
      player.y += 2;
      player.depth += 1;
      player.anim = 'front';
    }
    //405 y

    if (input.a) {
      console.log(input.a);
      player.anim = 'attack1';
      player.setSize(900);
    }

    players[player.playerId].x = player.x;
    players[player.playerId].y = player.y;
    players[player.playerId].scale = player.scale;
    players[player.playerId].flipX = player.flipX;
    players[player.playerId].anim = player.anim;
    players[player.playerId].depth = player.depth;
    players[player.playerId].size = player.size;
    players[player.playerId].alpha = player.alpha;
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
  const player = self.physics.add.sprite(playerInfo.x, playerInfo.y, 'profil2').setOrigin(0.5).setScale(0.38).setSize(220);
  player.setMaxVelocity(200);
  player.playerId = playerInfo.playerId;
  player.alpha = playerInfo.alpha;
  self.players.add(player);
}

function removePlayer(self, playerId) {
  self.players.getChildren().forEach((player) => {
    if (playerId === player.playerId) player.destroy()
  });
}

const game = new Phaser.Game(config);
window.gameLoaded();
