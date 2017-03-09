cc.Class({
    extends: cc.Component,

    properties: {

        tileTierra:
        {
            default: null,
            type: cc.SpriteFrame
        },

        audio_touch: {
            default: null,
            url: cc.AudioClip
        },
        audio_star: {
            default: null,
            url: cc.AudioClip
        },

        active: true,
        row: 0,
        col: 0,
        content: 'o',
        discovered: false,
        mysticIndex: 0,

        _gameManager: null,
        _star: cc.Node,
        _animal: cc.Node
        
    },

    // use this for initialization
    onLoad: function () {

    },

    init: function ( gameManager ) {
        this._manager = gameManager;
        this._star = this.node.getChildByName('star');
        this._animal = this.node.getChildByName('animal');
        
        var self = this;

        this.node.on( cc.Node.EventType.TOUCH_END, function(event) { self.doTouch(); } );
        
    },

    setMysticIndex: function ( i ) {
        this.mysticIndex = i;
        this.node.getChildByName('lblIndex').getComponent(cc.Label).string = this._manager._fakeTicket[i];
    },

    setAnimal: function ( spriteAnimal )
    {
        this.node.getChildByName('animal').getComponent(cc.Sprite).spriteFrame = spriteAnimal;
    },

    doEmptyTileStuff: function ()
    {
        this.node.getChildByName('question_mark').active = false;
        this.node.getChildByName('bg').opacity = 0;
        this.node.getChildByName('bg_empty').opacity = 200;
        var starAnim = this.node.getChildByName('bonus').getChildByName('star').getComponent('cc.Animation');
        

        this.node.runAction(
            cc.sequence(
                cc.callFunc( function() { starAnim.play('star_found'); }, this ),
                cc.delayTime(1), 
                cc.callFunc( function() { starAnim.play('star_still'); }, this )
            )
        );

        
//cc.callFunc( function() { mouthAnim.play('mouthOpen'); cc.audioEngine.playEffect( this.audio_Mouth ); }, this )
        
    },

    doByeByeStar: function()
    {
        var starNode = this.node.getChildByName('bonus').getChildByName('star');
        starNode.getComponent(cc.Animation).stop('star_still');

        starNode.active = false;

    },

    playExplosion: function()
    {
        var bonusNode = this.node.getChildByName('bonus');
        bonusNode.getComponent(cc.Animation).play('star_explosion');
    },

    playBonusFound: function() 
    {
        var bonusNode = this.node.getChildByName('bonus');
        bonusNode.getComponent(cc.Animation).play('bonus_found');
    },

    playBonusGlow: function()
    {
        var bonusNode = this.node.getChildByName('bonus');
        bonusNode.getComponent(cc.Animation).play('bonus_glow_anim');
    },

    doTouch: function () 
    {
    //console.log('touch bloque: ' + this.lin + ', ' + this.col + '  content: '+ this.content);
    //depende del estado del bloque es lo que hacemos...
    //pero quiza solo pasamos el mensaje al GameManager para que resuelva...
        this._manager.userChoice(this);
    
        if (this._manager._waitUserInput === true) 
        { 
            if (this._manager._activeLine === this.row ) 
            {
                cc.audioEngine.playEffect(this.audio_touch);
            }
        
        
        }
    },

    showContent: function () {

        var firstJumpDelay = ( this.row === 5 )? 0.25 : 0; 
        var insideDelay = ( this.row >= 5 )? 0.15 : 0; 
        
        this.discovered = true;

        switch ( this.content.charAt(0) )
        {
            case 'O': 
                this.scheduleOnce( this.safe , 0.2 + firstJumpDelay + insideDelay ); 
                break;
            case 'X': 
                this.scheduleOnce( this.trap , 0.1 + firstJumpDelay + insideDelay ); 
                break;
            case 'B': 
                this.scheduleOnce( this.bonus , 0.5 );
                break;
        }
            
    },

    showBoardContent: function () {
        //console.log( this.node.name + '.content: ' + this.content.charAt(0) );
        
        if ( !this.discovered ) {
        
            if ( this.content.charAt(0)!=='Q' ) { this.discovered = true };
        
            switch ( this.content.charAt(0) )
            {
                //case 'O': this.safe; break;
                case 'X':
                    this.discoverTrap(); 
                    break;
                case 'B': 
                    this.discoverBonus();
                    break;
            }
        }
            
    },

    glow: function () 
    {
        var anim = this.getComponent(cc.Animation);
        anim.play('BlockGlow');        
        
        this.node.getChildByName('glow').active = true;
    },

    unGlow: function () 
    {
        var anim = this.getComponent(cc.Animation);
        anim.stop('BlockGlow');        
        
        this.node.getChildByName('glow').active = false;
    },

    animal: function () 
    {
        cc.audioEngine.playEffect(this.audio_coins);
        
        this._animal.getComponent(cc.Animation).play('BoxCoins');
   
    },

    star: function () 
    {
        cc.audioEngine.playEffect(this.audio_coins);
        
        this._star.getComponent(cc.Animation).play('BoxCoins');
   
    },

    tilt: function () 
    {
        var anim = this.getComponent(cc.Animation);
        anim.play('BlockTilt');        
    },


});
