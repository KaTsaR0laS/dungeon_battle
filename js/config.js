var config = {
    type: Phaser.AUTO,
    parent: 'content',
    zoom: 2,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false // set to true to view zones
        }
    },
    scene: [    
        main_menu,
        scene2
    ]
};

var game = new Phaser.Game(config);