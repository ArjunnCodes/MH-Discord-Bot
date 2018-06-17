const Discord = require("Discord.js");
module.exports.run = async (bot, message, args) => {
        let sender = message.member
        let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!rUser) return message.member.send("The member you tried to report could not be found!").then(message.delete());
        let rReason = args.join(" ").slice(22);
        let rEmbed = new Discord.RichEmbed()
        .setDescription("New Player Report")
        .setColor("#5998ff")
        .addField("Member Name:", `${message.author} (${message.author.id})`)
        .addField("Reported User:", `${rUser} (${rUser.id})`)
        .addField("Channel:", `${message.channel}`)
        .addField("Time:", `${message.createdAt}`)
        .addField("Reason:", `${rReason}`)
        .setThumbnail(rUser.user.avatarURL);
        
        let rChannel = message.guild.channels.find(`name`, "reports");
        if(!rChannel) return message.channel.send("There is no reports channel!");
        message.delete();
        rChannel.send({ embed: rEmbed }).then(msg => {
            msg.react("✅").then(xd => {
                msg.react("❌").then(r => {
                    msg.react("🚫")
                    
                    const brFilter = (reaction, user) => reaction.emoji.name === "🚫" && user.id !== bot.user.id;
                    const checkFilter = (reaction, user) => reaction.emoji.name === "✅" && user.id !== bot.user.id;
                    const xFilter = (reaction, user) => reaction.emoji.name === "❌" && user.id !== bot.user.id; 
    
                    const check = msg.createReactionCollector(checkFilter, {
                    time: 9999999
                    });
                    const no = msg.createReactionCollector(xFilter, {
                    time: 9999999
                    });
                    const br = msg.createReactionCollector(brFilter, {
                        time: 9999999
                        });
                    br.on("collect", r => {
                        msg.clearReactions();
                        rEmbed.setDescription('Archived Report');
                        rEmbed.setFooter(`False Report - React with :regional_indicator_y: to kick ${rUser.username}`);
                        rEmbed.setColor('#d87b1e');
                        msg.edit({ embed: rEmbed }).then(r => {
                            const confirmFilter = (reaction, user) => reaction.emoji.name === "🇾"
                            const confirmR = msg.createReactionCollector(confirmFilter, {
                            time: 999999999
                            });
                            confirmR.on("collect", r => {
                                msg.clearReactions();
                                sender.kick('Abusing /report').then((member) => {
                                    // Successmessage
                                    rEmbed.setFooter(`False Report - User kicked`)
                                    msg.edit({ embed: rEmbed });
                                }).catch(() => {
                                    // Failmessage
                                   rEmbed.setFooter("False Report - Failed to kick user");
                                   msg.edit({ embed: rEmbed })
                               })
                            })
                            });
                        });

                    check.on("collect", r => {
                    msg.clearReactions();
                    rEmbed.setDescription('Archived Report');
                    rEmbed.setFooter('Accepted.');
                    rEmbed.setColor('#3ddb5a');
                    msg.edit({ embed: rEmbed });
                    });
    
                    no.on("collect", r => {
                    msg.clearReactions();
                    rEmbed.setDescription('Archived Report');
                    rEmbed.setFooter('Denied');
                    rEmbed.setColor('#f73d3d');
                    msg.edit({ embed: rEmbed });
                    });
                });
            })
        })
    
    }

module.exports.help = {
    name: "report",
    description: "Allows you to report a player for breaking the rules.",
    usage: "/report <PlayerName> <Reason>"
}
