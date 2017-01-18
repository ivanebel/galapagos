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

        _iTilesTortuga: 0,
        _iTilesIguana: 0,
        _iTilesFoca: 0,
        _iTilesAve: 0,
        _iTilesPinguino: 0,

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

        _tierras: 0,

        _timesBet: 0

    },

    // use this for initialization
    onLoad: function () {
        this._gameServer = this.node.getComponent('virtualServer');
        cc.log('Loading VirtualServer');

        this.tileTierra = cc.find('Galapagos/gameLayer/tiles/tierra');

        this.remainingChoices = 5;
        var rem = cc.find('Galapagos/uiLayer/remainingMoves').getComponent(cc.Label).string = this.remainingChoices;

        this._timesBet = 0;

//Solo para pruebas, mostrar el contenido de cada tile:
        var isla = cc.find('Galapagos/uiLayer/lblTiles').getComponent(cc.Label).string = this._gameServer._fakeTicket.toString();

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
        if (customEventData == "plusApuesta")
        {
            this.doPlusApuesta();
            return;
        }

        var pos = customEventData;

        var content = this._gameServer._fakeTicket[pos];

        cc.log(content);

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

        switch (pos) {
            //Fila A
            case "0":
                var sprite = cc.find('Galapagos/gameLayer/tiles/row_a/a1').getComponent(cc.Sprite).spriteFrame = tileComponent.spriteFrame;
                break;
            case "1":
                var sprite = cc.find('Galapagos/gameLayer/tiles/row_a/a2').getComponent(cc.Sprite).spriteFrame = tileComponent.spriteFrame;
                break;
            case "2":
                var sprite = cc.find('Galapagos/gameLayer/tiles/row_a/a3').getComponent(cc.Sprite).spriteFrame = tileComponent.spriteFrame;
                break;
            case "3":
                var sprite = cc.find('Galapagos/gameLayer/tiles/row_a/a4').getComponent(cc.Sprite).spriteFrame = tileComponent.spriteFrame;
                break;
            case "4":
                var sprite = cc.find('Galapagos/gameLayer/tiles/row_a/a5').getComponent(cc.Sprite).spriteFrame = tileComponent.spriteFrame;
                break;
            case "5":
                var sprite = cc.find('Galapagos/gameLayer/tiles/row_a/a6').getComponent(cc.Sprite).spriteFrame = tileComponent.spriteFrame;
                break;

            //Fila B
            case "6":
                var sprite = cc.find('Galapagos/gameLayer/tiles/row_b/b1').getComponent(cc.Sprite).spriteFrame = tileComponent.spriteFrame;
                break;
            case "7":
                var sprite = cc.find('Galapagos/gameLayer/tiles/row_b/b2').getComponent(cc.Sprite).spriteFrame = tileComponent.spriteFrame;
                break;
            case "8":
                var sprite = cc.find('Galapagos/gameLayer/tiles/row_b/b3').getComponent(cc.Sprite).spriteFrame = tileComponent.spriteFrame;
                break;
            case "9":
                var sprite = cc.find('Galapagos/gameLayer/tiles/row_b/b4').getComponent(cc.Sprite).spriteFrame = tileComponent.spriteFrame;
                break;
            case "10":
                var sprite = cc.find('Galapagos/gameLayer/tiles/row_b/b5').getComponent(cc.Sprite).spriteFrame = tileComponent.spriteFrame;
                break;
            case "11":
                var sprite = cc.find('Galapagos/gameLayer/tiles/row_b/b6').getComponent(cc.Sprite).spriteFrame = tileComponent.spriteFrame;
                break;

            //Fila C
            case "12":
                var sprite = cc.find('Galapagos/gameLayer/tiles/row_c/c1').getComponent(cc.Sprite).spriteFrame = tileComponent.spriteFrame;
                break;
            case "13":
                var sprite = cc.find('Galapagos/gameLayer/tiles/row_c/c2').getComponent(cc.Sprite).spriteFrame = tileComponent.spriteFrame;
                break;
            case "14":
                var sprite = cc.find('Galapagos/gameLayer/tiles/row_c/c3').getComponent(cc.Sprite).spriteFrame = tileComponent.spriteFrame;
                break;
            case "15":
                var sprite = cc.find('Galapagos/gameLayer/tiles/row_c/c4').getComponent(cc.Sprite).spriteFrame = tileComponent.spriteFrame;
                break;
            case "16":
                var sprite = cc.find('Galapagos/gameLayer/tiles/row_c/c5').getComponent(cc.Sprite).spriteFrame = tileComponent.spriteFrame;
                break;
            case "17":
                var sprite = cc.find('Galapagos/gameLayer/tiles/row_c/c6').getComponent(cc.Sprite).spriteFrame = tileComponent.spriteFrame;
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

    },

    getTile (str)
    {
        var tile;

        if (str == "T")
        {
            this._tierras += 1;
            if (this._tierras == 4)
            {
                var audioNode = cc.find('Galapagos/audioManager');
                this._audioManager = audioNode.getComponent('audioManager');
                this._audioManager.playSweep();

                cc.director.loadScene('bonus');
            }
        }
        else
        {
            this._tierras = 0;
        }

        var lbl = cc.find('Galapagos/uiLayer/tierraCount').getComponent(cc.Label).string = this._tierras;

        this.remainingChoices -= 1;
        var rem = cc.find('Galapagos/uiLayer/remainingMoves').getComponent(cc.Label).string = this.remainingChoices;

        switch (str)
        {
            case "T":
                tile = cc.find('Galapagos/gameLayer/tiles/tierra');
                break;
            case "G1":
                tile = cc.find('Galapagos/gameLayer/animals/tortuga/Tortuga_01');
                var sprite = cc.find('Galapagos/uiLayer/tablaPagos/tortuga/tpTortuga1').getComponent(cc.Sprite).spriteFrame = tile.getComponent(cc.Sprite).spriteFrame;
                this._iTilesTortuga += 1;
                break;
            case "G2":
                tile = cc.find('Galapagos/gameLayer/animals/tortuga/Tortuga_02');
                var sprite = cc.find('Galapagos/uiLayer/tablaPagos/tortuga/tpTortuga2').getComponent(cc.Sprite).spriteFrame = tile.getComponent(cc.Sprite).spriteFrame;
                this._iTilesTortuga += 1;
                break;
            case "G3":
                tile = cc.find('Galapagos/gameLayer/animals/tortuga/Tortuga_03');
                var sprite = cc.find('Galapagos/uiLayer/tablaPagos/tortuga/tpTortuga3').getComponent(cc.Sprite).spriteFrame = tile.getComponent(cc.Sprite).spriteFrame;
                this._iTilesTortuga += 1;
                break;
            case "G4":
                tile = cc.find('Galapagos/gameLayer/animals/tortuga/Tortuga_04');
                var sprite = cc.find('Galapagos/uiLayer/tablaPagos/tortuga/tpTortuga4').getComponent(cc.Sprite).spriteFrame = tile.getComponent(cc.Sprite).spriteFrame;
                this._iTilesTortuga += 1;
                break;
            case "G5":
                tile = cc.find('Galapagos/gameLayer/animals/tortuga/Tortuga_05');
                var sprite = cc.find('Galapagos/uiLayer/tablaPagos/tortuga/tpTortuga5').getComponent(cc.Sprite).spriteFrame = tile.getComponent(cc.Sprite).spriteFrame;
                this._iTilesTortuga += 1;
                break;
            case "I1":
                tile = cc.find('Galapagos/gameLayer/animals/iguana/Iguana_01');
                var sprite = cc.find('Galapagos/uiLayer/tablaPagos/iguana/tpIguana1').getComponent(cc.Sprite).spriteFrame = tile.getComponent(cc.Sprite).spriteFrame;
                this._iTilesIguana += 1;
                break;
            case "I2":
                tile = cc.find('Galapagos/gameLayer/animals/iguana/Iguana_02');
                var sprite = cc.find('Galapagos/uiLayer/tablaPagos/iguana/tpIguana2').getComponent(cc.Sprite).spriteFrame = tile.getComponent(cc.Sprite).spriteFrame;
                this._iTilesIguana += 1;
                break;
            case "I3":
                tile = cc.find('Galapagos/gameLayer/animals/iguana/Iguana_03');
                var sprite = cc.find('Galapagos/uiLayer/tablaPagos/iguana/tpIguana3').getComponent(cc.Sprite).spriteFrame = tile.getComponent(cc.Sprite).spriteFrame;
                this._iTilesIguana += 1;
                break;
            case "I4":
                tile = cc.find('Galapagos/gameLayer/animals/iguana/Iguana_04');
                var sprite = cc.find('Galapagos/uiLayer/tablaPagos/iguana/tpIguana4').getComponent(cc.Sprite).spriteFrame = tile.getComponent(cc.Sprite).spriteFrame;
                this._iTilesIguana += 1;
                break;
            case "F1":
                tile = cc.find('Galapagos/gameLayer/animals/foca/Foca_01');
                var sprite = cc.find('Galapagos/uiLayer/tablaPagos/foca/tpFoca1').getComponent(cc.Sprite).spriteFrame = tile.getComponent(cc.Sprite).spriteFrame;
                this._iTilesFoca += 1;
                break;
            case "F2":
                tile = cc.find('Galapagos/gameLayer/animals/foca/Foca_02');
                var sprite = cc.find('Galapagos/uiLayer/tablaPagos/foca/tpFoca2').getComponent(cc.Sprite).spriteFrame = tile.getComponent(cc.Sprite).spriteFrame;
                this._iTilesFoca += 1;
                break;
            case "F3":
                tile = cc.find('Galapagos/gameLayer/animals/foca/Foca_03');
                var sprite = cc.find('Galapagos/uiLayer/tablaPagos/foca/tpFoca3').getComponent(cc.Sprite).spriteFrame = tile.getComponent(cc.Sprite).spriteFrame;
                this._iTilesFoca += 1;
                break;
            case "A1":
                tile = cc.find('Galapagos/gameLayer/animals/aveFragata/Ave_Fragata_01');
                var sprite = cc.find('Galapagos/uiLayer/tablaPagos/aveFragata/tpAveFragata1').getComponent(cc.Sprite).spriteFrame = tile.getComponent(cc.Sprite).spriteFrame;
                this._iTilesAve += 1;
                break;
            case "A2":
                tile = cc.find('Galapagos/gameLayer/animals/aveFragata/Ave_Fragata_02');
                var sprite = cc.find('Galapagos/uiLayer/tablaPagos/aveFragata/tpAveFragata2').getComponent(cc.Sprite).spriteFrame = tile.getComponent(cc.Sprite).spriteFrame;
                this._iTilesAve += 1;
                break;
            case "P":
                tile = cc.find('Galapagos/gameLayer/animals/pinguino/Pinguino_01');
                var sprite = cc.find('Galapagos/uiLayer/tablaPagos/pinguino/tpPinguino').getComponent(cc.Sprite).spriteFrame = tile.getComponent(cc.Sprite).spriteFrame;
                this._iTilesPinguino += 1;
                break;
        }

        this.checkfullTortuga();
        this.checkFullIguana();
        this.checkFullFoca();
        this.checkFullAveFragata();
        this.checkFullPinguino();

        //cc.log("Tierras: " + this._tierras);

        return tile.getComponent(cc.Sprite);
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

        var rem = cc.find('Galapagos/uiLayer/remainingMoves').getComponent(cc.Label).string = this.remainingChoices;
      
    },

    checkfullTortuga(){
        if (this._iTilesTortuga == 5)
        {
            var audioNode = cc.find('Galapagos/audioManager');
            this._audioManager = audioNode.getComponent('audioManager');
            this._audioManager.playSweep();
            cc.log("Tortuga Galápagos Completa!");

            this._iTilesTortuga = 0;
        }
    },

    checkFullIguana(){
        if (this._iTilesIguana == 4)
        {
            var audioNode = cc.find('Galapagos/audioManager');
            this._audioManager = audioNode.getComponent('audioManager');
            this._audioManager.playSweep();
            cc.log("Iguana Completa!");

            this._iTilesIguana = 0;
        }
    },

    checkFullFoca(){
        if (this._iTilesFoca == 3)
        {
            var audioNode = cc.find('Galapagos/audioManager');
            this._audioManager = audioNode.getComponent('audioManager');
            this._audioManager.playSweep();
            cc.log("Foca Completa!");

            this._iTilesFoca = 0;
        }
    },

    checkFullAveFragata()
    {
        if (this._iTilesAve == 2)
        {
            var audioNode = cc.find('Galapagos/audioManager');
            this._audioManager = audioNode.getComponent('audioManager');
            this._audioManager.playSweep();
            cc.log("Ave Fragata Completa!");

            this._iTilesAve = 0;
        }
    },

    checkFullPinguino(){
        if (this._iTilesPinguino >= 1)
        {
            var audioNode = cc.find('Galapagos/audioManager');
            this._audioManager = audioNode.getComponent('audioManager');
            this._audioManager.playSweep();
            cc.log("Pinguino Completo!");
        
            this._iTilesPinguino = 0;
        }
        
    }

});
