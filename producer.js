let kafka = require("kafka-node");
let fs = require("fs");
let Producer = kafka.Producer;
let Client = kafka.Client;
let client = new Client("159.89.180.227:2181");
let producer = new Producer(client, { requireAcks: 1 });
let topic = "check";
const Rx = require("rx-lite");
const moment = require("moment");

client.once("connect", function() {
    client.loadMetadataForTopics([topic], function(error, results) {
        if (error) {
            return console.error(error);
        }
        console.log("Metadata: " + JSON.stringify(results));
    });
});

producer.on("ready", () => {
    Rx.Scheduler.immediate.schedulePeriodic("", 1000, () => {
        for (let i = 0; i < 5; i++) {
            producer.send(
                [
                    {
                        topic: topic,
                        messages: JSON.stringify({ time: moment().utc() })
                    }
                ],
                function(err, result) {
                    if (err) {
                        console.log("Producer error: " + err);
                    } else {
                        console.log("Message sent: " + JSON.stringify(result));
                    }
                }
            );
        }
    });
});

producer.on("error", function(err) {
    console.log("error", err);
});
