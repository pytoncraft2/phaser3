/**
 * @package Steam-Fighter
 * @copyright 2021 TeamBui
 * @author timothee.hennequin@epitech.eu
 * Identifiant de la class Multijoueur
 * @type {String}
 */
const SPINEBOY_KEY = 'spineboy'

export default class Multijoueur extends Phaser.Scene {
  animationNames = [];
  animationIndex = 0;
  constructor() {
    super({
      key: "Multijoueur",
      pack: {
        files: [{
          type: 'scenePlugin',
          key: 'SpinePlugin',
          url: 'SpinePlugin.min.js',
          sceneKey: 'spine'
        }]
      }
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

    this.load.setPath('assets/fond/')
    this.load.image('bg', 'bgGrand.png');
    this.load.image('doors', 'doors.png');
    this.load.image('bg2', 'bgMenu.png');

    this.load.setPath('assets/spine/images')
    this.load.spine('dessinatrice1spine', 'spineboy-pro.json', [ 'spineboy-pro.atlas' ], true);
    this.load.spine(SPINEBOY_KEY, 'spineboy-pro.json', 'spineboy-pro.atlas')
    // this.load.spine('dessinatrice1spine', 'skeleton.json', [ 'skeleton.atlas' ], true);
    // this.load.spine('dessinatrice1spine', 'skeleton1.json', [ 'skeleton1.atlas' ], true);

  }

  /**
   * charge animation + images
   * démarre connection socket
   * écoute les evénement du serveur
   * @return {void}
   * // OPTIMIZE: Chargement des animation
   */
  create() {
    // const spineDessinatrice = this.add.spine(1000, 647, 'dessinatrice1spine', 'death', true)
    var self = this;
    const startAnim = 'idle'

    this.spineBoy = this.createSpineBoy(startAnim)
    this.cursors = this.input.keyboard.createCursorKeys()

    this.initializeAnimationsState(this.spineBoy)
    // const spineDessinatrice2 = self.add.spine(1000, 647, 'dessinatrice2spine', 'idle', true)
    // spineDessinatrice.setScale(0.4);
    // var coin = this.add.spine(400, 200, 'coin', 'animation', true);

    //  Resize the Spine dimensions because the original skeleton includes the shine bone,
    //  rendering a simple bounds check useless. Not all Spine objects will require this, but this one does.
    // spineDessinatrice.setSize(280, 280);
    // this.physics.add.existing(spineDessinatrice2);
    // spineDessinatrice2.setScale(0.4)
    // spineDessinatrice2.body.allowGravity = false

  // this.physics.add.existing(spineDessinatrice);
    // spineDessinatrice.setScale(0.4)
    // spineDessinatrice.body.allowGravity = false
    // const spineBoy = self.add.spine(400, 600, 'boy', 'hoverboard', true)

    // const man = this.add.spine(512, 650, 'boy');
//
// const container = this.add.spineContainer();
//
// container.add(man);
    this.cameras.main.setBounds(-2074, 0, 3574, 666);
    this.physics.world.setBounds(-2074, 0, 3574, 666);
    this.cameras.main.fadeIn(4000);

    this.anims.create({
      key: "attack1_dessinatrice1",
      frames: this.anims.generateFrameNumbers('dessinatrice1', {
        frames: ['profil', 'position_a1', 'position_a2', 'position_a3', 'profil', 'pas_jkd']
      }),
      frameRate: 6,
      repeat: 0
    });

    this.anims.create({
      key: "run_dessinatrice1",
      frames: this.anims.generateFrameNumbers('dessinatrice1', {
        frames: ['pas_jkd', 'pas_jkd2', 'pas_jkd4']
      }),
      frameRate: 5,
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
        frames: ['jump0', 'jump1', 'jump1.1', 'jump2', 'jump3', 'jump4', 'jump5', 'jump5.1', 'jump0']
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
        frames: ['profil_jkd11', 'profil_jkd13', 'profil_jkd14', 'profil_jkd15', 'profil_jkd8']
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

    /**
     * ---------Définis la valeur par défault des touches------
     * par default :false (touche non appuyé)
     * @type {Object} état de la touche (pressé ou non)
     */

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

  createSpineBoy(startAnim = 'idle')
	{
		const spineBoy = this.add.spine(1000, 647, SPINEBOY_KEY, startAnim, true)
    var anims = spineBoy.getAnimationList();
    console.log(anims);

		spineBoy.scaleX = 0.5
		spineBoy.scaleY = 0.5

		return spineBoy
	}

  initializeAnimationsState(spineGO)
{
  const startAnim = spineGO.getCurrentAnimation().name

  spineGO.getAnimationList().forEach((name, idx) => {
    this.animationNames.push(name)
    if (name === startAnim)
    {
      this.animationIndex = idx
    }
  })
}

changeAnimation(index)
{
  const name = this.animationNames[index]
  this.spineBoy.play(name, true)
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

    const size = this.animationNames.length
    const startAnim = this.spineBoy.getCurrentAnimation().name

		if (this.cursors.right.isDown) {
      this.spineBoy.play('walk');
      console.log("____________");
      console.log(startAnim);
    }

		if (this.cursors.left.isDown) {
      this.spineBoy.play('walk');
      console.log("____________");
      console.log(startAnim);
    }

    if (this.cursors.space.isDown) {
      if (startAnim !== 'jump') {
      this.spineBoy.play('jump');
      this.spineBoy.on('complete', (spine) => {
      console.log('Loop Completed')
      this.spineBoy.play('idle');
      })
      }
      console.log("____________");
      console.log(startAnim);
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
    console.log(playerInfo.x);
    console.log(playerInfo.y);
    self.player = self.physics.add.sprite(playerInfo.x, playerInfo.y, playerInfo.atlas, 'face1').setOrigin(0.5, 0.5).setDisplaySize(200, 200).setSize(200);
    self.player.playerId = playerInfo.playerId;
    self.player.body.allowGravity = false
    self.players.add(self.player);


    if (iscurrent) {
      self.cameras.main.startFollow(self.player);
      self.player.setCollideWorldBounds(true);
      self.player.body.allowGravity = false
      self.physics.add.overlap(self.player, self.doors, function(player, doors) {
        player.y < 399 ? doors.alpha = 0.5 : doors.alpha = 1
      });
    }
  }
}
