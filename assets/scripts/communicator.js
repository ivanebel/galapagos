var communicator = {
    messageDict: {},
    loaded: false,

    load: function () {
        var self = this;

        //        this.messageDict = {};
        //        this.loaded = false;

        //        self.ws = new WebSocket("ws://192.168.2.130:9022");
        self.ws = new WebSocket("ws://localhost:9022");

        self.ws.onopen = function (event) {
            console.log("Send Text WS was opened.");

            setTimeout(function () {
                if (self.ws.readyState !== WebSocket.OPEN) {
                    console.log("WebSocket instance wasn't ready...");

                    self.processMessage({
                        data: "{\"events\":[\"halt\"], \"halt\":{\"message\":\"WebSocket instance wasn´t ready...\", \"errorcode\":\"0x00\"}}"
                    });
                } else {
                    //self.ws.send("initialdata {\"data\":{}}");
                }
            }, 500);
        };

        self.ws.onerror = function (event) {
            console.log("Send Text fired an error");
        };

        self.ws.onclose = function (event) {
            console.log("WebSocket instance closed.");

            self.processMessage({
                data: "{\"events\":[\"halt\"], \"halt\":{\"message\":\"WebSocket instance closed.\", \"errorcode\":\"0x00\"}}"
            });
        };

        self.ws.onmessage = this.processMessage.bind(this);
    },

    sendMessage: function (message) {
        console.log("Send Message", message);

        if (this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(message);
        }
    },

    register: function (messageName, callback) {
        if (!this.messageDict[messageName]) {
            this.messageDict[messageName] = [];
        }

        this.messageDict[messageName].push(callback);

        console.log("Registered message callback", messageName);

        if (!this.loaded) {
            this.loaded = true;
            this.load();
        }
    },

    processMessage: function (event) {
        if (!event.data) return;

        var i = 0,
            j = 0,
            handler,
            jsonMsg = JSON.parse(event.data),
            messageName = "",
            messageObject = {},
            isParsed = false;

        if (typeof jsonMsg.event === 'string') {
            var newJsonMsg = {};
            newJsonMsg.events = [jsonMsg.event];
            newJsonMsg[jsonMsg.event] = jsonMsg;
            jsonMsg = newJsonMsg;
        } else {
            jsonMsg.events = jsonMsg.event;
        }

        console.log('Incoming Message ', jsonMsg);

        if (jsonMsg.events) {
            for (i = 0; i < jsonMsg.events.length; i++) {
                isParsed = false;
                messageName = jsonMsg.events[i];
                messageObject = jsonMsg[messageName];

                if (this.messageDict && this.messageDict[messageName]) {
                    var callbacks = this.messageDict[messageName];

                    for (j = 0; j < callbacks.length; j++) {
                        isParsed = true;
                        callbacks[j].call(this, messageObject);
                    }
                }

                if (!isParsed) {
                    console.log('Handler for message ' + messageName + ' undefined.');
                }
            }
        }
    },
};

//communicator.load();

module.exports = communicator;