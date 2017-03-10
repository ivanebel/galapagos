cc.Class({
    extends: cc.Component,

    properties: {
        _bonusLabel: cc.Node,
        _winPrizeLayer: cc.Node,

        _gameStarted: false,

        _lblMoney: cc.Label,
        _lblCredits: cc.Label,
        _lblBet: cc.Label,
        _lblPrize: cc.Label,
        _lblBonus: cc.Label,

        _iCredits: 10000,
        _iBet: 0,
        _iBetValue: 0,
        _iPrize: 0,

        _btnAssistant: null,
        _btnBet: null,
        _btnBet1: null,
        _btnBet2: null,
        _btnBet3: null,
        _btnBet4: null,
        _btnMaxBet: null,
        _btnClearBet: null,
        _btnCashout: null,
        _btnLeave: null,
        _btnStartGame: null,
        _btnTicket: null,

        _ui_anim: null
    },

    // use this for initialization
    onLoad: function () {

    },

    init: function()
    {
        console.log('Interface Init...' );
        
        var self = this;

        //this._ui_anim = cc.find('uiLayer').getComponent(cc.Animation);
        this._iBetValue = 10;
        this._iCredits = 10000;

        this._gameStarted = false;

        var listener = {
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function (keyCode, event) {
                
                console.log('Interface keyDown: ' + keyCode);
                
                switch (keyCode) {
                    case cc.KEY.b: 
                        //this._ui_anim.stop('ui_glow_anim');
                        
                        cc.director.loadScene('bonus'); 
                        break;
                    case cc.KEY.l: 
                        cc.director.loadScene('galapagos-main'); 
                        break;
                    case cc.KEY.e: 
                        cc.game.pause(); 
                        cc.game.end(); 
                        break;           
                }
            }
        }

        cc.eventManager.addListener( listener, self.node );

        this._bonusLabel = this.node.getChildByName('bonusLabel');
        this._winPrizeLayer = this.node.getChildByName('winPrize');
        
        
        //LABELS
        this._lblMoney = this.node.getChildByName('counters').getChildByName('lblMoney').getComponent(cc.Label);
        this._lblCredits = this.node.getChildByName('counters').getChildByName('lblCredits').getComponent(cc.Label);
        this._lblBet = this.node.getChildByName('counters').getChildByName('lblBet').getComponent(cc.Label);
        this._lblPrize = this.node.getChildByName('counters').getChildByName('lblPrize').getComponent(cc.Label);
        //this._lblBonus = this.node.getChildByName('labels').getChildByName('lblBonus').getComponent(cc.Label);
        
        
        //BOTONES
        //this._btnAssistant =
        //this._btnBet =
        this._btnBet1 = this.node.getChildByName('buttons').getChildByName('btnBets').getChildByName('btnBet1').getComponent(cc.Button);
        this._btnBet2 = this.node.getChildByName('buttons').getChildByName('btnBets').getChildByName('btnBet2').getComponent(cc.Button);
        this._btnBet3 = this.node.getChildByName('buttons').getChildByName('btnBets').getChildByName('btnBet3').getComponent(cc.Button);
        this._btnBet4 = this.node.getChildByName('buttons').getChildByName('btnBets').getChildByName('btnBet4').getComponent(cc.Button);
        
        this._btnMaxBet = this.node.getChildByName('buttons').getChildByName('btnBets').getChildByName('btnMaxBet').getComponent(cc.Button);
        this._btnClearBet = this.node.getChildByName('buttons').getChildByName('btnBets').getChildByName('btnClearBet').getComponent(cc.Button);
        
        this._btnStartGame = this.node.getChildByName('buttons').getChildByName('btnPlay').getChildByName('bPlay').getComponent(cc.Button);
        this._btnStartGame.interactable = true;

        this._btnCashout = this.node.getChildByName('buttons').getChildByName('btnCashout').getChildByName('bCashout').getComponent(cc.Button);
        this._btnLeave = this.node.getChildByName('buttons').getChildByName('btnMenu').getComponent(cc.Button);
        //this._btnTicket =

        //this._btnBet1.interactable = false;
        //this._btnBet2.interactable = false;
        //this._btnBet3.interactable = false;
        //this._btnBet4.interactable = false;
        
        /** 
        //communicator
        communicator.register("buttonstate", this.onButtonState.bind(this));
        communicator.register("accountstate", this.onAccountState.bind(this));
        communicator.register("betvalues", this.onBetValues.bind(this));
        communicator.register("addprizeanimation", this.onAddPrizeAnimation.bind(this));
        communicator.register("winanimation", this.onWinAnimation.bind(this));
        */
    },

    onButtonState: function ( jsonData ) {
        //Se recibe el mensaje de cambio de estado de botones...
        console.log('Recibimos ButtonState...' );
        var betEnabled = ( jsonData.betbutton === 'Enabled' );
        
        this._btnBet1.interactable = betEnabled;
        this._btnBet2.interactable = betEnabled;
        this._btnBet3.interactable = betEnabled;
        this._btnBet4.interactable = betEnabled;
        
        this._btnClearBet.interactable = ( jsonData.clearbet === 'Enabled' );
        this._btnMaxBet.interactable = ( jsonData.maxbet === 'Enabled' );
        this._btnStartGame.interactable = ( jsonData.startgame === 'Enabled' );
        //this._btnCashout.interactable = ( jsonData.cashout === 'Enabled' );
        this._btnLeave.interactable = ( jsonData.leave === 'Enabled' );
        
        //this._btnStartGame.node.active = ( jsonData.cashout === 'Enabled' );
        //this._btnCashout.node.active = ( jsonData.cashout === 'Enabled' );
    },

    onAccountState: function ( jsonData ) {
        console.log('Recibimos AccountState...');
        //Se recibe el mensaje de la cuenta...
        this._lblMoney.string = jsonData.money;
        this._lblCredits.string = jsonData.credits;
        this._lblBet.string = jsonData.bet;
        this._lblPrize.string = jsonData.prize;
       // this._lblBonus.string = jsonData.bonus;
        
    },

    onBetValues: function ( jsonData ) {
        //Se recibe el mensaje de los creditos para apostar
        //Hay que ponerlos en los botones...
        this._btnBet1.clickEvents[0].customEventData = jsonData.betvalue[0];
        this._btnBet2.clickEvents[0].customEventData = jsonData.betvalue[1];
        this._btnBet3.clickEvents[0].customEventData = jsonData.betvalue[2];
        this._btnBet4.clickEvents[0].customEventData = jsonData.betvalue[3];

        this._btnBet1.interactable = !( jsonData.betvalue[0].indexOf('d') >= 0 ) ;
        this._btnBet2.interactable = !( jsonData.betvalue[1].indexOf('d') >= 0 ) ;
        this._btnBet3.interactable = !( jsonData.betvalue[2].indexOf('d') >= 0 ) ;
        this._btnBet3.interactable = !( jsonData.betvalue[3].indexOf('d') >= 0 ) ;
        
    },
    
    onAddPrizeAnimation: function ( jsonData ) {
        console.log('Recibimos AddPrizeAnimation...');
        //no tengo bien claro para que llega, porque en GB no esta...      
        
    },

    btnLeaveClick: function () {
        console.log('Boton Salir....');
        communicator.sendMessage( 'ExitGame {"data":{}}' );
        
        //De codigo de InfoBiz
        if(parent.hasOwnProperty("WindowAPI")){
				parent.WindowAPI.CloseWindow(document.location.toString());
        }else{
				window.close();
			}        
    },

    btnBetClick : function(event, customEventData) {
        console.log('Boton de apuesta....' + customEventData );
        //communicator.sendMessage( 'Bet {"data":{"bet":'+customEventData+'}}' );        

        //this.node.getChildByName('tmp').getComponent(cc.Label).string = 'Apuesta:' + customEventData;
        switch (customEventData)
        {
            case "bBet1":
                var bet = this._iBetValue * 1;
                this._iBet = this._iBet + bet;
                this._iCredits = this._iCredits - bet;
                break;
            case "bBet2":
                var bet = this._iBetValue * 5;
                this._iBet = this._iBet + bet;
                this._iCredits = this._iCredits - bet;
                break;
            case "bBet3":
                var bet = this._iBetValue * 10;
                this._iBet = this._iBet + bet;
                this._iCredits = this._iCredits - bet;
                break;
            case "bBet4":
                var bet = this._iBetValue * 25;
                this._iBet = this._iBet + bet;
                this._iCredits = this._iCredits - bet;
                break;
        }

        this._lblBet.string = this._iBet;
        this._lblCredits.string = this._iCredits;

        if(this._iBet > 0)
        {
            this._btnStartGame.interactable = true;
        }

        
    },
    
    btnStartGameClick: function () {
        console.log('Boton Jugar...');
        //communicator.sendMessage( 'ClearBoard {"data":{}}' );

        this.node.getChildByName('buttons').getChildByName('btnPlay').active = false;
        this.node.getChildByName('buttons').getChildByName('btnCashout').active = true;
        this._btnCashout.interactable = false;

        this._btnBet1.interactable = false;
        this._btnBet2.interactable = false;
        this._btnBet3.interactable = false;
        this._btnBet4.interactable = false;

        this._btnMaxBet.interactable = false;
        this._btnClearBet.interactable = false;

        if (this._iBet == 0)
        {
            this._iBet = this._iBetValue;
            this._lblBet.string = this._iBet;
            this._iCredits = this._iCredits - this._iBet;
            this._lblCredits.string = this._iCredits;
        }

        this._gameStarted = true;

    },

    btnCashoutClick: function () {
        console.log('Boton Cobrar...');
        //communicator.sendMessage( 'Cashout {"data":{}}' );        
    },

    btnClearBetClick: function() {
        console.log('Limpio apuesta');
        this._iBet = 0;
        this._lblBet.string = this._iBet;
        this._iCredits = 10000;
        this._lblCredits = this._iCredits;

        this._btnStartGame.interactable = false;
    },

    btnReglasShow: function()
    {
        cc.find('uiLayer/reglas').getComponent(cc.Animation).play('reglas_show_anim');
    },

    btnReglasBack: function()
    {
        cc.find('uiLayer/reglas').getComponent(cc.Animation).play('reglas_hide_anim');
    }
/*
    btnGoToBonus: function()
    {
        cc.director.loadScene('bonus', this.onBonusLoaded.bind(this) );
    },

    //callback de carga de galapagos-main
    onBonusLoaded: function () 
    {
        //Luego de que se carga el outside llamamos a comenzar el juego...
        this.activeScene =  cc.director.getScene();
        this.activeComp = this.activeScene.getChildByName('Bonus').getComponent('initBonus'); 
        this.activeComp.init( this );
        

    },
*/
    
});
