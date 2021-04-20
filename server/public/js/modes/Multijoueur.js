/**
 * Jeu en ligne
 * Identifiant de la class Multijoueur
 * @type {String}
 */

export default class Multijoueur extends Phaser.Scene {
  constructor() {
    super({
      key: "Multijoueur"
    });
  }

  init(data) {
    this.personnage = data.personnage
    this.liste = ['dessinatrice2', 'dessinatrice2', 'dessinatrice3', 'dessinatrice4'];
    console.log(this.personnage);
  }

  preload() {
    this.liste.forEach((item, i) => {
      // this.load.image(item, 'assets/selection/' + item + '.png');
    this.load.atlas(item, 'assets/personnages/'+item+'/'+item+'.png', 'assets/personnages/'+item+'/'+item+'_atlas.json');

    // this.load.atlas('atlas2', `assets/personnages/${this.personnage}/${this.personnage}.png`, `assets/personnages/${this.personnage}/${this.personnage}_atlas.json`);
    });
    this.load.image('bg', 'assets/fond/bgGrand.png');

  }

  /**
   * Affiche texte menu
   * @return {String} [description]
   */

 create() {

     var self = this;

       this.anims.create({
       key: "attack1",
       frames: this.anims.generateFrameNumbers('dessinatrice2', {frames: ['profil2','position_a1','position_a2','position_a3','profil2']}),
       frameRate: 6,
       repeat: 0
     });

     this.anims.create({
       key: "goback",
       frames: this.anims.generateFrameNumbers('dessinatrice2', {frames: ['dos5','dos7.8','dos8','dos9','dos10','dos11','dos3']}),
       frameRate: 7,
       repeat: 0
     });

       this.anims.create({
       key: "front",
       frames: this.anims.generateFrameNumbers('dessinatrice2', {frames: ['face5','face2','face3','face4','face1']}),
       frameRate: 6,
       repeat: 0
     });

       this.anims.create({
       key: "walk",
       frames: this.anims.generateFrameNumbers('dessinatrice2', {frames: ['profil_jkd15','profil_jkd14','profil_jkd13','profil_jkd14','profil_jkd8']}),
       frameRate: 5,
       repeat: 0
     });

     this.add.image(-300, 390, 'bg').setDepth(-54);
/**
 * Envoi dès la connexion un entete avec le nom de l'atlas à charger pour Definir atlas
 * @type {string}
 */
     this.socket = io({ extraHeaders: { "atlas": this.personnage }});
     // this.socket.atlas = this.personnage;
     // console.log(this.socket.atlas);
     this.players = this.add.group();

     this.socket.on('currentPlayers', function(players) {
       Object.keys(players).forEach(function(id) {
         if (players[id].playerId === self.socket.id) {
           // console.log(players[id].atlas);
           // console.log(self.socket.atlas);
            self.displayPlayers(self, players[id], self.personnage, 'profil2');
         } else {
           self.displayPlayers(self, players[id], players[id].atlas,'profil2');
         }
           // FIXME: meme skin pour touts les joueurs
       });
     });

     this.socket.on('newPlayer', function(playerInfo) {
       console.log(playerInfo.atlas);
       // console.log(atlas);
       // self.displayPlayers(self, playerInfo, 'dessinatrice2','profil2');
       // console.log(self.personnage);
       // console.log(playerInfo.frame.texture.key);
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
             player.setDepth(players[id].depth);
             // self.cameras.main.scrollX = players[id].x - 400;
              // self.cameras.main.scrollY = players[id].y- 300;
             // self.cameras.main.scrollX = this.cameraTargetSprite.x - 400;
// self.cameras.main.scrollY = this.cameraTargetSprite.y - 300;
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

displayPlayers(self, playerInfo, atlas, nom) {
     self.player = self.physics.add.sprite(playerInfo.x, playerInfo.y, atlas, nom).setScale(0.38).setOrigin(0.5, 0.5)/*.setDisplaySize(10,10)*//*.setOrigin(0.5, 0.5).setBounce(0.2).setCollideWorldBounds(true)*/ ;
     self.player.playerId = playerInfo.playerId;
     self.players.add(self.player);
   }
}
