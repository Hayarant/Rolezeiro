// Carrega o arquivo .env que contem o Token do Bot
const ENVIRORMENT = 'prod';

if (ENVIRORMENT == 'dev'){
  require('dotenv').config();
}else if (ENVIRORMENT == 'prod'){
  require('dotenv').config({path: '/amplify/Rolezeiro/main'});
}

const Discord = require('discord.js');
const {Intents} = require('discord.js');
const Canvas = require('canvas');
const fs = require('fs');
const client = new Discord.Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] })

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

//Realiza o login do bot com o Token do arquivo .env
client.login(process.env.DISCORD_TOKEN);

client.on('message', msg => {
    if (msg.content === 'ping') {
      msg.reply('pong');
    }
});

client.on('message', async msg => {
  if (msg.content === '!pokedollar') {
    const request = require('request');
    const formatCurrency = require('currency-formatter')
    request('http://economia.awesomeapi.com.br/json/last/USD-BRL', { json: true }, (err, res, body) => {
      if (err) { return console.log(err); }
      // msg.channel.send(body.url);
      
      var cotacao = formatCurrency.format(body.USDBRL.bid , { code: 'USD' });
      var pokedex = String(cotacao);
      cotacao = String(cotacao)

      cotacao = cotacao.replace(/[&\/\\#,+()$~%'":*?<>{}]/g, '');
      cotacao = cotacao.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, ',');
      pokedex = pokedex.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
      
      var id = parseInt(pokedex);
      id = id -1;

      let rawdata = fs.readFileSync('pokedex.json');
      let student = JSON.parse(rawdata);
      var caminho = 'images/' + pokedex + '.png'
      
      msg.channel.send("Valor Dolar: " + "R$"+ cotacao);
      msg.channel.send("Pokedex: " + "#" + pokedex + ' - ' + student[id].name.english );
      msg.channel.send({files: [caminho]});

    });
  }
});