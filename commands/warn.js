const Discord = require("Discord.js");

module.exports.run = async (bot, message, args) => {

    let wChannel = message.guild.channels.find(`name`, "action-log");
    if(!wChannel) return message.channel.send("There is no action-log channel!");
    let wUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!wUser) return message.channel.send("Please specify a valid user!").then(msg => {msg.delete(5000)});
    if (wUser.id == message.author.id) return message.channel.send("You can't warn yourself");
    let wReason = args.join(" ").slice(22);
    if (!wReason) return message.channel.send("Please specify a warn reason, for example 'spamming' ");
    let wEmbed = new Discord.RichEmbed()
    .setDescription("Punishment")
    .setColor("#5998ff")
    .addField("Type:", `Warn`)
    .addField("User:", `${wUser} (${wUser.id})`)
    .addField("Staff Member:", `${message.author} (${message.author.id})`)
    .addField("Time:", `${message.createdAt}`)
    .addField("Reason:", `${wReason}`)
    .setThumbnail(message.author.AvatarURL)

    wUser.send(`You have been warned in ${message.guild.name} for ${wReason}`).then(
        wEmbed
        .setFooter(`Successfully warned user`)
        .setColor('#3ddb5a')
    ).then(
        wChannel.send({embed: wEmbed})
    ).catch(
        () => {
            wEmbed
            .setFooter(`Failed to warn user`)
            .setColor('#f73d3d')
            wChannel.send({embed: wEmbed});
        }
    )
    message.delete();

}

module.exports.help = {
    name: "warn",
    description: "Warns a user on the server",
    usage: "warn <PlayerName>",
    staffOnly: "true"
}
