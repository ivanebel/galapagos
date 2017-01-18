cc.Class({
    extends: cc.Component,

    properties: {
        audioManager: cc.Node
    },

    // use this for initialization
    onLoad: function () {
        this.audioManager = this.audioManager.getComponent('audioManager');
        this.audioManager.playMusic();
    },

    /** 
    playGame: function () {
        cc.director.loadScene('galapagos');
    },
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {

    },
*/
});

