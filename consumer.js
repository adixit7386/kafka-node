const kafka = require("./config.js");
const group = process.argv[2];
async function init() {
  const consumer = kafka.consumer({ groupId: group });
  console.log("Connecting...");
  await consumer.connect();
  console.log("Connected!");
  await consumer.subscribe({ topic: "riders", fromBeginning: true });
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(`Rider: ${group} ${partition} : ${message.value}`);
    },
  });
}
init().catch(console.error);
