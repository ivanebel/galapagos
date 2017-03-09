cc.Class({
    extends: cc.Component,

    properties: {
        
        frameLayer: {
            default: null,
            type: cc.Node
        },

        prizeLayer: {
            default: null,
            type: cc.Node
        },

        baseFrame: {
            default: null,
            type: cc.Prefab
        },

        _manager: null
    },

    // use this for initialization
    onLoad: function () {

    },

    init: function ( gManager ) 
    {
        this._manager = gManager;
    },

    drawFrame: function ( anAnimal ) 
    {
        var aFrame = cc.instantiate( this.baseFrame );

        aFrame = aFrame.getComponent('animalFrame');

        aFrame.node.parent = this.frameLayer;
        aFrame.node.name = 'Frame';

        aFrame.node.setPosition( 0, 50 );
        //aFrame.node.opacity = 0;

        aFrame.init(this._manager);

        aFrame.setAnimal(anAnimal);
/**
        this.node.runAction(
            cc.sequence(
                cc.delayTime(0.5),
                cc.callFunc( function() {aFrame.playAnimation();}, this ),
                cc.delayTime(2),
                cc.callFunc( function() {aFrame.stopAnimation();}, this )
            )
        );
*/
        aFrame.playAnimation();

    }


});
