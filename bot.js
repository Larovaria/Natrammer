//Lists all dependencies
const Discord = require('discord.js');
const logger = require('winston');
const auth = require('./auth.json');
const fs = require('fs');
//const activitylist = require('./activities.json');
//const Canvas = require('canvas');

//initialize block
//-----------------------------------------------------------------------------

  //defining some relevant file locations for ease of use in new functions
  //whenever referring to a file withing these folders, use the format of `${const}/filefolder.whatever
  const root = '/home/natrammerbot/botfuckery/Natrammer';
  const misc = '/home/natrammerbot/botfuckery/Natrammer/misc';

  // Configure logger settings
  logger.remove(logger.transports.Console);
  logger.add(new logger.transports.Console, {
      colorize: true
  });
  logger.level = 'debug';

  // Initialize Discord Bot
  const bot = new Discord.Client();

  //uses our auth token to login to discord
  bot.login(auth.token);

  logger.info(bot);

//-----------------------------------------------------------------------------


//Bot actions block
//-----------------------------------------------------------------------------
{
  //When the bot's ready to peepee and poopoo, it'll log it's existence in the terminal and will set it's avatar and status
  bot.on('ready', function (evt) {
      logger.info('Connected');
      logger.info('Logged in as: ');
      logger.info(bot.user.tag);
      randomActivity();
      bot.user.setAvatar(`${root}/nrb.png`);
  });

  //what to do when a new member joins
  bot.on('guildMemberAdd', member => {
  	const channel = member.guild.channels.cache.find(ch => ch.name === 'member-log');
  	if (!channel) return;
  /*
    // Set a new canvas to the dimensions of 700x250 pixels
  	const canvas = Canvas.createCanvas(700, 250);
  	// ctx (context) will be used to modify a lot of the canvas

    const ctx = canvas.getContext('2d');
    const background = await Canvas.loadImage('https://discordjs.guide/assets/img/8CQvVRV.cced9193.png');

    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    // Use helpful Attachment class structure to process the file for you
  	const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');
  */
  	bot.send(`Welcome to the server, ${member}!`);
  });

  //every message that the bot sees, passes through here
  bot.on('message', message => {
      try{
        if (message.author.bot) return;

        // Our bot needs to know if it will execute a command
        // It will listen for messages that will start with `!`
        if (message.content.substring(0, 1) == '+') {
          command(message);
        }

        //check if the currency system is called with $
/*
        if (message.content.substring(0, 1) == '$'){
          stonks(message);
        }
*/
        //respond to keywords with a text message
        respond('responses', message);

        //respond to keywords with an image
        respond('imgrespons', message);
      }
      catch(e){
        logger.info("error" + e);
      }
  });
}
//-----------------------------------------------------------------------------


//The currency block
//-----------------------------------------------------------------------------
{
  //alpha en beta moeten nog gedaan worden
  //alle modellen moeten nog gedaan worden
  //https://discordjs.guide/sequelize/currency.html#alpha-helper-methods

  //the shop command center
  function stonks(message){
    try{
      var args = message.content.substring(1).split(' ');
      var cmd = args[0];

      args = args.splice(1);
      switch (cmd) {
        case 'balance':
          balance(message);
        break;
        case 'inventory':
          inventory(message);
        break;
        case 'transfer':

        break;
        case 'buy':

        break;
        case 'shop':

        break;
        case 'leaderboard':

        break;
        default:
          message.channel.send('de mogelijke shop commands van NRB zijn: balance, inventory, transfer, buy, shop en leaderboard');
        return positive(message);
      }
    }
    catch(e){
      negative(message);
    }
  }

  //check the balance of the user or the target
  function balance(message){
    try{
      const target = message.mentions.users.first() || message.author;
      message.channel.send(`${target.tag} has ${currency.getBalance(target.id)}💰`);
      return positive(message);
    }
    catch(e){
      return negative(e);
    }
  }

  //check whats in the inventory of user or target
  //function inventory(message){
    //try{
      //const target = message.mentions.users.first() || message.author;
      //const user = await Users.findOne({ where: { user_id: target.id } });
      //const items = await user.getItems();

      //if (!items.length) {
        //message.channel.send(`${target.tag} has nothing!`);
        //return negative(message);
      //}

      //message.channel.send(`${target.tag} currently has ${items.map(i => `${i.amount} ${i.item.name}`).join(', ')}`);
      //return positive(message);
    //}
    //catch(e){
      //return negative(message);
    //}


  //}




}
//-----------------------------------------------------------------------------




//Natrammer block
//-----------------------------------------------------------------------------
{
  //this will look into what comes AFTER the + sign in a message to determine what command should be executed
  function command(message){
    var args = message.content.substring(1).split(' ');
    var cmd = args[0];

    args = args.splice(1);
    switch(cmd) {
    case 'ping':
        message.channel.send("Pong!");
    break;
    case 'cum':
      channelSend(args, message, "Woah! That's a lot of cum!");
    break;
    case 'help':
      getHelp(args[0], message);
    break;
    case 'P.A.L.E.N.':
        positive(message);
        message.channel.send('https://drive.google.com/open?id=1ZUFsj2qIsbEJQ19TXJap2LgbgvclQ61a');
    break;
    case 'F':
      message.channel.send("F");
    break;
    case 'cp':
      getCopypasta(args, message);
    break;
    case 'cplist':
      createCpEmbed(message);
    break;
    case 'addcp':
      addCopypasta(args, message)
    break;
    case 'addresp':
      addResponse(args, message, message.client);
    break;
    case 'imgresp':
      addImgResponse(args, message, message.client)
    break;
    case 'remresp':
        removeResponse(args, message);
    break;
    case 'testimg':
      message.channel.send("ayy lmao", {files: [`${misc}/pepe.png`]});
    break;
    case 'reload':
      positive(message);
      return bot.destroy();
    break;
    case 'join':
      client.emit('guildMemberAdd', message.member);
    break;
    case 'react':
      positive(message);
      negative(message);
    break;
    case 'status':
      randomStatus(message);
    break;
    case 'announce':
      var retAnnounce = createAnnouncement(message);
      logger.info(retAnnounce);
      channelSend(retAnnounce[0], retAnnounce[1], retAnnounce[2]);
    break;
    case 'election':
      createElection(message);
    break;
   }
  }

  //calls for activity change through a message
  function randomStatus(message){
    try{
      randomActivity();
      positive(message);
    }
    catch(e){
      negative(message);
    }
  }

  //change the activity that the bot displays into a random activity
  function randomActivity(){

    //list with activities to choose from
    activitylist = [['people dying horribly on the darkweb', 'WATCHING'], ['you talk about your recent affair. We hear everything', 'LISTENING' ], ['porn', 'WATCHING'], ['with myself', 'PLAYING'], ['your moms shower adventures','STREAMING'], ['to the cries from my basement', 'LISTENING'], ['with bricks that roll']];

    randacti = activitylist[Math.floor(Math.random() * activitylist.length)];
    bot.user.setActivity(randacti[0] , {type : randacti[1]} );//
  }

  //react to a message with a random positive emoji
  function positive(message){
    message.delete();
    /*posEmojis = ['👍','❤️', '😂', '😍', '😘','😊','👌','💕','✌','😏','💪','💖','😜','🌸','💗'];//add some positive emojies hier
    return message.react(posEmojis[Math.floor(Math.random() * posEmojis.length)]);*/
  }

  //react to a message with a negative positive emoji
  function negative(message){
    negEmojis = ['💩','👎',  '😭', '😒','😩','😔','😱','😡','😢','😞','😫','💀','😥','😕','💔','😰','😠','😣'];//add some negative emojies hier
    return message.react(negEmojis[Math.floor(Math.random() * negEmojis.length)]);
  }

  //send a message to indicated channel
  function channelSend(args, message, text){
    try{
      const cumchan = bot.channels.cache.get(args.slice(2, -1));
      cumchan.send(text);
      return positive(message);
    }
    catch(e){
      return negative(message);
    }
  }

  //Get the help file for the bot or for the corrosponding topic
  function getHelp(args, message){
    try{
      //check wich topic is mentioned
      if(args == undefined){
        message.author.send(fs.readFileSync(`${root}/help/main.txt`, {"encoding": "utf-8"}));
        return positive(message);
      }
      else{
        message.author.send(fs.readFileSync(`${root}/help/${args}.txt`, {"encoding": "utf-8"}));
        return positive(message);
      }
    }
    catch{
      message.channel.send("Daar ging wel echt even iets mis. :cry: \nAls je dat even opnieuw probeert met *+help* of *+help [specifiek command]* kunnen we verder helpen. Wellicht gebruikte je niet de juiste hulpterm.");
      helpEmbed(message);
      return negative(message);
    }
  }

  function helpEmbed(message){
    try{
     const helpListEmbed = new Discord.MessageEmbed()
      .setTitle("Beschikbare hulppagina's")
      .setColor(0xffbe30)
      .setDescription(listHelp());
    message.channel.send(helpListEmbed);
    }
    catch(e){
      return negative(message);
    }
  }

  function listHelp(){
    try{
      helpArray = fs.readdirSync(`${root}/help/`, {withFileType: false})
      helpResult = "";
      helpArray.forEach(item => {
        helpResult = helpResult + item.substring(0, item.length - 4) + "\n";
      });
      return helpResult;
    }
    catch{
      return "Ja maat ik zit te kakken op het moment. Probeer het later ajb";
    }
  }

  //Create an announcement to be sent in desired channel
  function createAnnouncement(message){
    try{
      var wishlist = message.content.substring(10).split(' | '); //flat asses be like
      const announcement = new Discord.MessageEmbed()
       .setTitle(wishlist[1])
       .setColor(0xffbe30)
       .setAuthor('Announced by ' + message.author.tag)
       .setThumbnail(message.author.avatarURL())
       .setDescription(wishlist[2]);
      while (wishlist.length > 4) {
       announcement.addField(wishlist[3], wishlist[4]);
       wishlist.splice(3,2);
      }
      return [wishlist[0], message, announcement];
    }
    catch(e){
      return negative(message);
    }
  }
}
//-----------------------------------------------------------------------------


//keyword response block
//-----------------------------------------------------------------------------
{
  //check if a keyword is in the responses list and send the correct response
  function respond(type, message){
    try{
      resplist = getResponseList(type);
      for (resp in resplist){
        if (message.content.toLowerCase().includes(resplist[resp]['name'])){
          if(type == 'responses'){
            message.channel.send(resplist[resp]['text']);
          } else {
            message.channel.send({files: [resplist[resp]['img']]});
          }
        }
      }
    }
    catch(e){
      return;
    }
  }

  //get a list of keywords and responses from indicated JSON file
  function getResponseList(soort){
    try{
      responses = fs.readFileSync(`${root}/${soort}.json`, {"encoding": "utf-8"});
    return JSON.parse(responses);
  }
    catch(e){
      logger.info("error :" + e);
    }
  }

  //add a new response to the JSON file
  function addResponse(args, message, user){
    try{
      respname = args[0];
      responseslist = getResponseList("responses");

      //check if already defined
      for (resp in responseslist){
        if (responseslist[resp]['name'] == respname){
          return respname + ' is reeds gedefinieerd, onze welgemeende excuses voor dit onplezierige ongemakje.';
        }
      }
      bericht = message.content.slice(10 + respname.length);
      new_response = JSON.parse(`{"name" : "${respname}", "text" : "${bericht}", "creator" :" ${user.user}"}`);
      responseslist.push(new_response);
      fs.writeFile(`${root}/responses.json`, JSON.stringify(responseslist), function (err){
        if (err) throw err;
      });
      positive(message);
      return ;
    }
    catch(e){
      logger.info("error" + e);
      return negative(message);
    }
  }

  //add a new image response to the JSON file
  function addImgResponse(args, message, user){
    try{
      respname = args[0];
      responseslist = getResponseList("imgrespons");

      //check if already definedd
      for (resp in responseslist){
        if (responseslist[resp]['name'] == respname){
          negative(message);
          message.channel.send( respname + ' is reeds gedefinieerd, onze welgemeende excuses voor dit onplezierige ongemakje.');
        }
      }

      img = args[1];
      if(img.slice(-4) != ".jpg" && img.slice(-4) != ".png" && img.slice(-4) != ".gif"){
        negative(message);
        message.channel.send( "Alleen .jpg, .png en .gif zijn toegestaan!");
        logger.info("Someone wanted to add something other than an image. Fucking idiots!");
      }
      else{
        bericht = message.content.slice(10 + respname.length);
        new_response = JSON.parse(`{"name" : "${respname}", "img" : "${img}"}`);
        responseslist.push(new_response);
        fs.writeFile(`${root}/imgrespons.json`, JSON.stringify(responseslist), function (err){
          if (err) throw err;
        });
        return positive(message);;
      }
    }
    catch(e){
      logger.info("error" + e);
      return negative(message);
    }
  }

  //remove a response from the correct response JSON file
  function removeResponse(args, message){
    try{
      //check wich responselist needs to be editted
      switch(args[0]){
        case 'img':
          resptype = "imgrespons";
        break;
        case 'txt':
          resptype = "responses";
        break;
        default:
          negative(message)
          return message.channel.send("Oeps! Probeer het opnieuw met !remresp [txt/img] [naam]. Kan gewoon. Helemaal gratis *wanneer je een premiumgebruiker bent*");
        break;
      }

      respname = args[1];
      logger.info(resptype);
      logger.info(respname);
      responseslist = getResponseList(resptype);
      for (resp in responseslist){
        if (responseslist[resp]['name'] == respname){
          responseslist.splice(resp, 1);
          fs.writeFile(`${root}/${resptype}.json`, JSON.stringify(responseslist), function (err){
            if (err) return negative(message);
          });

          return positive(message);
        }
      }
      return negative(message);
    }
    catch(e){
      negative(message);
      logger.info('error: ',e);
    }
  }
}
//-----------------------------------------------------------------------------


//Copypasta block
//-----------------------------------------------------------------------------
{
  //send a copypasta from the copypasta database
  function getCopypasta(args, message){
    try{
      cpPath = `${root}/copypasta/${args[0]}.txt`;
      speech = false;
      if (args[1] == 'tts'){
        speech = true;
      }
      message.channel.send( fs.readFileSync(cpPath, {"encoding": "utf-8"}), {tts: speech, split:true});
      return positive(message);
    }
    catch{
      return negative(message);
    }
  }

  //get a list from all files in the copypasta directory
  function listCopyPasta(){
    try{
      cpArray = fs.readdirSync(`${root}/copypasta`, {withFileType: false})
      cpResult = "";
      cpArray.forEach(item => {
        cpResult = cpResult + item.substring(0, item.length - 4) + "\n";
      });
      return cpResult;
    }
    catch{
      return "Ja maat ik zit te kakken op het moment. Probeer het later ajb";
    }
  }

  //create an embedded message with all the possible copypastas to use
  function createCpEmbed(message){
    try{
     const cpEmbed = new Discord.MessageEmbed()
      .setTitle('Beschikbare pasta')
      .setColor(0xffbe30)
      .setDescription(listCopyPasta());
    message.channel.send(cpEmbed);
    return positive(message);
    }
    catch(e){
      return negative(message);
    }
  }

  //add a new copypasta to the copypasta directory
  function addCopypasta(args, message){
    try{
      cpname = args[0]
      text=message.content.slice(7 + cpname.length);
      cpPath = `${root}/copypasta/${cpname}.txt`;
      fs.writeFile(cpPath, text, function (err){
        if (err) throw err;
      });
      return  positive(message);
    }
    catch{
      return negative(message);
    }
  }
}
//-----------------------------------------------------------------------------


//Voting block
//-----------------------------------------------------------------------------
async function createElection(message){
  //Whole buncha variables here - might be gross to look at. Lmk if you know of a better way
  election = createAnnouncement(message);
  sendChan = bot.channels.cache.get(election[0].slice(2, -1));
  ogMsg = election[1];
  announcement = election[2];

  //Sends the poll and the emojis people can reacccccc to
  let poll = await sendChan.send(announcement);
  await poll.react('1️⃣');
  await poll.react('2️⃣');
  await poll.react('3️⃣');

  //sets the collector. Time is measured in ms I THINK
  const filter = (reaction, user) => { return reaction.emoji.name === '1️⃣' || reaction.emoji.name === '2️⃣' || reaction.emoji.name === '3️⃣'; };

  //My autism makes deathcore noises
  poll.awaitReactions(filter, { time: 60000 })
  	.then(collected => console.log(collected.size))
  	.catch(collected => {
  		console.log(`After a minute, only ${collected.size} out of 4 reacted.`);
  	});



  //const pollRes = announcement.awaitReactions(filter, { time: 60000 }); //errors: ['time']

/*   let resultsEmbed = new Discord.MessageEmbed()
    .setTitle('The results are in!')
    .setColor(0xffbe30)
    .setDescription("Let's see how it went!")
    .addFields(
      { name: 'Option 1', value: `${pollRes.get('1️⃣').count-1} votes`, inline: true },
      { name: 'Option 2', value: `${pollRes.get('2️⃣').count-1} votes`, inline: true },
  		{ name: 'Option 3', value: `${pollRes.get('3️⃣').count-1} votes`, inline: true },
    );
  sendChan.send(resultsEmbed);*/
}
//-----------------------------------------------------------------------------
