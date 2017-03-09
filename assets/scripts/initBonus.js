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

        var posiciones = this.shuffle();

        var serpientesInitAnim = cc.find('Bonus/gameLayer').getComponent(cc.Animation);
        serpientesInitAnim.play('serpientes_init');

        var pos = posiciones[0];
        cc.find('Bonus/gameLayer/serpientes/serpientes_selected/serpiente_1').setPosition(pos[0],pos[1]);
        cc.find('Bonus/gameLayer/serpientes/serpientes_post_idle/serpiente_1_anim').setPosition(pos[0],pos[1]);
        
        pos = posiciones[1];
        cc.find('Bonus/gameLayer/serpientes/serpientes_selected/serpiente_2').setPosition(pos[0],pos[1]);
        cc.find('Bonus/gameLayer/serpientes/serpientes_post_idle/serpiente_2_anim').setPosition(pos[0],pos[1]);
        
        pos = posiciones[2];
        cc.find('Bonus/gameLayer/serpientes/serpientes_selected/serpiente_3').setPosition(pos[0],pos[1]);
        cc.find('Bonus/gameLayer/serpientes/serpientes_post_idle/serpiente_3_anim').setPosition(pos[0],pos[1]);
        
        pos = posiciones[3];
        cc.find('Bonus/gameLayer/serpientes/serpientes_selected/serpiente_4').setPosition(pos[0],pos[1]);
        cc.find('Bonus/gameLayer/serpientes/serpientes_post_idle/serpiente_4_anim').setPosition(pos[0],pos[1]);
        
        pos = posiciones[4];
        cc.find('Bonus/gameLayer/serpientes/serpientes_selected/serpiente_5').setPosition(pos[0],pos[1]);
        cc.find('Bonus/gameLayer/serpientes/serpientes_post_idle/serpiente_5_anim').setPosition(pos[0],pos[1]);
        cc.find('Bonus/gameLayer/serpiente_ganadora_glow').setPosition(pos[0] + 25,pos[1]);


        var lblEscojaSerpienteAnim = cc.find('Bonus/frontLayer').getComponent(cc.Animation);
        lblEscojaSerpienteAnim.play('lblEscoja_anim');

    },

    shuffle() {

        var tileArray = [ [-299,-5], [-151,-3], [2,-1], [152,1], [300,1] ];

        var currentIndex = tileArray.length, temporaryValue, randomIndex;

        // Mientras haya algún elemento:
        while (0 !== currentIndex) {

            // Tomo un elemento (que sobre)
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // Y lo swappeo con otro
            temporaryValue = tileArray[currentIndex];
            tileArray[currentIndex] = tileArray[randomIndex];
            tileArray[randomIndex] = temporaryValue;
        }

    return tileArray;
    },

    onButtonClick: function(event, customEventData)
    {
        var serpientesInitAnim = cc.find('Bonus/gameLayer').getComponent(cc.Animation).stop('serpientes_init');

        var serpientesIdleNode = cc.find('Bonus/gameLayer/serpientes/serpientes_idle');
        serpientesIdleNode.opacity = 0;

        var serpientesGlowNode = cc.find('Bonus/gameLayer/serpientes/glow_idle');
        serpientesGlowNode.getComponent(cc.Animation).stop('serpientes_glow_idle_anim');
        serpientesGlowNode.active = false;

        var serpienteSeleccionadaGlow = cc.find('Bonus/gameLayer/serpiente_seleccionada_glow');


        cc.find('Bonus/gameLayer/serpientes/serpientes_post_idle/serpiente_1_anim').getComponent(cc.Sprite).spriteFrame = cc.find('Bonus/hiddenLayer/serpientes/serpiente_1').getComponent(cc.Sprite).spriteFrame;
        cc.find('Bonus/gameLayer/serpientes/serpientes_post_idle/serpiente_2_anim').getComponent(cc.Sprite).spriteFrame = cc.find('Bonus/hiddenLayer/serpientes/serpiente_2').getComponent(cc.Sprite).spriteFrame;
        cc.find('Bonus/gameLayer/serpientes/serpientes_post_idle/serpiente_3_anim').getComponent(cc.Sprite).spriteFrame = cc.find('Bonus/hiddenLayer/serpientes/serpiente_3').getComponent(cc.Sprite).spriteFrame;
        cc.find('Bonus/gameLayer/serpientes/serpientes_post_idle/serpiente_4_anim').getComponent(cc.Sprite).spriteFrame = cc.find('Bonus/hiddenLayer/serpientes/serpiente_4').getComponent(cc.Sprite).spriteFrame;
        cc.find('Bonus/gameLayer/serpientes/serpientes_post_idle/serpiente_5_anim').getComponent(cc.Sprite).spriteFrame = cc.find('Bonus/hiddenLayer/serpientes/serpiente_5').getComponent(cc.Sprite).spriteFrame;

        var serpientes_array = new Array();
        serpientes_array = ["serpiente_1_anim", "serpiente_2_anim", "serpiente_3_anim", "serpiente_4_anim", "serpiente_5_anim"];


        var iSerpiente = serpientes_array.indexOf(customEventData);
        serpientes_array.splice(iSerpiente,1);
        serpientes_array.push(customEventData);

        cc.log("selected " + customEventData);
        cc.log("order: " + serpientes_array);
        
        var animComponent = cc.find('Bonus/gameLayer/serpientes/serpientes_selected').getComponent(cc.Animation);
        var animSerpienteWinGlow = cc.find('Bonus/gameLayer').getComponent(cc.Animation);

        this.node.runAction(
            cc.sequence(
                cc.callFunc( function() { cc.find('Bonus/gameLayer/serpientes/serpientes_post_idle/' + serpientes_array[0]).active = false; animComponent.play(serpientes_array[0]); }, this ),
                cc.delayTime(1),
                cc.callFunc( function() { cc.find('Bonus/gameLayer/serpientes/serpientes_post_idle/' + serpientes_array[1]).active = false; animComponent.play(serpientes_array[1]); }, this ),
                cc.delayTime(1),
                cc.callFunc( function() { cc.find('Bonus/gameLayer/serpientes/serpientes_post_idle/' + serpientes_array[2]).active = false; animComponent.play(serpientes_array[2]); }, this ),
                cc.delayTime(1),
                cc.callFunc( function() { cc.find('Bonus/gameLayer/serpientes/serpientes_post_idle/' + serpientes_array[3]).active = false; animComponent.play(serpientes_array[3]); }, this ),
                cc.delayTime(1),
                cc.callFunc( function() { cc.find('Bonus/gameLayer/serpientes/serpientes_post_idle/' + serpientes_array[4]).active = false; animComponent.play(serpientes_array[4]); }, this ),
                cc.delayTime(1),
                cc.callFunc( function() { animSerpienteWinGlow.play('serpiente_ganadora_glow_anim'); }, this )
            )
        );

/** 
        for (var i = 0; i < serpientes_array.length; i++)
        {
            var serpiente = serpientes_array[i];

            var animComponent = cc.find('Bonus/gameLayer/serpientes/serpientes_selected').getComponent(cc.Animation);
            var anim = null;

            switch(serpiente)
            {
            case "s1":
                this.node.runAction(
                    cc.sequence(
                        cc.callFunc( function() { animComponent.play('serpiente_1_anim'); }, this ),
                        cc.delayTime(2) 
                    )
                );
                
            case "s2":
                this.node.runAction(
                    cc.sequence(
                        cc.callFunc( function() { animComponent.play('serpiente_2_anim'); }, this ),
                        cc.delayTime(2) 
                    )
                );
                
            case "s3":
                this.node.runAction(
                    cc.sequence(
                        cc.callFunc( function() { animComponent.play('serpiente_3_anim'); }, this ),
                        cc.delayTime(2) 
                    )
                );
                
            case "s4":
                this.node.runAction(
                    cc.sequence(
                        cc.callFunc( function() { animComponent.play('serpiente_4_anim'); }, this ),
                        cc.delayTime(2)
                    )
                );
                
            case "s5":
                this.node.runAction(
                    cc.sequence(
                        cc.callFunc( function() { animComponent.play('serpiente_5_anim'); }, this ),
                        cc.delayTime(2) 
                    )
                );
                
            }
        }

        */

        /**
        switch(customEventData)
        {
            case "s1":
                var anim = cc.find('Bonus/gameLayer/serpientes/serpientes_selected').getComponent(cc.Animation);
                var animState = anim.play('serpiente_1_anim');
                break;
            case "s2":
                var anim = cc.find('Bonus/gameLayer/serpientes/serpientes_selected').getComponent(cc.Animation);
                var animState = anim.play('serpiente_2_anim');
                break;
            case "s3":
                var anim = cc.find('Bonus/gameLayer/serpientes/serpientes_selected').getComponent(cc.Animation);
                var animState = anim.play('serpiente_3_anim');
                break;
            case "serpiente4":
                var anim = cc.find('Bonus/gameLayer/serpientes/serpientes_selected').getComponent(cc.Animation);
                var animState = anim.play('serpiente_4_anim');
                break;
            case "serpiente5":
                var anim = cc.find('Bonus/gameLayer/serpientes/serpientes_selected').getComponent(cc.Animation);
                var animState = anim.play('serpiente_5_anim');
                break;
        }
        **/

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

