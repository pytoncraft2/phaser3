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
    create: create,
    update: update
  },
  autoFocus: false
};


function create() {
  const self = this;

  let count = 0;
  this.players = this.physics.add.group();
  /*
  this.physics.add.collider(this.players, this.zone, col2, (player, player2) => {
  }, this);
  */
  this.physics.add.collider(this.players, this.players, col, (player, player2) => {

    if (players[player.playerId].anim == 'attack1') {
      count++;
      console.log(count);
      if (count == 20) {
        player2.alpha = player2.alpha - 0.2;
        count = 0;
      }
    }

    if (players[player.playerId].anim == 'heal') {
      player2.alpha = player2.alpha + 0.2;
    }
  }, this);

  function col(e) {}
  function col2(e) {}

  io.on('connection', function(socket) {

    console.log('a user connected');
    // create a new player and add it to our players object
    players[socket.id] = {
      atlas: socket.handshake.headers.atlas,
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
      },
      zone: {
        x: 0,
        y: 0
      }
    };
    // add player to server
    addPlayer(self, players[socket.id]);
    // send the players object to the new player
    socket.emit('currentPlayers', players);
    // update all other players of the new player
    socket.broadcast.volatile.emit('newPlayer', players[socket.id]);
    // send the star object to the new player
    socket.broadcast.emit('updateScore', self.scores);

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
    socket.volatile.on('playerInput', function(inputData) {
      handlePlayerInput(self, socket.id, inputData);
    });
  });
}

function update() {
  this.players.getChildren().forEach((player) => {
    const input = players[player.playerId].input;
    console.log(player.body.velocity.x);

    if (input.space) {
      // player.setVelocityY(30)
    }

    if (input.up) {
      player.setVelocityY(0)
    }
    // player.setSize(200);
    // player.anim = false;
    // player.attack = false;
    // player.eKey = 'player';
    // player.setVelocityY(30);
    input.left ? (player.setVelocityX(-300), player.flipX = true, player.anim = 'walk') :
      input.right ? (player.setVelocityX(300), player.flipX = false, player.anim = 'walk') :
      ''


/*
    if (input.up) {
        player.scale = player.scale - 0.003;
        player.y -= 2;
        player.depth = player.depth - 1;
        player.anim = 'goback';
      }
        player.scale = player.scale - 0.003;
        player.y -= 2;
        player.depth = player.depth - 1;
        player.anim = 'goback';
      }


    }
    */
      // if (input.eKey) {
      // player.eKey = 'bird';
      // console.log('cccc');
    // }
    //bigger
    /*
    if (input.down && player.scale <= 2) {
      player.scale = player.scale + 0.003;
      player.y += 2;
      player.depth += 1;
      player.anim = 'front';
    }

    if (input.a) {
      player.anim = 'attack1';
      player.setSize(900);
      player.attack = true;
    }

    if (input.t) {
      player.anim = 'heal';
    }
    */
/*
    if (player.y < 220) {
      console.log('inf 100');
      player.setVelocityY(100)
      var top = true;
    }
    */

// console.log(player.y);
/*
    if (player.y > 400) {
      console.log('40000000');
      player.setVelocityY(0);
    }

    if (player.y < 220) {
      console.log('inf 100');
      player.setVelocityY(500)
      var top = true;
    }
    if (input.space) {
      const base = player.y;
      console.log(base);
      player.setVelocityY(-500)
      var top = true;

    }

        console.log(top);
    if (player.y > 420 && top) {
      console.log('inf 100');
      player.setVelocityY(-100)
      player.setDrag(100)
      // var top = true;
    }
    */


    players[player.playerId].vx = player.body.velocity.x;
    players[player.playerId].vy = player.body.velocity.y;
    players[player.playerId].x = player.x;
    players[player.playerId].y = player.y;
    players[player.playerId].scale = player.scale;
    players[player.playerId].flipX = player.flipX;
    players[player.playerId].anim = player.anim;
    players[player.playerId].depth = player.depth;
    players[player.playerId].size = player.size;
    players[player.playerId].alpha = player.alpha;
    players[player.playerId].attack = player.attack;
    players[player.playerId].eKey = player.eKey;
    //zone.x zone.y
  });
  //envoi mise à jour de tout les players
  io.volatile.emit('playerUpdates', players/*zone*/);
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
  const player = self.physics.add.sprite(playerInfo.x, playerInfo.y, 'profil').setOrigin(0.5).setScale(0.38).setSize(220).setVelocityY(100);
  const zone = self.add.zone(playerInfo.x, playerInfo.y - 250).setSize(150, 40);
  player.playerId = playerInfo.playerId;
  player.alpha = playerInfo.alpha;
  self.players.add(player);
  self.physics.world.enable(zone);
  zone.body.allowGravity = false;
  zone.body.immovable = true;
  // zone.body.setVelocityX(0);
  zone.depth = 30;

}

function removePlayer(self, playerId) {
  self.players.getChildren().forEach((player) => {
    if (playerId === player.playerId) player.destroy()
  });
}

const game = new Phaser.Game(config);
window.gameLoaded();
