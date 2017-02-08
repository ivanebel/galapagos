const GM_PLAY_BONUS = 'playBonus';
const GM_GAME_OVER = 'gameOver';
const GM_IDLE = 'idle';

cc.Class({
    extends: cc.Component,

    properties: {
        _gameServer: null,
        _audioManager: null,

        _currentState: GM_IDLE,

        _waitUserInput: false,

        _bonus: cc.Node,

        remainingChoices: 0,

        _iTilesTortugaGalapagos: 0,
        _iTilesTortugaMarina: 0,
        _iTilesIguana: 0,
        _iTilesFoca: 0,
        _iTilesTiburon: 0,

        _uiLayer: cc.Node,
        _uiLayerPrefab: {
            default: null,
            type: cc.Prefab
        },

        tileTierra:
        {
            default: null,
            type: cc.SpriteFrame
        },

        tileEmpty:
        {
            default: null,
            type: cc.SpriteFrame
        },

        _selectedTile: {
            default: null,
            type: cc.Node
        },

        _tierras: 0,
        _emptyTiles: 0,

        _timesBet: 0,

        _chosenTiles: null,

        _star1: null,
        _star2: null,
        _star3: null,
        _star4: null

    },

    // use this for initialization
    onLoad: function () {
        this._gameServer = this.node.getComponent('virtualServer');
        cc.log('Loading VirtualServer');

        //this.tileTierra = cc.find('Galapagos/gameLayer/tiles/tierra');
        this.tileEmpty = cc.find('Galapagos/gameLayer/tiles/empty');

        this.remainingChoices = 5;
        var rem = cc.find('Galapagos/uiLayer/contadores/contador_apuestas/remainingMoves').getComponent(cc.Label).string = this.remainingChoices;

        this._timesBet = 0;

        this._chosenTiles = [];

//Solo para pruebas, mostrar el contenido de cada tile:
        var isla = cc.find('Galapagos/uiLayer/lblTiles').getComponent(cc.Label).string = this._gameServer._fakeTicket.toString();

        //var anim = cc.find('Galapagos/uiLayer/ui_glow').getComponent(cc.Animation);
        //var animState = anim.play('ui_glow');
        //animState.repeatCount = Infinity;

/** 
        this._currentState = GM_IDLE;

        this.remainingChoices = 5;

        var listener = {
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function (keyCode, event) {
                cc.log('keyDown: ' + keyCode);

                if (keyCode == 66) {
                    cc.director.loadScene('bonus');
                }
            }
        }

        cc.eventManager.addListener(listener, this.Node);
*/
    },

    onButtonClick: function(event, customEventData) 
    {
        if (customEventData == "bonus")
        {
            cc.find('Galapagos/uiLayer/bonus/bonus_found').getComponent(cc.Animation).play('bonus_found');
        }

        if (customEventData == "plusApuesta")
        {
            this.doPlusApuesta();
            return;
        }

/** 
        if (customEventData == "reglas")
        {
            cc.find('Galapagos/uiLayer/reglas_overlay/reglas_overlay').opacity = 255;
            return;
        }
*/
        var pos = customEventData;

        var content = this._gameServer._fakeTicket[pos];

        cc.log("Elegido: " + content);

        if (this.remainingChoices <= 0) {cc.log("No hay movimientos disponibles."); return;}

        if (this.checkTileArray(this._chosenTiles, content) == false)  //el cuadro seleccionado no ha sido elegido previamente.
        { 
            this._chosenTiles.push(content);    //se guarda el cuadro seleccionado
        }
        else 
        { 
            cc.log(content + " ya existe.")
            return; 
        }

        this.userChoice(content, pos);

    },

    playGame () {

    },

    playBonus () {

    },

    /**
     * 
     */
    userChoice (content, pos) {
        //cc.log("I'm in");

        if (this.remainingChoices == 0)
        {
            return;
        }

        var tileComponent = this.getTile(content);

        var nodo;
        
        switch (pos) {
            //Fila A
            case "0":
                nodo = cc.find('Galapagos/gameLayer/tiles/row_a/a1');
                nodo.getComponent(cc.Sprite).spriteFrame = tileComponent.spriteFrame;
                break;
            case "1":
                nodo = cc.find('Galapagos/gameLayer/tiles/row_a/a2');
                nodo.getComponent(cc.Sprite).spriteFrame = tileComponent.spriteFrame;
                break;
            case "2":
                nodo = cc.find('Galapagos/gameLayer/tiles/row_a/a3');
                nodo.getComponent(cc.Sprite).spriteFrame = tileComponent.spriteFrame;
                break;
            case "3":
                nodo = cc.find('Galapagos/gameLayer/tiles/row_a/a4');
                nodo.getComponent(cc.Sprite).spriteFrame = tileComponent.spriteFrame;
                break;
            case "4":
                nodo = cc.find('Galapagos/gameLayer/tiles/row_a/a5');
                nodo.getComponent(cc.Sprite).spriteFrame = tileComponent.spriteFrame;
                break;
            case "5":
                nodo = cc.find('Galapagos/gameLayer/tiles/row_a/a6');
                nodo.getComponent(cc.Sprite).spriteFrame = tileComponent.spriteFrame;
                break;

            //Fila B
            case "6":
                nodo = cc.find('Galapagos/gameLayer/tiles/row_a/b1');
                nodo.getComponent(cc.Sprite).spriteFrame = tileComponent.spriteFrame;
                break;
            case "7":
                nodo = cc.find('Galapagos/gameLayer/tiles/row_a/b2');
                nodo.getComponent(cc.Sprite).spriteFrame = tileComponent.spriteFrame;
                break;
            case "8":
                nodo = cc.find('Galapagos/gameLayer/tiles/row_a/b3');
                nodo.getComponent(cc.Sprite).spriteFrame = tileComponent.spriteFrame;
                break;
            case "9":
                nodo = cc.find('Galapagos/gameLayer/tiles/row_a/b4');
                nodo.getComponent(cc.Sprite).spriteFrame = tileComponent.spriteFrame;
                break;
            case "10":
                nodo = cc.find('Galapagos/gameLayer/tiles/row_a/b5');
                nodo.getComponent(cc.Sprite).spriteFrame = tileComponent.spriteFrame;
                break;
            case "11":
                nodo = cc.find('Galapagos/gameLayer/tiles/row_a/b6');
                nodo.getComponent(cc.Sprite).spriteFrame = tileComponent.spriteFrame;
                break;

            //Fila C
            case "12":
                nodo = cc.find('Galapagos/gameLayer/tiles/row_a/c1');
                nodo.getComponent(cc.Sprite).spriteFrame = tileComponent.spriteFrame;
                break;
            case "13":
                nodo = cc.find('Galapagos/gameLayer/tiles/row_a/c2');
                nodo.getComponent(cc.Sprite).spriteFrame = tileComponent.spriteFrame;
                break;
            case "14":
                nodo = cc.find('Galapagos/gameLayer/tiles/row_a/c3');
                nodo.getComponent(cc.Sprite).spriteFrame = tileComponent.spriteFrame;
                break;
            case "15":
                nodo = cc.find('Galapagos/gameLayer/tiles/row_a/c4');
                nodo.getComponent(cc.Sprite).spriteFrame = tileComponent.spriteFrame;
                break;
            case "16":
                nodo = cc.find('Galapagos/gameLayer/tiles/row_a/c5');
                nodo.getComponent(cc.Sprite).spriteFrame = tileComponent.spriteFrame;
                break;
            case "17":
                nodo = cc.find('Galapagos/gameLayer/tiles/row_a/c6');
                nodo.getComponent(cc.Sprite).spriteFrame = tileComponent.spriteFrame;
                break;

            //Fila D
            case "18":
                var sprite = cc.find('Galapagos/gameLayer/tiles/row_d/d1').getComponent(cc.Sprite).spriteFrame = tileComponent.spriteFrame;
                break;
            case "19":
                var sprite = cc.find('Galapagos/gameLayer/tiles/row_d/d2').getComponent(cc.Sprite).spriteFrame = tileComponent.spriteFrame;
                break;
            case "20":
                var sprite = cc.find('Galapagos/gameLayer/tiles/row_d/d3').getComponent(cc.Sprite).spriteFrame = tileComponent.spriteFrame;
                break;
            case "21":
                var sprite = cc.find('Galapagos/gameLayer/tiles/row_d/d4').getComponent(cc.Sprite).spriteFrame = tileComponent.spriteFrame;
                break;
            case "22":
                var sprite = cc.find('Galapagos/gameLayer/tiles/row_d/d5').getComponent(cc.Sprite).spriteFrame = tileComponent.spriteFrame;
                break;
            case "23":
                var sprite = cc.find('Galapagos/gameLayer/tiles/row_d/d6').getComponent(cc.Sprite).spriteFrame = tileComponent.spriteFrame;
                break;

            //Fila E
            case "24":
                var sprite = cc.find('Galapagos/gameLayer/tiles/row_e/e1').getComponent(cc.Sprite).spriteFrame = tileComponent.spriteFrame;
                break;
            case "25":
                var sprite = cc.find('Galapagos/gameLayer/tiles/row_e/e2').getComponent(cc.Sprite).spriteFrame = tileComponent.spriteFrame;
                break;
            case "26":
                var sprite = cc.find('Galapagos/gameLayer/tiles/row_e/e3').getComponent(cc.Sprite).spriteFrame = tileComponent.spriteFrame;
                break;
            case "27":
                var sprite = cc.find('Galapagos/gameLayer/tiles/row_e/e4').getComponent(cc.Sprite).spriteFrame = tileComponent.spriteFrame;
                break;
            case "28":
                var sprite = cc.find('Galapagos/gameLayer/tiles/row_e/e5').getComponent(cc.Sprite).spriteFrame = tileComponent.spriteFrame;
                break;
            case "29":
                var sprite = cc.find('Galapagos/gameLayer/tiles/row_e/e6').getComponent(cc.Sprite).spriteFrame = tileComponent.spriteFrame;
                break;

        }

        if (content == "E")
        {
            var starNode = cc.find('Galapagos/uiLayer/bonus/star_1');
            var starGlowNode = cc.find('Galapagos/uiLayer/bonus/star_1_glow');
            var starAnim = cc.find('Galapagos/uiLayer/bonus/star_found');

            var posX = nodo.getPositionX();
            var posY = nodo.getPositionY();

            cc.log("PosX=" + posX + " PosY=" + posY);

            switch(this._emptyTiles)
            {
                case 1:
                    this._star1 = cc.find('Galapagos/uiLayer/bonus/star_1');
                    starGlowNode = cc.find('Galapagos/uiLayer/bonus/star_1_glow');

                    this._star1.setPositionX(posX);
                    this._star1.setPositionY(posY);
                    this._star1.getComponent(cc.Sprite).spriteFrame = cc.find('Galapagos/hiddenLayer/star').getComponent(cc.Sprite).spriteFrame;
                    break;
                case 2:
                    starNode = cc.find('Galapagos/uiLayer/bonus/star_2');
                    starGlowNode = cc.find('Galapagos/uiLayer/bonus/star_2_glow');
                    break;
                case 3:
                    starNode = cc.find('Galapagos/uiLayer/bonus/star_3');
                    starGlowNode = cc.find('Galapagos/uiLayer/bonus/star_3_glow');
                    break;
                case 4:
                    starNode = cc.find('Galapagos/uiLayer/bonus/star_4');
                    starGlowNode = cc.find('Galapagos/uiLayer/bonus/star_4_glow');
                    break;
            }

            //starNode.setPositionX(posX);
            //starNode.setPositionY(posY);
            //starNode.getComponent(cc.Sprite).spriteFrame = cc.find('Galapagos/hiddenLayer/star').getComponent(cc.Sprite).spriteFrame;

            starGlowNode.setPositionX(posX);
            starGlowNode.setPositionY(posY);
            starGlowNode.getComponent(cc.Sprite).spriteFrame = cc.find('Galapagos/hiddenLayer/star_glow').getComponent(cc.Sprite).spriteFrame;

            starAnim.setPositionX(posX);
            starAnim.setPositionY(posY);
            starAnim.getComponent(cc.Animation).play('star_found');
            

            if (this._emptyTiles == 4)
            {
                var audioNode = cc.find('Galapagos/audioManager');
                this._audioManager = audioNode.getComponent('audioManager');
                this._audioManager.playSweep();

                //cc.director.loadScene('bonus');
                var bonusNode = cc.find('Galapagos/uiLayer/bonus/bonus_found');
                bonusNode.setPositionX(this._star1.getPositionX());
                bonusNode.setPositionY(this._star1.getPositionY());
                bonusNode.getComponent(cc.Animation).play('bonus_found');
            }

        }

    },

    getTile (str)
    {
        var tile;
        var tp;

        cc.log("Tiles: " + this._chosenTiles);

        
        // Chequeo si se encontró una "E" -> casillero vacío
        if (str == "E")
        {
            this._emptyTiles += 1;

            switch(this._emptyTiles)
            {
                case 1:
                    cc.find('Galapagos/uiLayer/bonus').getComponent(cc.Animation).play('star_found');
                    cc.find('Galapagos/uiLayer/bonus/star_1').getComponent(cc.Sprite).spriteFrame = cc.find('Galapagos/hiddenLayer/star').getComponent(cc.Sprite).spriteFrame;
                    cc.find('Galapagos/uiLayer/bonus/star_1_glow').getComponent(cc.Sprite).spriteFrame = cc.find('Galapagos/hiddenLayer/star_glow').getComponent(cc.Sprite).spriteFrame;
                    break;
                case 2:
                    cc.find('Galapagos/uiLayer/bonus').getComponent(cc.Animation).play('star_found');
                    cc.find('Galapagos/uiLayer/bonus/star_2').getComponent(cc.Sprite).spriteFrame = cc.find('Galapagos/hiddenLayer/star').getComponent(cc.Sprite).spriteFrame;
                    cc.find('Galapagos/uiLayer/bonus/star_2_glow').getComponent(cc.Sprite).spriteFrame = cc.find('Galapagos/hiddenLayer/star_glow').getComponent(cc.Sprite).spriteFrame;
                    break;
                case 3:
                    cc.find('Galapagos/uiLayer/bonus').getComponent(cc.Animation).play('star_found');
                    cc.find('Galapagos/uiLayer/bonus/star_3').getComponent(cc.Sprite).spriteFrame = cc.find('Galapagos/hiddenLayer/star').getComponent(cc.Sprite).spriteFrame;
                    cc.find('Galapagos/uiLayer/bonus/star_3_glow').getComponent(cc.Sprite).spriteFrame = cc.find('Galapagos/hiddenLayer/star_glow').getComponent(cc.Sprite).spriteFrame;
                    break;
                case 4:
                    cc.find('Galapagos/uiLayer/bonus').getComponent(cc.Animation).play('star_found');
                    cc.find('Galapagos/uiLayer/bonus/star_4').getComponent(cc.Sprite).spriteFrame = cc.find('Galapagos/hiddenLayer/star').getComponent(cc.Sprite).spriteFrame;
                    cc.find('Galapagos/uiLayer/bonus/star_4_glow').getComponent(cc.Sprite).spriteFrame = cc.find('Galapagos/hiddenLayer/star_glow').getComponent(cc.Sprite).spriteFrame;
                    break;
            }

            
        }
        else
        {
            this._emptyTiles = 0;

            cc.find('Galapagos/uiLayer/bonus/star_1').getComponent(cc.Sprite).spriteFrame = null;
            cc.find('Galapagos/uiLayer/bonus/star_1_glow').getComponent(cc.Sprite).spriteFrame = null;
            cc.find('Galapagos/uiLayer/bonus/star_2').getComponent(cc.Sprite).spriteFrame = null;
            cc.find('Galapagos/uiLayer/bonus/star_2_glow').getComponent(cc.Sprite).spriteFrame = null;
            cc.find('Galapagos/uiLayer/bonus/star_3').getComponent(cc.Sprite).spriteFrame = null;
            cc.find('Galapagos/uiLayer/bonus/star_3_glow').getComponent(cc.Sprite).spriteFrame = null;
            cc.find('Galapagos/uiLayer/bonus/star_4').getComponent(cc.Sprite).spriteFrame = null;
            cc.find('Galapagos/uiLayer/bonus/star_4_glow').getComponent(cc.Sprite).spriteFrame = null;
        }

        var lbl = cc.find('Galapagos/uiLayer/contadores/contador_bonus/tierraCount').getComponent(cc.Label).string = this._emptyTiles;

        this.remainingChoices -= 1;
        var rem = cc.find('Galapagos/uiLayer/contadores/contador_apuestas/remainingMoves').getComponent(cc.Label).string = this.remainingChoices;

        

        switch (str)
        {
            case "E":
                tile = cc.find('Galapagos/gameLayer/tiles/empty');
                break;
            case "G1":
                tile = cc.find('Galapagos/gameLayer/animals/tortugaGalapagos/tortuga_galapagos_1');
                tp = cc.find('Galapagos/gameLayer/animals/tabla_pagos/tp_tortugag_1');
                var sprite = cc.find('Galapagos/uiLayer/tablaPagos/tortugaGalapagos/tp_tortugag_1').getComponent(cc.Sprite).spriteFrame = tp.getComponent(cc.Sprite).spriteFrame;
                this._iTilesTortugaGalapagos += 1;
                break;
            case "G2":
                tile = cc.find('Galapagos/gameLayer/animals/tortugaGalapagos/tortuga_galapagos_2');
                tp = cc.find('Galapagos/gameLayer/animals/tabla_pagos/tp_tortugag_2');
                var sprite = cc.find('Galapagos/uiLayer/tablaPagos/tortugaGalapagos/tp_tortugag_2').getComponent(cc.Sprite).spriteFrame = tp.getComponent(cc.Sprite).spriteFrame;
                this._iTilesTortugaGalapagos += 1;
                break;
            case "G3":
                tile = cc.find('Galapagos/gameLayer/animals/tortugaGalapagos/tortuga_galapagos_3');
                tp = cc.find('Galapagos/gameLayer/animals/tabla_pagos/tp_tortugag_3');
                var sprite = cc.find('Galapagos/uiLayer/tablaPagos/tortugaGalapagos/tp_tortugag_3').getComponent(cc.Sprite).spriteFrame = tp.getComponent(cc.Sprite).spriteFrame;
                this._iTilesTortugaGalapagos += 1;
                break;
            case "G4":
                tile = cc.find('Galapagos/gameLayer/animals/tortugaGalapagos/tortuga_galapagos_4');
                tp = cc.find('Galapagos/gameLayer/animals/tabla_pagos/tp_tortugag_4');
                var sprite = cc.find('Galapagos/uiLayer/tablaPagos/tortugaGalapagos/tp_tortugag_4').getComponent(cc.Sprite).spriteFrame = tp.getComponent(cc.Sprite).spriteFrame;
                this._iTilesTortugaGalapagos += 1;
                break;
            case "G5":
                tile = cc.find('Galapagos/gameLayer/animals/tortugaGalapagos/tortuga_galapagos_5');
                tp = cc.find('Galapagos/gameLayer/animals/tabla_pagos/tp_tortugag_5');
                var sprite = cc.find('Galapagos/uiLayer/tablaPagos/tortugaGalapagos/tp_tortugag_5').getComponent(cc.Sprite).spriteFrame = tp.getComponent(cc.Sprite).spriteFrame;
                this._iTilesTortugaGalapagos += 1;
                break;
            case "M1":
                tile = cc.find('Galapagos/gameLayer/animals/tortugaMarina/tortuga_marina_1');
                tp = cc.find('Galapagos/gameLayer/animals/tabla_pagos/tp_tortugam_1');
                var sprite = cc.find('Galapagos/uiLayer/tablaPagos/tortugaMarina/tp_tortugam_1').getComponent(cc.Sprite).spriteFrame = tp.getComponent(cc.Sprite).spriteFrame;
                this._iTilesTortugaMarina += 1;
                break;
            case "M2":
                tile = cc.find('Galapagos/gameLayer/animals/tortugaMarina/tortuga_marina_2');
                tp = cc.find('Galapagos/gameLayer/animals/tabla_pagos/tp_tortugam_2');
                var sprite = cc.find('Galapagos/uiLayer/tablaPagos/tortugaMarina/tp_tortugam_2').getComponent(cc.Sprite).spriteFrame = tp.getComponent(cc.Sprite).spriteFrame;
                this._iTilesTortugaMarina += 1;
                break;
            case "M3":
                tile = cc.find('Galapagos/gameLayer/animals/tortugaMarina/tortuga_marina_3');
                tp = cc.find('Galapagos/gameLayer/animals/tabla_pagos/tp_tortugam_3');
                var sprite = cc.find('Galapagos/uiLayer/tablaPagos/tortugaMarina/tp_tortugam_3').getComponent(cc.Sprite).spriteFrame = tp.getComponent(cc.Sprite).spriteFrame;
                this._iTilesTortugaMarina += 1;
                break;
            case "M4":
                tile = cc.find('Galapagos/gameLayer/animals/tortugaMarina/tortuga_marina_4');
                tp = cc.find('Galapagos/gameLayer/animals/tabla_pagos/tp_tortugam_4');
                var sprite = cc.find('Galapagos/uiLayer/tablaPagos/tortugaMarina/tp_tortugam_4').getComponent(cc.Sprite).spriteFrame = tp.getComponent(cc.Sprite).spriteFrame;
                this._iTilesTortugaMarina += 1;
                break;
            case "I1":
                tile = cc.find('Galapagos/gameLayer/animals/iguana/iguana_1');
                tp = cc.find('Galapagos/gameLayer/animals/tabla_pagos/tp_iguana_1');
                var sprite = cc.find('Galapagos/uiLayer/tablaPagos/iguana/tp_iguana_1').getComponent(cc.Sprite).spriteFrame = tp.getComponent(cc.Sprite).spriteFrame;
                this._iTilesIguana += 1;
                break;
            case "I2":
                tile = cc.find('Galapagos/gameLayer/animals/iguana/iguana_2');
                tp = cc.find('Galapagos/gameLayer/animals/tabla_pagos/tp_iguana_2');
                var sprite = cc.find('Galapagos/uiLayer/tablaPagos/iguana/tp_iguana_2').getComponent(cc.Sprite).spriteFrame = tp.getComponent(cc.Sprite).spriteFrame;
                this._iTilesIguana += 1;
                break;
            case "I3":
                tile = cc.find('Galapagos/gameLayer/animals/iguana/iguana_3');
                tp = cc.find('Galapagos/gameLayer/animals/tabla_pagos/tp_iguana_3');
                var sprite = cc.find('Galapagos/uiLayer/tablaPagos/iguana/tp_iguana_3').getComponent(cc.Sprite).spriteFrame = tp.getComponent(cc.Sprite).spriteFrame;
                this._iTilesIguana += 1;
                break;
            case "F1":
                tile = cc.find('Galapagos/gameLayer/animals/foca/foca_1');
                tp = cc.find('Galapagos/gameLayer/animals/tabla_pagos/tp_foca_1');
                var sprite = cc.find('Galapagos/uiLayer/tablaPagos/foca/tp_foca_1').getComponent(cc.Sprite).spriteFrame = tp.getComponent(cc.Sprite).spriteFrame;
                this._iTilesFoca += 1;
                break;
            case "F2":
                tile = cc.find('Galapagos/gameLayer/animals/foca/foca_2');
                tp = cc.find('Galapagos/gameLayer/animals/tabla_pagos/tp_foca_2');
                var sprite = cc.find('Galapagos/uiLayer/tablaPagos/foca/tp_foca_2').getComponent(cc.Sprite).spriteFrame = tp.getComponent(cc.Sprite).spriteFrame;
                this._iTilesFoca += 1;
                break;
            case "T":
                tile = cc.find('Galapagos/gameLayer/animals/tiburon/tiburon_1');
                tp = cc.find('Galapagos/gameLayer/animals/tabla_pagos/tp_tiburon_1');
                var sprite = cc.find('Galapagos/uiLayer/tablaPagos/tiburon/tp_tiburon_1').getComponent(cc.Sprite).spriteFrame = tp.getComponent(cc.Sprite).spriteFrame;
                this._iTilesTiburon += 1;
                break;

        }

        this.checkfullTortugaGalapagos();
        this.checkfullTortugaMarina();
        this.checkFullIguana();
        this.checkFullFoca();
        this.checkFullTiburon();

        //cc.log("Tierras: " + this._tierras);

        return tile.getComponent(cc.Sprite);
    },

    checkTileArray(a, obj) 
    {
    var i = a.length;
        
    while (i--) 
    {
       if (obj === "E") { cc.log(obj + " encontrado."); return false; }     // Quiero que salga del loop si encuentra un casillero vacio.
       if (a[i] === obj) { cc.log(obj + " encontrado."); return true; }
    }

    return false;
    },

    doPlusApuesta ()
    {
        this._timesBet += 1;

        if (this._timesBet <= 1)
        {
            this.remainingChoices = 5;
        }
        else
        {
            this.remainingChoices = 1;
        }

        var rem = cc.find('Galapagos/uiLayer/contadores/contador_apuestas/remainingMoves').getComponent(cc.Label).string = this.remainingChoices;
      
    },

    checkfullTortugaGalapagos(){
        if (this._iTilesTortugaGalapagos == 5)
        {
            var audioNode = cc.find('Galapagos/audioManager');
            this._audioManager = audioNode.getComponent('audioManager');
            this._audioManager.playSweep();

            this.scheduleOnce(function()
            {
                var frame_vacio = cc.find('Galapagos/uiLayer/festejos/win_frame').getComponent(cc.Sprite).spriteFrame = cc.find('Galapagos/hiddenLayer/win_frame').getComponent(cc.Sprite).spriteFrame;
                var animal_vacio = cc.find('Galapagos/uiLayer/festejos/screen_animal').getComponent(cc.Sprite).spriteFrame = cc.find('Galapagos/hiddenLayer/screen_tortugag').getComponent(cc.Sprite).spriteFrame;
            }, 0.3);

            this.scheduleOnce(function()
            {
                var frame_vacio = cc.find('Galapagos/uiLayer/festejos/win_frame').getComponent(cc.Sprite).spriteFrame = null;
                var animal_vacio = cc.find('Galapagos/uiLayer/festejos/screen_animal').getComponent(cc.Sprite).spriteFrame = null;
            }, 2);
            cc.log("Tortuga Galápagos Completa!");

            this._iTilesTortugaGalapagos = 0;
        }
    },

    checkfullTortugaMarina(){
        if (this._iTilesTortugaMarina == 4)
        {
            var audioNode = cc.find('Galapagos/audioManager');
            this._audioManager = audioNode.getComponent('audioManager');
            this._audioManager.playSweep();

            this.scheduleOnce(function()
            {
                var frame_vacio = cc.find('Galapagos/uiLayer/festejos/win_frame').getComponent(cc.Sprite).spriteFrame = cc.find('Galapagos/hiddenLayer/win_frame').getComponent(cc.Sprite).spriteFrame;
                var animal_vacio = cc.find('Galapagos/uiLayer/festejos/screen_animal').getComponent(cc.Sprite).spriteFrame = cc.find('Galapagos/hiddenLayer/screen_tortugam').getComponent(cc.Sprite).spriteFrame;
            }, 0.3);

            this.scheduleOnce(function()
            {
                var frame_vacio = cc.find('Galapagos/uiLayer/festejos/win_frame').getComponent(cc.Sprite).spriteFrame = null;
                var animal_vacio = cc.find('Galapagos/uiLayer/festejos/screen_animal').getComponent(cc.Sprite).spriteFrame = null;
            }, 2);
            cc.log("Tortuga Marina Completa!");

            this._iTilesTortugaMarina = 0;
        }
    },

    checkFullIguana(){
        if (this._iTilesIguana == 3)
        {
            var audioNode = cc.find('Galapagos/audioManager');
            this._audioManager = audioNode.getComponent('audioManager');
            this._audioManager.playSweep();

            this.scheduleOnce(function()
            {
                var frame_vacio = cc.find('Galapagos/uiLayer/festejos/win_frame').getComponent(cc.Sprite).spriteFrame = cc.find('Galapagos/hiddenLayer/win_frame').getComponent(cc.Sprite).spriteFrame;
                var animal_vacio = cc.find('Galapagos/uiLayer/festejos/screen_animal').getComponent(cc.Sprite).spriteFrame = cc.find('Galapagos/hiddenLayer/screen_iguana').getComponent(cc.Sprite).spriteFrame;
            }, 0.3);

            this.scheduleOnce(function()
            {
                var frame_vacio = cc.find('Galapagos/uiLayer/festejos/win_frame').getComponent(cc.Sprite).spriteFrame = null;
                var animal_vacio = cc.find('Galapagos/uiLayer/festejos/screen_animal').getComponent(cc.Sprite).spriteFrame = null;
            }, 2);
            cc.log("Iguana Completa!");

            this._iTilesIguana = 0;
        }
    },

    checkFullFoca(){
        if (this._iTilesFoca == 2)
        {
            var audioNode = cc.find('Galapagos/audioManager');
            this._audioManager = audioNode.getComponent('audioManager');
            this._audioManager.playSweep();
            
            this.scheduleOnce(function()
            {
                var frame_vacio = cc.find('Galapagos/uiLayer/festejos/win_frame').getComponent(cc.Sprite).spriteFrame = cc.find('Galapagos/hiddenLayer/win_frame').getComponent(cc.Sprite).spriteFrame;
                var animal_vacio = cc.find('Galapagos/uiLayer/festejos/screen_animal').getComponent(cc.Sprite).spriteFrame = cc.find('Galapagos/hiddenLayer/screen_foca').getComponent(cc.Sprite).spriteFrame;
            }, 0.3);

            this.scheduleOnce(function()
            {
                var frame_vacio = cc.find('Galapagos/uiLayer/festejos/win_frame').getComponent(cc.Sprite).spriteFrame = null;
                var animal_vacio = cc.find('Galapagos/uiLayer/festejos/screen_animal').getComponent(cc.Sprite).spriteFrame = null;
            }, 2);

            cc.log("Foca Completa!");

            this._iTilesFoca = 0;
        }
    },

    checkFullTiburon(){
        if (this._iTilesTiburon >= 1)
        {
            var audioNode = cc.find('Galapagos/audioManager');
            this._audioManager = audioNode.getComponent('audioManager');
            this._audioManager.playSweep();

            this.scheduleOnce(function()
            {
                var frame_vacio = cc.find('Galapagos/uiLayer/festejos/win_frame').getComponent(cc.Sprite).spriteFrame = cc.find('Galapagos/hiddenLayer/win_frame').getComponent(cc.Sprite).spriteFrame;
                var animal_vacio = cc.find('Galapagos/uiLayer/festejos/screen_animal').getComponent(cc.Sprite).spriteFrame = cc.find('Galapagos/hiddenLayer/screen_tiburon').getComponent(cc.Sprite).spriteFrame;
            }, 0.3);

            this.scheduleOnce(function()
            {
                var frame_vacio = cc.find('Galapagos/uiLayer/festejos/win_frame').getComponent(cc.Sprite).spriteFrame = null;
                var animal_vacio = cc.find('Galapagos/uiLayer/festejos/screen_animal').getComponent(cc.Sprite).spriteFrame = null;
            }, 2);


            cc.log("Tiburon Completo!");
        
            this._iTilesTiburon = 0;
        }
        
    }

});
