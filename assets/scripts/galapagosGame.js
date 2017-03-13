cc.Class({
    extends: cc.Component,

    properties: {
    
    audio_Music: {
            default: null,
            url: cc.AudioClip
        },

    _tiles: cc.Node,
    _gameControl: null
    },

    // use this for initialization
    onLoad: function () {

    },

    init: function ( aGameControl ) 
    {
        this._gameControl = aGameControl;
        
        cc.audioEngine.stopMusic();
        cc.audioEngine.playMusic(this.audio_Music, true);
   
        //obtengo las referencias desde la escena cargada
        this._tiles = cc.find('Galapagos/gameLayer').getComponent('tiles');
        
        this._tiles.init( this._gameControl );

        //this._tiles.reset();
        
        var tilesGridAnim = this.node.getChildByName('gameLayer').getChildByName('tiles_grid').getComponent(cc.Animation);
        var tilesGridOverlayAnim = this.node.getChildByName('bgLayer').getComponent(cc.Animation);

//        var tilesGridAnim = cc.find('Galapagos/gameLayer/tiles_grid').getComponent('cc.Animation');
//        var tilesGridOverlayAnim = cc.find('Galapagos/bgLayer').getComponent('cc.Animation');

        this.node.runAction(
            cc.sequence(
                cc.callFunc( function() { tilesGridAnim.play('tiles_grid_anim'); }, this ),
                cc.delayTime(1), 
                cc.callFunc( function() { tilesGridOverlayAnim.play('tiles_grid_overlay_anim'); }, this )
            )
        );

        this._tiles.drawTiles();

        var tiles = this._tiles._tilesArray;

        this.node.runAction(
            cc.sequence(
                cc.delayTime(1),
                cc.callFunc( function() {tiles[0].getComponent(cc.Animation).play('tile_appear');}, this ), cc.delayTime(0.1),

                cc.callFunc( function() {tiles[1].getComponent(cc.Animation).play('tile_appear'); 
                                         tiles[5].getComponent(cc.Animation).play('tile_appear');}, this ), cc.delayTime(0.1),

                cc.callFunc( function() {tiles[2].getComponent(cc.Animation).play('tile_appear'); 
                                         tiles[6].getComponent(cc.Animation).play('tile_appear'); 
                                         tiles[10].getComponent(cc.Animation).play('tile_appear');}, this ), cc.delayTime(0.1),

                cc.callFunc( function() {tiles[3].getComponent(cc.Animation).play('tile_appear'); 
                                         tiles[7].getComponent(cc.Animation).play('tile_appear'); 
                                         tiles[11].getComponent(cc.Animation).play('tile_appear'); 
                                         tiles[15].getComponent(cc.Animation).play('tile_appear');}, this ), cc.delayTime(0.1),

                cc.callFunc( function() {tiles[4].getComponent(cc.Animation).play('tile_appear'); 
                                         tiles[8].getComponent(cc.Animation).play('tile_appear');
                                         tiles[12].getComponent(cc.Animation).play('tile_appear'); 
                                         tiles[16].getComponent(cc.Animation).play('tile_appear'); 
                                         tiles[20].getComponent(cc.Animation).play('tile_appear');}, this ), cc.delayTime(0.1),

                cc.callFunc( function() {tiles[9].getComponent(cc.Animation).play('tile_appear'); 
                                         tiles[13].getComponent(cc.Animation).play('tile_appear'); 
                                         tiles[17].getComponent(cc.Animation).play('tile_appear'); 
                                         tiles[21].getComponent(cc.Animation).play('tile_appear'); 
                                         tiles[25].getComponent(cc.Animation).play('tile_appear');}, this ), cc.delayTime(0.1),

                cc.callFunc( function() {tiles[14].getComponent(cc.Animation).play('tile_appear'); 
                                         tiles[18].getComponent(cc.Animation).play('tile_appear'); 
                                         tiles[22].getComponent(cc.Animation).play('tile_appear'); 
                                         tiles[26].getComponent(cc.Animation).play('tile_appear');}, this ), cc.delayTime(0.1),

                cc.callFunc( function() {tiles[19].getComponent(cc.Animation).play('tile_appear'); 
                                         tiles[23].getComponent(cc.Animation).play('tile_appear'); 
                                         tiles[27].getComponent(cc.Animation).play('tile_appear');}, this ), cc.delayTime(0.1),

                cc.callFunc( function() {tiles[24].getComponent(cc.Animation).play('tile_appear'); 
                                         tiles[28].getComponent(cc.Animation).play('tile_appear');}, this ), cc.delayTime(0.1),

                cc.callFunc( function() {tiles[29].getComponent(cc.Animation).play('tile_appear');}, this ), cc.delayTime(0.1),
                    
            )
        );

    }

});
