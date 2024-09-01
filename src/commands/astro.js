const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const { fetchForecast } = require('../requests/forecast')

const data = new SlashCommandBuilder()
  .setName('astro')
  .setDescription('Replies with the astronomical information of the day')
  .addStringOption((option) => {
    return option
      .setName('location')
      .setDescription('The location can be a city, zip/postal code, or lat/lon')
      .setRequired(true)
  })

async function execute(interaction) {
  // Triggers an ephemeral message so that discord knows the bot is working and receiving replies. So instead of 3min timeout, we get 15 or so
  await interaction.deferReply()

  try {
    const location = interaction.options.getString('location')

    const { weatherData, locationName } = await fetchForecast(location)
    // Make an embed to make it more readable
    // const today = new Date().toISOString().split('T')[0]
    // console.log(today)

    const embed = new EmbedBuilder()
      .setColor(0x3f60fd)
      .setTitle(`Astronomical info of the day for ${locationName}:`)
      .setTimestamp()
      .setFooter({
        text: 'uWu',
      })

    for (const day of weatherData) {
      embed.addFields({
        name: day.date,
        value: `🌄 Sunrise: ${day.sunriseTime}\n
                🌅 Sunset: ${day.sunsetTime}\n
                🌝 Moonrise: ${day.moonriseTime}\n
                🌚 Moonset: ${day.moonsetTime}\n
                
                =========================

        `,
      })
    }
    await interaction.editReply({
      embeds: [embed],
    })
  } catch (error) {
    await interaction.editReply(error)
  }
}

module.exports = {
  data,
  execute,
}
