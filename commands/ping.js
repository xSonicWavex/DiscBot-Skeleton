module.exports = {
    name: 'ping', 
    permissions: ["SEND_MESSAGES"],
    description: "This is a ping command!",
    execute(Discord, client, messageCreate, args, cmd){
        messageCreate.channel.send('pong!');
        messageCreate.reply("Sid's a bitch for talking behind my back. ~Sonic");
    }
}