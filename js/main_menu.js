var main_menu = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function main_menu ()
    {
        Phaser.Scene.call(this, { key: 'main_menu' });
    },

    preload: function()
    {
        // load resources
        this.load.image('logo_papei', 'images/logo_papei.png');
        this.load.image('sky', 'images/sky.png');
    },

    create: function()
    {
        var score = 0;  
        var image_papei = this.add.image(150, 50, 'logo_papei').setInteractive();
        image_papei.setPosition(200, 150);
        var scoreText = this.add.text(0, 0, 'score: 0', { fill: '#ffffff' });
        image_papei.on('pointerdown', function (onImageClick) 
        {
            this.scene.start('scene2');   
        }, this);
    },
    
    update: function()
    {
        
    },
});


