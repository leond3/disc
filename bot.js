const Discord = require('discord.js');
const { prefix } = require('./config.json');

const client = new Discord.Client();

client.once('ready', () => {
	console.log('MC/ARK responded.');
});

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) {
		if (!message.author.bot) { 
			message.delete();
			message.channel.send("**You may only send commands in this channel, commands start with '!'.**").then(msg => {msg.delete(4000)}); 
		}
		return;
	}

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	if (command === 'help') {
		message.channel.send('!help\n!bot\n!stats [player]\n!reforge\n!color [color/list]\n!tag [tag/list]\n!cf').then(msg => {msg.delete(300000)});
		message.delete(300000);
	}
	else if (command === 'stats') {
		if (args[0]) {	
			message.channel.send(`https://sky.lea.moe/stats/${args}`).then(msg => {msg.delete(300000)});
			message.delete(300000);
		}
		else {
			message.delete();
			message.channel.send("**Invalid Argument, try: '!help'.**").then(msg => {msg.delete(4000)});
			return;
		}
	}
	else if (command === 'bot') {
		const BotEmbed = new Discord.RichEmbed()
			.setColor('#252525')
			.setTitle('MineCraft / ARK')
			.setDescription("MineCraft / ARK Discord Bot\nType: '!help' to get started")
			.attachFiles(['assets/bot.png'])
			.setFooter('Made by Leon#1250')
			.setThumbnail('attachment://bot.png')
		message.channel.send(BotEmbed).then(msg => {msg.delete(300000)});
		message.delete(300000);
	}
	else if (command === 'reforge') {
		message.channel.send("**Damage:**\nArmor: Godly\nSword: Spicy\nLegendary/Epic talisman: Godly\nRare talisman: Itchy\nUncommon/Common talisman (*80%< crit chance*): Itchy\nUncommon/Common talisman (*80%>crit chance*): Godly/Zealous\n\n**HP&Defence:**\nArmor: Titanic\nSword: -\nTalisman: Ominous\n\n**Mana:**\nArmor: Wise\nSword: Legendary\nTalisman:Bizarre/Pretty").then(msg => {msg.delete(300000)});
		message.delete(300000);
	}
	else if (command === 'color') {
		if (args[0].toLowerCase() === 'blue' || args[0].toLowerCase() === 'purple' || args[0].toLowerCase() === 'orange' || args[0].toLowerCase() === 'gray' || args[0].toLowerCase() === 'green' || args[0].toLowerCase() === 'aqua' || args[0].toLowerCase() === 'red' || args[0].toLowerCase() === 'pink' || args[0].toLowerCase() === 'yellow' || args[0].toLowerCase() === 'white' || args[0].toLowerCase() === 'none') {
			message.member.removeRole(message.guild.roles.find(r => r.name === "blue"));
			message.member.removeRole(message.guild.roles.find(r => r.name === "purple"));
			message.member.removeRole(message.guild.roles.find(r => r.name === "orange"));
			message.member.removeRole(message.guild.roles.find(r => r.name === "gray"));
			message.member.removeRole(message.guild.roles.find(r => r.name === "green"));
			message.member.removeRole(message.guild.roles.find(r => r.name === "aqua"));
			message.member.removeRole(message.guild.roles.find(r => r.name === "red"));
			message.member.removeRole(message.guild.roles.find(r => r.name === "pink"));
			message.member.removeRole(message.guild.roles.find(r => r.name === "yellow"));
			message.member.removeRole(message.guild.roles.find(r => r.name === "white"));
			
			if (args[0].toLowerCase() === 'blue' || args[0].toLowerCase() === 'purple' || args[0].toLowerCase() === 'orange' || args[0].toLowerCase() === 'gray' || args[0].toLowerCase() === 'green' || args[0].toLowerCase() === 'aqua' || args[0].toLowerCase() === 'red' || args[0].toLowerCase() === 'pink' || args[0].toLowerCase() === 'yellow' || args[0].toLowerCase() === 'white') {
				message.member.addRole(message.guild.roles.find(r => r.name.toLowerCase() == args[0].toLowerCase()));
				message.channel.send(":white_check_mark: Color asigned!").then(msg => {msg.delete(4000)});
			}
			message.delete();
		}
		else if (args[0].toLowerCase() === 'list') {
			message.channel.send("**Colors:**\n - Blue\n - Purple\n - Orange\n - Gray\n - Green\n - Aqua\n - Red\n - Pink\n - Yellow\n - White\n - None").then(msg => {msg.delete(30000)});
			message.delete(30000);
		}
		else if (!args[0]) {
			message.delete();
			message.channel.send("**Invalid Argument, try: '!help'.**").then(msg => {msg.delete(4000)});
			return;
		}
		else {
			message.delete();
			message.channel.send("**Invalid Argument, try: '!help'.**").then(msg => {msg.delete(4000)});
		}
	}
	else if (command === 'tag') {
		if (args[0].toLowerCase() === 'skyblock' || args[0].toLowerCase() === 'minigames' || args[0].toLowerCase() === 'uhc' || args[0].toLowerCase() === 'survival' || args[0].toLowerCase() === 'ark' || args[0].toLowerCase() === 'hypixel' || args[0].toLowerCase() === 'none') {
			message.member.removeRole(message.guild.roles.find(r => r.name === "skyblock"));
			message.member.removeRole(message.guild.roles.find(r => r.name === "minigames"));
			message.member.removeRole(message.guild.roles.find(r => r.name === "uhc"));
			message.member.removeRole(message.guild.roles.find(r => r.name === "survival"));
			message.member.removeRole(message.guild.roles.find(r => r.name === "ark"));
			message.member.removeRole(message.guild.roles.find(r => r.name === "hypixel"));
			
			if (args[0].toLowerCase() === 'skyblock' || args[0].toLowerCase() === 'minigames' || args[0].toLowerCase() === 'uhc' || args[0].toLowerCase() === 'survival' || args[0].toLowerCase() === 'ark' || args[0].toLowerCase() === 'hypixel') {
				message.member.addRole(message.guild.roles.find(r => r.name.toLowerCase() == args[0].toLowerCase()));
				message.channel.send(":white_check_mark: Tag asigned!").then(msg => {msg.delete(4000)});
			}
			message.delete();
		}
		else if (args[0].toLowerCase() === 'list') {
			message.channel.send("**Tags:**\n - Skyblock\n - Minigames\n - UHC\n - Survival\n - ARK\n - Hypixel\n - None").then(msg => {msg.delete(30000)});
			message.delete(30000);
		}
		else if (!args[0]) {
			message.delete();
			message.channel.send("**Invalid Argument, try: '!help'.**").then(msg => {msg.delete(4000)});
			return;
		}
		else {
			message.delete();
			message.channel.send("**Invalid Argument, try: '!help'.**").then(msg => {msg.delete(4000)});
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
	else if (command === 'math') {
		var Amount = getRandomInt(2, 4);
		var Form = getRandomInt(1,5);
		
		if (Form === 1 && Amount == 2) { message.channel.send(getRandomInt(0,6) + ' x ' + getRandomInt(0,6)).then(msg => {msg.delete(15000)}); }
		if (Form === 1 && Amount == 3) { message.channel.send(getRandomInt(0,6) + ' x ' + getRandomInt(0,6) + ' x ' + getRandomInt(0,6)).then(msg => {msg.delete(15000)}); }
		if (Form === 1 && Amount == 4) { message.channel.send(getRandomInt(0,6) + ' x ' + getRandomInt(0,6) + ' x ' + getRandomInt(0,6) + ' x ' + getRandomInt(0,6)).then(msg => {msg.delete(15000)}); }
		
		if (Form === 2 && Amount == 2) { message.channel.send(getRandomInt(1,21) + ' + ' + getRandomInt(1,21)).then(msg => {msg.delete(15000)}); }
		if (Form === 2 && Amount == 3) { message.channel.send(getRandomInt(1,21) + ' + ' + getRandomInt(1,21) + ' + ' + getRandomInt(1,21)).then(msg => {msg.delete(15000)}); }
		if (Form === 2 && Amount == 4) { message.channel.send(getRandomInt(1,21) + ' + ' + getRandomInt(1,21) + ' + ' + getRandomInt(1,21) + ' + ' + getRandomInt(1,21)).then(msg => {msg.delete(15000)}); }
		
		if (Form === 3 && Amount == 2) { message.channel.send(getRandomInt(18,50) + ' - ' + getRandomInt(1,10) + ' - ' + getRandomInt(1,10)).then(msg => {msg.delete(15000)}); }
		if (Form === 3 && Amount == 3) { message.channel.send(getRandomInt(27,75) + ' - ' + getRandomInt(1,10) + ' - ' + getRandomInt(1,10) + ' - ' + getRandomInt(1,10)).then(msg => {msg.delete(15000)}); }
		if (Form === 3 && Amount == 4) { message.channel.send(getRandomInt(36,100) + ' - ' + getRandomInt(1,10) ' - ' + getRandomInt(1,10) + ' - ' + getRandomInt(1,10) ' - ' + getRandomInt(1,10)).then(msg => {msg.delete(15000)}); }
		
		if (Form === 4 && Amount == 2) { message.channel.send('Kwadraat van: ' + getRandomInt(1, 16)).then(msg => {msg.delete(15000)}); }
		if (Form === 4 && Amount == 3) { message.channel.send('Wortel van: 625').then(msg => {msg.delete(15000)}); }
		if (Form === 4 && Amount == 4) { message.channel.send('Wortel van: 256').then(msg => {msg.delete(15000)}); }
		
		message.delete();
	}
	else {
		message.delete();
		message.channel.send("**Invalid Command, try: '!help'.**").then(msg => {msg.delete(4000)});
	}
	
	
	function getRandomInt(min, max) {
 		min = Math.ceil(min);
  		max = Math.floor(max);
 		return Math.floor(Math.random() * (max - min)) + min;
	}
});

client.login(process.env.token);
