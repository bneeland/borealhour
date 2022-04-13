function toCelcius(tempInF) {
  return ((tempInF - 32) * 5/9).toFixed(1)
}

function toKmph(speedInMph) {
  return (speedInMph * 1.609344).toFixed(1)
}

export default function Forecast(props) {
  const weatherData = props.weatherData

  console.log(weatherData)

  return (
    <>
      <div className="border flex">
        <div className="border flex-none">
          <div className="border flex justify-center items-center w-32 h-32">
            <div className="border flex flex-col items-center">
              <div>(icon) {weatherData.currentConditions.icon}</div>
              <div>{weatherData.currentConditions.conditions}</div>
            </div>
          </div>
        </div>
        <div className="border flex-auto flex justify-center items-center w-80">
          <div className="text-4xl">
            {toCelcius(weatherData.currentConditions.temp)} &deg;C
          </div>
        </div>
        <div className="border flex-auto flex justify-center items-center w-60">
          <div className="w-full">
            <div className="border flex">
              <div className="border flex-1">Precipitation</div>
              <div className="border">{weatherData.currentConditions.precipprob && `${weatherData.currentConditions.precipprob}% probability, `}{weatherData.currentConditions.precip && `${weatherData.currentConditions.precip} `}{weatherData.currentConditions.preciptype && `${weatherData.currentConditions.preciptype}`}</div>
            </div>
            <div className="border flex">
              <div className="border flex-1">Wind</div>
              <div className="border">{toKmph(weatherData.currentConditions.windspeed)} km/h {weatherData.currentConditions.winddir}&deg;</div>
            </div>
            <div className="border flex">
              <div className="border flex-1">Cloud cover</div>
              <div className="border">{weatherData.currentConditions.cloudcover}%</div>
            </div>
            <div className="border flex">
              <div className="border flex-1">Relative humidity</div>
              <div className="border">{weatherData.currentConditions.humidity}%</div>
            </div>
          </div>
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
  )
}
