var Main_menu = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function Main_menu()
    {
        Phaser.Scene.call(this, { key: 'Main_menu' });
    },

    preload: function()
    {
        // load resources
        this.load.image('game_background', 'images/dark_background.png');
        this.load.image('play_button', 'images/play_button.png');
        this.load.image('play_button_pressed', 'images/play_button_pressed.png');
        this.load.image('orc1', 'images/orc1.png');
        this.load.image('orc2', 'images/orc2.png');
        this.load.audio('menu_music', 'music/menu.mp3');
        this.load.audio('fight_music', 'music/fight.wav');
    },

    create: function()
    {
        // add images
        var background = this.add.image(500, 270, 'game_background');
        var button_1 = this.add.image(100, 70, 'play_button').setInteractive();
        music = this.sound.add('menu_music');
        
        // add music
        //  music.play();

        // button function
        button_1.on('pointerdown', function (onImageClick) 
        {
            button_1 = this.add.image(100, 70, 'play_button_pressed');
            this.scene.start('BootScene');   
            music.stop();
        }, this);
    },
    
    update: function()
    {
        
    },
});


