const Discord = require('discord.js');
const { MessageButton } = require('discord-buttons');
require('discord-reply');

const config = require('../config.js');

module.exports = async (client, button) => {
    await button.clicker.fetch()
    await button.reply.defer()
    let buttonClicker = button.clicker;
    let guild = button.guild;

    if (button.id === `WERYFIKACJA`) {
        const role1 = button.guild.roles.cache.find(r => r.id === config.verifyConfig.verifyroleid);

        button.clicker.member.roles.add(role1);
        buttonClicker.user.send(`\`[ ✔️ ]\` Zostałeś pomyślnie zweryfikowany!`).catch(error => console.log(`nie mogę wysłać, ignoruj ten błąd.`))
    }

    if (button.id === `TICKET`) {
        let alreadyOpened = client.channels.cache.filter(m => m.type === 'text' && m.name.includes("ticket-")).map(m => m.name.split("ticket-")[1]);
        let already = alreadyOpened.some(v => buttonClicker.user.username === v);
    

        if (already === true) {
            return await buttonClicker.user.send(`\`[ ❌ ]\` Nie udało się utworzyć ticketa! Możesz posiadać maksymalnie \`1\` ticket.`);
        };

        let ticket = await guild.channels.create(`ticket-${buttonClicker.user.username}`, {
            type: "text",
            parent: config.ticketsConfig.ticketcategoryid,
            permissionOverwrites: [
                {
                    id: buttonClicker.user.id,
                    allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                }, {
                    id: guild.roles.everyone,
                    deny: ["VIEW_CHANNEL"]
                }, {
                    id: config.ticketsConfig.ticketstaffroleid,
                    allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                }
            ]
        });

        const ticketMenu = new Discord.MessageEmbed()
        .setDescription(` Witaj ${buttonClicker.user}\n\n**×** Witaj utworzyłeś ticket!.\n**×** Opisz dokładnie swój problem, bądz pytanie.`)
        .setTimestamp()
        .setColor(`#00FFFF`)

        const closeButton = new MessageButton()
        .setLabel(`🔒 Zamknij ticket`)
        .setStyle(`red`)
        .setID(`TICKET_CLOSE`)

        ticket.send(`<@!${buttonClicker.user.id}>`, {
            embed: ticketMenu,
            button: closeButton,
        });
    }

    if (button.id === `TICKET_CLOSE`) {
        let ticketChannel = button.channel;

        ticketChannel.delete();
    }
}