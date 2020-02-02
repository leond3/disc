const Discord = require('discord.js');
const { prefix } = require('./config.json');

const fs = require("fs");

const client = new Discord.Client();

client.once('ready', () => {
	console.log('MineCraft bot responded and is operational!');
});

client.on('message', message => {
	let blacklisted = ["kank", "kk ", "suck", "mongool", "idioot", "idiot", "stfu", "shut ", "bek ", "tyfus", "autist", "bitch", "eikel", "hoer", "homo", "kut", "lul ", "pedo", "mof", "slet", "tering", "k4nk", "fack", "fuck", "fk ", "h0m0", "h0mo", "hom0", "gay", "g4y", "sukkel"];
	for (var i in blacklisted) {
		if (message.content.toLowerCase().includes(blacklisted[i].toLowerCase())) {
			if (blacklisted[i] == "suck") { message.reply("U R GAY.\nBro u just got rekt by a bot...").then(msg => {msg.delete(3600000)}); }
			else if (blacklisted[i] == "stfu" || blacklisted[i] == "shut" || blacklisted[i] == "bek") { message.reply("vraagt u gelieve uw mondje dicht te houden en uw handjes van uw toetsenbord af te halen voor enkele seconden. Alvast bedankt.").then(msg => {msg.delete(300000)}); }
			else { message.channel.send(":no_entry: You used a blacklisted word!").then(msg => {msg.delete(4000)}); }
			message.delete();
		}
	}

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();
	if (message.content.startsWith(prefix) || !message.author.bot) {
		if (command === 'muteall' && message.member.roles.find(r => r.name === "Bot builder")) {
			message.channel.overwritePermissions(message.channel.guild.defaultRole, { SEND_MESSAGES: false });
			message.channel.send("Server chat messages: **Disabled**.").then(msg => {msg.delete(72000000)});
			message.delete();
		}
		if (command === 'muteall' && !message.member.roles.find(r => r.name === "Bot builder")) {
			message.channel.send(":no_entry: **You do not have the right permissions to execute this command, try: '!help'.**").then(msg => {msg.delete(4000)});
			message.delete();
		}
		if (command === 'unmuteall' && message.member.roles.find(r => r.name === "Bot builder")) {
			message.channel.overwritePermissions(message.channel.guild.defaultRole, { SEND_MESSAGES: true });
			message.channel.send("Server chat messages: **Enabled**.").then(msg => {msg.delete(72000000)});
			message.delete();
		}
		if (command === 'unmuteall' && !message.member.roles.find(r => r.name === "Bot builder")) {
			message.channel.send(":no_entry: **You do not have the right permissions to execute this command, try: '!help'.**").then(msg => {msg.delete(4000)});
			message.delete();
		}
		if (command === 'clearchat' && message.member.roles.find(r => r.name === "Bot builder")) {
			async function clearchat() {
	            	message.delete();
	            	const fetched = await message.channel.fetchMessages({limit: 99});
	            	message.channel.bulkDelete(fetched);
	        	}
			clearchat();
		}
		if (command === 'mcnotify' && message.member.roles.find(r => r.name === "Bot builder")) {
			message.delete(1800000);
			message.channel.send(":white_check_mark: Notification detected!").then(msg => {msg.delete(4000)});
		}
		if (command === 'clearchat' && !message.member.roles.find(r => r.name === "Bot builder")) {
			message.channel.send(":no_entry: **You do not have the right permissions to execute this command, try: '!help'.**").then(msg => {msg.delete(4000)});
			message.delete();
		}
	}

	if(message.channel.name == "skyblock-giveaways") {
		if (command === 'gstart' && message.member.roles.find(r => r.name === "Giveaways")) {
			message.delete(10000);
		}
	}
	if(message.channel.name == "music") {
		if (message.content.startsWith(prefix) && !message.author.bot) {
			message.delete(4000);
		}
		else if (!message.content.startsWith(prefix) && !message.author.bot) {
			message.delete();
			message.channel.send(":no_entry: **You can't chat in this channel, try: '!help'.**").then(msg => {msg.delete(4000)});
		}
	}
	
	if(message.channel.name == "skyblock-commands") {
		if (!message.content.startsWith(prefix) || message.author.bot) {
			if (!message.author.bot) { 
				message.delete();
				message.channel.send(":no_entry: **You can't chat in this channel, try: '!help'.**").then(msg => {msg.delete(4000)});
			}
			return;
		}
		if (command === 'help') {
			message.channel.send('**Bot command list:**\n - !help\n - !talisman\n - !reforge\n - !stats [username]\n - !networth [username]').then(msg => {msg.delete(30000)});
			message.delete(30000);
		}
		else if (command === 'reforge') {
			message.channel.send("**Damage:**\nArmor: Godly\nSword: Spicy\nBow: Rapid\nLegendary/Epic talisman: Godly\nRare talisman: Itchy\nUncommon/Common talisman (*80%< crit chance*): Itchy\nUncommon/Common talisman (*80%>crit chance*): Godly/Zealous\n\n**HP&Defence:**\nArmor: Titanic\nSword: -\nBow: -\nTalisman: Ominous\n\n**Mana:**\nArmor: Wise\nSword: Legendary\nBow: Deadly\nTalisman:Bizarre/Pretty\n\n\n*Tag de 'Tag Me' bot als je je talisman optimaal wilt reforgen*").then(msg => {msg.delete(30000)});
			message.delete(30000);
		}
		else if (command === 'talisman') {
			message.channel.send("**Common:**\n - Mine Affinity Talisman\n - Village Affinity Talisman\n - Farming Talisman\n - Wolf Talisman (U)\n - Zombie Talisman (U)\n - Skeleton Talisman\n - Scavenger Talisman\n - Intimidation Talisman (U)\n - Talisman of Coins\n - Potion Affinity Talisman (U)\n - Vaccine Talisman\n - Night Vision Charm\n - Fire Talisman\n - Healing Talisman (U)\n - Speed Talisman\n - Feather Talisman (U)\n - Sea Creature Talisman (U)\n\n**Uncommon:**\n - Wood Affinity Talisman\n - Potion Affinity Ring (U)\n - Zombie Ring (U)\n - Feather Ring (U)\n - Red Claw Talisman (U)\n - Magnetic Talisman\n - Hunter Talisman (U)\n - Farmer Orb\n - Gravity Talisman\n - Piggy Bank\n - Lava Talisman\n - Spider Talisman (U)\n - Sea Creature Ring (U)\n - Healing Ring (M)\n - Wolf Paw\n - Intimidation Ring (U)\n - Shady Ring (U)\n - New Years Cake Bag\n - Candy Ring (U)\n\n**Rare:**\n - Haste Ring\n - Potion Affinity Artifact (M)\n - Survivor Cube\n - Hunter Ring (M)\n - Fish Affinity Talisman\n - Feather Artifact (M)\n - Bat Talisman (U)\n - Pig's Foot\n - Spider Ring (U)\n - Bait Ring\n - Candy Ring (U)\n - Day Crystal\n - Night Crystal\n - Red Claw Ring (U)\n - Devour Ring\n - Sea Creature Artifact (M)\n - Intimidation Artifact (M)\n - Wolf Ring (M)\n - Crooked Artifact (U)\n - Frozen Chicken\n\n**Epic:**\n - Ender Artifact\n - Spider Artifact (M)\n - Tarantula Talisman\n - Red Claw Artifact (M)\n - Candy Artifact (M)\n - Bat Ring (U)\n - Experience Artifact\n - Melody's Hair\n - Wither Artifact\n - Seal of the Family (M)\n\n**Legendary:**\n - Bat Artifact (M)\n\n**Others:**\n - Campfire Quest (common-legendary)\n - Romero Quest (common-legendary)\n\n\n*Tag de 'Tag Me' bot als je je talisman optimaal wilt reforgen*").then(msg => {msg.delete(30000)});
			message.delete(30000);
		}
		else if (command === 'stats') {
			if (args[0]) { message.channel.send("https://sky.lea.moe/stats/" + args[0] + "\nhttps://skyblock.matdoes.dev/profiles/" + args[0]).then(msg => {msg.delete(30000)}); }
			else { message.channel.send(":no_entry: **Invalid Argument, try: '!help'.**").then(msg => {msg.delete(4000)}); }
			message.delete(30000);
		}
		else if (command === 'price' || command === 'p') {
			if (args[0]) {
				var price = JSON.parse(fs.readFileSync("./assets/pricelist.json"));
				message.channel.send(price[args[0]]).then(msg => {msg.delete(4000)});
			}
			else { message.channel.send(":no_entry: **Invalid Argument, try: '!help'.**").then(msg => {msg.delete(4000)}); }
			message.delete(4000);
		}
		else if (command === 'networth') {
			const worth = {[
				"leond3": "Unknown",
				"grecio0278": "1",
				"jortboss": "1",
				"yojoost_1": "1",
				"n0xy": "1",
				"nietgewoontim": "1",
				"vanantonie": "1",
				"luukystrikes": "1",
				"joostftw": "1",
				"vapenqtion": "Unknown",
				"deminer2003": "Unknown",
				"quey0278": "Unknown"
			]};
			if (args[0] && worth[message.content]) {
    				message.channel.send(":white_check_mark: Estimated networth of " + args[0] + "is: " + worth[message.content.toLowerCase()] + "\n*Networth may take a while to update.*").then(msg => {msg.delete(10000)});
			}
			else { message.channel.send(":no_entry: **Invalid Argument, try: '!help'.**").then(msg => {msg.delete(4000)}); }
			message.delete(4000);
		}
		else {
			message.delete();
			message.channel.send(":no_entry: **Invalid Command, try: '!help'.**").then(msg => {msg.delete(4000)});
		}
	}
	
	if(message.channel.name == "discord-commands") {
		if (!message.content.startsWith(prefix) || message.author.bot) {
			if (!message.author.bot) { 
				message.delete(10000);
			}
			return;
		}
		if (command === 'help') {
		message.channel.send('**Bot command list:**\n - !help\n - !bot\n - !color [color/list]\n - !tag [tag/list]\n - !cf\n - !quickquestion\n - !notifications\n - !privatecall\n - /nick [name]').then(msg => {msg.delete(300000)});
		message.delete(300000);
		}
		else if (command === 'bot') {
			const BotEmbed = new Discord.RichEmbed()
				.setColor('#808080')
				.setTitle('**MineCraft Bot**')
				.setDescription("MineCraft Discord Server\nType: '!help' to get started\n\n*- Anti-Swear\n- Custom Commands\n- Chat Support\n- Roles*")
				.attachFiles(['assets/bot.png'])
				.setFooter('Made by Leon#1250')
				.setThumbnail('attachment://bot.png')
			message.channel.send(BotEmbed).then(msg => {msg.delete(300000)});
			message.delete(300000);
		}
		else if (command === 'color') {
			if (args[0].toLowerCase() === 'blue' || args[0].toLowerCase() === 'dark_green' || args[0].toLowerCase() === 'dark_red' || args[0].toLowerCase() === 'purple' || args[0].toLowerCase() === 'orange' || args[0].toLowerCase() === 'gray' || args[0].toLowerCase() === 'green' || args[0].toLowerCase() === 'aqua' || args[0].toLowerCase() === 'red' || args[0].toLowerCase() === 'pink' || args[0].toLowerCase() === 'yellow' || args[0].toLowerCase() === 'white' || args[0].toLowerCase() === 'none') {
				message.member.removeRole(message.guild.roles.find(r => r.name === "blue"));
				message.member.removeRole(message.guild.roles.find(r => r.name === "dark_green"));
				message.member.removeRole(message.guild.roles.find(r => r.name === "dark_red"));
				message.member.removeRole(message.guild.roles.find(r => r.name === "purple"));
				message.member.removeRole(message.guild.roles.find(r => r.name === "orange"));
				message.member.removeRole(message.guild.roles.find(r => r.name === "gray"));
				message.member.removeRole(message.guild.roles.find(r => r.name === "green"));
				message.member.removeRole(message.guild.roles.find(r => r.name === "aqua"));
				message.member.removeRole(message.guild.roles.find(r => r.name === "red"));
				message.member.removeRole(message.guild.roles.find(r => r.name === "pink"));
				message.member.removeRole(message.guild.roles.find(r => r.name === "yellow"));
				message.member.removeRole(message.guild.roles.find(r => r.name === "white"));
				
				if (args[0].toLowerCase() === 'blue' || args[0].toLowerCase() === 'dark_green' || args[0].toLowerCase() === 'dark_red' || args[0].toLowerCase() === 'purple' || args[0].toLowerCase() === 'orange' || args[0].toLowerCase() === 'gray' || args[0].toLowerCase() === 'green' || args[0].toLowerCase() === 'aqua' || args[0].toLowerCase() === 'red' || args[0].toLowerCase() === 'pink' || args[0].toLowerCase() === 'yellow' || args[0].toLowerCase() === 'white') {
					message.member.addRole(message.guild.roles.find(r => r.name.toLowerCase() == args[0].toLowerCase()));
					message.channel.send(":white_check_mark: Color asigned!").then(msg => {msg.delete(4000)});
				}
				message.delete();
			}
			else if (args[0].toLowerCase() === 'list') {
				message.channel.send("**Colors:**\n - Blue\n - Dark_Green\n - Dark_Red\n - Purple\n - Orange\n - Gray\n - Green\n - Aqua\n - Red\n - Pink\n - Yellow\n - White\n - None").then(msg => {msg.delete(30000)});
				message.delete(30000);
			}
			else if (!args[0]) {
				message.delete();
				message.channel.send(":no_entry: **Invalid Argument, try: '!help'.**").then(msg => {msg.delete(4000)});
				return;
			}
			else {
				message.delete();
				message.channel.send(":no_entry: **Invalid Argument, try: '!help'.**").then(msg => {msg.delete(4000)});
			}
		}
		else if (command === 'tag') {
			if (args[0].toLowerCase() === 'school' || args[0].toLowerCase() === 'skyblock' || args[0].toLowerCase() === 'minigames' || args[0].toLowerCase() === 'uhc' || args[0].toLowerCase() === 'survival' || args[0].toLowerCase() === 'ark' || args[0].toLowerCase() === 'hypixel' || args[0].toLowerCase() === 'banned' || args[0].toLowerCase() === 'none') {
				message.member.removeRole(message.guild.roles.find(r => r.name === "banned"));
				message.member.removeRole(message.guild.roles.find(r => r.name === "school"));
				message.member.removeRole(message.guild.roles.find(r => r.name === "skyblock"));
				message.member.removeRole(message.guild.roles.find(r => r.name === "minigames"));
				message.member.removeRole(message.guild.roles.find(r => r.name === "uhc"));
				message.member.removeRole(message.guild.roles.find(r => r.name === "survival"));
				message.member.removeRole(message.guild.roles.find(r => r.name === "ark"));
				message.member.removeRole(message.guild.roles.find(r => r.name === "hypixel"));
				
				if (args[0].toLowerCase() === 'school' || args[0].toLowerCase() === 'skyblock' || args[0].toLowerCase() === 'minigames' || args[0].toLowerCase() === 'uhc' || args[0].toLowerCase() === 'survival' || args[0].toLowerCase() === 'ark' || args[0].toLowerCase() === 'hypixel') {
					message.member.addRole(message.guild.roles.find(r => r.name.toLowerCase() == args[0].toLowerCase()));
					message.channel.send(":white_check_mark: Tag asigned!").then(msg => {msg.delete(4000)});
				}
				else if (args[0].toLowerCase() === 'banned') {
					if (message.member.roles.find(r => r.name === "banned F")) {
						message.member.addRole(message.guild.roles.find(r => r.name.toLowerCase() == args[0].toLowerCase())); 
						message.channel.send(":white_check_mark: Tag asigned!").then(msg => {msg.delete(4000)});
					}
					else {
						message.channel.send(":no_entry: **According to the Hypixel database you have never been banned!**").then(msg => {msg.delete(4000)});
					}
				}
				else {
					message.channel.send(":white_check_mark: Tag removed!").then(msg => {msg.delete(4000)});
				}
				message.delete();
			}
			else if (args[0].toLowerCase() === 'list') {
				message.channel.send("**Tags:**\n - Banned\n - School\n - Skyblock\n - Minigames\n - UHC\n - Survival\n - ARK\n - Hypixel\n - None").then(msg => {msg.delete(30000)});
				message.delete(30000);
			}
			else if (!args[0]) {
				message.delete();
				message.channel.send(":no_entry: **Invalid Argument, try: '!help'.**").then(msg => {msg.delete(4000)});
				return;
			}
			else {
				message.delete();
				message.channel.send(":no_entry: **Invalid Argument, try: '!help'.**").then(msg => {msg.delete(4000)});
			}
		}
		else if (command === 'cf') {
			var cf = Array(2);
			cf[1] = "Heads";
			cf[2] = "Tails";
			
			var coinflip = getRandomInt(1, 3);
			if (coinflip === 1) { message.channel.send(cf[1]).then(msg => {msg.delete(300000)}); }
			if (coinflip === 2) { message.channel.send(cf[2]).then(msg => {msg.delete(300000)}); }
			message.delete(300000);
		}
		else if (command === 'notifications') {
			if (!message.member.roles.find(r => r.name.toLowerCase() === "notifications")) {
				message.member.addRole(message.guild.roles.find(r => r.name.toLowerCase() == "notifications"));
				message.channel.send(":white_check_mark: Notifications enabled!").then(msg => {msg.delete(4000)});
			}
			else {
				message.member.removeRole(message.guild.roles.find(r => r.name.toLowerCase() == "notifications"));
				message.channel.send(":white_check_mark: Notifications disabled!").then(msg => {msg.delete(4000)});
			}
			message.delete(4000);
		}
		else if (command === 'quickquestion' || command === 'qq') {
			var Amount = getRandomInt(2,5);
			var Form = getRandomInt(1,5);
			
			if (Form === 1 && Amount == 2) { message.channel.send('wat is: **' + getRandomInt(0,10) + ' x ' + getRandomInt(0,10) + '**=').then(msg => {msg.delete(30000)}); }
			if (Form === 1 && Amount == 3) { message.channel.send('wat is: **' + getRandomInt(0,10) + ' x ' + getRandomInt(0,10) + ' x ' + getRandomInt(0,10) + '**=').then(msg => {msg.delete(30000)}); }
			if (Form === 1 && Amount == 4) { message.channel.send('Wat is het kwadraat van: **' + getRandomInt(1, 16) + '**?').then(msg => {msg.delete(30000)}); }
			
			if (Form === 2 && Amount == 2) { message.channel.send('wat is: **' + getRandomInt(1,21) + ' + ' + getRandomInt(1,21) + '**=').then(msg => {msg.delete(30000)}); }
			if (Form === 2 && Amount == 3) { message.channel.send('wat is: **' + getRandomInt(1,21) + ' + ' + getRandomInt(1,21) + ' + ' + getRandomInt(1,21) + '**=').then(msg => {msg.delete(30000)}); }
			if (Form === 2 && Amount == 4) { message.channel.send('wat is: **' + getRandomInt(1,21) + ' + ' + getRandomInt(1,21) + ' + ' + getRandomInt(1,21) + ' + ' + getRandomInt(1,21) + '**=').then(msg => {msg.delete(30000)}); }
			
			if (Form === 3 && Amount == 2) { message.channel.send('wat is: **' + getRandomInt(18,50) + ' - ' + getRandomInt(1,10) + ' - ' + getRandomInt(1,10) + '**=').then(msg => {msg.delete(30000)}); }
			if (Form === 3 && Amount == 3) { message.channel.send('wat is: **' + getRandomInt(27,75) + ' - ' + getRandomInt(1,10) + ' - ' + getRandomInt(1,10) + ' - ' + getRandomInt(1,10) + '**=').then(msg => {msg.delete(30000)}); }
			if (Form === 3 && Amount == 4) { message.channel.send('wat is: **' + getRandomInt(36,100) + ' - ' + getRandomInt(1,10) + ' - ' + getRandomInt(1,10) + ' - ' + getRandomInt(1,10) + ' - ' + getRandomInt(1,10) + '**=').then(msg => {msg.delete(30000)}); }
			
			if (Form === 4 && Amount == 2) { message.channel.send('Wat is: **(' + getRandomInt(1,100) + ' + ' + getRandomInt(1,50) + ' - ' + getRandomInt(1,25) + ') x ' + getRandomInt(1,4) + '**=').then(msg => {msg.delete(30000)}); }
			if (Form === 4 && Amount == 3) { message.channel.send('Tag another user.').then(msg => {msg.delete(30000)}); }
			if (Form === 4 && Amount == 4) { message.channel.send('Tag yourself.').then(msg => {msg.delete(30000)}); }
			
			message.delete();
		}
		else if (command === 'privatecall' || command === 'pc') {
			const voiceChannel = message.member.voiceChannel;
			let privatechannels = ["667089585527980062", "672407468130959371", "672407491807543297", "672407504914743318", "672407514259914762", "672407536741122048", "672407548229320754", "672407558270746635", "672407597248151591", "672407607004364801"];
			
			if (voiceChannel && message.member.roles.find(r => r.name === "Moderator")) {
				message.member.setVoiceChannel(privatechannels[getRandomInt(0,10)]);
				message.channel.send(":white_check_mark: User has been succesfully moved to a private channel.\n*You've to move users into this call!*").then(msg => {msg.delete(6000)});
			}
			else if (!voiceChannel && message.member.roles.find(r => r.name === "Moderator")) {
				message.channel.send(":no_entry: User is not connected to a channel and thus can't be moved.").then(msg => {msg.delete(6000)});
			}
			else {
				message.channel.send(":no_entry: You do not have the permission to create a private call.\n*Please contact a Moderator if you need a private call*").then(msg => {msg.delete(6000)});
			}
			message.delete();
		}
		else if (command === 'notify') {
			if (message.member.roles.find(r => r.name === "Bot builder")) {
				mention = message.mentions.users.first();
				mentionMessage = message.content.slice(8);
				mention.sendMessage(mentionMessage + "\n\n*Deze berichten kan je uitschakelen door notifications uit te zetten in de discord-commands channel, dit bericht wordt na 60 minuten automatisch verwijderd.*").then(msg => {msg.delete(3600000)});
				message.channel.send(":white_check_mark: Notification succesfully send!").then(msg => {msg.delete(4000)});
			}
			else {
				message.channel.send(":no_entry: You do not have the right permission to execute this command, or this user has notifications disabled!").then(msg => {msg.delete(4000)});
			}
			message.delete();
		}
		else {
			message.delete();
			message.channel.send(":no_entry: **Invalid Command, try: '!help'.**").then(msg => {msg.delete(4000)});
		}		
	}
	function getRandomInt(min, max) {
	 		min = Math.ceil(min);
	  		max = Math.floor(max);
	 		return Math.floor(Math.random() * (max - min)) + min;
	}
});

client.login(process.env.token);
