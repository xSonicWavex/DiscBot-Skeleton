module.exports = async (Discord, client, messageCreate) => {
    const prefix = process.env.PREFIX;

    if(!messageCreate.content.startsWith(prefix) || messageCreate.author.bot) return; 
    const args = messageCreate.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();
    const command = client.commands.get(cmd) || client.commands.find((a) => a.aliases && a.aliases.includes(cmd));

    const validPermissions = [
        "CREATE_INSTANT_INVITE",
        "KICK_MEMBERS",
        "BAN_MEMBERS",
        "ADMINISTRATOR",
        "MANAGE_CHANNELS",
        "MANAGE_GUILD",
        "ADD_REACTIONS",
        "VIEW_AUDIT_LOG",
        "PRIORITY_SPEAKER",
        "STREAM",
        "VIEW_CHANNEL",
        "SEND_MESSAGES",
        "SEND_TTS_MESSAGES",
        "MANAGE_MESSAGES",
        "EMBED_LINKS",
        "ATTACH_FILES",
        "READ_MESSAGE_HISTORY",
        "MENTION_EVERYONE",
        "USE_EXTERNAL_EMOJIS",
        "VIEW_GUILD_INSIGHTS",
        "CONNECT",
        "SPEAK",
        "MUTE_MEMBERS",
        "DEAFEN_MEMBERS",
        "MOVE_MEMBERS",
        "USE_VAD",
        "CHANGE_NICKNAME",
        "MANAGE_NICKNAMES",
        "MANAGE_ROLES",
        "MANAGE_WEBHOOKS",
        "MANAGE_EMOJIS",
      ]


      if(command){
        if(command.permissions){
            let invalidPerms = []
            for(const perm of command.permissions){
                if(!validPermissions.includes(perm)){
                    console.log(`invalid permissions ${perm}`);
                }
                if(!messageCreate.member.permissions.has(perm)){
                    invalidPerms.push(perm);
                }
            }
            if(invalidPerms.length){
                return messageCreate.channel.send(`Missing Permissions: \`${invalidPerms}\``);
            }
        }
        if(!cooldowns.has(command.name)){cooldowns.set(command.name, new Discord.Collection())}
        const curtime = Date.now(); 
        const timestamp = cooldowns.get(command.name)
        const cooldownamount = command.cooldown * 1000; 

        if(timestamp.has(messageCreate.author.id)){
            const expirationtime = timestamp.get(messageCreate.author.id) + cooldownamount; 
            if(curtime < expirationtime){
                const timeleft = (expirationtime - curtime)/1000; 
                return messageCreate.reply(`Please wait ${timeleft.toFixed(2)} more seconds before using the ${command.name} command.`)
            }
        }

            timestamp.set(messageCreate.author.id, curtime)
            setTimeout(() => timestamp.delete(messageCreate.author.id), cooldownamount)
        

        command.execute(Discord, client, messageCreate, args, cmd);}
}