// Require the necessary discord.js classes
const {
    Client,
    Intents
} = require('discord.js');
const {
    token
} = require('./config.json');

// Create a new client instance
const client = new Client({
    intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"],
    partials: ["CHANNEL"]
});

// When the client is ready, run this code (only once)
client.once('ready', () => {
    console.log('Ready!');
});

// Login to Discord with your client's token
client.login(token);

const fs = require('fs');
const { channel } = require('diagnostics_channel');

let rawdata = fs.readFileSync('periodicTable.json');
let elements = JSON.parse(rawdata).elements;

let myelement = "Oxygen";

//console.log(element)

client.on("messageCreate", async (message) => {
    console.log("Message Received");
    //console.log(message.author.username);
    if ((message.author == client.user) || (message.author.bot))
        return;

    usermessage = message.content;
    if (usermessage.startsWith('!ch')) {


        if (usermessage.match(/help/i)) { 
            await message.reply({
              "content": `Chemistry Discord Bot to help students learn information related to Elements in the Periodic Table. `,
              "tts": false,
              "embeds": [
                {
                  "type": "rich",
                  "title": `Usage`,
                  "description": `Use  !ch as Prefix to trigger this Bot`,
                  "color": 0x00FFFF,
                  "fields": [
                    {
                      "name": `Atomic Number`,
                      "value": `!ch Atomic Number of Oxygen`,
                      "inline": true
                    },
                    {
                      "name": `Atomic Mass`,
                      "value": `!ch Atomic Number of Carbon`,
                      "inline": true
                    },
                    {
                      "name": `Valency`,
                      "value": `!ch Valency of Carbon`,
                      "inline": true
                    },
                    {
                      "name": `Electron Affinity`,
                      "value": `!ch Electron Affinity of Carbon`,
                      "inline": true
                    },
                    {
                      "name": `Electronegativity`,
                      "value": `!ch Electronegativity of Carbon`,
                      "inline": true
                    },
                    {
                      "name": `Density`,
                      "value": `!ch Density of Carbon`,
                      "inline": true
                    },
                    {
                      "name": `Summary`,
                      "value": `!ch Summary of Oxygen`,
                      "inline": true
                    },
                    {
                      "name": `Discovery`,
                      "value": `!ch Who discovered Radium`,
                      "inline": true
                    },
                    {
                      "name": `Boiling Point`,
                      "value": `!ch Boiling Point of Mercury`,
                      "inline": true
                    },
                    {
                      "name": `Melting Point`,
                      "value": `!ch Melting Point of Mercury`,
                      "inline": true
                    },
                    {
                      "name": `Symbol`,
                      "value": `!ch Symbol of Carbon`,
                      "inline": true
                    },
                    {
                      "name": `Molar Heat`,
                      "value": `!ch Molar Heat of Carbon`,
                      "inline": true
                    },
                    {
                      "name": `Electronic Configuration`,
                      "value": `!ch Electronic Configuration of Carbon`,
                      "inline": true
                    },
                    {
                      "name": `Category`,
                      "value": `!ch Category of Carbon`,
                      "inline": true
                    },
                    {
                      "name": `Multiple Fields`,
                      "value": `!ch Atomic Number,Mass,Valency  of Carbon`,
                      "inline": true
                    }
                  ]
                }
              ]
            });
            return ;
        }
        else
        {
          
        if (usermessage.match(/discovered/i)) {
            myelement = usermessage.split('discovered ')[1];
        } else if ((usermessage.match(/of/i))) {
            myelement = usermessage.split('of ')[1];
            myelement = myelement.trim();
            //console.log("before:"+myelement+":after");
        }

        let element = elements.find((item) => {
            return item.name.toLowerCase() == myelement.toLowerCase();
        });

        console.log(element)
        if (element) {
            response = '**' + element.name + '**\n';

            if (usermessage.match(/summary|description/i)) {
                response += '**Summary**: ' + element.summary + '\n';
            }

            if (usermessage.match(/discovered/i)) {
                response += '**Discovered By**: ' + element.discovered_by + '\n';
            }

            if (usermessage.match(/category/i)) {
                response += '**Category**: ' + element.category + '\n';
            }

            if (usermessage.match(/affinity/i)) {
                response += '**Electron Affinity**: ' + element.electron_affinity + '\n';
            }

            if (usermessage.match(/electronegativity/i)) {
                response += '**Electronegativity**: ' + element.electronegativity_pauling + '\n';
            }


            if (usermessage.match(/density/i)) {
                response += '**Density**: ' + element.density + '\n';
            }

            if (usermessage.match(/heat/i)) {
                response += '**Molar Heat**: ' + element.molar_heat + '\n';
            }

            if (usermessage.match(/configuration/i)) {
                response += '**Electronic Configuration**: ' + element.electron_configuration + '\n';
            }

            if (usermessage.match(/symbol/i)) {
                response += '**Symbol**: ' + element.symbol + '\n';
            }

            if (usermessage.match(/valency/i)) {
                lastElectron = element.shells;
                valency = lastElectron[lastElectron.length - 1];
                if (valency > 4) {
                    valency = 8 - valency;
                }
                response += '**Valency**: ' + valency + '\n';
            }

            if (usermessage.match(/appearance/i)) {
                response += '**Appearance**: ' + element.appearance + '\n';
            }
            if (usermessage.match(/atomic number|number/i)) {
                response += '**Atomic Number**: ' + element.number + '\n';
            }

            if (usermessage.match(/atomic mass|mass/i)) {
                response += '**Atomic Mass**: ' + element.atomic_mass + '\n';
            }
            if (usermessage.match(/boiling point/i)) {
                response += '**Boiling Point**: ' + element.boil + ' K\n';
            }
            if (usermessage.match(/melting point/i)) {
                response += '**Melting Point**: ' + element.melt + ' K\n';
            }
        } else {
            response = '**' + myelement + '**: ' + 'No such Element';
        }

    


    await message.reply(response)
        .then(() => console.log(`Replied to message "${message.content}"`))
        .catch(console.error);
    }
}
});
