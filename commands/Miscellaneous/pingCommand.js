const Discord = require('discord.js');
require('discord-reply');

module.exports = {
    name: "ping",
    correctUsage: "",
    ownerOnly: false,
    args: false,
    userPermissions: [''],
    botPermissions: ['SEND_MESSAGES'],

    async run (client, message, args) {
        const msg = await message.channel.send(`Testowanie połączenia...`).then(msg => msg.delete());
        const getTimestamp = (message.editedTimestamp) ? message.editedTimestamp : message.createdTimestamp;
        const getFinalLatency = `${Math.floor(msg.createdTimestamp - getTimestamp)}ms`;
        const getFinalAPILatency = `${Math.round(message.client.ws.ping)}ms`;
    
        const embed = new Discord.MessageEmbed()
        .setImage(`https://i.pinimg.com/originals/ea/59/88/ea598859ce9d0bcc138df523ceac3e90.gif`)
        .setDescription(` \`[ ✔️ ]\` Mój ping wynosi **${getFinalLatency}**, ping API wynosi **${getFinalAPILatency}**. `)
        .setColor(`#00FFFF`)
        
        message.channel.send(" ", {
            embed: embed,
        })
        
    }
}