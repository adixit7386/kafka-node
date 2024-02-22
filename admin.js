const dotenv = require("dotenv");
const kafka = require("./config.js");

async function init() {
  const admin = kafka.admin();
  console.log("Connecting...");
  await admin.connect();
  console.log("Connected!");
  console.log("Creating topics...");
  await admin.createTopics({
    topics: [
      {
        topic: "riders",
        numPartitions: 2,
      },
    ],
  });

  console.log("Created Topics!");
  await admin.disconnect();
  console.log("Disconnected!");
}

init().catch(console.error);
