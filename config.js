const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "myapp",
  brokers: ["192.168.76.51:9092"],
});

module.exports = kafka;
