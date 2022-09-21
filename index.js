const Discord = require('discord.js');
require('discord-reply');

const client = new Discord.Client({
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
    fetchAllMembers: true,
    shards: "auto",
    restTimeOffset: 0
});

require('discord-buttons')(client);

const config = require('./config.js');
const prefix = config.botConfig.defaultprefix;

client.commands = new Discord.Collection();
const cooldown = new Discord.Collection();

['commandHandler', 'eventHandler'].forEach((handler) => {
    require(`./handlers/${handler}`)(client);
});

client.on('debug', () => { });
client.on('warn', () => { });
client.on('error', () => { });

client.on('ready', async () => {
    const activities = [
        { name: `${config.botConfig.animatedstatus1}`, type: `${config.botConfig.animatedpresencestatus1}` },
        { name: `${config.botConfig.animatedstatus2}`, type: `${config.botConfig.animatedpresencestatus2}` }
    ];

    client.user.setPresence({ activity: activities[0] });
    let activity = 1;

    setInterval(() => {
        activities[2] = { name: `${config.botConfig.animatedstatus1}`, type: `${config.botConfig.animatedpresencestatus1}` },
        activities[3] = { name: `${config.botConfig.animatedstatus2}`, type: `${config.botConfig.animatedpresencestatus2}` }
        if (activity > 3) activity = 0;
        client.user.setActivity(activities[activity]);
        activity++;
    }, 5000);

    console.log(`[ 🔌 ] Pomyślnie zalogowano się jako ${client.user.tag}!`);
});

client.on('message', async message => {
    if (message.author.bot) return;
    
    if (message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).split(/ +/);
        const commandName = args.shift().toLowerCase();
        const command = client.commands.get(commandName);
        let guild = message.guild;

        if (!command) return;

        if (!cooldown.has(commandName)) {
            cooldown.set(commandName, new Discord.Collection());
        };

        if (message.channel.type === 'dm' && !message.guild) return;

        if (command.ownerOnly) {
            if (!config.additionalBotConfig.ownerid.includes(message.author.id)) return message.lineReply(`\`[ ❌ ]\` Wprowadzona komenda jest dostępna tylko dla właściciela!`);
        };

        if (command.userPermissions && command.userPermissions.length) {
            if (!message.member.permissionsIn(message.channel).has(command.userPermissions)) return message.lineReply(`\`[ ❌ ]\` Nie posiadasz wystarczających uprawnień do użycia tej komendy!`);
        };

        if (command.botPermissions && command.botPermissions.length) {
            if (!guild.me.permissionsIn(message.channel).has(command.botPermissions)) return message.lineReply(`\`[ ❌ ]\` Nie posiadam wystarczających uprawnień do wykonania tej komendy!`);
        };

        if (command.args && !args.length) {
            if (command.correctUsage) return message.lineReply(`\`[ ❌ ]\` Brakuje argumentów! Poprawne użycie: \`${config.botConfig.defaultprefix}${command.name} ${command.correctUsage}.\``);
        };

        const now = Date.now();
        const timestamps = cooldown.get(commandName);
        const cooldownAmount = (command.cooldown || 3) * 1000;

        if (timestamps.has(message.author.id)) {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                return message.lineReply(`\`[ ❌ ]\` Musisz odczekać **${timeLeft.toFixed( 1, )} sekund** zanim ponownie użyjesz tej komendy!`);
            };
        };

        timestamps.set(message.author.id, now)
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount)

        try {
            command.run(client, message, args);
        } catch (error) {
            console.log(error);
        }  

    };

});
client.on('guildMemberAdd', async (member) => {

    const channel = await member.guild.channels.cache.find(x => x.id === "1004405845817307176");

    const embed = new Discord.MessageEmbed()
    .setColor(`#00FFFF`)
    .setTitle('ㅤ⠀ㅤㅤ⠀ㅤㅤ⠀ㅤ⠀ Witaj użytkowniku!')
    .setDescription(`ㅤ⠀ㅤㅤ⠀ㅤㅤ⠀ Witaj ${member.user.username}
    ㅤ⠀ㅤㅤ⠀ㅤㅤ⠀ Na oficjalnym discordzie MTSHOST.PLㅤ⠀ㅤ`) 
    .setFooter(`ㅤ⠀ㅤㅤ⠀ㅤㅤ⠀ Mamy nadzieję, że zostaniesz z nami na dłużej! 
    ㅤ⠀ㅤㅤ⠀ Jesteś ${member.guild.memberCount} osobą na naszym serwerze!  `) 
    .setThumbnail('https://media.discordapp.net/attachments/1004406569032761386/1004409542160941087/baCrB1x.png?width=434&height=434')
    .setTimestamp()

    channel.send(embed);
});

client.login(config.botConfig.token);