var BattleScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function BattleScene()
    {
        Phaser.Scene.call(this, { key: "BattleScene" });
    },

    preload()
    {
        // characters
        this.load.spritesheet('warrior', 'images/RPG_assets.png', { frameWidth: 32, frameHeight: 32 });
        
        // enemies
        this.load.image("orc", "images/untitled.png");

        // health bars
        this.load.image('bullet', 'images/bullet.png');
        this.load.image('fireball_box', 'images/Fireball_box.png');
        this.load.image('fireball', 'images/fireball.png');
    },

    create()
    {       
        // add images
        var background = this.add.image(500, 270, 'game_background');
        this.startBattle();
        // on wake event we call startBattle too
        this.sys.events.on('wake', this.startBattle, this);    
    },

    startBattle() {
        // player character - warrior
        var warrior = new PlayerCharacter(this, 200, 170, "warrior", 1, "Warrior", 100, 20);       
        this.add.existing(warrior); 
        
        // enemy character - orc
        var orc = new EnemyCharacter(this, 600, 170, "orc", null, "Orc", 50, 3);  
        this.add.existing(orc);

        // rectange
        var health_full = this.add.rectangle(200, 100, 210, 30, 0x28B57B);
        var health_current = this.add.rectangle(200, 100, 200, 20, 0xBD3B3D);
        health_current.width = 200;
        
        // first skill
        var box1 = this.add.sprite(200, 300, 'fireball_box').setInteractive(); 
        box1.on('pointerdown', function () 
        {
            var bullet = new Bullet(this, 250, 170, "bullet");
            this.add.existing(bullet); 

            // fireball animation
            var tween = this.tweens.add({
            targets: bullet,
            x: 500,
            ease: 'Power1',
            duration: 500,
            delay: 10,    
            })
        }, this);

        // second skill
        var box2 = this.add.sprite(200, 400, 'fireball_box').setInteractive();
        box2.on('pointerdown', function () 
        {
            // var box2 = this.add.image(400, 300, 'fireball').setInteractive();
            var bullet = new Bullet(this, 250, 170, "bullet");
            this.add.existing(bullet); 
            // this.damage(health_current);
            this.warrior.damage(health_current);

            // fireball animation
            var tween = this.tweens.add({
            targets: bullet,
            x: 500,
            ease: 'Power1',
            duration: 500,
            delay: 10,    
            })
        }, this);
    },

    makeBar() 
    {

    },

    // damage(health_current)
    // {
    //     health_current.width = 150;
    // },

    // nextTurn: function() {  
    //     // if we have victory or game over
    //     if(this.checkEndBattle()) {           
    //         this.endBattle();
    //         return;
    //     }
    //     do {
    //         // currently active unit
    //         this.index++;
    //         // if there are no more units, we start again from the first one
    //         if(this.index >= this.units.length) {
    //             this.index = 0;
    //         }            
    //     } while(!this.units[this.index].living);
    //     // if its player hero
    //     if(this.units[this.index] instanceof PlayerCharacter) {
    //         // we need the player to select action and then enemy
    //         this.events.emit("PlayerSelect", this.index);
    //     } else { // else if its enemy unit
    //         // pick random living hero to be attacked
    //         var r;
    //         do {
    //             r = Math.floor(Math.random() * this.heroes.length);
    //         } while(!this.heroes[r].living) 
    //         // call the enemy's attack function 
    //         this.units[this.index].attack(this.heroes[r]);  
    //         // add timer for the next turn, so will have smooth gameplay
    //         this.time.addEvent({ delay: 2000, callback: this.nextTurn, callbackScope: this });
    //     }
    // },   

    // check for game over or victory
    // checkEndBattle: function() {        
    //     var victory = true;
    //     // if all enemies are dead we have victory
    //     for(var i = 0; i < this.enemies.length; i++) {
    //         if(this.enemies[i].living)
    //             victory = false;
    //     }
    //     var gameOver = true;
    //     // if all heroes are dead we have game over
    //     for(var i = 0; i < this.heroes.length; i++) {
    //         if(this.heroes[i].living)
    //             gameOver = false;
    //     }
    //     return victory || gameOver;
    // },

    // when the player have selected the enemy to be attacked
    // receivePlayerSelection: function(action, target) {
    //     if(action == "attack") {            
    //         this.units[this.index].attack(this.enemies[target]);              
    //     }
    //     // next turn in 3 seconds
    //     this.time.addEvent({ delay: 2000, callback: this.nextTurn, callbackScope: this });        
    // }, 

    // endBattle: function() {       
    //     // clear state, remove sprites
    //     this.heroes.length = 0;
    //     this.enemies.length = 0;
    //     for(var i = 0; i < this.units.length; i++) {
    //         // link item
    //         this.units[i].destroy();            
    //     }
    //     this.units.length = 0;
    //     // sleep the UI
    //     this.scene.sleep('UIScene');
    //     // return to WorldScene and sleep current BattleScene
    //     this.scene.switch('WorldScene');
    // },
});

// base class for heroes and enemies
var Unit = new Phaser.Class({
    Extends: Phaser.GameObjects.Sprite,

    initialize:

    function Unit(scene, x, y, texture, frame, type, hp) {
        Phaser.GameObjects.Sprite.call(this, scene, x, y, texture, frame)
        this.type = type;
        this.maxHp = this.hp = hp;    
        this.living = true;         
        this.menuItem = null;
    },

    damage(health_current)
    {   
        health_current.width = 150;
    }

    // attack the target unit
    // attack: function(target) {
    //     if(target.living) {
    //         target.takeDamage(this.damage);
    //     }
    // }, 

    // collide_attack: function (player, enemy) {

    //     player.immune = true;
    
    //     // Knocks back enemy after colliding
    //     enemy.follow = false;
    //     if(enemy.body.touching.left) {
    //         enemy.body.velocity.x = 256;
    //     } else if (enemy.body.touching.right) {
    //         enemy.body.velocity.x = -256;
    //     } else if (enemy.body.touching.up) {
    //         enemy.body.velocity.y = 256;	
    //     } else if (enemy.body.touching.down) {
    //         enemy.body.velocity.y = -256;
    //     }
    
    //     // Makes the player immune for 1 second and then resets it and the enemy following movement
    //     game.time.events.add(Phaser.Timer.SECOND * 0.5, function() {
    //         player.immune = false;
    //         enemy.follow = true;
    //     }, this);
    // }
});

var PlayerCharacter = new Phaser.Class({
    Extends: Phaser.GameObjects.Sprite,

    initialize:
    function PlayerCharacter(scene, x, y, texture, frame, type, hp) {
        Unit.call(this, scene, x, y, texture, frame, type, hp);
        // flip the image so I don"t have to edit it manually        
        this.setScale(3);
    },

    damage(health_current)
    {   
        health_current.width = 150;
    }


    // we will use this to notify the menu item when the unit is dead
    // setMenuItem: function(item) {
    //     this.menuItem = item;
    // },

    // attack the target unit
    // attack: function(target) {
    //     if(target.living) {
    //         target.takeDamage(this.damage);
    //     }
    // }, 

    // takeDamage: function(damage) {
    //     this.hp -= damage;
    //     if(this.hp <= 0) {
    //         this.hp = 0;
    //         this.menuItem.unitKilled();
    //         this.living = false;
    //         this.visible = false;   
    //         this.menuItem = null;
    //     }
    // }
});

var EnemyCharacter = new Phaser.Class({
    Extends: Phaser.GameObjects.Sprite,

    initialize:
    function EnemyCharacter(scene, x, y, texture, frame, type, hp) {
        Unit.call(this, scene, x, y, texture, frame, type, hp);
        // flip the image so I don"t have to edit it manually
        this.flipX = true;
    }

    // we will use this to notify the menu item when the unit is dead
    // setMenuItem: function(item) {
    //     this.menuItem = item;
    // },

    // attack the target unit
    // attack: function(target) {
    //     if(target.living) {
    //         target.takeDamage(this.damage);
    //     }
    // }, 

    // takeDamage: function(damage) {
    //     this.hp -= damage;
    //     if(this.hp <= 0) {
    //         this.hp = 0;
    //         this.menuItem.unitKilled();
    //         this.living = false;
    //         this.visible = false;   
    //         this.menuItem = null;
    //     }
    // }
});

var Bullet = new Phaser.Class({
    Extends: Phaser.GameObjects.Sprite,

    initialize:
    function Bullet(scene, x, y, texture) 
    {
        Phaser.GameObjects.Sprite.call(this, scene, x, y, texture);
        this.visible = true;
    },

    fire()
    {
       this.missile.setPosition(this.x + offset, this.y + 20).setVisible(true);

       this.scene.tweens.add({
            targets: this.missile,
            x: targetX,
            ease: 'Linear',
            duration: 500,
            onComplete: function (tween, targets) {
                targets[0].setVisible(false);
            }
        });

            // target.damage(Phaser.Math.Between(2, 8));

            // this.timer = this.scene.time.addEvent({ delay: Phaser.Math.Between(1000, 3000), callback: this.fire, callbackScope: this });
        }  
})





