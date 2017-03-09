cc.Class({
    extends: cc.Component,

    properties: {

        audio_appear: {
            default: null,
            url: cc.AudioClip
        },

        active: true,

        _gameManager: null,
        _animal: cc.Node
    },

    // use this for initialization
    onLoad: function () {

    },

    init: function ( gameManager ) {
        this._manager = gameManager;
        this._animal = this.node.getChildByName('animal');
        
        var self = this;

        //this.node.on( cc.Node.EventType.TOUCH_END, function(event) { self.doTouch(); } );
        
    },

    setAnimal: function ( spriteAnimal )
    {
        this.node.getChildByName('animal').getComponent(cc.Sprite).spriteFrame = spriteAnimal;
        cc.log("Setting animal: " + spriteAnimal);
    },

    playAnimation: function()
    {
        cc.log("playing animation");
        this.getComponent(cc.Animation).play('festejo_frame_anim');
    },

    stopAnimation: function()
    {
         //this.getComponent(cc.Animation).stop('festejo_frame_anim');
         this.active = false;
    }


});
