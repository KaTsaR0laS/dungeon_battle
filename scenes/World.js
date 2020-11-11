var BootScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function BootScene ()
    {
        Phaser.Scene.call(this, { key: 'BootScene' });
    },

    preload: function ()
    {      
        // map tiles
        this.load.image('tiles', 'images/gamwicons.png');

        // map in json format
        this.load.tilemapTiledJSON('map', 'maps/gamemap.json');

        // player's avatar
        this.load.spritesheet('player_avatar', 'images/RPG_assets.png', { frameWidth: 32, frameHeight: 32 });
        
        // enemy's avatar
        this.load.image("enemy_avatar", "images/untitled.png");
    },

    create: function ()
    {
        // start the WorldScene
        this.scene.start('WorldScene');
    }
});

var WorldScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function WorldScene ()
    {
        Phaser.Scene.call(this, { key: 'WorldScene' });
    },

    preload: function ()
    {
        
    },

    create: function ()
    {
        // create the map
        var map = this.make.tilemap({ key: 'map' });
                
        // first parameter is the name of the tilemap in tiled
        var tiles = map.addTilesetImage('gametiles', 'tiles');
        
        // creating the layers
        var obstacles = map.createStaticLayer('obstacles', tiles, 0, 0);
        var background = map.createStaticLayer('background', tiles, 0, 0);
        
        // make all tiles in obstacles collidable
        background.setCollisionByExclusion([-1]);
           
        //  animation with key 'left', we don't need left and right as we will use one and flip the sprite
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player_avatar', { frames: [1, 7, 1, 13]}),
            frameRate: 10,
            repeat: -1
        });
        
        // animation with key 'right'
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player_avatar', { frames: [1, 7, 1, 13] }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('player_avatar', { frames: [2, 8, 2, 14]}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('player_avatar', { frames: [ 0, 6, 0, 12 ] }),
            frameRate: 10,
            repeat: -1
        });             
           
        // our player and enemy sprite created through the phycis system
        this.player_avatar = this.physics.add.sprite(10, 250, 'player_avatar', 6);
        this.enemy_avatar = this.physics.add.sprite(100, 250, 'enemy_avatar', 0).setImmovable();
        
        // don't go out of the map
        this.physics.world.bounds.width = map.widthInPixels;
        this.physics.world.bounds.height = map.heightInPixels;
        this.player_avatar.setCollideWorldBounds(true);
        this.enemy_avatar.setCollideWorldBounds(true);
        
        // don't walk on trees
        this.physics.add.collider(this.player_avatar, obstacles);
        // don't walk on enemy
        this.physics.add.collider(this.player_avatar, this.enemy_avatar, this.onMeetEnemy, false, this);

        // limit camera to map
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.player_avatar);
        this.cameras.main.roundPixels = true; // avoid tile bleed
    
        // user input
        this.cursors = this.input.keyboard.createCursorKeys();
    },

    onMeetEnemy: function(player_avatar, any) 
    {  
        // game.input.disabled = true;
        // start battle  
        this.scene.start('BattleScene'); 
    },

    update: function (time, delta)
    {
        // this.controls.update(delta);
        this.player_avatar.body.setVelocity(0);

        // Horizontal movement
        if (this.cursors.left.isDown)
        {
            this.player_avatar.body.setVelocityX(-200);
        }
        else if (this.cursors.right.isDown)
        {
            this.player_avatar.body.setVelocityX(200);
        }

        // Vertical movement
        if (this.cursors.up.isDown)
        {
            this.player_avatar.body.setVelocityY(-200);
        }
        else if (this.cursors.down.isDown)
        {
            this.player_avatar.body.setVelocityY(200);
        }        

        // Update the animation last and give left/right animations precedence over up/down animations
        if (this.cursors.left.isDown)
        {
            this.player_avatar.anims.play('left', true);
            this.player_avatar.flipX = true;
        }
        else if (this.cursors.right.isDown)
        {
            this.player_avatar.anims.play('right', true);
            this.player_avatar.flipX = false;
        }
        else if (this.cursors.up.isDown)
        {
            this.player_avatar.anims.play('up', true);
        }
        else if (this.cursors.down.isDown)
        {
            this.player_avatar.anims.play('down', true);
        }
        else
        {
            this.player_avatar.anims.stop();
        }
    }
});



