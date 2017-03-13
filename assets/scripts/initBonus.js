cc.Class({
    extends: cc.Component,

    properties: {
        _gameServer: null,

        layerObjects: cc.Node,
        audioManager: cc.Node,

        _gameControl: null,

        _serpientes_anim_idle: null,
        _serpientes_anim_state: null,

        _iSerpiente1Pago: 0,
        _iSerpiente2Pago: 0,
        _iSerpiente3Pago: 0,
        _iSerpiente4Pago: 0,
        _iSerpiente5Pago: 0
    },

    // use this for initialization
    onLoad: function () {
        /*
        this._gameServer = this.node.getComponent('virtualServer');

        //cc.find('uiLayer').getComponent(cc.Animation).stop('ui_glow_anim');

        cc.find('Bonus/gameLayer/serpientes/serpientes_idle').active = false;
        var glowIdleNode = cc.find('Bonus/gameLayer/serpientes/glow_idle');
        glowIdleNode.active = false;

        this.audioManager = this.audioManager.getComponent('audioManager');
        //this.audioManager.playMusic();

        var posiciones = this.shuffle();

        var serpientesAnim = cc.find('Bonus/gameLayer').getComponent(cc.Animation);
        
        this.node.runAction(
            cc.sequence(
                cc.callFunc( function() { serpientesAnim.play('serpientes_init'); }, this ),
                cc.delayTime(1.1),
                cc.callFunc( function() { serpientesAnim.stop('serpientes_init'); 
                                          cc.find('Bonus/gameLayer/serpientes/serpientes_idle').active = true;
                                          serpientesAnim.play('serpientes_idle');
                                          glowIdleNode.active = true;
                                          glowIdleNode.getComponent(cc.Animation).play('serpientes_glow_idle_anim');
                                           }, this ),
                cc.delayTime(0.5)
            )
        );

        var pos = posiciones[0];
        cc.find('Bonus/gameLayer/serpientes/serpientes_selected/serpiente_1').setPosition(pos[0],pos[1]);
        cc.find('Bonus/gameLayer/serpientes/serpientes_post_idle/serpiente_1_anim').setPosition(pos[0],pos[1]);
        cc.find('Bonus/gameLayer/serpientes/glow_idle/glow_idle_1').setPosition(pos[0] + 20,pos[1] + 18);
        cc.find('Bonus/frontLayer/lblPrizes/lblPremio1').setPositionX(pos[0]);
        cc.find('Bonus/frontLayer/lblPrizes/lblSerpiente1').setPositionX(pos[0]);
        
        pos = posiciones[1];
        cc.find('Bonus/gameLayer/serpientes/serpientes_selected/serpiente_2').setPosition(pos[0],pos[1]);
        cc.find('Bonus/gameLayer/serpientes/serpientes_post_idle/serpiente_2_anim').setPosition(pos[0],pos[1]);
        cc.find('Bonus/gameLayer/serpientes/glow_idle/glow_idle_2').setPosition(pos[0] + 20,pos[1] + 18);
        cc.find('Bonus/frontLayer/lblPrizes/lblPremio2').setPositionX(pos[0]);
        cc.find('Bonus/frontLayer/lblPrizes/lblSerpiente2').setPositionX(pos[0]);
        
        pos = posiciones[2];
        cc.find('Bonus/gameLayer/serpientes/serpientes_selected/serpiente_3').setPosition(pos[0],pos[1]);
        cc.find('Bonus/gameLayer/serpientes/serpientes_post_idle/serpiente_3_anim').setPosition(pos[0],pos[1]);
        cc.find('Bonus/gameLayer/serpientes/glow_idle/glow_idle_3').setPosition(pos[0] + 18,pos[1] + 18);
        cc.find('Bonus/frontLayer/lblPrizes/lblPremio3').setPositionX(pos[0]);
        cc.find('Bonus/frontLayer/lblPrizes/lblSerpiente3').setPositionX(pos[0]);
        
        pos = posiciones[3];
        cc.find('Bonus/gameLayer/serpientes/serpientes_selected/serpiente_4').setPosition(pos[0],pos[1]);
        cc.find('Bonus/gameLayer/serpientes/serpientes_post_idle/serpiente_4_anim').setPosition(pos[0],pos[1]);
        cc.find('Bonus/gameLayer/serpientes/glow_idle/glow_idle_4').setPosition(pos[0] + 21,pos[1] + 18);
        cc.find('Bonus/frontLayer/lblPrizes/lblPremio4').setPositionX(pos[0]);
        cc.find('Bonus/frontLayer/lblPrizes/lblSerpiente4').setPositionX(pos[0]);
        
        pos = posiciones[4];
        cc.find('Bonus/gameLayer/serpientes/serpientes_selected/serpiente_5').setPosition(pos[0],pos[1]);
        cc.find('Bonus/gameLayer/serpientes/serpientes_post_idle/serpiente_5_anim').setPosition(pos[0],pos[1]);
        cc.find('Bonus/gameLayer/serpientes/glow_idle/glow_idle_5').setPosition(pos[0] + 21,pos[1] + 18);
        cc.find('Bonus/gameLayer/serpiente_ganadora_glow').setPosition(pos[0] + 43,pos[1]);
        cc.find('Bonus/frontLayer/lblPrizes/lblPremio5').setPositionX(pos[0]);
        cc.find('Bonus/frontLayer/lblPrizes/lblSerpiente5').setPositionX(pos[0]);


        var lblEscojaSerpienteAnim = cc.find('Bonus/frontLayer').getComponent(cc.Animation);
        lblEscojaSerpienteAnim.play('lblEscoja_anim');
*/
    },

    init: function ( aGameControl )
    {
        this._gameServer = this.node.getComponent('virtualServer');
        this._gameControl = aGameControl;

        this._gameControl._audioManager.playBonusBgm();
        //cc.find('uiLayer').getComponent(cc.Animation).stop('ui_glow_anim');

        cc.find('Bonus/gameLayer/serpientes/serpientes_idle').active = false;
        var glowIdleNode = cc.find('Bonus/gameLayer/serpientes/glow_idle');
        glowIdleNode.active = false;

        this.audioManager = this.audioManager.getComponent('audioManager');
        //this.audioManager.playMusic();

        var posiciones = this.shuffle();

        this._iSerpiente1Pago = 1,
        this._iSerpiente2Pago = 1,
        this._iSerpiente3Pago = 2,
        this._iSerpiente4Pago = 2.5,
        this._iSerpiente5Pago = 5;

        var serpientesAnim = cc.find('Bonus/gameLayer').getComponent(cc.Animation);
        
        this.node.runAction(
            cc.sequence(
                cc.callFunc( function() { serpientesAnim.play('serpientes_init'); }, this ),
                cc.delayTime(1.1),
                cc.callFunc( function() { serpientesAnim.stop('serpientes_init'); 
                                          cc.find('Bonus/gameLayer/serpientes/serpientes_idle').active = true;
                                          serpientesAnim.play('serpientes_idle');
                                          glowIdleNode.active = true;
                                          glowIdleNode.getComponent(cc.Animation).play('serpientes_glow_idle_anim');
                                           }, this ),
                cc.delayTime(0.5)
            )
        );

        var pos = posiciones[0];
        cc.find('Bonus/gameLayer/serpientes/serpientes_selected/serpiente_1').setPosition(pos[0],pos[1]);
        cc.find('Bonus/gameLayer/serpientes/serpientes_post_idle/serpiente_1_anim').setPosition(pos[0],pos[1]);
        cc.find('Bonus/gameLayer/serpientes/glow_idle/glow_idle_1').setPosition(pos[0] + 20,pos[1] + 18);
        cc.find('Bonus/frontLayer/lblPrizes/lblPremio1').setPositionX(pos[0]);
        cc.find('Bonus/frontLayer/lblPrizes/lblSerpiente1').setPositionX(pos[0]);
        
        pos = posiciones[1];
        cc.find('Bonus/gameLayer/serpientes/serpientes_selected/serpiente_2').setPosition(pos[0],pos[1]);
        cc.find('Bonus/gameLayer/serpientes/serpientes_post_idle/serpiente_2_anim').setPosition(pos[0],pos[1]);
        cc.find('Bonus/gameLayer/serpientes/glow_idle/glow_idle_2').setPosition(pos[0] + 20,pos[1] + 18);
        cc.find('Bonus/frontLayer/lblPrizes/lblPremio2').setPositionX(pos[0]);
        cc.find('Bonus/frontLayer/lblPrizes/lblSerpiente2').setPositionX(pos[0]);
        
        pos = posiciones[2];
        cc.find('Bonus/gameLayer/serpientes/serpientes_selected/serpiente_3').setPosition(pos[0],pos[1]);
        cc.find('Bonus/gameLayer/serpientes/serpientes_post_idle/serpiente_3_anim').setPosition(pos[0],pos[1]);
        cc.find('Bonus/gameLayer/serpientes/glow_idle/glow_idle_3').setPosition(pos[0] + 18,pos[1] + 18);
        cc.find('Bonus/frontLayer/lblPrizes/lblPremio3').setPositionX(pos[0]);
        cc.find('Bonus/frontLayer/lblPrizes/lblSerpiente3').setPositionX(pos[0]);
        
        pos = posiciones[3];
        cc.find('Bonus/gameLayer/serpientes/serpientes_selected/serpiente_4').setPosition(pos[0],pos[1]);
        cc.find('Bonus/gameLayer/serpientes/serpientes_post_idle/serpiente_4_anim').setPosition(pos[0],pos[1]);
        cc.find('Bonus/gameLayer/serpientes/glow_idle/glow_idle_4').setPosition(pos[0] + 21,pos[1] + 18);
        cc.find('Bonus/frontLayer/lblPrizes/lblPremio4').setPositionX(pos[0]);
        cc.find('Bonus/frontLayer/lblPrizes/lblSerpiente4').setPositionX(pos[0]);
        
        pos = posiciones[4];
        cc.find('Bonus/gameLayer/serpientes/serpientes_selected/serpiente_5').setPosition(pos[0],pos[1]);
        cc.find('Bonus/gameLayer/serpientes/serpientes_post_idle/serpiente_5_anim').setPosition(pos[0],pos[1]);
        cc.find('Bonus/gameLayer/serpientes/glow_idle/glow_idle_5').setPosition(pos[0] + 21,pos[1] + 18);
        cc.find('Bonus/gameLayer/serpiente_ganadora_glow').setPosition(pos[0] + 43,pos[1]);
        cc.find('Bonus/frontLayer/lblPrizes/lblPremio5').setPositionX(pos[0]);
        cc.find('Bonus/frontLayer/lblPrizes/lblSerpiente5').setPositionX(pos[0]);


        var lblEscojaSerpienteAnim = cc.find('Bonus/frontLayer').getComponent(cc.Animation);
        lblEscojaSerpienteAnim.play('lblEscoja_anim');
    },

    shuffle() {

        var tileArray = [ [-297,240], [-149,240], [5,240], [154,240], [302,240] ];

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
        //serpienteSeleccionadaGlow.active = true;
        //cc.find('Bonus/gameLayer/serpientes/serpientes_selected').active=true;
        //cc.find('Bonus/gameLayer/serpientes/serpientes_selected').opacity = 255;
        

        switch (customEventData)
        {
            case "serpiente_1_anim":
                var posX = cc.find('Bonus/gameLayer/serpientes/serpientes_selected/serpiente_1').getPositionX();
                var posY = cc.find('Bonus/gameLayer/serpientes/serpientes_selected/serpiente_1').getPositionY();
                
                serpienteSeleccionadaGlow.setPosition(posX + 20, posY + 10);
                break;
            case "serpiente_2_anim":
                var posX = cc.find('Bonus/gameLayer/serpientes/serpientes_selected/serpiente_2').getPositionX();
                var posY = cc.find('Bonus/gameLayer/serpientes/serpientes_selected/serpiente_2').getPositionY();
                
                serpienteSeleccionadaGlow.setPosition(posX + 20, posY + 10);
                break;
            case "serpiente_3_anim":
                var posX = cc.find('Bonus/gameLayer/serpientes/serpientes_selected/serpiente_3').getPositionX();
                var posY = cc.find('Bonus/gameLayer/serpientes/serpientes_selected/serpiente_3').getPositionY();
                
                serpienteSeleccionadaGlow.setPosition(posX + 20, posY + 10);
                break;
            case "serpiente_4_anim":
                var posX = cc.find('Bonus/gameLayer/serpientes/serpientes_selected/serpiente_4').getPositionX();
                var posY = cc.find('Bonus/gameLayer/serpientes/serpientes_selected/serpiente_4').getPositionY();
                
                serpienteSeleccionadaGlow.setPosition(posX + 20, posY + 10);
                break;
            case "serpiente_5_anim":
                var posX = cc.find('Bonus/gameLayer/serpientes/serpientes_selected/serpiente_5').getPositionX();
                var posY = cc.find('Bonus/gameLayer/serpientes/serpientes_selected/serpiente_5').getPositionY();
                
                serpienteSeleccionadaGlow.setPosition(posX + 20, posY + 10);
                break;
            
        }

        
        //cc.find('Bonus/frontLayer/lblPrizes/lblSerpiente1').setPositionX(pos[0]);

        cc.find('Bonus/gameLayer').getComponent(cc.Animation).play('serpiente_seleccionada_glow_anim');      


        cc.find('Bonus/gameLayer/serpientes/serpientes_post_idle/serpiente_1_anim').getComponent(cc.Sprite).spriteFrame = cc.find('Bonus/hiddenLayer/serpientes/serpiente_1').getComponent(cc.Sprite).spriteFrame;
        cc.find('Bonus/gameLayer/serpientes/serpientes_post_idle/serpiente_2_anim').getComponent(cc.Sprite).spriteFrame = cc.find('Bonus/hiddenLayer/serpientes/serpiente_1').getComponent(cc.Sprite).spriteFrame;
        cc.find('Bonus/gameLayer/serpientes/serpientes_post_idle/serpiente_3_anim').getComponent(cc.Sprite).spriteFrame = cc.find('Bonus/hiddenLayer/serpientes/serpiente_1').getComponent(cc.Sprite).spriteFrame;
        cc.find('Bonus/gameLayer/serpientes/serpientes_post_idle/serpiente_4_anim').getComponent(cc.Sprite).spriteFrame = cc.find('Bonus/hiddenLayer/serpientes/serpiente_1').getComponent(cc.Sprite).spriteFrame;
        cc.find('Bonus/gameLayer/serpientes/serpientes_post_idle/serpiente_5_anim').getComponent(cc.Sprite).spriteFrame = cc.find('Bonus/hiddenLayer/serpientes/serpiente_1').getComponent(cc.Sprite).spriteFrame;

        var serpientes_array = new Array();
        serpientes_array = ["serpiente_1_anim", "serpiente_2_anim", "serpiente_3_anim", "serpiente_4_anim", "serpiente_5_anim"];


        var iSerpiente = serpientes_array.indexOf(customEventData);
        serpientes_array.splice(iSerpiente,1);
        serpientes_array.push(customEventData);

        cc.log("selected " + customEventData);
        cc.log("order: " + serpientes_array);

        var bet = this._gameControl._uiComp._iBet;
        cc.find('Bonus/frontLayer/lblPrizes/lblPremio1').getComponent(cc.Label).string = this._iSerpiente1Pago * bet;
        cc.find('Bonus/frontLayer/lblPrizes/lblPremio2').getComponent(cc.Label).string = this._iSerpiente2Pago * bet;
        cc.find('Bonus/frontLayer/lblPrizes/lblPremio3').getComponent(cc.Label).string = this._iSerpiente3Pago * bet;
        cc.find('Bonus/frontLayer/lblPrizes/lblPremio4').getComponent(cc.Label).string = this._iSerpiente4Pago * bet;
        cc.find('Bonus/frontLayer/lblPrizes/lblPremio5').getComponent(cc.Label).string = this._iSerpiente5Pago * bet;
                
        var animComponent = cc.find('Bonus/gameLayer/serpientes/serpientes_selected').getComponent(cc.Animation);
        var animSerpienteWinGlow = cc.find('Bonus/gameLayer').getComponent(cc.Animation);

        this.node.runAction(
            cc.sequence(
                cc.callFunc( function() { cc.find('Bonus/gameLayer/serpientes/serpientes_post_idle/' + serpientes_array[0]).active = false; 
                                          animComponent.play(serpientes_array[0]); }, this ),
                cc.delayTime(1),
                cc.callFunc( function() { cc.find('Bonus/gameLayer/serpientes/serpientes_post_idle/' + serpientes_array[1]).active = false; 
                                          animComponent.play(serpientes_array[1]); }, this ),
                cc.delayTime(1),
                cc.callFunc( function() { cc.find('Bonus/gameLayer/serpientes/serpientes_post_idle/' + serpientes_array[2]).active = false; 
                                          animComponent.play(serpientes_array[2]); }, this ),
                cc.delayTime(1),
                cc.callFunc( function() { cc.find('Bonus/gameLayer/serpientes/serpientes_post_idle/' + serpientes_array[3]).active = false; 
                                          animComponent.play(serpientes_array[3]); }, this ),
                cc.delayTime(1),
                cc.callFunc( function() { cc.find('Bonus/gameLayer/serpientes/serpientes_post_idle/' + serpientes_array[4]).active = false;
                                          serpienteSeleccionadaGlow.active = false; 
                                          animComponent.play(serpientes_array[4]); }, this ),
                cc.delayTime(1),
                cc.callFunc( function() { animSerpienteWinGlow.play('serpiente_ganadora_glow_anim'); }, this ), 
                cc.callFunc( function() { cc.find('Bonus/frontLayer/lblPrizes').getComponent(cc.Animation).play('bonus_prizes_anim'); }, this )
            )
        );



    },

    btnVolver: function()
    {
        cc.director.loadScene('galapagos-main', this.onGalapagosLoaded.bind( this._gameControl ) );
    },

        //callback de carga de galapagos-main
    onGalapagosLoaded: function () 
    {
        //Luego de que se carga el outside llamamos a comenzar el juego...
        this.activeScene =  cc.director.getScene();
        this.activeComp = this.activeScene.getChildByName('Galapagos').getComponent('galapagosGame'); 
        this.activeComp.init( this );
        
        //OutSide lleva UI...le ponemos
        this.showUIOnScene();
        
        //Enviamos el comando de que comenzamos...
        if ( !this._initiated ) 
        {
            console.log('Enviando Initial Data...');
            //communicator.sendMessage( "initialdata {\"data\":{}}" );
        }

        var ui_anim = cc.find('uiLayer').getComponent(cc.Animation);
        var ui_animstate = ui_anim.play('ui_glow_anim');
        ui_animstate.repeatCount = Infinity;

    },

});

