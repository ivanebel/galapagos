cc.Class({
    extends: cc.Component,

    properties: {
        audio_intro: cc.AudioClip
    },

    // use this for initialization
    onLoad: function () {
        
        cc.director.preloadScene('galapagos-main');
        cc.director.preloadScene('bonus');
        
        cc.audioEngine.playMusic(this.audio_intro);
        
        this.scheduleOnce(function() { cc.director.loadScene('galapagos-main'); } , 3);
        
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});