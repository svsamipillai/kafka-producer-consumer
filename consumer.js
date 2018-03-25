let kafka = require("kafka-node"),
    Consumer = kafka.Consumer,
    client = new kafka.Client("159.89.180.227:2181"),
    consumer = new Consumer(client, [{ topic: "check" }], {
        autoCommit: true,
        encoding: "UTF-8",
        fromOffset: true
    });

consumer.on("message", function(message) {
    console.log("Consumer: message", JSON.stringify(message));
});

consumer.on("error", function(error) {
    console.log("error", error);
});

consumer.on("offsetOutOfRange", function(offsetOutOfRange) {
    console.log("offsetOutOfRange", offsetOutOfRange);
});
