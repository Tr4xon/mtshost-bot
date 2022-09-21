const fs = require('fs');

module.exports = (client) => {

    fs.readdirSync('./events').forEach(file => {
        const eventName = file.split(".")[0];
        const eventFile = require(`../events/${file}`);

        if (eventName) {
            client.on(eventName, eventFile.bind(null, client));
            console.log(`[ 📂 ] Pomyślnie załadowano event ${eventName}!`);
        } else {
            console.log(`[ ❌ ] Wystąpił błąd podczas ładowania eventu ${eventName}!`)
        };
    });
};