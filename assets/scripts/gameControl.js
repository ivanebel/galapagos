
var cGameControl = 
{
    activeScene: null,
    activeComp: null,
    
    _uiLayer: null,
    _uiComp: null,
    _waitUserInput: false,
    _activeLine: 0,
    _selectedBox: null,
    _initiated: false,

    _iApuesta: 0,
    _iValorCredito: 0,
    _iCreditos: 0,

    _iTilesTortugaGalapagos: 0,
    _iTilesTortugaMarina: 0,
    _iTilesIguana: 0,
    _iTilesFoca: 0,
    _iTilesTiburon: 0,

    _iPagoTortugaGalapagos: 0,
    _iPagoTortugaMarina: 0,
    _iPagoIguana: 0,
    _iPagoFoca: 0,
    _iPagoTiburon: 0,

    _chosen_tiles_array: null,
    _empty_tiles_array: null,
    _bonusActive: false,

    _fakeTicket: null,

    _audioManager: null,

    init: function ( aUiLayer ) 
    {
        console.log('Initializing GameControl');
        
        this._fakeTicket = this.shuffle();

        if ( aUiLayer != null ) {
            //Se recibe un nodo que representa la UI y se hace persistente para poder reutilizarlo
            this._uiLayer = aUiLayer; 
            //Iniciamos el componente de la UI
            this._uiComp = this._uiLayer.getComponent('userInterface');
            this._uiComp.init( this );

            this._audioManager = this._uiLayer.getComponent('audioManager');

            //Lo hacemos persistente para poder reutilizarlo
            cc.game.addPersistRootNode( this._uiLayer );

            this._chosen_tiles_array = new Array();
            this._empty_tiles_array = new Array();

            this._bonusActive = false;

            this._iCreditos = 0;
            this._iValorCredito = 10;

            this._iPagoTortugaGalapagos = 100;
            this._iPagoTortugaMarina = 50;
            this._iPagoIguana = 20;
            this._iPagoFoca = 10;
            this._iPagoTiburon = 1;

        }

        

        //cc.director.preloadScene('galapagos-main');
        cc.director.preloadScene('bonus');

        //communicator events
        
        cc.log(this._fakeTicket);

        cc.director.loadScene('galapagos-main', this.onGalapagosLoaded.bind(this) );   
        
    },

    //Respondemos al mensaje de initialData
    onInitialData: function ( jsonData ) 
    {
        console.log('Recibimos Initial Data');
        
        this._initiated = true;
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

    onClearBoard: function ( jsonData ) 
    {
        //Limpiar para nuevo juego...
        console.log('Recibimos ClearBoard');
        
        //cargamos la escena del outside...
        cc.director.loadScene('galapagos-main', this.onGalapagosLoaded.bind(this) );    
                
    },

    onBoardState: function ( jsonData ) 
    {
        console.log('Recibimos BoardState: ' + jsonData.state);

        //if ( !this._playingDouble ){
            this.activeComp.onBoardState( jsonData );
        //}
        
    },

    onStartBonusLevel: function (  ) 
    {
        console.log('Recibimos StartBonusLevel');

        this._waitUserInput = false;    
        //llamaremos al bonus, esperamos dos segundos...    
        //cc.director.loadScene('bonus', this.onBonusLoaded.bind(this) );
        this._uiComp.scheduleOnce( this.startBonus.bind(this) , 2 ); 
    
    },

    startBonus: function () 
    {
        cc.director.loadScene('bonus', this.onBonusLoaded.bind(this) );

    },

    //callback de carga de Bonus
    onBonusLoaded: function () 
    {
        //Actualizamos las referencias luego de que se carga el bonus...
        console.log('Bonus cargado....');
        
        this.activeScene = cc.director.getScene();
        this.activeComp = this.activeScene.getChildByName('Bonus').getComponent('initBonus'); 
        this.activeComp.init( this );

        //var ui_anim = cc.find('uiLayer').getComponent(cc.Animation);
        //var ui_animstate = ui_anim.stop('ui_glow_anim');
        
    },  
        
    doCloseBonusLevel: function () 
    {
        console.log('Cerramos Bonus Level...');
        this._waitUserInput = false;    
        
        //Informamos que se terminó el bonus...
        //communicator.sendMessage( 'CloseBonusLevel {"data":{}}' );
        //Si se jeuga el bonus despues pasa a PayinState... Salimos con Finished
        this.doFinish();
        //communicator.sendMessage( 'Finished {"data":{}}' );
    },

    onEndGame: function ( jsonData ) 
    {
        console.log('Recibimos End Game...');
        
    },

    onExit: function ( jsonData ) 
    {
        console.log('Recibimos Exit...');
        
        cc.game.end();
    },

    //Usuario ha seleccionado un box
    userChoice: function ( aTile ) {
        
        if (this._uiComp._gameStarted == false)
        {
            return;
        }

        this._selectedBox = aTile;
        cc.log('selected: ' + aTile.node.name);
        cc.log('MysticIndex: ' + aTile.mysticIndex);

        cc.log('selected: ' + this._fakeTicket[aTile.mysticIndex]);

        if (this.checkTile(this._chosen_tiles_array, aTile) > 0)
        {
            // No existe el casillero en el array.
            return;
        }
        else
        {
            // Algun sonido?
            this._chosen_tiles_array.push(aTile);
            this.showTileContent(aTile);
            this._audioManager.playClick();
        }
        
        

        /** 
        if (aBox.lin === this._activeLine) {
            
            //Debemos desactivar el ingreso...
            this._waitUserInput = false;
            this.activeComp.unglowLines();
            
            //Enviamos el comando de click...
            //communicator.sendMessage( 'click {"data":{"clickindex":' + aBox.gbIndex + '}}' );
            
        }else {
            aBox.tilt();    
        }
        */
    },

    checkTile (array, aTile) 
    {
        return (array.indexOf(aTile) != -1);
    },

    showTileContent: function( aTile )
    {
        var animalSpriteFrame;

        var iAnimal = this._fakeTicket[aTile.mysticIndex];

        if ( iAnimal == "E" )
        {
            if (this._bonusActive === false)
            {
                this._empty_tiles_array.push(aTile);
                cc.log('Empty Tiles Array: ' + this._empty_tiles_array.length);
            
                var lbl = this._uiLayer.getChildByName('counter_bonus').getChildByName('lblBonusCounter');
                lbl.getComponent(cc.Label).string = this._empty_tiles_array.length;

                // El bonus se activa con 4 casilleros vacíos
                if (this._empty_tiles_array.length == 4)
                {
                    this._bonusActive = true;

                    var bonusTitleAnim = cc.find('Galapagos/uiLayer/bonusLayer').getComponent(cc.Animation);
                    var superNode = this.activeScene.getChildByName('Galapagos');

                    superNode.runAction(
                        cc.sequence(
                            cc.delayTime(0.2),
                            cc.callFunc( function() {this._empty_tiles_array[0].playBonusFound(); this._empty_tiles_array[0].doByeByeStar();}, this ), cc.delayTime(0.3),
                            cc.callFunc( function() {this._empty_tiles_array[1].playBonusFound(); this._empty_tiles_array[1].doByeByeStar();}, this ), cc.delayTime(0.3),
                            cc.callFunc( function() {this._empty_tiles_array[2].playBonusFound(); this._empty_tiles_array[2].doByeByeStar();}, this ), cc.delayTime(0.3),
                            cc.callFunc( function() {this._empty_tiles_array[3].playBonusFound(); this._empty_tiles_array[3].doByeByeStar();}, this ), cc.delayTime(0.5),
                            cc.callFunc( function() {this._empty_tiles_array[0].playBonusGlow(); 
                                                     this._empty_tiles_array[1].playBonusGlow(); 
                                                     this._empty_tiles_array[2].playBonusGlow(); 
                                                     this._empty_tiles_array[3].playBonusGlow(); }, this ), cc.delayTime(0.2),
                            cc.callFunc( function() {bonusTitleAnim.play('bonus_mensaje'); }, this ), cc.delayTime(0.5),
                            cc.callFunc( function() { this.onStartBonusLevel();}, this)
                        )
                    );

                    
                    
                }
            }

            this.showEmptyTile(aTile);

            return;
        }
        else    
        {
            // Se revisa el array de casilleros vacias. Si las hay, recorre el array y le borra las estrellas.
            if (this._empty_tiles_array.length != 0)
            {
                for (var i=0; i < this._empty_tiles_array.length; i++)
                {
                    var tile = this._empty_tiles_array[i];
                    tile.doByeByeStar();
                }

                this._empty_tiles_array.length = 0;

                var lbl = this._uiLayer.getChildByName('counter_bonus').getChildByName('lblBonusCounter');
                lbl.getComponent(cc.Label).string = this._empty_tiles_array.length;
            }
        }

        switch(iAnimal)
        {
            case "G1":
                var animal = cc.find('Galapagos/hiddenLayer/animals/tortugaGalapagos/tortuga_galapagos_1');
                animalSpriteFrame = animal.getComponent('cc.Sprite').spriteFrame;
                this._iTilesTortugaGalapagos += 1;

                cc.find('Galapagos/uiLayer/tablaPagos/animals/tortuga_galapagos/tg1').getComponent('cc.Sprite').spriteFrame = cc.find('Galapagos/hiddenLayer/tabla_pagos/tp_tg_1').getComponent('cc.Sprite').spriteFrame;
                break;
            case "G2":
                var animal = cc.find('Galapagos/hiddenLayer/animals/tortugaGalapagos/tortuga_galapagos_2');
                animalSpriteFrame = animal.getComponent('cc.Sprite').spriteFrame;
                this._iTilesTortugaGalapagos += 1;

                cc.find('Galapagos/uiLayer/tablaPagos/animals/tortuga_galapagos/tg2').getComponent('cc.Sprite').spriteFrame = cc.find('Galapagos/hiddenLayer/tabla_pagos/tp_tg_2').getComponent('cc.Sprite').spriteFrame;
                break;
            case "G3":
                var animal = cc.find('Galapagos/hiddenLayer/animals/tortugaGalapagos/tortuga_galapagos_3');
                animalSpriteFrame = animal.getComponent('cc.Sprite').spriteFrame;
                this._iTilesTortugaGalapagos += 1;

                cc.find('Galapagos/uiLayer/tablaPagos/animals/tortuga_galapagos/tg3').getComponent('cc.Sprite').spriteFrame = cc.find('Galapagos/hiddenLayer/tabla_pagos/tp_tg_3').getComponent('cc.Sprite').spriteFrame;
                break;
            case "G4":
                var animal = cc.find('Galapagos/hiddenLayer/animals/tortugaGalapagos/tortuga_galapagos_4');
                animalSpriteFrame = animal.getComponent('cc.Sprite').spriteFrame;
                this._iTilesTortugaGalapagos += 1;

                cc.find('Galapagos/uiLayer/tablaPagos/animals/tortuga_galapagos/tg4').getComponent('cc.Sprite').spriteFrame = cc.find('Galapagos/hiddenLayer/tabla_pagos/tp_tg_4').getComponent('cc.Sprite').spriteFrame;
                break;
            case "G5":
                var animal = cc.find('Galapagos/hiddenLayer/animals/tortugaGalapagos/tortuga_galapagos_5');
                animalSpriteFrame = animal.getComponent('cc.Sprite').spriteFrame;
                this._iTilesTortugaGalapagos += 1;

                cc.find('Galapagos/uiLayer/tablaPagos/animals/tortuga_galapagos/tg5').getComponent('cc.Sprite').spriteFrame = cc.find('Galapagos/hiddenLayer/tabla_pagos/tp_tg_5').getComponent('cc.Sprite').spriteFrame;
                break;
            case "M1":
                var animal = cc.find('Galapagos/hiddenLayer/animals/tortugaMarina/tortuga_marina_1');
                animalSpriteFrame = animal.getComponent('cc.Sprite').spriteFrame;
                this._iTilesTortugaMarina += 1;

                cc.find('Galapagos/uiLayer/tablaPagos/animals/tortuga_marina/tm1').getComponent('cc.Sprite').spriteFrame = cc.find('Galapagos/hiddenLayer/tabla_pagos/tp_tm_1').getComponent('cc.Sprite').spriteFrame;
                break;
            case "M2":
                var animal = cc.find('Galapagos/hiddenLayer/animals/tortugaMarina/tortuga_marina_2');
                animalSpriteFrame = animal.getComponent('cc.Sprite').spriteFrame;
                this._iTilesTortugaMarina += 1;

                cc.find('Galapagos/uiLayer/tablaPagos/animals/tortuga_marina/tm2').getComponent('cc.Sprite').spriteFrame = cc.find('Galapagos/hiddenLayer/tabla_pagos/tp_tm_2').getComponent('cc.Sprite').spriteFrame;
                break;
            case "M3":
                var animal = cc.find('Galapagos/hiddenLayer/animals/tortugaMarina/tortuga_marina_3');
                animalSpriteFrame = animal.getComponent('cc.Sprite').spriteFrame;
                this._iTilesTortugaMarina += 1;

                cc.find('Galapagos/uiLayer/tablaPagos/animals/tortuga_marina/tm3').getComponent('cc.Sprite').spriteFrame = cc.find('Galapagos/hiddenLayer/tabla_pagos/tp_tm_3').getComponent('cc.Sprite').spriteFrame;
                break;
            case "M4":
                var animal = cc.find('Galapagos/hiddenLayer/animals/tortugaMarina/tortuga_marina_4');
                animalSpriteFrame = animal.getComponent('cc.Sprite').spriteFrame;
                this._iTilesTortugaMarina += 1;

                cc.find('Galapagos/uiLayer/tablaPagos/animals/tortuga_marina/tm4').getComponent('cc.Sprite').spriteFrame = cc.find('Galapagos/hiddenLayer/tabla_pagos/tp_tm_4').getComponent('cc.Sprite').spriteFrame;
                break;
            case "I1":
                var animal = cc.find('Galapagos/hiddenLayer/animals/iguana/iguana_1');
                animalSpriteFrame = animal.getComponent('cc.Sprite').spriteFrame;
                this._iTilesIguana += 1;

                cc.find('Galapagos/uiLayer/tablaPagos/animals/iguana/i1').getComponent('cc.Sprite').spriteFrame = cc.find('Galapagos/hiddenLayer/tabla_pagos/tp_i_1').getComponent('cc.Sprite').spriteFrame;
                break;
            case "I2":
                var animal = cc.find('Galapagos/hiddenLayer/animals/iguana/iguana_2');
                animalSpriteFrame = animal.getComponent('cc.Sprite').spriteFrame;
                this._iTilesIguana += 1;

                cc.find('Galapagos/uiLayer/tablaPagos/animals/iguana/i2').getComponent('cc.Sprite').spriteFrame = cc.find('Galapagos/hiddenLayer/tabla_pagos/tp_i_2').getComponent('cc.Sprite').spriteFrame;
                break;
            case "I3":
                var animal = cc.find('Galapagos/hiddenLayer/animals/iguana/iguana_3');
                animalSpriteFrame = animal.getComponent('cc.Sprite').spriteFrame;
                this._iTilesIguana += 1;

                cc.find('Galapagos/uiLayer/tablaPagos/animals/iguana/i3').getComponent('cc.Sprite').spriteFrame = cc.find('Galapagos/hiddenLayer/tabla_pagos/tp_i_3').getComponent('cc.Sprite').spriteFrame;
                break;
            case "F1":
                var animal = cc.find('Galapagos/hiddenLayer/animals/foca/foca_1');
                animalSpriteFrame = animal.getComponent('cc.Sprite').spriteFrame;
                this._iTilesFoca += 1;

                cc.find('Galapagos/uiLayer/tablaPagos/animals/foca/f1').getComponent('cc.Sprite').spriteFrame = cc.find('Galapagos/hiddenLayer/tabla_pagos/tp_f_1').getComponent('cc.Sprite').spriteFrame;
                break;
            case "F2":
                var animal = cc.find('Galapagos/hiddenLayer/animals/foca/foca_2');
                animalSpriteFrame = animal.getComponent('cc.Sprite').spriteFrame;
                this._iTilesFoca += 1;

                cc.find('Galapagos/uiLayer/tablaPagos/animals/foca/f2').getComponent('cc.Sprite').spriteFrame = cc.find('Galapagos/hiddenLayer/tabla_pagos/tp_f_2').getComponent('cc.Sprite').spriteFrame;
                break;
            case "T":
                var animal = cc.find('Galapagos/hiddenLayer/animals/tiburon/tiburon_1');
                animalSpriteFrame = animal.getComponent('cc.Sprite').spriteFrame;
                this._iTilesTiburon += 1;

                cc.find('Galapagos/uiLayer/tablaPagos/animals/tiburon/t1').getComponent('cc.Sprite').spriteFrame = cc.find('Galapagos/hiddenLayer/tabla_pagos/tp_t_1').getComponent('cc.Sprite').spriteFrame;
                break;
            
        }

        aTile.setAnimal(animalSpriteFrame);

        this.checkfullTortugaGalapagos();
        this.checkfullTortugaMarina();
        this.checkFullIguana();
        this.checkFullFoca();
        this.checkFullTiburon();
    },

    checkfullTortugaGalapagos(){
        if (this._iTilesTortugaGalapagos == 5)
        {
            var animalSF =  cc.find('Galapagos/hiddenLayer/festejos/screen_tortugag').getComponent(cc.Sprite).spriteFrame;

            this._audioManager.playSweep();

            var festejoLayerNode = cc.find('Galapagos/uiLayer/festejoLayer').getComponent('animalFrames');
            festejoLayerNode.init(this);
            festejoLayerNode.drawFrame(animalSF);                    

            this._iTilesTortugaGalapagos = 0;

            this.actualizarContadores( this._iPagoTortugaGalapagos );
        }
    },

    checkfullTortugaMarina(){
        if (this._iTilesTortugaMarina == 4)
        {
            var animalSF =  cc.find('Galapagos/hiddenLayer/festejos/screen_tortugam').getComponent(cc.Sprite).spriteFrame;

            this._audioManager.playSweep();

            var festejoLayerNode = cc.find('Galapagos/uiLayer/festejoLayer').getComponent('animalFrames');
            festejoLayerNode.init(this);
            festejoLayerNode.drawFrame(animalSF);                    

            this._iTilesTortugaMarina = 0;

            this.actualizarContadores( this._iPagoTortugaMarina );
        }
    },

    checkFullIguana(){
        if (this._iTilesIguana == 3)
        {
            var animalSF =  cc.find('Galapagos/hiddenLayer/festejos/screen_iguana').getComponent(cc.Sprite).spriteFrame;

            this._audioManager.playSweep();

            var festejoLayerNode = cc.find('Galapagos/uiLayer/festejoLayer').getComponent('animalFrames');
            festejoLayerNode.init(this);
            festejoLayerNode.drawFrame(animalSF);                    

            this._iTilesIguana = 0;

            this.actualizarContadores( this._iPagoIguana );
        }
    },

    checkFullFoca(){
        if (this._iTilesFoca == 2)
        {
            var animalSF =  cc.find('Galapagos/hiddenLayer/festejos/screen_foca').getComponent(cc.Sprite).spriteFrame;

            this._audioManager.playSweep();

            var festejoLayerNode = cc.find('Galapagos/uiLayer/festejoLayer').getComponent('animalFrames');
            festejoLayerNode.init(this);
            festejoLayerNode.drawFrame(animalSF);                    

            this._iTilesFoca = 0;

            this.actualizarContadores( this._iPagoFoca );
        }
    },

    checkFullTiburon(){
        if (this._iTilesTiburon == 1)
        {
            var animalSF =  cc.find('Galapagos/hiddenLayer/festejos/screen_tiburon').getComponent(cc.Sprite).spriteFrame;

            this._audioManager.playSweep();

            var festejoLayerNode = cc.find('Galapagos/uiLayer/festejoLayer').getComponent('animalFrames');
            festejoLayerNode.init(this);
            festejoLayerNode.drawFrame(animalSF);                    

            this._iTilesTiburon = 0;

            this.actualizarContadores( this._iPagoTiburon );
        }
        
    },

    actualizarContadores( prize )
    {
        var bet = this._uiComp._iBet;
        var iPrize = this._uiComp._iPrize;
        var creditsWon = prize * bet;
        
        var lblPrize = this._uiLayer.getChildByName('counters').getChildByName('lblPrize').getComponent(cc.Label);
        lblPrize.string = (iPrize + creditsWon);
        
        //var lblCredits = this._uiLayer.getChildByName('counters').getChildByName('lblCredits').getComponent(cc.Label);
        //lblCredits.string = this._iCreditos;
    },

    showEmptyTile: function ( aTile )
    {
        aTile.doEmptyTileStuff();
    },

    doFinish: function () 
    { 
        //communicator.sendMessage( 'Finished {"data":{}}' ); 
    },

        //Es informado desde Box cuando aparece Bonus...
    gotBonus: function ()
    {
        //this._haveBonus = true;
        //le decimos a la UI que lo muestre....
        this._uiLayer.getComponent('userInterface').showBonusFoundAnimation();
        
    },   

    /*Para poner la UI en la escena que se esta corriendo...*/
    showUIOnScene: function () {
        
        if ( this._uiLayer != null ) {
            //console.log('Intentando poner layer de UI...')
            //var cScene = cc.director.getScene();
            this._uiLayer.parent = this.activeScene;
            //this._uiLayer.zIndex = 1000; 
            this._uiLayer.setPosition( 958, 541);

        }
                
    },

    shuffle() {

        var tileArray = [ "G1", "G2", "G3", "G4", "G5",
                          "M1", "M2", "M3", "M4",
                          "I1", "I2", "I3",
                          "F1", "F2",
                          "T", "T",
                          "E", "E", "E", "E", "E", "E", "E",
                          "E", "E", "E", "E", "E", "E", "E" ];

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
    }

};

module.exports = cGameControl;