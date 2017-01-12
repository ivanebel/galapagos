cc.Class({
    extends: cc.Component,

    properties: {
        bgm: {
            default: null,
            url: cc.AudioClip
        },

        clickAudio: {
            default: null,
            url: cc.AudioClip
        },

        sweepAudio: {
            default: null,
            url: cc.AudioClip
        } 
    },

    playMusic: function() {
        cc.audioEngine.playMusic( this.bgm, true );
    },

    _playSFX: function(clip) {
        cc.audioEngine.playEffect( clip, false );
    },

    playClick: function() {
        this._playSFX(this.clickAudio);
    },

    playSweep: function() {
        this._playSFX(this.sweepAudio);
    }

});