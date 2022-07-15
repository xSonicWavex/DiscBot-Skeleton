const Discord = require('discord.js');
const { Client, Intents, Collection, Collector, MessageEmbed } = require('discord.js');
require('dotenv/config');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });
client.commands = new Collection();
client.events = new Collection();
const mongoose = require('mongoose');

['command_handler', 'event_handler'].forEach(handler =>{
    require(`./handlers/${handler}`)(Discord, client);
});


client.login(process.env.TOKEN);

