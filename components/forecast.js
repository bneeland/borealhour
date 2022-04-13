function toCelcius(tempInF) {
  return ((tempInF - 32) * 5/9).toFixed(0)
}

function toKmph(speedInMph) {
  return (speedInMph * 1.609344).toFixed(0)
}

export default function Forecast(props) {
  const weatherData = props.weatherData

  console.log(weatherData)

  return (
    <>
      {/* Current day - summary */}
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
              <div className="border">
                {weatherData.currentConditions.precipprob ? `${weatherData.currentConditions.precipprob}% probability` : `—`}
                {weatherData.currentConditions.preciptype && ` ${weatherData.currentConditions.preciptype}`}
              </div>
            </div>
            <div className="border flex">
              <div className="border flex-1">Wind</div>
              <div className="border">
                {toKmph(weatherData.currentConditions.windspeed)} km/h
                {weatherData.currentConditions.winddir && ` ${weatherData.currentConditions.winddir}°`}
              </div>
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

      {/* Current day - detail */}
      <div>
        <div className="border">

          <div>Current day's temperatures</div>

          <div className="flex overflow-auto">
            {weatherData.days[0].hours.map(hour => (
              <div>{hour.datetime}<br />
              {toCelcius(hour.temp)} &deg;C</div>
            ))}
          </div>

        </div>

        <div className="border">

          <div>Current day's precipitation</div>

          <div className="flex overflow-auto">
            {weatherData.days[0].hours.map(hour => (
              <div>{hour.datetime}<br />
              {hour.precipprob}%</div>
            ))}
          </div>

        </div>

        <div className="border">

          <div>Current day's windspeed</div>

          <div className="flex overflow-auto">
            {weatherData.days[0].hours.map(hour => (
              <div>{hour.datetime}<br />
              {toKmph(hour.windspeed)} km/h</div>
            ))}
          </div>

        </div>
      </div>

      {/* 14 days */}
      <div className="flex overflow-auto">
        {weatherData.days.map(day => (
          <div className="grid grid-rows-">
            <div>
              {day.datetime}
            </div>
            <div>
              {day.icon}<br />
              {day.conditions}
              {day.description}
            </div>
            <div>
              High: {day.tempmax}<br />
              Low: {day.tempmin}<br />
              [Sparkline of temp] {/* day.hours.map(hour => ...) */}
            </div>
            <div>
              {day.precip}%<br />
              {day.preciptype}<br />
              {day.precipcover}<br />
              [Sparkline of precip] {/* day.hours.map(hour => ...) */}
            </div>
            <div>
              {toKmph(day.windspeed)} km/h<br />
              {day.winddir}&deg;<br />
              [Sparkline of wind] {/* day.hours.map(hour => ...) */}
            </div>
            <div>
              {day.cloudcover}%<br />
              [Sparkline of cloud] {/* day.hours.map(hour => ...) */}
            </div>
            <div>
              {day.humidity}%<br />
              [Sparkline of humid] {/* day.hours.map(hour => ...) */}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
