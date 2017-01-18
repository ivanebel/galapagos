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

    shuffleBonus(){
        var tileArray = ["S1", "S2", "S3", "S4", "S5" ];

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



});
