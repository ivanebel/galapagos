cc.Class({
    extends: cc.Component,

    properties: {

        backgroundLayer: {
            default: null,
            type: cc.Node
        },

        tileLayer: {
            default: null,
            type: cc.Node
        },

        prizeLayer: {
            default: null,
            type: cc.Node
        },

        baseTile: {
            default: null,
            type: cc.Prefab
        },

        tile_delta_x : 152,
        tile_delta_y: 152,

        _tilesArray: null,

        _manager: null
    },

    // use this for initialization
    onLoad: function () 
    {

    },

    init: function ( gManager ) 
    {
        this._manager = gManager;
        this._tilesArray = new Array();
    },

    //Para dibujar los bloques de la piramide de Afuera
    //Solo se dibujan... el contenido se obtiene en tiempo real
    drawTiles: function () {
        //limpio los boxes si habia...
        this.tileLayer.removeAllChildren();
        
        var bW = this.boxDX;
        var bH = this.boxDY;
        var ini = 57; //ultimo indice + 1 de la linea 10 de los de Golden Bee

        var initialX = -380;
        var initialY = 313;
        
        for (var iRow = 0; iRow < 6; iRow++){
                        
            for (var iCol = 0; iCol < 5; iCol++){    
                
                var aTile = cc.instantiate( this.baseTile );
                aTile = aTile.getComponent('tile');

                aTile.node.parent = this.tileLayer;
                aTile.node.name = 'Tile-' + iRow + '-' + iCol;
                aTile.row = iRow;
                aTile.col = iCol;
                aTile.content = null;

                var x = initialX + (this.tile_delta_x * iRow);
                var y = initialY - (this.tile_delta_y * iCol);

                aTile.mysticIndex = (iCol * 5 + iCol) + iRow;
                

                cc.log('x:' + x + ' y:' + y + ' MI: ' + aTile.mysticIndex);


                aTile.node.setPosition( x, y );

                aTile.node.opacity = 0;

                aTile.init(this._manager);
                aTile.setMysticIndex( aTile.mysticIndex );

                this._tilesArray.push( aTile );

                //this.node.runAction( cc.sequence( cc.callFunc( function() {aTile.getComponent(cc.Animation).play('tile_appear');}, this ), cc.delayTime(1) ) );
        
            }
        }
    },

    appearTiles: function()
    {

    }

    //Vuelve a la posición inicial la piramide


});
