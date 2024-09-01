const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const { fetchForecast } = require('../requests/forecast')

const data = new SlashCommandBuilder()
  .setName('forecast')
  .setDescription('Replies with the weather forecast')
  .addStringOption((option) => {
    return option
      .setName('location')
      .setDescription('The location can be a city, zip/postal code, or lat/lon')
      .setRequired(true)
  })
  .addStringOption((option) => {
    return option
      .setName('units')
      .setDescription('Can be in metric or imperial')
      .setRequired(false)
      .addChoices(
        { name: 'Metric', value: 'metric' },
        { name: 'Imperial', value: 'imperial' }
      )
  })

async function execute(interaction) {
  // Triggers an ephemeral message so that discord knows the bot is working and receiving replies. So instead of 3min timeout, we get 15 or so
  await interaction.deferReply()

  try {
    const location = interaction.options.getString('location')
    const units = interaction.options.getString('units') || 'metric'
    const isMetric = units === 'metric'

    const { weatherData, locationName } = await fetchForecast(location)
    // Make an embed to make it more readable

    const embed = new EmbedBuilder()
      .setColor(0x3f704d)
      .setTitle(`Weather forecast for ${locationName}:`)
      //   .setDescription(`Using the ${units} system`)
      .setTimestamp()
      .setFooter({
        text: 'uWu',
      })
    console.log(weatherData)

    for (const day of weatherData) {
      const precipitations = day.precipitations
      const chanceOfRain = day.chanceOfRain
      const chanceOfSnow = day.chanceOfSnow
      const avgHumidity = day.avgHumidity
      const temperatureMin = isMetric
        ? day.temperatureMinC
        : day.temperatureMinF
      const temperatureMax = isMetric
        ? day.temperatureMaxC
        : day.temperatureMaxF
      embed.addFields({
        name: day.date,
        value: `⬇️ Low: ${temperatureMin}º
                ⬆️ High: ${temperatureMax}º
                💧 Humidity: ${avgHumidity} %
                🌧️ Rain: ${chanceOfRain}% chance
                ☔️ Amount ${precipitations} mm
                ❄️ Snow: ${chanceOfSnow}%
                
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
