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
    this.liste = ['dessinatrice1', 'dessinatrice2', 'dessinatrice3', 'dessinatrice4'];
  }

  /**
   * Charge toute les images selon les valeurs du tableau this.liste
   * @return {void} [description]
   */

  preload() {
    this.liste.forEach((item, i) => {
      this.load.atlas(item, 'assets/personnages/' + item + '/' + item + '.png', 'assets/personnages/' + item + '/' + item + '_atlas.json');
    });
    this.load.image('bg', 'assets/fond/bgGrand.png');
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
    this.anims.create({
      key: "attack1_dessinatrice1",
      frames: this.anims.generateFrameNumbers('dessinatrice1', {
        frames: ['profil2', 'position_a1', 'position_a2', 'position_a3', 'profil2']
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
      key: "attack1_dessinatrice2",
      frames: this.anims.generateFrameNumbers('dessinatrice2', {
        frames: ['profil2', 'position_a1', 'position_a2', 'position_a3', 'profil2']
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
        frames: ['profil2', 'position_a1', 'position_a2', 'position_a3', 'profil2']
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
        frames: ['profil2', 'position_a1', 'position_a2', 'position_a3', 'profil2']
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
    this.add.image(-300, 350, 'bg').setDepth(-54);

    /**
     * CONNEXION
     * Démarre connexion socket
     * Envoi dès la connexion un entete avec le nom de l'atlas à charger pour Definir atlas
     * texture inutile
     * @type {string}
     */
    this.socket = io({
      extraHeaders: {
        "atlas": this.personnage,
        "texture": this.texture
      }
    });
    this.players = this.add.group();

    /**
     * JOUEUR PRINCIPAL
     * Affiche le joueur principal et les autres joueurs
     * @param  {Object} players liste de l'id du socket de tout les joueurs
     * @return {void}
     */
    this.socket.on('currentPlayers', function(players) {
      Object.keys(players).forEach(function(id) {
        if (players[id].playerId === self.socket.id) {
          self.displayPlayers(self, players[id]);
        } else {
          self.displayPlayers(self, players[id]);
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
     *
     * // TODO: mouvement camera
     */

    this.socket.on('playerUpdates', function(players) {
      Object.keys(players).forEach(function(id) {
        self.players.getChildren().forEach(function(player) {
          if (players[id].playerId === player.playerId) {
            player.flipX = (players[id].flipX);
            player.setScale(players[id].scale);
            player.setPosition(players[id].x, players[id].y);
            player.setDepth(players[id].depth);
            // self.cameras.main.scrollX = players[id].x - 400;
            // self.cameras.main.scrollY = players[id].y- 300;
            // self.cameras.main.scrollX = this.cameraTargetSprite.x - 400;
            // self.cameras.main.scrollY = this.cameraTargetSprite.y - 300;
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
    this.cursors = this.input.keyboard.createCursorKeys();
    this.leftKeyPressed = false;
    this.rightKeyPressed = false;
    this.upKeyPressed = false;
    this.downKeyPressed = false;
    this.aKey = false;

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
      ak = this.aKey;

    this.cursors.left.isDown ? this.leftKeyPressed = true :
      this.cursors.right.isDown ? this.rightKeyPressed = true :
      (this.leftKeyPressed = false, this.rightKeyPressed = false)

    this.cursors.up.isDown ? this.upKeyPressed = true :
      this.cursors.down.isDown ? this.downKeyPressed = true :
      (this.upKeyPressed = false, this.downKeyPressed = false)

    this.aKeyPressed.isDown ? this.aKey = true : this.aKey = false

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
  /**
   * Affiche en permanence le joueur selon ses parametres
   * @param  {Object} self parametres class Multijoueur
   * @param  {Object} playerInfo liste des parametres du joueur (scale,depth,x,y ...)
   * @return {void}
   */
  displayPlayers(self, playerInfo) {
    self.player = self.physics.add.sprite(playerInfo.x, playerInfo.y, playerInfo.atlas, 'face1').setOrigin(0.5, 0.5).setDisplaySize(200, 200);
    self.player.playerId = playerInfo.playerId;
    self.players.add(self.player);
  }
}
