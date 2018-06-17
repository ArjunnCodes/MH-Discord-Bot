const Discord = require("Discord.js");

module.exports.run = async (bot, message, args) => {

    let bChannel = message.guild.channels.find(`name`, "action-log");
        let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        let bReason = args.join(" ").slice(22);
        if(!bChannel) return message.channel.send("There is no action-log channel!");
        if(!bUser) return message.channel.send("The member you have specified could not be found!");
        if (bUser.id == message.author.id) return message.channel.send("You can't ban yourself!");
        if (bUser.roles.some(r => ["Sr. Moderator", "Administrator", "Developer", "Discord Management", "Helper", "Moderator", "owner"].includes(r.name))) return message.channel.send("You cannot ban a staff member!");
        if (!bReason) return message.channel.send("Please specify a ban reason, for example 'inappropriate behaviour'");
        if (!bUser.bannable) return message.channel.send("I can't ban that player! Are they a higher rank than me? Do I have ban perms?");
    
        let bEmbed = new Discord.RichEmbed()
        .setDescription("Punishment")
        .setColor("#5998ff")
        .addField("Type:", `Ban`)
        .addField("User:", `${bUser} (${bUser.id})`)
        .addField("Staff Member:", `${message.author} (${message.author.id})`)
        .addField("Time:", `${message.createdAt}`)
        .addField("Reason:", `${bReason}`)
        .setThumbnail(message.author.AvatarURL)
        await bUser.ban(bReason).then(msg => {
            bUser.send(`You have been banned from ${message.guild.name} for ${kReason}`)
        }).then(
            bEmbed
            .setFooter(`Successfully banned user`)
            .setColor('#3ddb5a')
        ).then(
            bChannel.send({ embed: bEmbed })
        ).catch(
            () => {}
        )
        message.delete();

}

module.exports.help = {
    name: "ban",
    description: "Bans a user from the server.",
    usage: "ban <name>",
    staffOnly: "true"
}