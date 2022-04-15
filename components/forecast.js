import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, } from 'recharts'

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

export default function Forecast(props) {
  const weatherData = props.weatherData

  return (
    <>
      {/* Current day - summary */}
      <div className="p-2">
        <div className={styles.heading.major}>Current</div>
        <div className="flex">
          <div className="flex-none">
            <div className="flex justify-center items-center w-32 h-32">
              <div className="flex flex-col items-center">
                <div>(icon) {weatherData.currentConditions.icon}</div>
                <div>{weatherData.currentConditions.conditions}</div>
              </div>
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

      {/* Current day - detail */}
      <div className="p-2">
        <div className={styles.heading.major}>Today</div>
        {/* Temperatures */}
        <div className="">
          <div className={styles.heading.minor}>Temperature</div>
          <div className="flex overflow-auto">
            <ResponsiveContainer width="100%" height={150}>
              <LineChart data={weatherData.days[0].hours} margin={{ top: 35, right: 25, left: 25, bottom: 15, }}>
                <Line type="monotone" dataKey="temp" stroke="#000" dot={false} animationDuration="500" label={{ fill: 'gray', fontSize: 13, position: 'top', offset: 10, }} />
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
                <Line type="monotone" dataKey="precipprob" stroke="#000" dot={false} animationDuration="500" label={{ fill: 'gray', fontSize: 13, position: 'top', offset: 10, }} />
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
                <Line type="monotone" dataKey="windspeed" stroke="#000" dot={false} animationDuration="500" label={{ fill: 'gray', fontSize: 13, position: 'top', offset: 10, }} />
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
                <Line type="monotone" dataKey="cloudcover" stroke="#000" dot={false} animationDuration="500" label={{ fill: 'gray', fontSize: 13, position: 'top', offset: 10, }} />
                <XAxis dataKey={hour => hour.datetime.slice(0, 3) + '00'} height={10} interval="preserveStart" axisLine={false} tickLine={false} tick={{ fill: 'gray', fontSize: 13, position: 'top', offset: 10, }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* 5 days (near) */}
      <div className="p-2 overflow-auto">
        <div className={styles.heading.major}>Forecast</div>
        <div className="flex space-x-2">
          {weatherData.days.slice(1, 6).map((day, i) => (
            <div key={day.datetime} className="grid grid-rows-">
              <div>
                {new Date(day.datetime).toLocaleDateString('en-US', { weekday: 'long', timeZone: 'UTC' })}
              </div>
              <div>
                (icon) {day.icon}<br />
                {day.conditions}
                {day.description}
              </div>
              <div>
                <div className={styles.heading.minor}>Temperatures</div>
                High: {day.tempmax}<br />
                Low: {day.tempmin}<br />
                <ResponsiveContainer width="100%" height={50}>
                  <LineChart data={weatherData.days[i].hours}>
                    <Line type="monotone" dataKey="temp" stroke="#000" dot={false} animationDuration="500" />
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
                    <Line type="monotone" dataKey="precipprob" stroke="#000" dot={false} animationDuration="500" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div>
                <div className={styles.heading.minor}>Wind</div>
                {day.windspeed} km/h<br />
                {day.winddir}&deg;<br />
                <ResponsiveContainer width="100%" height={50}>
                  <LineChart data={weatherData.days[i].hours}>
                    <Line type="monotone" dataKey="windspeed" stroke="#000" dot={false} animationDuration="500" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div>
                <div className={styles.heading.minor}>Cloud cover</div>
                {day.cloudcover}%<br />
                <ResponsiveContainer width="100%" height={50}>
                  <LineChart data={weatherData.days[i].hours}>
                    <Line type="monotone" dataKey="cloudcover" stroke="#000" dot={false} animationDuration="500" />
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

      {/* 5 days (far) */}
      <div className="p-2 overflow-auto">
        <div className={styles.heading.major}>Forecast</div>
        <div className="flex space-x-2">
          {weatherData.days.slice(6, 15).map((day, i) => (
            <div key={day.datetime} className="grid grid-rows-">
              <div>
                {new Date(day.datetime).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', timeZone: 'UTC' })}
              </div>
              <div>
                (icon) {day.icon}<br />
                {day.conditions}
                {day.description}
              </div>
              <div>
                <div className={styles.heading.minor}>Temperatures</div>
                High: {day.tempmax}<br />
                Low: {day.tempmin}<br />
              </div>
              <div>
                <div className={styles.heading.minor}>Precipitation</div>
                {day.precip}%<br />
                {day.preciptype}<br />
                {day.precipcover}<br />
              </div>
              <div>
                <div className={styles.heading.minor}>Wind</div>
                {day.windspeed} km/h<br />
                {day.winddir}&deg;<br />
              </div>
              <div>
                <div className={styles.heading.minor}>Cloud cover</div>
                {day.cloudcover}%<br />
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
