const Discord = require('discord.js');
const { MessageButton } = require('discord-buttons');
require('discord-reply');

module.exports = {
    name: "ticketpanel",
    correctUsage: "",
    ownerOnly: false,
    args: false,
    userPermissions: ['ADMINISTRATOR'],
    botPermissions: ['SEND_MESSAGES'],

    async run (client, message, args) {
        const button = new MessageButton()
        .setStyle(`red`)
        .setLabel(` POMOC TECHNICZNA!`)
        .setID(`TICKET`)

        const embed = new Discord.MessageEmbed()
        .setTitle('ㅤ⠀ㅤㅤ⠀ㅤ CENTRUM POMOCY ')
        .setDescription(`> Aby utworzyć ticket kliknij przycisk poniżej!
        > Utworzy się kanał który widzisz ty i administracja. `)
        .setThumbnail('https://media.discordapp.net/attachments/1004406569032761386/1004409542160941087/baCrB1x.png?width=434&height=434')
        .setColor(`#00FFFF`)
        .setTimestamp()

        message.channel.send(" ", {
            embed: embed,
            button: button,
        });
    }
}