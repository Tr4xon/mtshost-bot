const Discord = require('discord.js');

module.exports = {
    name: "embed",
    correctUsage: "",
    sus: true,
    ownerOnly: false,
    args: true,
    userPermissions: ['MANAGE_GUILD'],
    botPermissions: ['SEND_MESSAGES'],

    async run (client, message, args) {
        var string = args.slice(1).join(" ");

        var color = args[0];
        if (string == "") {
            return message.reply({ content: "Użycie: embed [kolor] [tekst]"})
        }
        if (color == "" || !color) {
            return message.reply({ content: "Użycie: embed [kolor] [tekst]"})
        }
        if (color) {
            console.log("debug - podaj ta wiadomosc RuntimeException, provided string")
            const embed = new Discord.MessageEmbed()
            .setTitle("MTSHOST.PL - OGŁOSZENIE")
            .setDescription(string)
            .setColor(`#00FFFF`)
            .setTimestamp()
            message.channel.send(embed)
        }

    }
}