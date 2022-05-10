// Carrega o arquivo .env que contem o Token do Bot
require('/amplify/Rolezeiro/main/DISCORD_TOKEN').config();

const Discord = require('discord.js');
const {Intents} = require('discord.js');
const client = new Discord.Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] })

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

//Realiza o login do bot com o Token do arquivo .env
client.login(process.env.secrets.DISCORD_TOKEN);

client.on('message', msg => {
    if (msg.content === 'ping') {
      msg.reply('pong');
    }
  });