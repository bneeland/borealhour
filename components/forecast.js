import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, } from 'recharts'
import { WiSnow, WiRain, WiFog, WiWindy, WiCloudy, WiDayCloudy, WiNightCloudy, WiDaySunny, WiNightClear, } from "react-icons/wi"

const styles = {
  heading: {
    major: 'uppercase text-sm font-semibold text-gray-500 my-2',
    minor: 'uppercase text-xs font-semibold text-gray-500 my-2',
  },
}

const weekdays = {
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Monday',
  7: 'Monday',
}

const iconConfig = {
  sizes: {
    lg: 80,
    md: 60,
    sm: 40.
  },
  colors: {
    black: '#000',
    gray: '#6b7280',
  }
}

const icons = {
  'snow': <WiSnow size={iconConfig.sizes.sm} color={iconConfig.colors.black} />,
  'rain': <WiRain size={iconConfig.sizes.sm} color={iconConfig.colors.black} />,
  'fog': <WiFog size={iconConfig.sizes.sm} color={iconConfig.colors.black} />,
  'wind': <WiWindy size={iconConfig.sizes.sm} color={iconConfig.colors.black} />,
  'cloudy': <WiCloudy size={iconConfig.sizes.sm} color={iconConfig.colors.black} />,
  'partly-cloudy-day': <WiDayCloudy size={iconConfig.sizes.sm} color={iconConfig.colors.black} />,
  'partly-cloudy-night': <WiNightCloudy size={iconConfig.sizes.sm} color={iconConfig.colors.black} />,
  'clear-day': <WiDaySunny size={iconConfig.sizes.sm} color={iconConfig.colors.black} />,
  'clear-night': <WiNightClear size={iconConfig.sizes.sm} color={iconConfig.colors.black} />,
}

export default function Forecast(props) {
  const weatherData = props.weatherData

  console.log('weatherData')
  console.log(weatherData)

  return (
    <>
      {/* Now */}
      <div className="p-2">
        <div className={styles.heading.major}>Now</div>
        <div className="flex">
          <div className="flex-none flex items-center">
            <div className="flex flex-col items-center">
              <div>{icons[weatherData.currentConditions.icon]}</div>
              <div>{weatherData.currentConditions.icon}</div>
              <div>{weatherData.currentConditions.conditions}</div>
            </div>
          </div>
          <div className="flex-auto flex justify-center items-center w-80">
            <div className="text-4xl">
              {weatherData.currentConditions.temp} &deg;C
            </div>
          </div>
          <div className="flex-auto flex justify-center items-center w-60">
            <div className="w-full">
              <div className="flex">
                <div className="flex-1">Precipitation</div>
                <div className="">
                  {weatherData.currentConditions.precipprob ? `${weatherData.currentConditions.precipprob}% probability` : `—`}
                  {weatherData.currentConditions.preciptype && ` ${weatherData.currentConditions.preciptype}`}
                </div>
              </div>
              <div className="flex">
                <div className="flex-1">Wind</div>
                <div className="">
                  {weatherData.currentConditions.windspeed} km/h
                  {weatherData.currentConditions.winddir && ` ${weatherData.currentConditions.winddir}°`}
                </div>
              </div>
              <div className="flex">
                <div className="flex-1">Cloud cover</div>
                <div className="">{weatherData.currentConditions.cloudcover}%</div>
              </div>
              <div className="flex">
                <div className="flex-1">Relative humidity</div>
                <div className="">{weatherData.currentConditions.humidity}%</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Today */}
      <div className="p-2">
        <div className={styles.heading.major}>Today</div>
        <div className="grid grid-cols-3">
          <div>
            <div>
              {icons[weatherData.days[0].icon]}
              {weatherData.days[0].icon}
            </div>
            <div>
              {weatherData.days[0].conditions}
            </div>
            <div>
              {weatherData.days[0].description}
            </div>
          </div>
        </div>
        {/* Temperatures */}
        <div className="">
          <div className={styles.heading.minor}>Temperature</div>
          <div>
            {weatherData.days[0].tempmax} {weatherData.days[0].tempmin}
          </div>
          <div className="flex overflow-auto">
            <ResponsiveContainer width="100%" height={150}>
              <LineChart data={weatherData.days[0].hours} margin={{ top: 35, right: 25, left: 25, bottom: 15, }}>
                <Line type="monotone" dataKey="temp" stroke="#000" dot={false} animationDuration={500} label={{ fill: 'gray', fontSize: 13, position: 'top', offset: 10, }} />
                <XAxis dataKey={hour => hour.datetime.slice(0, 3) + '00'} height={10} interval="preserveStart" axisLine={false} tickLine={false} tick={{ fill: 'gray', fontSize: 13, position: 'top', offset: 10, }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Precipitation */}
        <div className="">
          <div className={styles.heading.minor}>Precipitation</div>
          <div className="flex overflow-auto">
            <ResponsiveContainer width="100%" height={150}>
              <LineChart data={weatherData.days[0].hours} margin={{ top: 35, right: 25, left: 25, bottom: 15, }}>
                <Line type="monotone" dataKey="precipprob" stroke="#000" dot={false} animationDuration={500} label={{ fill: 'gray', fontSize: 13, position: 'top', offset: 10, dataKey: hour => (hour.precipprob.toString() + (hour.preciptype ? '\n' + hour.preciptype[0] : '')) }} />
                <XAxis dataKey={hour => hour.datetime.slice(0, 3) + '00'} height={10} interval="preserveStart" axisLine={false} tickLine={false} tick={{ fill: 'gray', fontSize: 13, position: 'top', offset: 10, }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Wind speed */}
        <div className="">
          <div className={styles.heading.minor}>Wind</div>
          <div className="flex overflow-auto">
            <ResponsiveContainer width="100%" height={150}>
              <LineChart data={weatherData.days[0].hours} margin={{ top: 35, right: 25, left: 25, bottom: 15, }}>
                <Line type="monotone" dataKey="windspeed" stroke="#000" dot={false} animationDuration={500} label={{ fill: 'gray', fontSize: 13, position: 'top', offset: 10, }} />
                <XAxis dataKey={hour => hour.datetime.slice(0, 3) + '00'} height={10} interval="preserveStart" axisLine={false} tickLine={false} tick={{ fill: 'gray', fontSize: 13, position: 'top', offset: 10, }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Cloud cover */}
        <div className="">
          <div className={styles.heading.minor}>Cloud cover</div>
          <div className="flex overflow-auto">
            <ResponsiveContainer width="100%" height={150}>
              <LineChart data={weatherData.days[0].hours} margin={{ top: 35, right: 25, left: 25, bottom: 15, }}>
                <Line type="monotone" dataKey="cloudcover" stroke="#000" dot={false} animationDuration={500} label={{ fill: 'gray', fontSize: 13, position: 'top', offset: 10, }} />
                <XAxis dataKey={hour => hour.datetime.slice(0, 3) + '00'} height={10} interval="preserveStart" axisLine={false} tickLine={false} tick={{ fill: 'gray', fontSize: 13, position: 'top', offset: 10, }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Days 2 to 5 */}
      <div className="p-2 overflow-auto">
        <div className={styles.heading.major}>Forecast</div>
        <div className="flex space-x-2">
          {weatherData.days.slice(1, 6).map((day, i) => (
            <div key={day.datetime} className="grid grid-rows-">
              <div>
                {new Date(day.datetime).toLocaleDateString('en-US', { weekday: 'long', timeZone: 'UTC' })}
              </div>
              <div>
                <div className="flex justify-center">
                  {icons[day.icon]}
                  {day.icon}
                </div>
                <div>
                  {day.conditions}
                </div>
                <div>
                  {day.description}
                </div>
              </div>
              <div>
                <div className={styles.heading.minor}>Temperatures</div>
                {day.tempmax} {day.tempmin}
                <ResponsiveContainer width="100%" height={50}>
                  <LineChart data={weatherData.days[i].hours}>
                    <Line type="monotone" dataKey="temp" stroke="#000" dot={false} animationDuration={500} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div>
                <div className={styles.heading.minor}>Precipitation</div>
                {day.precip}%<br />
                {day.preciptype}<br />
                {day.precipcover}<br />
                <ResponsiveContainer width="100%" height={50}>
                  <LineChart data={weatherData.days[i].hours}>
                    <Line type="monotone" dataKey="precipprob" stroke="#000" dot={false} animationDuration={500} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div>
                <div className={styles.heading.minor}>Wind</div>
                {day.windspeed} km/h<br />
                {day.winddir}&deg;<br />
                <ResponsiveContainer width="100%" height={50}>
                  <LineChart data={weatherData.days[i].hours}>
                    <Line type="monotone" dataKey="windspeed" stroke="#000" dot={false} animationDuration={500} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div>
                <div className={styles.heading.minor}>Cloud cover</div>
                {day.cloudcover}%<br />
                <ResponsiveContainer width="100%" height={50}>
                  <LineChart data={weatherData.days[i].hours}>
                    <Line type="monotone" dataKey="cloudcover" stroke="#000" dot={false} animationDuration={500} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div>
                <div className={styles.heading.minor}>Humidity</div>
                {day.humidity}%
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Days 6 to 14 */}
      <div className="p-2 overflow-auto">
        <div className={styles.heading.major}>Forecast</div>
        <div className="flex space-x-2">
          {weatherData.days.slice(6, 15).map((day, i) => (
            <div key={day.datetime} className="grid grid-rows-">
              <div>
                {new Date(day.datetime).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', timeZone: 'UTC' })}
              </div>
              <div>
              <div className="flex justify-center">
                {icons[day.icon]}
                {day.icon}
              </div>
              <div>
                {day.conditions}
              </div>
              <div>
                {day.description}
              </div>
              </div>
              <div>
                <div className={styles.heading.minor}>Temperatures</div>
                High: {day.tempmax}
              </div>
              <div>
                <div className={styles.heading.minor}>Precipitation</div>
                {day.precip}%<br />
                {day.preciptype}
              </div>
              <div>
                <div className={styles.heading.minor}>Wind</div>
                {day.windspeed} km/h
              </div>
              <div>
                <div className={styles.heading.minor}>Cloud cover</div>
                {day.cloudcover}%
              </div>
              <div>
                <div className={styles.heading.minor}>Humidity</div>
                {day.humidity}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
