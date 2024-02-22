const kafka = require("./config.js");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
async function init() {
  const producer = kafka.producer();
  console.log("Connecting...");
  await producer.connect();
  console.log("Connected!");
  console.log("Sending messages...");
  rl.setPrompt("> ");
  rl.prompt();
  rl.on("line", async (line) => {
    const [riderName, location] = line.split(" ");
    await producer.send({
      topic: "riders",
      messages: [
        {
          partition: location.toLowerCase() === "north" ? 0 : 1,
          key: "location-update",
          value: JSON.stringify({ name: riderName, location: location }),
        },
      ],
    });
    console.log("Messages sent!");
  }).on("close", async () => {
    await producer.disconnect();
    console.log("Disconnected!");
  });
}
init();
