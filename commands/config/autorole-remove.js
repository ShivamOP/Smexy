 const Discord = require("discord.js");
const bot = new Discord.Client();
const db = require("quick.db");
module.exports = {
  name: "autorole-remove",
  aliases: ['autoroleremove'],
      desc: "Removes an autorole",
usage: "<role ID/mention/name>",
userPerms: ["MANAGE_ROLES"],
botPerms: [],
  async run(bot, message, args) {
if(!message.member.hasPermission('MANAGE_ROLES')) return message.reply(`You don't have enough permissions to use this command`);
    if (db.has(`${message.guild.id}-autoroles`)) {
     
      const rolexd =
        message.mentions.roles.first() ||
        message.guild.roles.cache.get(args[0]) ||
        message.guild.roles.cache.find(r => r.name.toLowerCase() === args.join(" ").toLowerCase());
      if (!rolexd)
        return message.channel.send(`Please provide a valid role mention/id/name.`);
      const check = await db.get(`${message.guild.id}-autoroles`);
      if (!check.includes(rolexd.id))
        return message.channel.send(
          `\`${rolexd.name}\` is not listed as a auto-role.`
        );
        if(message.member.roles.highest.position <= rolexd.position && message.guild.ownerID !== message.author.id) return message.channel.send(`The role \'${rolexd.name}\' (position ${rolexd.position}) is above your highest role \'${message.member.roles.highest.name}\' (position ${message.member.roles.highest.position}) and cannot be handed out by you. Please ensure that your highest role is above the role you want not to be assigned.`)
        if(message.guild.me.roles.highest.postion <= rolexd.position) return message.channel.send(`The role \'${rolexd.name}\' \(position ${rolexd.position}\) is above my highest role \'${message.guild.me.roles.highest.name}\' \(position ${message.guild.me.roles.highest.position}\) and cannot be handed by me. Please ensure that my highest role is above the role you want not to be assigned. `)
if(rolexd.managed) return message.channel.send(`That role is managed. (that is a role of a bot) which cannot be assigned to normal members.`);



const result = check.filter(f => f !== rolexd.id);

// const result = check.splice(check.indexOf(rolexd.id), 1);

db.set(`${message.guild.id}-autoroles`, result);
      const embed = new Discord.MessageEmbed()
        .setColor(rolexd.hexColor)
        .setTitle(`Autorole Removed`)
        .setDescription(
          `${rolexd} will no longer be automatically assigned upon joining.`
        );
      message.channel.send(embed);
     
      

    } else {
        return message.channel.send(`No Autorole is set in this server.`)
    }
  }
}
       
    
