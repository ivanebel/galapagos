cc.Class({
    extends: cc.Component,

    properties: {
        titleBgm: {
            default: null,
            url: cc.AudioClip
        },
        
        bgm: {
            default: null,
            url: cc.AudioClip
        },

        bonusBgm: {
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

    playTitleBgm: function() {
        cc.audioEngine.playMusic(this.titleBgm, true);
    },

    playMusic: function() {
        cc.audioEngine.playMusic( this.bgm, true );
    },

    stopMusic: function() {
        cc.audioEngine.stopMusic();
    },

    playBonusBgm: function() {
        cc.audioEngine.playMusic( this.bonusBgm, true );
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