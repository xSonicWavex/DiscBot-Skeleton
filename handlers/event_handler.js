const fs = require("node:fs");

module.exports = async (Discord, client) => {
  const loadDirectories = directories => {
    const eventsSubFolder = fs.readdirSync(`./events/${directories}`)
    .filter(file => file.endsWith(".js"));
    for (const file of eventsSubFolder) {
      const event = require(`../events/${directories}/${file}`);
      const eventName = file.split(".")[0];
      client.on(eventName, event.bind(null, Discord, client));
    }
  };
  ["client", "guild"].forEach(e => loadDirectories(e));
};