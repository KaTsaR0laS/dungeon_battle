var scene2 = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function scene2 ()
    {
        Phaser.Scene.call(this, { key: 'scene2' });
    },

    preload ()
    {
        // load resources
        this.load.image('sky', 'images/sky.png');

        // map tiles
        this.load.image('tiles', 'maps/rogueliketiles.png');

        // map in json format
        this.load.tilemapTiledJSON('map', 'maps/dungeon.json');
    },

    create ()
    {
        // create the map
        var map = this.make.tilemap({ key: 'map' });
                
        // first parameter is the name of the tilemap in tiled
        var tiles = map.addTilesetImage('rogueliketiles', 'tiles');
        
        // creating the layers
        var obstacles = map.createStaticLayer('obstacles', tiles, 0, 0);
        var dungeon_tiles = map.createStaticLayer('dungeon_tiles', tiles, 0, 0);
        
        // make all tiles in obstacles collidable
        dungeon_tiles.setCollisionByExclusion([-1]);
    },

    update ()
    {

    }
});


