const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder , PermissionsBitField, ChannelType } = require('discord.js');

module.exports ={
    data: new SlashCommandBuilder()
    .setName('unlock')
    .setDescription('This unlocks a given channel')
    .addChannelOption(option => option.setName('channel').setDescription('The channel you want to unlock').addChannelTypes(ChannelType.GuildText).setRequired(true)),
    async execute (interaction) {

        if(!interaction.member.permissions.has(PermissionsBitField.Flags.MessageChannels)) return await interaction.reply({ content: "You dont have permissions to execute this command! ", ephemeral: true})

        let channel = interaction.options.getChannel('channel');

        channel.permissionsOverwrites.create(interaction.guild.id, { SendMessages: true } )

        const embed = new EmbedBuilder()
        .setColor("DarkButNotBlack")
        .setDescription(` :white_check_mark: ${channel} has been *unlocked* `)

        await interaction.reply({ embeds: [embed]})
    }
}       