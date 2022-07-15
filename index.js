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

mongoose.connect(process.env.MONGODB_SRV, {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
}).then(()=>{
    console.log('Connected to the Database!')
}).catch((err) => {
    console.log(err)
})

client.login(process.env.TOKEN);

