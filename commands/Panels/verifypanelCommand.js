const Discord = require('discord.js');
const { MessageButton } = require('discord-buttons');
require('discord-reply');

module.exports = {
    name: "verifypanel",
    correctUsage: "",
    ownerOnly: false,
    args: false,
    userPermissions: ['ADMINISTRATOR'],
    botPermissions: ['SEND_MESSAGES'],

    async run (client, message, args, MessageEmbed) {
        const embed = new Discord.MessageEmbed()
        .setTitle('ㅤ⠀ㅤㅤ⠀ㅤㅤ Weryfikacja!')
        .setDescription(`> Odbierz rangę klikając w przycisk poniżej`)
        .setThumbnail('https://media.discordapp.net/attachments/1004406569032761386/1004409542160941087/baCrB1x.png?width=434&height=434')
        .setColor(`#00FFFF`)
        .setTimestamp()

        let button = new MessageButton()
        .setStyle(`green`)
        .setLabel(` ㅤ⠀ㅤ⠀ㅤ⠀ㅤ⠀ㅤ Zweryfikuj się! ⠀ㅤ⠀ㅤ⠀ㅤ⠀ㅤ`)
        .setID(`WERYFIKACJA`)

        message.channel.send(" ", {
            embed: embed,
            button: button
        });
    }
}