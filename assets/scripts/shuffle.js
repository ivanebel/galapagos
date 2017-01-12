cc.Class({
    extends: cc.Component,

    properties: {

        _shuffledArray: null
    },

    // use this for initialization
    onLoad: function () {
        
        this._shuffledArray = this.shuffle();
    },

    /**
     * Shuffles an array
     */
    shuffle() {

        var tileArray = ["G1", "G2", "G3", "G4", "G5",
                          "I1", "I2", "I3", "I4",
                          "F1", "F2", "F3",
                          "A1", "A2",
                          "P", "P",
                          "T", "T", "T", "T", "T", "T", "T",
                          "T", "T", "T", "T", "T", "T", "T" ];

        var currentIndex = tileArray.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = tileArray[currentIndex];
            tileArray[currentIndex] = tileArray[randomIndex];
            tileArray[randomIndex] = temporaryValue;
        }

    return tileArray;
    }



});
