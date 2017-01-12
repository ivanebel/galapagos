cc.Class({
    extends: cc.Component,

    properties: {
        
        /**
        row: 0,
        col: 0,
        content: null,
 
        audioTouch: cc.AudioClip,
        audioAnimal: cc.AudioClip,
        audioEmpty: cc.AudioClip,
*/
        tileTierra:
        {
            default: null,
            type: cc.SpriteFrame
        },

        _gameManager: null,

        _tilePrevContent: null,
        _tileContent: null,

        _virtualServer: null

    },

    // use this for initialization
    onLoad: function () {
        this.tileTierra = this.node.getComponent('tileTierra');
        //this._virtualServer = this.node.getComponent('virtualServer');
    },

    onButtonClick: function(event, customEventData) 
    {
        var pos = customEventData;

        //var content = this._virtualServer._fakeTicket[pos];

        cc.log(pos);
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },

    /**
     * 
     */
    init (gameManager) {
        this._gameManager = gameManager;
    },

    /**
     * 
     */
    doTouch () {
        if (this._gameManager._waitUserInput == true) {
            this._gameManager.userChoice(this);
        }
    },

    /**
     * 
     */
    showContent () {
        switch (this.content) {
            case 'T':
                this.scheduleOnce(this.isEmpty, 0.2);
                break;
            case 'A':
                this.scheduleOnce(this.isAnimal, 0.2);
                break;
        }
    },

    /**
     * 
     */
    isEmpty () {
        cc.audioEngine.playEffect(this.audioEmpty);
    },

    /**
     * 
     */
    isAnimal () {
        cc.audioEngine.playEffect(this.audioAnimal);
    }
});
