var gameControl = require("gameControl");

cc.Class({
    extends: cc.Component,

    properties: {

        audio_Music_Intro: {
            default: null,
            url: cc.AudioClip
        }
    },

    // use this for initialization
    onLoad: function () {

        if ( this.audio_Music_Intro != null )
        { 
            cc.audioEngine.playMusic( this.audio_Music_Intro );
        }
        
        var theUi = cc.find('uiLayer');
                
        //A game control lo iniciamos con el nodo persistente de la UI
        gameControl.init( theUi );
        
    }

});