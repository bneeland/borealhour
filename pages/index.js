import { useState } from 'react'
import Head from 'next/head'
import Search from '../components/Search'

function toCelcius(tempInF) {
  return `${((tempInF - 32) * 5/9).toFixed(1)}\xa0°C`
}

export default function Home() {
  const [weatherData, setWeaterData] = useState()

  function selectedLocationHandler(weatherData) {
    console.log('selectedLocation through props')
    console.log(weatherData)
    setWeaterData(weatherData)
  }

  return (
    <div>
      <Head>
        <title>Borealdusk - weather</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Search onSelectLocation={(weatherData) => selectedLocationHandler(weatherData)} />

      {weatherData && (
        <>
          <div>
            <h1>Today</h1>
            <div>
              <h2>Current</h2>
              <div>As of: {weatherData.currentConditions.datetime}</div>
              <div>Conditions: {weatherData.currentConditions.conditions}</div>
              <div>Temperature: {toCelcius(weatherData.currentConditions.temp)}</div>
              <div>Precipitation: {weatherData.currentConditions.precipprob && `${weatherData.currentConditions.precipprob}% probability, `}{weatherData.currentConditions.precip && `${weatherData.currentConditions.precip} `}{weatherData.currentConditions.preciptype && `${weatherData.currentConditions.preciptype}`}</div>
              <div>Cloud cover: {weatherData.currentConditions.cloudcover}%</div>
              <div>Humidity: {weatherData.currentConditions.humidity}%</div>
            </div>
          </div>

          <hr />

          <div>
            {weatherData.days.map(day => (
              <div key={day.datetime}>
                <div>
                  <code>{day.datetime}: High: {((day.tempmax - 32) * 5/9).toFixed(1)}&nbsp;&deg;C / Low: {((day.tempmin - 32) * 5/9).toFixed(1)}&nbsp;&deg;C, POP: {day.precipprob}, {day.description}</code>
                </div>
                {day.hours.map(hour => (
                  <div key={hour.datetime}>
                    <code>{hour.datetime}: {((hour.temp - 32) * 5/9).toFixed(1)}&nbsp;&deg;C, POP: {hour.precipprob}, {hour.conditions}</code>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
