const fs = require('fs');

module.exports = async (Discord, client) =>{
    const command_files = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
    const message = require('../events/guild/messageCreate');

    for(const file of command_files){
        const command = require(`../commands/${file}`);
        if(command.name){
            client.commands.set(command.name, command);
        }
        else{
            continue;
        }
    }
}