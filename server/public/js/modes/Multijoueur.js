/**
 * @package Steam-Fighter
 * @copyright 2021 TeamBui
 * @author timothee.hennequin@epitech.eu
 * Identifiant de la class Multijoueur
 * @type {String}
 */

export default class Multijoueur extends Phaser.Scene {
  constructor() {
    super({
      key: "Multijoueur"
    });
  }

  /**
   * Recupere la nom de la clé du joueur cliqué lors de la selection et supprime le "_"
   * pour éviter les erreurs de meme noms d'images
   * @param  {string} data clé/frame de l'image
   * @return {void}
   */

  init(data) {
    this.personnage = data.personnage.slice(0, -1);
    this.liste = ['dessinatrice1', 'dessinatrice2', 'dessinatrice3', 'dessinatrice4', 'naruto'];
  }

  /**
   * Affiche bar de progression pendant le charchement des images selon valeurs du tableau this.liste
   * @return {[type]} [description]
   */

  preload() {
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
    this.load.spritesheet('bird', 'assets/personnages/bird/bird.png', {
      frameWidth: 240,
      frameHeight:320
    })

  }

  /**
   * charge animation + images
   * démarre connection socket
   * écoute les evénement du serveur
   * @return {void}
   * // OPTIMIZE: Chargement des animation
   */
  create() {


    var self = this;
    console.log(self.scene.scene.physics.scene);

    this.cameras.main.setBounds(-2074, 0, 3574, 666);
    this.physics.world.setBounds(-2074, 0, 3574, 666);
    this.cameras.main.fadeIn(4000);

    this.anims.create({
    key: 'fly',
    frames: this.anims.generateFrameNumbers('bird', { frames: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] }),
    frameRate: 37,
    yoyo: true,
    repeat: -1
    });


    this.anims.create({
      key: "attack1_dessinatrice1",
      frames: this.anims.generateFrameNumbers('dessinatrice1', {
        frames: ['profil', 'position_a1', 'position_a2', 'position_a3', 'profil']
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
        frames: ['profil_jkd15', 'profil_jkd14', 'profil_jkd13', 'profil_jkd14', 'profil_jkd8']
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
    this.anims.create({
      key: "attack1_dessinatrice2",
      frames: this.anims.generateFrameNumbers('dessinatrice2', {
        frames: ['profil', 'position_a1', 'position_a2', 'position_a3', 'profil']
      }),
      frameRate: 6,
      repeat: 0
    });

    this.anims.create({
      key: "goback_dessinatrice2",
      frames: this.anims.generateFrameNumbers('dessinatrice2', {
        frames: ['dos5', 'dos7.8', 'dos8', 'dos9', 'dos10', 'dos11', 'dos3']
      }),
      frameRate: 7,
      repeat: 0
    });

    this.anims.create({
      key: "front_dessinatrice2",
      frames: this.anims.generateFrameNumbers('dessinatrice2', {
        frames: ['face5', 'face2', 'face3', 'face4', 'face1']
      }),
      frameRate: 6,
      repeat: 0
    });
    this.anims.create({
      key: "walk_dessinatrice2",
      frames: this.anims.generateFrameNumbers('dessinatrice2', {
        frames: ['profil_jkd15', 'profil_jkd14', 'profil_jkd13', 'profil_jkd14', 'profil_jkd8']
      }),
      frameRate: 5,
      repeat: 0
    });
    this.anims.create({
      key: "attack1_dessinatrice3",
      frames: this.anims.generateFrameNumbers('dessinatrice3', {
        frames: ['profil', 'position_a1', 'position_a2', 'position_a3', 'profil']
      }),
      frameRate: 6,
      repeat: 0
    });

    this.anims.create({
      key: "goback_dessinatrice3",
      frames: this.anims.generateFrameNumbers('dessinatrice3', {
        frames: ['dos5', 'dos7.8', 'dos8', 'dos9', 'dos10', 'dos11', 'dos3']
      }),
      frameRate: 7,
      repeat: 0
    });

    this.anims.create({
      key: "front_dessinatrice3",
      frames: this.anims.generateFrameNumbers('dessinatrice3', {
        frames: ['face5', 'face2', 'face3', 'face4', 'face1']
      }),
      frameRate: 6,
      repeat: 0
    });
    this.anims.create({
      key: "walk_dessinatrice3",
      frames: this.anims.generateFrameNumbers('dessinatrice3', {
        frames: ['profil_jkd15', 'profil_jkd14', 'profil_jkd13', 'profil_jkd14', 'profil_jkd8']
      }),
      frameRate: 5,
      repeat: 0
    });
    this.anims.create({
      key: "attack1_dessinatrice4",
      frames: this.anims.generateFrameNumbers('dessinatrice4', {
        frames: ['profil', 'position_a1', 'position_a2', 'position_a3', 'profil']
      }),
      frameRate: 6,
      repeat: 0
    });

    this.anims.create({
      key: "goback_dessinatrice4",
      frames: this.anims.generateFrameNumbers('dessinatrice4', {
        frames: ['dos5', 'dos7.8', 'dos8', 'dos9', 'dos10', 'dos11', 'dos3']
      }),
      frameRate: 7,
      repeat: 0
    });

    this.anims.create({
      key: "front_dessinatrice4",
      frames: this.anims.generateFrameNumbers('dessinatrice4', {
        frames: ['face5', 'face2', 'face3', 'face4', 'face1']
      }),
      frameRate: 6,
      repeat: 0
    });
    this.anims.create({
      key: "walk_dessinatrice4",
      frames: this.anims.generateFrameNumbers('dessinatrice4', {
        frames: ['profil_jkd15', 'profil_jkd14', 'profil_jkd13', 'profil_jkd14', 'profil_jkd8']
      }),
      frameRate: 5,
      repeat: 0
    });


    /**
     * CONNEXION
     * Démarre connexion socket
     * Envoi dès la connexion un entete avec le nom de l'atlas à charger pour Definir atlas
     * @type {string}
     */
    this.socket = io({
      extraHeaders: {
        "atlas": this.personnage
      }
    });

    this.players = this.add.group();

    this.add.image(-300, 350, 'bg').setDepth(-54);
    this.doors = this.physics.add.image(-300, 280, 'doors').setDepth(-20);
    this.doors.body.allowGravity = false;
    this.doors.body.immovable = true;

    /**
     * JOUEUR PRINCIPAL
     * Affiche le joueur principal et les autres joueurs
     * @param  {Object} players liste de l'id du socket de tout les joueurs
     * @return {void}
     */
    this.socket.on('currentPlayers', function(players) {
      Object.keys(players).forEach(function(id) {
        if (players[id].playerId === self.socket.id) {
          self.displayPlayers(self, players[id], true);
        } else {
          self.displayPlayers(self, players[id], false);
        }
      });
    });

    /**
     * NOUVEAU JOUEUR
     * Affiche les nouveau joueur
     * @param  {Object} playerInfo liste des parametres(coordonnés,scale,depth...)
     * @return {void}
     */

    this.socket.on('newPlayer', function(playerInfo) {
      self.displayPlayers(self, playerInfo);
    });

    /**
     * DÉCONNEXION
     * Cherche l'id de la personne déconnecté et supprime le joueur
     * @param  {string} playerId id du joueur (ou l'id du socket)
     * @return {[type]}          [description]
     */

    this.socket.on('disconnection', function(playerId) {
      self.players.getChildren().forEach(function(player) {
        if (playerId === player.playerId) player.destroy();
      });
    });

    /**
     * MISE À JOUR DU JOUEUR
     * Cherche l'id du joueur et Modifie les parametres de celui ci
     * @param  {Object} players liste de l'id du socket de tout les joueurs
     * @return {void}
     */

    this.socket.on('playerUpdates', function(players) {
      self.physics.accelerateToObject(self.bird, self.player, 200, 200, 1000);
      Object.keys(players).forEach(function(id) {
        self.players.getChildren().forEach(function(player) {
          if (players[id].playerId === player.playerId) {

            self.bird.scale = players[id].scale + 0.4;
            self.bird.depth = players[id].depth;
            // console.log(player.flipX);
            self.bird.flipX = !players[id].flipX;
            player.flipX = (players[id].flipX);
            player.setScale(players[id].scale);
            // player.setPosition(players[id].x, players[id].y);
            player.setDepth(players[id].depth);
            player.setAlpha(players[id].alpha);
            player.setVelocityX(players[id].vx);
            self.zone.body.velocity.x = players[id].vx;

            if (players[id].anim && players[id].anim !== false) {
              // self.bird.play('fly');
              player.play('' + players[id].anim + '_' + players[id].atlas + '', 5);
            }
          }
        });
      });
    });

    /**
     * ---------Définis la valeur par défault des touches------
     * par default :false (touche non appuyé)
     * @type {Object} état de la touche (pressé ou non)
     */

    this.aKeyPressed = this.input.keyboard.addKey('A');
    this.tKeyPressed = this.input.keyboard.addKey('T');
    this.cursors = this.input.keyboard.createCursorKeys();
    this.leftKeyPressed = false;
    this.rightKeyPressed = false;
    this.upKeyPressed = false;
    this.downKeyPressed = false;
    this.spaceKeyPressed = false;
    this.aKey = false;
    this.tKey = false;


  }

  /**
   * Verifie l'état des touches et envoie au server si c'est true
   * @return {boolean} valeur des touches (true | false)
   */


  update() {
    const left = this.leftKeyPressed,
      right = this.rightKeyPressed,
      up = this.upKeyPressed,
      down = this.downKeyPressed,
      space = this.spaceKeyPressed,
      ak = this.aKey,
      tk = this.tKey;

    this.cursors.left.isDown ? this.leftKeyPressed = true :
      this.cursors.right.isDown ? this.rightKeyPressed = true :
      (this.leftKeyPressed = false, this.rightKeyPressed = false)

    this.cursors.up.isDown ? this.upKeyPressed = true :
      this.cursors.down.isDown ? this.downKeyPressed = true :
      (this.upKeyPressed = false, this.downKeyPressed = false)

    this.aKeyPressed.isDown ? this.aKey = true : this.aKey = false
    this.tKeyPressed.isDown ? this.tKey = true : this.tKey = false

    this.cursors.space.isDown ? this.spaceKeyPressed = true : this.spaceKeyPressed = false


    if (left !== this.leftKeyPressed ||
      right !== this.rightKeyPressed ||
      up !== this.upKeyPressed ||
      down !== this.downKeyPressed ||
      ak !== this.aKey ||
      tk !== this.tKey ||
      space !== this.spaceKeyPressed) {
      this.socket.emit('playerInput', {
        left: this.leftKeyPressed,
        right: this.rightKeyPressed,
        up: this.upKeyPressed,
        down: this.downKeyPressed,
        a: this.aKey,
        t: this.tKey,
        space: this.spaceKeyPressed,
      });
    }
  }
  /**
   * Affiche le(s) nouveau(x) joueur(s) et definit ses parametres
   * @param  {Object} self parametres class Multijoueur
   * @param  {Object} playerInfo liste des parametres du joueur (scale,depth,x,y ...)
   * @param  {Boolean} iscurrent true: camera suit le joueur actuel , false: ne suit pas
   * @return {void}
   */
  displayPlayers(self, playerInfo, iscurrent) {
    self.player = self.physics.add.sprite(playerInfo.x, playerInfo.y, playerInfo.atlas, 'face1').setOrigin(0.5, 0.5).setDisplaySize(300, 300).setSize(400);

    self.bird = this.physics.add.sprite(playerInfo.x, playerInfo.y, 'bird').setDepth(1).setDragX(900);
    // self.bird.play('fly');
    self.bird.body.allowGravity = false;
    self.bird.play('fly');
    self.player.playerId = playerInfo.playerId;
    self.players.add(self.player);
    if (iscurrent) {
      self.cameras.main.startFollow(self.player);
      self.player.body.allowGravity = true;
      self.physics.add.overlap(self.player, self.doors, function(player, doors) {
        player.y < 399 ? doors.alpha = 0.5 : doors.alpha = 1
      });
      self.zone = this.add.zone(playerInfo.x, playerInfo.y +210).setSize(150, 40).setOrigin(0.5, 0.5);

      self.physics.add.existing(self.zone);
      self.zone.body.friction.x = 0;
      self.zone.body.allowGravity = false;
      self.zone.body.immovable = true;
      self.zone.depth = 30;
        // self.zone.body.move = false;
      // self.players.add(self.player);
      self.physics.add.collider(self.player, self.zone);

      var keyObj = self.input.keyboard.addKey('SPACE');  // Get key object
      keyObj.on('down', function(event) { self.player.setVelocityY(-400); });

      var keyObj2 = self.input.keyboard.addKey('UP');  // Get key object
      keyObj2.on('down', function(event) {
        // if (keyObj.isDown) {
        self.zone.body.velocity.y = -300;
        self.player.body.velocity.y = 0;
        self.player.body.allowGravity = false;
      // }
    });

      keyObj2.on('up', function(event) {
        // if (keyObj.isDown) {
        self.zone.body.velocity.y = 0;
        self.player.body.velocity.y = 0;
        self.player.body.allowGravity = true;

      // }
    });

    var keyObj3 = self.input.keyboard.addKey('DOWN');  // Get key object
      keyObj3.on('down', function(event) {
        // if (keyObj.isDown) {
        self.zone.body.velocity.y = 300;
      // }
    });

      keyObj3.on('up', function(event) {
        // if (keyObj.isDown) {
        self.zone.body.velocity.y = 0;
      // }
    });





      /*
            var keyObj = self.input.keyboard.addKey('SPACE');  // Get key object
            keyObj.on('down', function(event) { self.player.setVelocityY(800); });
            var zone = this.add.zone(playerInfo.x, playerInfo.y - 300).setSize(150, 40);
            self.physics.world.enable(zone);
            // zone.body.allowGravity = false;
            zone.body.setVelocityX(0);
            zone.depth = 30;
            self.physics.add.overlap(zone, self.player, function (z,p) {
              console.log(p.y);
              if (p.y < 300) {
              p.setVelocityY(-100);
            } else {
              // p.setVelocityY(100);
            }
              // console.log(z);
            });
            */
    }
  }
}
