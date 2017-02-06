cc.Class({
    extends: cc.Component,

    properties: {
        _gameServer: null,

        layerObjects: cc.Node,
        audioManager: cc.Node,

        _serpientes_anim_idle: null,
        _serpientes_anim_state: null
    },

    // use this for initialization
    onLoad: function () {
        this._gameServer = this.node.getComponent('virtualServer');

        this.audioManager = this.audioManager.getComponent('audioManager');
        this.audioManager.playMusic();

        this._serpientes_anim_idle = cc.find('Bonus/gameLayer').getComponent(cc.Animation);
        this._serpientes_anim_state = this._serpientes_anim_idle.play('serpientes_idle');

        this._serpientes_anim_state.repeatCount = Infinity;

        var animLabel = cc.find('Bonus/uiLayer/lblRules').getComponent(cc.Animation);
        var animLabelState = animLabel.play('lblRules_glow');
        animLabelState.repeatCount = Infinity;

        var serpientes = cc.find('Bonus/lblSerpientes').getComponent(cc.Label).string = this._gameServer._fakeBonus.toString();

    },

    onButtonClick: function(event, customEventData)
    {
        this._serpientes_anim_idle.stop('serpientes_idle');

        switch(customEventData)
        {
            case "serpiente1":
                var anim = cc.find('Bonus/gameLayer/serpiente_1').getComponent(cc.Animation);
                var animState = anim.play('serpiente_1');
                break;
            case "serpiente2":
                var anim = cc.find('Bonus/gameLayer/serpiente_2').getComponent(cc.Animation);
                var animState = anim.play('serpiente_2');
                break;
            case "serpiente3":
                var anim = cc.find('Bonus/gameLayer/serpiente_3').getComponent(cc.Animation);
                var animState = anim.play('serpiente_3');
                break;
            case "serpiente4":
                var anim = cc.find('Bonus/gameLayer/serpiente_4').getComponent(cc.Animation);
                var animState = anim.play('serpiente_4');
                break;
            case "serpiente5":
                var anim = cc.find('Bonus/gameLayer/serpiente_5').getComponent(cc.Animation);
                var animState = anim.play('serpiente_5');
                break;
        }
    }

    /** 
    playGame: function () {
        cc.director.loadScene('galapagos');
    },
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {

    },
*/
});

