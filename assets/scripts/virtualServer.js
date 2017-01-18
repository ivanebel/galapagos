cc.Class({
    extends: cc.Component,

    properties: {
        _shuffler: null,

        _shuffledArray: null,
        _shuffledBonus: null,
        _fakeTicket: ''
    },

    // use this for initialization
    onLoad: function () {
        this.generate();
    },

    /**
     * Genera un ticket de forma aleatoria.
     */
    generate() {
        //this._fakeTicket = [];

        this._shuffler = this.node.getComponent('shuffle');

        this._shuffledArray = this._shuffler.shuffle();
        this._shuffledBonus = this._shuffler.shuffleBonus();

        cc.log("Isla:" + this._shuffledArray);
        cc.log("Bonus:" + this._shuffledBonus);

        //this._fakeTicket.push(this._shuffledArray);
        this._fakeTicket = this._shuffledArray;

    },

    /**
     * 
     */
    getTileContent(position) {
        var str = this._fakeTicket[position];
        return str;
    }

});
