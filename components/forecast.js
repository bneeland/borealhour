import { useState, useEffect } from 'react'
import PrecipitationLabel from './precipitationLabel'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, LabelList, } from 'recharts'
import { WiSnow, WiRain, WiFog, WiWindy, WiCloudy, WiDayCloudy, WiNightCloudy, WiDaySunny, WiNightClear, WiSleet, WiSnowflakeCold, WiRainMix, } from "react-icons/wi"
import Icon from '../components/icon'

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

function convertDate(inputDate) {
  const inputDateFull = new Date('1970-01-01T' + inputDate + 'Z').toLocaleTimeString([], { timeZone: 'UTC', })
  const outputDate = inputDateFull.slice(0, -9) + ' ' + inputDateFull.slice(-2, ).toLowerCase()
  return outputDate
}

export default function Forecast({ weatherData }) {
  console.log('weatherData')
  console.log(weatherData)

  const [focusDay, setFocusDay] = useState(weatherData.days[0].datetime)

  return (
    <>
      {/* Now */}
      <div className="p-2">
        <div className={styles.heading.major}>Now (as of {weatherData.currentConditions.datetime.slice(0, 3) + '00'})</div>
        <div className="flex">
          <div className="flex-none flex items-center">
            <div className="flex flex-col items-center">
              <div><Icon type={weatherData.currentConditions.icon} size="xl" color="black" /></div>
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

      {/* Today / focus day */}
      <div className="p-2">
        <div className={styles.heading.major}>{new Date(weatherData.days.find(d => d.datetime === focusDay).datetime).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', timeZone: 'UTC' })}</div>
        <div className="grid grid-cols-3">
          <div>
            <div>
              <Icon type={weatherData.days.find(d => d.datetime === focusDay).icon} size="md" color="black" />
            </div>
            <div>
              {weatherData.days.find(d => d.datetime === focusDay).conditions}
            </div>
            <div>
              {weatherData.days.find(d => d.datetime === focusDay).description}
            </div>
          </div>
        </div>
        {/* Temperatures */}
        <div className="">
          <div className={styles.heading.minor}>Temperature</div>
          <div>
            {weatherData.days.find(d => d.datetime === focusDay).tempmax} {weatherData.days.find(d => d.datetime === focusDay).tempmin}
          </div>
          <div className="flex">
            <ResponsiveContainer width="100%" height={150}>
              <LineChart data={weatherData.days.find(d => d.datetime === focusDay).hours} margin={{ top: 35, right: 25, left: 25, bottom: 15, }}>
                <Line type="monotone" dataKey="temp" stroke="#000" dot={false} animationDuration={300} label={{ fill: 'gray', fontSize: 14, position: 'top', offset: 10, }} />
                <XAxis dataKey={hour => convertDate(hour.datetime)} height={10} interval="preserveStart" axisLine={false} tickLine={false} tick={{ fill: 'gray', fontSize: 14, position: 'top', offset: 10, }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Precipitation */}
        <div className="">
          <div className={styles.heading.minor}>Precipitation</div>
          <div className="flex">
            <ResponsiveContainer width="100%" height={150}>
              <LineChart data={weatherData.days.find(d => d.datetime === focusDay).hours} margin={{ top: 35, right: 25, left: 25, bottom: 15, }}>
                <Line type="monotone" dataKey="precipprob" stroke="#000" dot={false} animationDuration={300}>
                  <LabelList dataKey={hour => ({ precipProb: hour.precipprob, precipType: hour.preciptype})} content={<PrecipitationLabel />} />
                </Line>
                <XAxis dataKey={hour => convertDate(hour.datetime)} height={10} interval="preserveStart" axisLine={false} tickLine={false} tick={{ fill: 'gray', fontSize: 14, position: 'top', offset: 10, }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Wind speed */}
        <div className="">
          <div className={styles.heading.minor}>Wind</div>
          <div className="flex">
            <ResponsiveContainer width="100%" height={150}>
              <LineChart data={weatherData.days.find(d => d.datetime === focusDay).hours} margin={{ top: 35, right: 25, left: 25, bottom: 15, }}>
                <Line type="monotone" dataKey="windspeed" stroke="#000" dot={false} animationDuration={300} label={{ fill: 'gray', fontSize: 14, position: 'top', offset: 10, }} />
                <XAxis dataKey={hour => convertDate(hour.datetime)} height={10} interval="preserveStart" axisLine={false} tickLine={false} tick={{ fill: 'gray', fontSize: 14, position: 'top', offset: 10, }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Cloud cover */}
        <div className="">
          <div className={styles.heading.minor}>Cloud cover</div>
          <div className="flex">
            <ResponsiveContainer width="100%" height={150}>
              <LineChart data={weatherData.days.find(d => d.datetime === focusDay).hours} margin={{ top: 35, right: 25, left: 25, bottom: 15, }}>
                <Line type="monotone" dataKey="cloudcover" stroke="#000" dot={false} animationDuration={300} label={{ fill: 'gray', fontSize: 14, position: 'top', offset: 10, }} />
                <XAxis dataKey={hour => convertDate(hour.datetime)} height={10} interval="preserveStart" axisLine={false} tickLine={false} tick={{ fill: 'gray', fontSize: 14, position: 'top', offset: 10, }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Humidity */}
        <div className="">
          <div className={styles.heading.minor}>Humidity</div>
          <div className="flex">
            <div>{weatherData.days.find(d => d.datetime === focusDay).humidity}%</div>
          </div>
        </div>

      </div>

      {/* Short-term */}
      <div className="p-2 overflow-x-auto">
        <div className={styles.heading.major}>Forecast (short term)</div>
        <div className="flex">
          {weatherData.days
            .slice(0, 5)
            // .filter(day => day !== weatherData.days.find(d => d.datetime === focusDay))
            .map(day => (
              <div
                key={day.datetime}
                className={`grid grid-rows-7 cursor-pointer w-full p-4 rounded-lg transition-all duration-300 pointer ${day.datetime === focusDay && 'bg-gray-100'}`}
                onClick={() => setFocusDay(day.datetime)}
              >
                <div>
                  {new Date(day.datetime).toLocaleDateString('en-US', { weekday: 'long', timeZone: 'UTC' })}
                </div>
                <div>
                  <div className="flex justify-center">
                    <Icon type={day.icon} size="sm" color="black" />
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
                  <ResponsiveContainer width="95%" height={50} className="mx-auto">
                    <LineChart data={weatherData.days.find(d => d === day).hours}>
                      <Line type="monotone" dataKey="temp" stroke="#000" dot={false} animationDuration={0} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <div className={styles.heading.minor}>Precipitation</div>
                  {day.precip}%<br />
                  {day.preciptype}<br />
                  {day.precipcover}<br />
                  <ResponsiveContainer width="95%" height={50} className="mx-auto">
                    <LineChart data={weatherData.days.find(d => d === day).hours}>
                      <Line type="monotone" dataKey="precipprob" stroke="#000" dot={false} animationDuration={0} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <div className={styles.heading.minor}>Wind</div>
                  {day.windspeed} km/h<br />
                  {day.winddir}&deg;<br />
                  <ResponsiveContainer width="95%" height={50} className="mx-auto">
                    <LineChart data={weatherData.days.find(d => d === day).hours}>
                      <Line type="monotone" dataKey="windspeed" stroke="#000" dot={false} animationDuration={0} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <div className={styles.heading.minor}>Cloud cover</div>
                  {day.cloudcover}%<br />
                  <ResponsiveContainer width="95%" height={50} className="mx-auto">
                    <LineChart data={weatherData.days.find(d => d === day).hours}>
                      <Line type="monotone" dataKey="cloudcover" stroke="#000" dot={false} animationDuration={0} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <div className={styles.heading.minor}>Humidity</div>
                  {day.humidity}%
                </div>
              </div>
            ))
          }
        </div>
      </div>

      {/* Long-term */}
      <div className="p-2 overflow-x-auto">
        <div className={styles.heading.major}>Forecast (long term)</div>
        <div className="flex">
          {weatherData.days
            .slice(5, 14)
            // .filter(day => day !== weatherData.days.find(d => d.datetime === focusDay))
            .map((day, i) => (
              <div
                key={day.datetime}
                className={`grid grid-rows-7 cursor-pointer w-full p-4 rounded-lg transition-all duration-300 ${day.datetime === focusDay && 'bg-gray-100'}`}
                onClick={() => setFocusDay(day.datetime)}
              >
                <div>
                  {new Date(day.datetime).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', timeZone: 'UTC' })}
                </div>
                <div>
                  <div className="flex justify-center">
                    <Icon type={day.icon} size="xs" color="black" />
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
            ))
          }
        </div>
      </div>
    </>
  )
}
