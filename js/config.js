var config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 1000,
    height: 1000,
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    zoom: 1,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true // set to true to view zones
        }
    },
    scene: [    
        Main_menu,
        BootScene,
        WorldScene,
        BattleScene
    ]
};

var game = new Phaser.Game(config);