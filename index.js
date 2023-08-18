function getRandInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
function createCommand(commandName, text, channel, tags, message){
  if(message.toLowerCase() === commandName){
    client.say(channel, text);
  }
}

pokemon_cooldown = false;
function pokemon_event(commandName, channel, tags, message){
  if(message.toLowerCase() === commandName){
    if(!pokemon_cooldown){
      pokemon_cooldown = true;
      
      if(getRandInt(1, 15) === 12){
        pokemon_index = getRandInt(203, 233)
      }
      else{
        pokemon_index = getRandInt(0, 203)
      }

      pokemon = pokemons[pokemon_index]
      if(pokemon_index < 203){
        client.say(channel, `@${tags.username}, Um ` + pokemon + ` selvagem apareceu!`);
      }
      else{
        client.say(channel, `@${tags.username}, O pokemon LENDÁRIO ` + pokemon + ` apareceu!!!`)
      }

      fs.readFile(`users/${tags.username}.txt`, 'utf8', function(err, data){
        
        if (data != undefined){
            var arr1 = data.split(" ");
            
            if(arr1.includes(pokemon) == false){
              
              if(getRandInt(1, 4) > 1){
                  fs.appendFile(`users/${tags.username}.txt`, pokemon+' ', function(err){
                    client.say(channel, `PARABÉNS @${tags.username}, VOCE CAPTUROU O ` + pokemon + `!!!`);
                    client.say(channel, `Pokeinfo: ` + `https://www.pokemon.com/br/pokedex/` + pokemon);
                  })
              }
              else{
                client.say(channel, `@${tags.username}, Aww, droga... o ` + pokemon + ` escapou...`)
              }
            }
            else{
                client.say(channel, `Você já tem um ` + pokemon + ` registrado na sua pokedéx!`);
            }
        }
        
        else{
          if(getRandInt(1, 2) === 1){ 
            fs.appendFile(`users/${tags.username}.txt`, pokemon+' ', function(err){
              client.say(channel, 'PARABÉNS, VOCE CAPTUROU O ' + pokemon + '!!!')
              client.say(channel, `Pokeinfo: ` + `https://www.pokemon.com/br/pokedex/` + pokemon);
            })
          }
          else{
            client.say(channel, `Aww, droga...  o ` + pokemon + ` escapou...`)
          }
        }
      });
      setTimeout(function(){ pokemon_cooldown = false; }, 20000);
    }
    
    else{
      client.say(channel, `O comando leva 20 segundos para poder ser utilizado novamente :3`)
      
    }
  }
}

function pokedex(commandName, channel, tags, message){
  if(message.toLowerCase() === commandName){
    fs.readFile(`users/${tags.username}.txt`, 'utf8', function(err, data){
      if(data != undefined){
        var arr2 = data.split(" ")
        client.say(channel, 'Pokedéx [' + ((arr2.length)-1) + '/' + pokemons.length + ']: ' + arr2.slice(0, arr2.length-1).join(', ') + '.')
      }
      else{
        client.say(channel, `Você não capturou nenhum pokemon ainda! Tente usando o comando !pokemon.`)
      }
    })
  }
}

function camada(commandName, channel, tags, message){
  if(message.toLowerCase() === commandName){
    fs.readFile('txtfiles/camada.txt', 'utf-8', function(err, data){
      var camada_number = parseInt(data);
      camada_number += 1;
      client.say(channel, `Choconiih ja errou a camada `+camada_number+` vezes ${emote}`)
      fs.writeFile('camada.txt', String(camada_number), function(err){})
    })
  }
}

function moon(commandName, channel, tags, message){
  if(message.toLowerCase() === commandName){
    fs.readFile('txtfiles/moon.txt', 'utf-8', function(err, data){
      var moonCarinho = parseInt(data);
      moonCarinho += 1;
      client.say(channel, `A Moon já ganhou carinho `+moonCarinho+` vezes ${emote}  ${emote} `)
      fs.writeFile('moon.txt', String(moonCarinho), function(err){})
    })
  }
}


var fs = require('fs');

var pokemons = fs.readFileSync('txtfiles/pokemons.txt', 'utf-8').split(" ")


const tmi = require('tmi.js');
const client = new tmi.Client({
	options: { debug: true, messagesLogLevel: "info" },
	connection: {
		reconnect: true,
		secure: true
	},
	identity: {
		username: 'ChoconiihBot',
		password: 'oauth:86cgynkmsv9ngjlwuxml32p1x1oz2b'
	},
	channels: [ 'choconiih' ]
});


client.connect().catch(console.error);

client.on('connected', (adress, port, channel) =>{
    client.say("choconiih", "conectada.")
    client.color("HotPink")
});

var emote = "";

client.on('message', (channel, tags, message, self) => {
  if(self) return;
  createCommand('!oie', `Oie, @${tags.username} :3`, channel, tags, message);
  createCommand('!numero', `Número aleatório: ` + getRandInt(1,100), channel, tags, message);
  createCommand('!agua', `Vai tomar água @${channel.slice(1)} ${emote}  `, channel, tags, message);
  createCommand('!insta', `Instagram de Arte: https://www.instagram.com/choconiih_art_/ ${emote} `, channel, tags, message);
  createCommand('!lojinha', `Instagram da Lojinha: https://www.instagram.com/lojinha_da_nickk/ ${emote} `, channel, tags, message);
  createCommand('!twitter', `Twitter: https://twitter.com/choconiih_art_ ${emote} `, channel, tags, message);
  createCommand('!moon', `Moon é a minha porquinha da índia e o serzinho mais lindo e fofo de todo o universo ${emote} `, channel, tags, message);
  createCommand('!namorado', ``, channel, tags, message);
  createCommand('!comandos', `${emote} Listinha de comandos: !oie, !numero, !pokemon, !pokedex, !agua, !insta, !twitter, !lojinha, !moonpet, !moon, !camada.`, channel, tags, message);
  pokemon_event('!pokemon', channel, tags, message);
  pokedex('!pokedex', channel, tags, message);
  camada('!camada', channel, tags, message);
  moon('!moonpet', channel, tags, message);
});


client.on('action', (channel, tags, action, self) =>{
  if(self) return;
  console.log(action)
});


let lastIntervalId, counter = 5;
const hidratacao = delay => {
  if (counter === 5) {
    clearInterval(lastIntervalId);
    lastIntervalId = setInterval(() => {
        client.say('choconiih', `Passando pra lembrar todo mundo de se hidrataar! Hidrate-se! ${emote} `);
      hidratacao(delay);
    }, delay);
    counter = 0;
  }
counter += 1;
};
hidratacao(420000);

let lastIntervalId2, counter2 = 5;
const comandos = delay => {
  if (counter2 === 5) {
    clearInterval(lastIntervalId2);
    lastIntervalId2 = setInterval(() => {
        client.say('choconiih', `Para saber todos os meus comandos é só digitar !comandos para ver a lista com todos ${emote} `);
      redes(delay);
    }, delay);
    counter2 = 0;
  }
counter2 += 1;
};
comandos(1229040);


let lastIntervalId1, counter1 = 5;
const redes = delay => {
  if (counter1 === 5) {
    clearInterval(lastIntervalId1);
    lastIntervalId1 = setInterval(() => {
        client.say('choconiih', `Gentee, não esqueçam de seguir as minhas redes sociaais
Instagram: https://www.instagram.com/choconiih_art_/ //
Instagram: https://www.instagram.com/lojinha_da_nickk/ //
Twitch: https://www.twitch.tv/choconiih //
TikTok: https://www.tiktok.com/@choconiih //
Twitter: https://twitter.com/choconiih_art_ //
Twitter: https://twitter.com/lojinhadanickk`);
      redes(delay);
    }, delay);
    counter1 = 0;
  }
counter1 += 1;
};
redes(3029040);

