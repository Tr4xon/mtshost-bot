const fs = require('fs');

module.exports = (client) => {

    const commandFolders = fs.readdirSync('./commands');

    for (const folder of commandFolders) {
        const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {
            const command = require(`../commands/${folder}/${file}`);
            
            if (command.sus) {
                console.log(`${file} is kinda sus`)
            }

            if (command.name) {
                console.log(`[ 📂 ] Pomyślnie załadowano komendę ${file}!`);
                client.commands.set(command.name, command);
            } else {
                console.log(`[ ❌ ] Wystąpił błąd podczas ładowania komendy ${file}!`);
            }
        }
    }
}