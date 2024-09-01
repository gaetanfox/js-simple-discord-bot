const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const { fetchWeather } = require('../requests/currentWeather')

const data = new SlashCommandBuilder()
  .setName('weather')
  .setDescription('Replies with the current weather forecast')
  .addStringOption((option) => {
    return option
      .setName('location')
      .setDescription('The location can be a city, zip/postal code, or lat/lon')
      .setRequired(true)
  })
//   .addStringOption((option) => {
//     return option
//       .setName('units')
//       .setDescription('Can be in metric or imperial')
//       .setRequired(false)
//       .addChoices(
//         { name: 'Metric', value: 'metric' },
//         { name: 'Imperial', value: 'imperial' }
//       )
//   })

async function execute(interaction) {
  // Triggers an ephemeral message so that discord knows the bot is working and receiving replies. So instead of 3min timeout, we get 15 or so
  await interaction.deferReply()

  try {
    const location = interaction.options.getString('location')

    const { weatherData, locationName } = await fetchWeather(location)
    // console.log(weatherData)
    // Make an embed to make it more readable

    const embed = new EmbedBuilder()
      .setColor(0x3f704d)
      .setTitle(`Weather forecast for ${locationName}:`)
      //   .setDescription(`Using the ${units} system`)
      .setTimestamp()
      .setFooter({
        text: 'uWu',
      })

    //     // for (const day of weatherData) {
    //     //   const temperatureMin = isMetric
    //     //     ? day.temperatureMinC
    //     //     : day.temperatureMinF
    //     //   const temperatureMax = isMetric
    //     //     ? day.temperatureMaxC
    //     //     : day.temperatureMaxF

    const date = weatherData.date

    const temperature = weatherData.temperatureC
    const windSpeed = weatherData.windSpeed
    const humidity = weatherData.humidity
    const feelsLikeC = weatherData.feelsLikeC
    const cloud = weatherData.cloud

    embed.addFields({
      name: date.toString(),
      value: `🌡️ Temperature: ${temperature}º
                😕 Feels like: ${feelsLikeC}
                🍃 Wind Speed: ${windSpeed} kmph
                💧 Humidity: ${humidity} %
                ☁️ Clouds: ${cloud} %
        `,
    })
    await interaction.editReply({
      embeds: [embed],
    })
  } catch (err) {
    console.log(err)
  }
}
module.exports = {
  data,
  execute,
}
